const { MongoClient } = require("mongodb")
const MONGODB_URL = "mongodb://127.0.0.1:27017"
const client = new MongoClient(MONGODB_URL)
const dbName = "day1db"

const connectToDb = async () => {
    try {
        await client.connect()
        console.log("db connected successfully")
    } catch (err) {
        console.log("error is", err)
    }
}

const getDatabase = () => {
    const db = client.db(dbName)
    return db
}

module.exports = {
    connectToDb, getDatabase
}