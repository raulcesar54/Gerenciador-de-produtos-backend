import { NextFunction, Request, Response } from "express"
import { verify, decode } from 'jsonwebtoken'
import authConfig from '../config/auth'

interface IPayload {
  iat: number
  exp: number
  sub: string
}

const authenticate = (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization
  if (!authHeader) {
    throw new Error('JWT token não foi enviado')
  }
  const [, token] = authHeader.split(' ')
  try {
    const checkTokenDecoded = verify(token, authConfig.jwt.secret)
    const { sub } = checkTokenDecoded as IPayload
    const { id, role } = JSON.parse(sub)
    request.user = {
      id: id,
      role: role
    }
    return next()
  } catch (err) {
    response.status(401).json({ error: err.message })
  }
}

export default authenticate
