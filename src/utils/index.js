/* eslint-disable default-param-last */
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { tokenSecret } from './config'

export const createToken = (data) => {
  return jwt.sign(data, tokenSecret, {
    expiresIn: '3days'
  })
}

export const decodeToken = (token) => {
  jwt.verify(token, tokenSecret, function (err, decoded) {
    if (err) throw Error(err) // bar
    return decoded
  })
}

export const serverResponse = (res, data, status = 200, err) => {
  if (err) console.error(err)

  if (status >= 400) {
    res.status(status).send(data)
  } else {
    res.status(status).json(data)
  }
}

export const hashPassword = (pswd) => bcrypt.hashSync(pswd, 2)

export const checkPassword = (pswd, hash) => bcrypt.compareSync(pswd, hash)
