const express =require("express")
const app=express()
const cors=require("cors")
const userRoutes=require("./routes/userRoutes")
const typeRoutes=require("./routes/typeRoutes")
const dotenv=require("dotenv")
const connectDb=require("./config/db")
const port = process.env.PORT || 3000;
dotenv.config();
app.use(cors())

app.use(express.json()); // Add this line before your routes

connectDb()
app.use('/api/users',userRoutes)
app.use('/api/tests',typeRoutes)
app.get("/", (req, res) => res.status(200).send("server is running!"));
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
