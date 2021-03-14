import User from '../models/userModel'
import { compare } from 'bcryptjs'
import { getRepository } from 'typeorm'
import { sign } from 'jsonwebtoken'
import authConfig from '../config/auth'
interface IRequest {
  email: string
  password: string
}
interface IResponse {
  user: User,
  token: string
}
class AuthenticateUserService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const users = getRepository(User)

    const user = await users.findOne({ where: { email } })
    if (!user) {
      throw new Error('email ou senha invalido')
    }

    const passwordVerify = user.password && await compare(password, user.password)
    if (!passwordVerify) {
      throw new Error('email ou senha invalido')
    }
    delete user.password

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn
    })
    return { user, token }
  }
}

export default AuthenticateUserService
