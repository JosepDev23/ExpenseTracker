import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

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
  @ApiPropertyOptional()
  description: string

  @Prop({ index: true })
  @ApiProperty()
  userId: string
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction)
