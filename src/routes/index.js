import { Router } from 'express'
import { serverResponse } from '../utils'
const router = Router()

router.get('/', (req, res) => {
  serverResponse(res, 'API works!')
})

export default router
