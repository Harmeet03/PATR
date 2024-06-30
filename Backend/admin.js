const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },

        name: {
            type: String,
            required: true
        }, 

        username: {
            type: String,
            required: true,
            unique: true
        }
    }, 

    {
        timestamps: true
    }
);

const admin = mongoose.model('Admin_Detail', adminSchema);
module.exports = admin;