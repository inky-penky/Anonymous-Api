import express, { json, urlencoded } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'

import { serverResponse } from './utils'
import apiRoutes from './routes'

const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(helmet())
app.use(json())
app.use(urlencoded())

app.use('/api/v1', apiRoutes)
app.use('/v1', apiRoutes)

app.get('/', (req, res) => {
  serverResponse(res, 'Server works!')
})

app.listen(9090, () => {
  console.log('Server is running on port 9090')
})
