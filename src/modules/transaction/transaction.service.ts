import { Injectable } from '@nestjs/common'
import Transaction from './transaction.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel('Transaction') private TransactionModel: Model<Transaction>,
  ) {}

  async findAll(): Promise<Transaction[]> {
    return this.TransactionModel.find().exec()
  }

  async findById(id: string): Promise<Transaction> {
    return this.TransactionModel.findById(id).exec()
  }

  async findByUserId(userId: string): Promise<Transaction[]> {
    return this.TransactionModel.find({ userId }).exec()
  }

  async create(transaction: Transaction): Promise<Transaction> {
    return this.TransactionModel.create(transaction)
  }
}
