import { Controller, Get } from '@nestjs/common'
import { TransactionService } from './transaction.service'
import Transaction from './transaction.schema'

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async findAll(): Promise<Transaction[]> {
    return this.transactionService.findAll()
  }

  @Get()
  async findById(id: string): Promise<Transaction> {
    return this.transactionService.findById(id)
  }
}
