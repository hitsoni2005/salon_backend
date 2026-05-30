const { ObjectId } = require("mongodb");
const { connectDb } = require("../../db/connection")

let UpdateProfile = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = db.collection("users")
        let { full_name, mobile_no, city, profile_image } = req.body;
        if (!req.user.id) {
            return res.status(400).send({ success: false, message: "Unauthorized Access." })
        }
        let updateData = { updated_at: new Date() }

        if (full_name) {
            updateData.full_name = full_name;
        }

        if (mobile_no) {
            updateData.mobile_no = mobile_no;
        }

        if (city) {
            updateData.city = city;
        }

        if (req.file) {
            updateData.profile_image = `/uploads/profiles/${req.file.filename}`
        }

        let updateProfile = await collection.updateOne({ _id: ObjectId.createFromHexString(req.user.id) },
            { $set: updateData })

        if (updateProfile.matchedCount === 0) {
            return res.status(400).send({ success: false, message: "User Not Found." })
        }
        return res.status(200).send({ success: true, message: "Profile Updated Succesfully." })

    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: "Internal Server error." })
    }
}

module.exports = { UpdateProfile }