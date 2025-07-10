import express from 'express'
import authRoutes from './routes/auth.routes.js'
import errorHandler from './middlewares/errorHandler.js'
import userRoutes from './routes/user.routes.js'
import adminRoutes from './routes/admin.routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

export const app = express()

app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}))
app.use('/uploads', express.static('uploads'));
app.use(express.json({limit: '10mb'}))
app.use(express.urlencoded({extended: true, limit: '10mb'}))

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/admin", adminRoutes)
 
app.use(errorHandler)
