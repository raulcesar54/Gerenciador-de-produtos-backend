import { Request, Response, Router } from 'express'
import ProductRepository from '../repositories/productsRepositories'
import CreateProductService from '../services/createProductService'
import DeleteProductService from '../services/deleteProductService'
import { getCustomRepository } from 'typeorm'
import authenticateMiddleware from '../middlewares/Authenticate'
import adminRoleMiddleware from '../middlewares/AdminRole'

const productsRouter = Router()

productsRouter.use(authenticateMiddleware)
productsRouter.use(adminRoleMiddleware)

productsRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { name, qty, size, sku_id } = request.body
    const createProduct = new CreateProductService()
    const product = await createProduct.execute({ name, qty, size, sku_id })

    return response.json(product)

  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

productsRouter.get('/', async (request, response) => {
  const productRepository = getCustomRepository(ProductRepository)
  const products = await productRepository.find({ relations: ['sku'] })
  return response.json(products)
})

productsRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const product = new DeleteProductService()
    const products = await product.execute({ id })
    return response.json(products)

  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})
export default productsRouter
