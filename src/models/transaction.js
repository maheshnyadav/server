import mongoose from 'mongoose'

const transactionSchema = mongoose.Schema({
  fromAccountId: Number,
  toAccountId: Number,
  amount: Number,
  created_date: { type: Date, default: new Date() },
})

const Transaction = mongoose.model('Transaction', transactionSchema)

export default Transaction
