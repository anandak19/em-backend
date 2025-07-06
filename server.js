import {app} from './app.js'
import {connectDB} from './config/db.js'

import 'dotenv'

connectDB()
 
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Live at: https://localhost:${PORT}`)
})