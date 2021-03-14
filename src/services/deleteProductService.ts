import Product from '../models/productModel'
import ProductRepository from '../repositories/productsRepositories'
import { getCustomRepository } from 'typeorm'
interface IRequest {
  id: string
}
class CreateProductService {
  public async execute({ id }: IRequest): Promise<Product[]> {
    console.log(id)
    const productRepository = getCustomRepository(ProductRepository)

    const findProductByName = await productRepository.findOne({ where: { id } })
    if (!findProductByName) {
      throw Error('id do produto não existe')
    }

    const product = await productRepository.delete(id)
    const products = await productRepository.find()
    return products
  }
}

export default CreateProductService
