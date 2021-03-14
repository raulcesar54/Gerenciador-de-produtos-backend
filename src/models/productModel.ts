import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import Sku from './skuModel'

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column('decimal')
  qty: number

  @Column()
  size: string

  @Column()
  sku_id: string

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string

  @ManyToOne(type => Sku, products => products.id)
  @JoinColumn({ name: 'sku_id' })
  sku: Sku

}

export default Product
