import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { TransactionService } from './transaction.service'
import Transaction from './transaction.schema'
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'

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

  @Get(':userId')
  @ApiOperation({ summary: 'Return an array of transactions by its userId' })
  @ApiResponse({
    status: 200,
    description: 'Transactions found successfully.',
    type: Transaction,
  })
  @ApiParam({
    name: 'userId',
    required: true,
    type: String,
    description: 'user id',
  })
  async findByUserId(@Param('userId') userId: string): Promise<Transaction[]> {
    return this.transactionService.findByUserId(userId)
  }

  @Post()
  @ApiOperation({ summary: 'creates a transaction' })
  @ApiResponse({
    status: 201,
    description: 'Transaction created successfully',
    type: Transaction,
  })
  @ApiBody({ type: Transaction })
  async post(@Body() transaction: Transaction): Promise<Transaction> {
    return this.transactionService.create(transaction)
  }
}
