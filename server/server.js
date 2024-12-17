const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const dotenv = require('dotenv')
dotenv.config()

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGOURI)
    .then(() => {
        console.log('Connection open')
    })
    .catch((err) => console.log(err))

app.use(express.json())
app.use(cors())
const authRouter = require('./routes/auth')
app.use('/api/auth', authRouter)

const userRouter = require('./routes/user')
app.use('/api/user', userRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`)
})