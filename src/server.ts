import express from 'express'
import './database/connection'
import routes from './routes'
import path from 'path'
import cors from 'cors'
import 'express-async-errors'
import { errorHandler } from './errors/errorHandler'


const app = express()
const porta = 3333
app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandler)
app.listen(porta, () => console.log(`http://localhost:${porta}`))

// npm i @types/express
// npm i typescript -D
// tsc --init
// npm i ts-node-dev -D
// npm i typeorm sqlite3

//  npm install typeorm -g
// typeorm migration:create -n create_orphanages
// npm install @types/multer
// npm i yup