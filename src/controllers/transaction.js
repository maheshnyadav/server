import Transactions from '../models/transaction.js'
import Accounts from '../models/account.js'

export const transfer = async (req, res) => {
  try {
    const { fromAccountId, toAccountId, amount } = req.body

    /** GET RESPECTIVE ACCOUNT DATA */
    const fromAccount = await Accounts.findOne({
      accountNumber: fromAccountId,
    })
    const toAccount = await Accounts.findOne({
      accountNumber: toAccountId,
    })

    /** CHECK USER ACCOUNT VALIDATIONS */
    if (!fromAccount || !toAccount) {
      return res.status(200).json({ msg: 'User account does not exist!' })
    }

    if (fromAccount.userId.equals(toAccount.userId)) {
      return res
        .status(200)
        .json({ msg: 'Cannot make transaction within same user accounts!' })
    }

    if (!(fromAccount.balance >= amount)) {
      return res.status(200).json({ msg: 'Insufficient balance!' })
    }

    if (
      toAccount.accountType === 0 &&
      toAccount.balance + amount > process.env.BSA_THRESHOLD
    ) {
      return res.status(200).json({ msg: 'Account balance limit exceeded!' })
    }

    /** CREATE TRANSACTIONS & UPDATE ACCOUNTS */
    let fromAccountBalance = fromAccount.balance - amount
    let toAccountBalance = toAccount.balance + amount

    await Accounts.updateOne(
      {
        accountNumber: fromAccountId,
      },
      {
        $set: { balance: fromAccountBalance },
      }
    )

    await Accounts.updateOne(
      {
        accountNumber: toAccountId,
      },
      {
        $set: { balance: toAccountBalance },
      }
    )

    const transaction = await Transactions.create({
      fromAccountId,
      toAccountId,
      amount,
    })

    /** GET DESTINATION TOTAL */
    const totalDestBalance = await Accounts.aggregate([
      {
        $match: { userId: toAccount.userId },
      },
      {
        $group: {
          _id: null,
          totalBalance: { $sum: '$balance' },
        },
      },
    ])

    return res.status(200).json({
      newSrcBalance: fromAccountBalance,
      totalDestBalance: totalDestBalance[0].totalBalance,
      transferedAt: transaction.created_date,
    })
  } catch (error) {
    res.status(500).json({ err: error })
  }
}
