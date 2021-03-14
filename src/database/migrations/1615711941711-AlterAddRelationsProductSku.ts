import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AlterAddRelationsProductSku1615711941711 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey('products', new TableForeignKey({
      name: "products_sku",
      columnNames: ['sku_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'sku',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('products', 'products_sku')
  }

}
