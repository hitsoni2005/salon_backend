const { MongoClient } = require("mongodb")
require("dotenv").config();
let url = process.env.MONGODB_URL;
const client = new MongoClient(url)

let db;

const connectDb = async () => {
    try {
        if (!db) {
            await client.connect();
            db = client.db("salon_platform");
            console.log("Db Connected.")
        }
        return db;

    } catch (error) {
        console.log(error)
    }
}

module.exports = { connectDb }