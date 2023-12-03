import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'

@Schema()
export default class Transaction {
  @Prop()
  @ApiProperty()
  name: string

  @Prop()
  @ApiProperty()
  ammount: number

  @Prop()
  @ApiProperty()
  date: Date

  @Prop()
  @ApiProperty()
  description: string
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction)
