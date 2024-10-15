const Client = require('../modals/client-req.modal');
const sendEmail = require('../shared/mail.service');
const sendTelegramNotification = require('../shared/telegram.service');


exports.sendClientRequest = async (req, res, next) => {
    const { username, email, mobile, subject, message } = req.body;
    try {
        const clientReqObj = new Client({ username, email, mobile, subject, message });
        const sendClientReq = await clientReqObj.save();

        console.log(req.body);


        // Call the email function and Telegram notification function
        // sendEmail({ username, email, mobile, subject, message });
        sendTelegramNotification({ username, email, mobile, subject, message });

        return res.status(201).json({
            status: 'success',
            message: 'Request has been successfully send :)',
            clientid: sendClientReq.clientId
        });
    } catch (error) {
        console.log(error);

        return res.status(400).json({
            status: 'failed',
            message: 'failed to creation :(',
            error: error
        });
    }

}

exports.getClientReq = async (req, res) => {
    try {
        const UserReqs = await Client.find();
        return res.status(200).json({
            status: 'success',
            data: UserReqs
        });
    } catch (error) {
        console.log(error);

        return res.status(400).json({
            status: 'failed',
            data: [],
            error: error
        });
    }

}