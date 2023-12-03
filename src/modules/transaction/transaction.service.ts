import { Injectable } from '@nestjs/common'
import Transaction from './transaction.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel('transaction') private TransactionModel: Model<Transaction>,
  ) {}

  async findAll(): Promise<Transaction[]> {
    return this.TransactionModel.find()
  }

  async findById(id: string): Promise<Transaction> {
    return this.TransactionModel.findById(id)
  }
}
