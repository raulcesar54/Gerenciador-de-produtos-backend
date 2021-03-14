import Product from '../models/productModel'
import ProductRepository from '../repositories/productsRepositories'
import { getCustomRepository } from 'typeorm'
interface IRequest {
  name: string
  qty: number
  size: string
  sku_id: string
}
class CreateProductService {
  public async execute({ name, qty, size, sku_id }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository)

    const findProductByName = await productRepository.findByNameSku(name, sku_id)
    if (findProductByName) {
      throw Error('Nome do produto já existe neste grupo de sku')
    }

    const product = productRepository.create({ name, qty, size, sku_id })
    await productRepository.save(product)

    return product
  }
}

export default CreateProductService
