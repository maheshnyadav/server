import mongoose from 'mongoose'

const accountSchema = mongoose.Schema(
  {
    accountNumber: {
      type: Number,
      unique: true,
    },
    accountType: {
      type: Number,
      enum: [0, 1, 2],
      default: 0,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    balance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

const Account = mongoose.model('Account', accountSchema)

export default Account
