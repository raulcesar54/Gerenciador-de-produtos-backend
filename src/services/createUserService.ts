import User from '../models/userModel'
import { hash } from 'bcryptjs'
import { getRepository } from 'typeorm'
interface IRequest {
  name: string
  email: string
  password: string
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userRepository = getRepository(User)
    const checkUserExist = await userRepository.findOne({ where: { email } })
    if (checkUserExist) {
      throw new Error('email já cadastrado no sistema')
    }
    const hashPassword = await hash(password, 8)
    const user = userRepository.create({ email, name, password:hashPassword })
    await userRepository.save(user)
    return user
  }
}
export default CreateUserService
