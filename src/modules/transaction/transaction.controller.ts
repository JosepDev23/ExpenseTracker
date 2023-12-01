import { Controller } from '@nestjs/common'
import { TransactionService } from './transaction.service'
import Transaction from './transaction.schema'

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  async getAllTransactions(): Promise<Transaction[]> {
    return this.transactionService.findAll()
  }

  async getTransactionById(id: string): Promise<Transaction> {
    return this.transactionService.findById(id)
  }
}
