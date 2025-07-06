import express from 'express'
import authRoutes from './routes/auth.routes.js'
import errorHandler from './middlewares/errorHandler.js'
import userRoutes from './routes/user.routes.js'
import adminRoutes from './routes/admin.routes.js'

export const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/admin", adminRoutes)

app.use(errorHandler)
