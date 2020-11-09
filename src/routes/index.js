import { Router } from 'express'
import { signupPolicy, loginPolicy, messagePolicy } from '../policies'
import { signup, login, message } from '../services/auth.services'
import { serverResponse } from '../utils'
const router = Router()

router.post('/signup', signupPolicy, signup)

router.post('/login', loginPolicy, login)

router.post('/:username', messagePolicy, message)

router.get('/', (req, res) => {
  serverResponse(res, 'API works!')
})

export default router
