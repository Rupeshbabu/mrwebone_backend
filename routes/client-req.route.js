const express = require('express');
const { sendClientRequest, getClientReq } = require('../controller/client-req.controller');

const router = express.Router();

router.route('/').post(sendClientRequest).get(getClientReq);


module.exports = router;
