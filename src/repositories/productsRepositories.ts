import Product from '../models/productModel'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
  public async findByNameSku(name: string, sku_id: string): Promise<Product | null> {
    const findProduct = await this.findOne({ where: { name: name, sku_id: sku_id } })
    return findProduct || null
  }
}

export default ProductRepository
