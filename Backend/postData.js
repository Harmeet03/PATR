const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
            required: true
        },

        username: {
            type: String,
            required: true
        }  
    },
    
    {
        _id: false
    }
);

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

        comments: [commentSchema],

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