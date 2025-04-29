const { getDatabase } = require("../../config/mongodb")

const db = getDatabase()
const createUser = async (newUser) => {
    try {
        await db.collection("student").insertOne(newUser)
    } catch (err) {
        console.log("error")
    }
}

const checkUserEmail = async (email) => {
    try {
        const result = await db.collection('student').findOne({ email })
        return result
    } catch (err) {
        console.log(`error in checkuser ${err}`)
    }
}

module.exports = { createUser, checkUserEmail }