const { connectDb } = require("../../db/connection")

let GetDashboard = async (req, res) => {
    try {
        let db = await connectDb()
        let userCollection = db.collection("users")
        let categoriesCollection = db.collection("service_categories")
        let serviceCollection = db.collection("services")
        let bookingCollection = db.collection("bookings")
        let paymentsCollection = db.collection("payments")
        let inquiriesCollection = db.collection("general_inquiries")

        let totalUsers = await userCollection.countDocuments()
        let totalCategories = await categoriesCollection.countDocuments()
        let totalServices = await serviceCollection.countDocuments()
        let totalBookings = await bookingCollection.countDocuments()
        let openInquiries = await inquiriesCollection.countDocuments({
            closed_at: { $exists: false }
        })

        let recentBookings = await bookingCollection.find({}).sort({ _id: -1 }).limit(5).toArray();
        let recentPayments = await paymentsCollection.find({}).sort({ _id: -1 }).limit(5).toArray();
        let recentInquiries = await inquiriesCollection.find({}).sort({ _id: -1 }).limit(5).toArray();

        let revenue = await paymentsCollection.aggregate([
            { $match: { payment_status: "Paid" } },
            { $group: { _id: null, totalRevenue: { $sum: { $toDouble: "$amount" } } } }
        ]).toArray();
        let totalRevenue = revenue.length > 0 ? revenue[0].totalRevenue : 0;

        return res.status(200).send({ success: true, totalUsers, totalCategories, totalServices, totalBookings, totalRevenue, openInquiries, recentBookings, recentPayments, recentInquiries })
    } catch (e) {
        console.log(e)
        return res.status(500).send({ success: false, message: "Internal server error." })
    }
}

module.exports = { GetDashboard }