const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Auth = require('../modals/auth.modal');

exports.adminSignUp = async (req, res) => {
    const { username, email, mobile, password } = req.body;
    try {
        let adminObj = new Auth({ username, email, mobile, password });
        const saveAdmin = await adminObj.save();
        return res.status(201).json({
            status: 'success',
            message: 'admin creation success :)',
            clientID: saveAdmin.email
        });
    } catch (error) {
        return res.status(400).json({
            status: 'failed',
            message: 'failed to creation :(',
            error: error
        });
    }
}

exports.adminLogin = async (req, res) => {

}