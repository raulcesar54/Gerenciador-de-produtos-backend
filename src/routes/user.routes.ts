import { Request, Response, Router } from 'express'
import CreateUserService from '../services/CreateUserService'
const usersRouter = Router()

usersRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { name, email, password, role } = request.body
    const createUser = new CreateUserService()
    const user = await createUser.execute({ name, email, password, role })
    delete user.password
    return response.json(user)
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

export default usersRouter
