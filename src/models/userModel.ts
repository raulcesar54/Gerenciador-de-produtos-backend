import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column('int')
  role: number

  @Column('decimal')
  password?: string

  @Column()
  email: string

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string
}

export default User
