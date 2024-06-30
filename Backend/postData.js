const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
    {
        options: {
            type: String,
            required: true
        },

        heading: {
            type: String,
            required: true
        },

        content: {
            type: String,
            required: true
        }, 

        username: {
            type: String,
            required: true
        }
    }, 

    {
        timestamps: true
    }
);

const post = mongoose.model('Post_Detail', postSchema);
module.exports = post;