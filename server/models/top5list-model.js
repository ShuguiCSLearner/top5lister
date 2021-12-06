const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        ownerEmail: { type: String, required: true },
        ownerName: {type: String, required: true},
        view: {type: Number, required: true },
        like: {type: Number, required: true },
        likeList: {type: [String], required: true},
        dislike: {type: Number, required: true },
        dislikeList: {type: [String], required: true},
        comments: { type: [String], required: true },
        isCommunity: { type: Boolean, required: true},
        hasPublished: {type: Boolean, required: true},
        publishDate: {type: Date, required: false},
        publishDateFormat: {type: String, required: false}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
