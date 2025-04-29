const { BSON } = require('bson')
const { getDatabase } = require("../../config/mongodb")

const db = getDatabase()
const getAllPost = async () => {
    try {
        return await db.collection('posts').find().toArray()
    } catch (err) {
        console.log(`error in fetching posts ${err}`)
    }
}

const getPostById = async (postId) => {
    try {
        const id = new BSON.ObjectId(postId)
        // console.log('aync is', id)
        const post = await db.collection("posts").findOne(id)
        // console.log(post)
        return post
    } catch (err) {
        console.log("no post id found")
    }
}
const createPost = async (newPost) => {
    try {
        const postIs = await db.collection('posts').insertOne(newPost)
        return postIs
    } catch (err) {
        console.log(`error in creating post ${err}`)
    }
}

const updatePost = async (postId, updatedPost) => {
    try {
        const _id = new BSON.ObjectId(postId)
        await db.collection("posts").updateOne({ _id }, { $set: updatedPost })
    } catch (err) {
        console.log(`error in updating post ${err}`)
    }
}

const deletePost = async (postId) => {
    try {
        const _id = new BSON.ObjectId(postId)
        await db.collection("posts").deleteOne({ _id })
    } catch (err) {
        console.log("error", err)
    }
}
module.exports = { getAllPost, getPostById, createPost, updatePost, deletePost }