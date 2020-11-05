import express, { json } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'

import { serverResponse } from './utils'
import apiRoutes from './routes'
import { dbURL } from './utils/config'

const app = express()

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', err => console.error(err))
db.once('open', () => console.log('DB connection successful!'))

app.use(morgan('dev'))
app.use(cors())
app.use(helmet())
app.use(json())

app.use('/api/v1', apiRoutes)
app.use('/v1', apiRoutes)

app.get('/', (req, res) => {
  serverResponse(res, 'Server works!')
})

app.listen(9090, () => {
  console.log('Server is running on port 9090')
})
