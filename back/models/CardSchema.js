const { timeStamp } = require('console');
const { mongoose } = require('mongoose');

const cardSchema = new mongoose.Schema({
    username: {
        type: String
    },
    title: {
        type: String,
        required: [true, 'title is required']
    },
    description: {
        type: String
    },
    status: {
        type: Number,
        required: [true, 'a status is required']
    }
}, 
{ timestamps: true });

const Card = mongoose.model('Card', cardSchema);
module.exports = Card;