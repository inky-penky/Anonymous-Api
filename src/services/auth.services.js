import Anon from '../models'

import { createToken, serverResponse } from '../utils'

export const signup = async (req, res) => {
  try {
    const anonExist = await Anon.countDocuments({ username: req.body.username })

    if (anonExist) return serverResponse(res, 'Username has been taken', 409)

    const newAnon = await new Anon(req.body).save()

    const token = createToken({
      username: newAnon.username,
      id: newAnon._id
    })

    serverResponse(res, {
      message: 'Signup successful. Start receiving messages!',
      payload: {
        token
      }
    })
  } catch (err) {
    serverResponse(res, 'internal server error', 500, err)
  }
}
