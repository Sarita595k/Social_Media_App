// comment repository starts here 
const { getDatabase } = require('../../config/mongodb')
const { BSON } = require("mongodb")
const db = getDatabase()

// to fetch all db comments 
const getCommentRepo = async () => {
    try {
        return await db.collection("comments").find().toArray()
    } catch (err) {
        console.log(`error in getting all comments:, ${err}`)
    }
}

// to add new comment
const addCommentRepo = async (postId, comment) => {
    try {
        const _id = new BSON.ObjectId(postId)
        const result = await db.collection("comments").insertOne({ _id, comment })
        return result
    } catch (err) {
        console.log(`error in adding comment ${err}`)
    }
}

// to check id exist or not
const checkIdExist = async (postId) => {
    try {
        const _id = new BSON.ObjectId(postId)
        const result = await db.collection("posts").findOne({ _id })
        return result
    } catch (err) {
        console.log("no id exists")
    }
}
// to update an existing comment 
const updateCommentRepo = async (postId, newComment) => {
    try {
        const _id = new BSON.ObjectId(postId)
        const result = await db.collection("comments").updateOne({ _id }, { $set: { comment: newComment } })
        return result
    } catch (err) {
        console.log("Error to update the comment", err)
    }
}
// check if the post id exist or not 
// to delete the comment 
const deleteCommentRepo = async (postId) => {
    try {
        const _id = new BSON.ObjectId(postId)
        return await db.collection("comments").drop({ _id })
    } catch (err) {
        console.log("error in delete repo")
    }
}
module.exports = { getCommentRepo, addCommentRepo, checkIdExist, updateCommentRepo, deleteCommentRepo }