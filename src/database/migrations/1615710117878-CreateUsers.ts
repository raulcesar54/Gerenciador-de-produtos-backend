import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1615710117878 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table(
        {
          name: 'users',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()'
            },
            {
              name: 'name',
              type: 'varchar',
            },
            {
              name: 'password',
              type: 'varchar',
              isUnique: true
            },
            {
              name: 'email',
              type: 'varchar',
            },
            {
              name: 'role',
              type: 'int',
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default:'now()'
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default:'now()'
            },
          ]
        }
      )
    )
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')

  }

}
