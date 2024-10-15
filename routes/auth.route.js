const express = require('express')
const { adminSignUp, adminLogin } = require('../controller/auth.controller');

const router = express.Router();

router.post('/signup', adminSignUp);
router.post('login', adminLogin);

module.exports = router;
