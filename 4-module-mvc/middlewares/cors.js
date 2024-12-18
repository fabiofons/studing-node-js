import cors from 'cors'

const ACCEPTED_URL = ['http://localhost:8080', 'http:localhost:1234']

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_URL } = {}) => cors({
  origin: (origin, callback) => {
    if (acceptedOrigins.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    callback(new Error('Not allowed by CORS'))
  }
})
