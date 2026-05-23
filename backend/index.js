import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import emailRoutes from "./routes/emailRoute.js"
dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

//Middleware

app.use(cors())
app.use(express.json())

connectDB()


app.get("/",(req,res)=>{
    res.send("AI Mail Generator Backend is Running")
})

app.use('/api/auth',authRoutes)
app.use('/api/emails',emailRoutes)


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})