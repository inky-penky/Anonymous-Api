import dotenv from 'dotenv'

dotenv.config()

export const tokenSecret = process.env.TOKEN_SECRET
export const dbURL = process.env.DB_URL
