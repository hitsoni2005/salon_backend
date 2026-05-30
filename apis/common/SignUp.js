const { connectDb } = require("../../db/connection")

let SignUp = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = db.collection("users")
        let { full_name, email, password, mobile_no, city } = req.body;

        if (!full_name || !email || !password || !mobile_no || !city) {
            return res.status(400).send({ success: false, message: "All fileds are required" })
        }

        let userExist = await collection.findOne({ $or: [{ email }, { mobile_no }] })

        if (userExist) {
            return res.status(400).send({ success: false, message: "User Already Exists" })
        }

        let userData = {
            full_name,
            email,
            password,
            mobile_no,
            city,
            profile_image: "",
            role: "User",
            status: "Active",
            added_at: new Date()
        }

        let insertData = collection.insertOne(userData);

        if ((await insertData).acknowledged) {
            return res.status(201).send({
                success: true,
                message: "Signups successfully",
            })
        }
    }
    catch (e) {
        return res.status(400).send({
            success: false,
            message: "Internal server error",
        })
    }
}

module.exports = { SignUp }