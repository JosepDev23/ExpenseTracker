import { Injectable } from '@nestjs/common'
import User from './user.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private UserModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.UserModel.find()
  }

  async findById(id: string): Promise<User> {
    return this.UserModel.findById(id)
  }
}
