const mongoose = require('mongoose');
const nanoid = require('nanoid');

const clientReqSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    mobile: {
        type: String,
        required: [true, 'Mobile number is required']
    },
    subject: {
        type: String,
        required: [true, 'Subject is required']
    },
    message: {
        type: String,
        required: [true, 'Message is required']
    },
    information: {
        type: String,
        default: 'null'
    },
    // clientId: {
    //     type: String,
    //     required: [true, 'ClientId is required. it is auto genid'],
    //     default: () => nanoid(7),
    //     index: { unique: true },
    // },
}, { timestamps: true });

module.exports = mongoose.model('Client', clientReqSchema);