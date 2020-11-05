import express from 'express'
import { serverResponse } from './utils'

import apiRoutes from './routes'

const app = express()

app.use('/api/v1', apiRoutes)
app.use('/v1', apiRoutes)

app.get('/', (req, res) => {
  serverResponse(res, 'Server works!')
})

app.listen(9090, () => {
  console.log('Server is running on port 9090')
})
