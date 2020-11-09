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
      message: 'Signup successful. Start receiving anonymous messages!',
      payload: {
        token
      }
    })
  } catch (err) {
    serverResponse(res, 'internal server error', 500, err)
  }
}

export const login = async (req, res) => {
  try {
    const anon = await Anon.findOne({
      username: req.body.username
    })

    if (!anon) return serverResponse(res, 'incorrect login credentials', 400)

    const token = createToken({
      username: anon.username,
      id: anon._id
    })
    serverResponse(res, {
      message: 'Login successful. Start receiving anonymous messages!',
      payload: {
        token
      }
    })
  } catch (error) {
    serverResponse(res, 'internal server error', 500, error)
  }
}

export const message = async (req, res) => {
  const { username } = req.params
  if (!username) {
    serverResponse(res, '"username" must be passed via query', 400, 'no username!')
  }

  try {
    const anon = await Anon.findOne({ username })
    if (!anon) return serverResponse(res, `Anon "${username}" not found`, 404)

    anon.messages.push({ text: req.body.message })
    await anon.save()

    serverResponse(res, 'success👍', 201)
  } catch (err) {
    serverResponse(res, 'internal server error', 500, err)
  }
}
