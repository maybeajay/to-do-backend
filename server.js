import {app} from './index.js';
import {connectDb} from './data/database.js'
connectDb()
app.listen(process.env.PORT,()=>{
    console.log(`server started at ${process.env.PORT} at ${process.env.NODE_ENV} mode`)
})