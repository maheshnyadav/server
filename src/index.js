import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// import authRoutes from './routes/auth.js'
import transactionRoutes from './routes/transaction.js'

const app = express()

/** CONFIGURATION */
dotenv.config()
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))

/** ROUTER */
// app.use('/auth', authRoutes)
app.use('/transactions', transactionRoutes)
app.all('*', (req, res) => {
  res.status(404).json({ err: 'Page not found' })
})

const PORT = process.env.PORT || 4000

/** DB SETUP */
mongoose.set('strictQuery', false)
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`${PORT} up and running. DB connected.`))
  })
  .catch((error) => {
    console.log(error)
  })
