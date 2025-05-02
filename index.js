const express = require("express")
const app = express()
const { connectToDb } = require('./src/config/mongodb')
const userRoutes = require('./src/modules/user/user.route')
const postRoutes = require('./src/modules/post/post.route')
const commentsRoutes = require('./src/modules/comment/comment.routes')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentsRoutes)

app.get("/", (req, res) => {
    res.send("hii server")
})

// app.get("/test", async (req, res) => {
//     try {
//         const db = await connectToDb()
//         db.collection("student").insertOne({ name: "radha" })
//         res.json("Data added successfullly")
//     } catch (err) {
//         res.send(`error in db ,${err}`)
//     }
// })
app.listen(3000, () => {
    connectToDb()
    console.log("server is running")
})