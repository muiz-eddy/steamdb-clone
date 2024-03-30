import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class GameDetail extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'appId' })
  declare appId: number

  @column()
  declare type: string

  @column()
  declare name: string

  @column()
  declare short_description: string

  @column({ columnName: 'isFree' })
  declare isFree: boolean

  @column()
  declare price: string

  @column()
  declare header_image: string

  @column()
  declare thumbnail: string

  @column({ columnName: 'thumbnail2' })
  declare thumbnail2: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
