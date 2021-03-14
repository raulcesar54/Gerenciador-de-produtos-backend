import Sku from '../models/skuModel'
import { getRepository } from 'typeorm'
interface IRequest {
  name: string

}

class CreateSkuService {
  public async execute({ name }: IRequest): Promise<Sku> {
    const skuRepository = getRepository(Sku)
    const checkSkuNameExist = await skuRepository.findOne({ where: { name: name } })
    if (checkSkuNameExist) {
      throw new Error('sku já cadastrado no sistema')
    }
    const user = skuRepository.create({ name })
    await skuRepository.save(user)
    return user
  }
}
export default CreateSkuService
