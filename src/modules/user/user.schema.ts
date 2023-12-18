import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

@Schema()
export default class User {
  @Prop()
  @ApiProperty()
  username: string

  @Prop()
  @ApiProperty()
  password: string

  @Prop()
  @ApiProperty()
  phoneNumber: number

  @Prop()
  @ApiPropertyOptional()
  currency: number
}

export const UserSchema = SchemaFactory.createForClass(User)
