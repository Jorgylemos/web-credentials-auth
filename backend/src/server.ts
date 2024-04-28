
import http from 'http'
import { app } from './app'

const PORT = process.env.PORT || 4000

const server = http.createServer(app)

server.listen(PORT, () => {
    try {
        console.log(`Listening at port ${PORT} 🟢.`)
    } catch (err) {
        throw new Error(`Have an error: ${err} 🔴.`)
    }
})