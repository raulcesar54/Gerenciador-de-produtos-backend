import { Request, Response, Router } from 'express'
import { getRepository } from 'typeorm'
import Sku from '../models/skuModel'
import CreateSkuService from '../services/createSkuService'
import authenticateMiddleware from '../middlewares/Authenticate'
import adminRoleMiddleware from '../middlewares/AdminRole'
const usersRouter = Router()
usersRouter.use(authenticateMiddleware)
usersRouter.use(adminRoleMiddleware)

usersRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { name } = request.body
    const createSku = new CreateSkuService()
    const user = await createSku.execute({ name })

    return response.json(user)
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})
usersRouter.get('/', async (request: Request, response: Response) => {
  try {
    const skuRepository = getRepository(Sku)
    const sku = await skuRepository.find({ relations: ['products'] })
    return response.json(sku)
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

export default usersRouter
