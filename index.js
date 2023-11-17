import express from 'express'
import useRouter from './routes/user.js';
import taskRouter from './routes/task.js'
import {config} from 'dotenv'
import cookieParser from "cookie-parser";
import { errorMiddleware } from './middlewares/error.js';
import cors from 'cors'
export const app = express();


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FRONT_END_URL],
    methods:["GET","PUT", 'POST', "DELETE"],
    credentials: true
}))

config({
    path: './data/config.env'
})

app.use("/api/v1/users", useRouter)
app.use("/api/v1/tasks", taskRouter)
app.get('/', (req, res)=>{
    res.send("Working")
})

// using error middleware
app.use(errorMiddleware)
