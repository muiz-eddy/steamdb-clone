import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'game_details'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('appId').unsigned().notNullable().unique() // Assuming appId is unique and not nullable
      table.string('type', 255).notNullable()
      table.string('name', 255).notNullable()
      table.text('short_description').nullable()
      table.boolean('isFree').notNullable().defaultTo(false)
      table.string('price').nullable() // Assuming price can be null for free games
      table.string('header_image').nullable()
      table.string('thumbnail').nullable()
      table.string('thumbnail2').nullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
