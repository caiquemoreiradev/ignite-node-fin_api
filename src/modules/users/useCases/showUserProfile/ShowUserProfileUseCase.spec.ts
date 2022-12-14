import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { ShowUserProfileError } from "./ShowUserProfileError";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository
let showUserProfileUseCase: ShowUserProfileUseCase

describe('Show User Profile', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUsersRepository)
  })

  it('should be able to show a profile of an user', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'Caique Moreira',
      email: 'caiquemoreiradev@finapi.com.br',
      password: 'admin'
    })

    const userProfile = await showUserProfileUseCase.execute(user.id as string)

    expect(userProfile).toMatchObject(user)
  })

  it('should not be able to show a profile of a non-existing user', async () => {
    await expect(
      showUserProfileUseCase.execute('non-existing-user')
    ).rejects.toBeInstanceOf(ShowUserProfileError)
  })
})