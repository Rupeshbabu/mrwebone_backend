const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    mobile: {
        type: String,
        required: [true, 'Mobile is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'superadmin'],
        default: 'admin'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });


authSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = mongoose.model('Auth', authSchema);