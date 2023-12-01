import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export default class User {
  @Prop()
  username: string

  @Prop()
  password: string

  @Prop()
  phoneNumber: number

  @Prop()
  currency: number
}

export const UserSchema = SchemaFactory.createForClass(User)
