import { Router } from 'express'
import { signupPolicy } from '../policies'
import { signup } from '../services/auth.services'
import { serverResponse } from '../utils'
const router = Router()

router.post('/signup', signupPolicy, signup)

router.get('/', (req, res) => {
  serverResponse(res, 'API works!')
})

export default router
