import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserError } from "./CreateUserError"
import { CreateUserUseCase } from "./CreateUserUseCase"

let inMemoryUsersRepository: InMemoryUsersRepository
let createUsersUseCase: CreateUserUseCase

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    createUsersUseCase = new CreateUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to create a new user', async () => {
    const user = await createUsersUseCase.execute({
      name: 'Caique Moreira',
      email: 'caiquemoreiradev@finapi.com.br',
      password: 'admin'
    })

    expect(user).toHaveProperty('id');
  })

  it('should not be able to create a user with an email from another', async () => {
    await createUsersUseCase.execute({
      name: 'Caique Moreira',
      email: 'caiquemoreiradev@finapi.com.br',
      password: 'admin'
    })

    await expect(
      createUsersUseCase.execute({
        name: 'Another Caique Moreira',
        email: 'caiquemoreiradev@finapi.com.br',
        password: 'admin'
      })
    ).rejects.toBeInstanceOf(CreateUserError)
  })
})