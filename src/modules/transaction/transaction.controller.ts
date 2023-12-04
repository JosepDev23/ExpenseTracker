import { Controller, Get, Param } from '@nestjs/common'
import { TransactionService } from './transaction.service'
import Transaction from './transaction.schema'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('transaction')
@ApiTags('Transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  @ApiOperation({ summary: 'Return all transactions.' })
  @ApiResponse({
    status: 200,
    description: 'Transactions found successfully.',
    type: Transaction,
  })
  async findAll(): Promise<Transaction[]> {
    return this.transactionService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Return a transaction by id.' })
  @ApiResponse({
    status: 200,
    description: 'Transaction found successfully.',
    type: Transaction,
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'Transaction id',
  })
  async findById(@Param('id') id: string): Promise<Transaction> {
    return this.transactionService.findById(id)
  }
}
