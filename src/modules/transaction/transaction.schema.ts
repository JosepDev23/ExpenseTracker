import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export default class Transaction {
  @Prop()
  name: string

  @Prop()
  ammount: number

  @Prop()
  date: Date

  @Prop()
  description: string
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction)
