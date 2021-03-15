import { NextFunction, Request, Response } from "express"

const authenticate = (request: Request, response: Response, next: NextFunction) => {
  try {
    const { role } = request.user
    if (role.toString() !== '1') {
      throw new Error('sem permissão para acessar esta rota')
    }
    return next()
  } catch (err) {
    response.status(401).json({ error: err.message })
  }
}

export default authenticate
