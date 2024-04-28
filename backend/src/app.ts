import express from 'express'
import { UserRoutes } from './http/controllers/user/routes'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/api/v1", UserRoutes)

app.get('/', (req, res) => {
    res.send("Home, hello")
})

export { app }