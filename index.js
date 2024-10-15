const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmat = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const hpp = require('hpp');

const authRoutes = require('./routes/auth.route');
const clientReqRoutes = require('./routes/client-req.route');

const app = express();
dotenv.config({ path: './config.env' });

//CORS
app.use(cors());

//Set Security HTTP Headers
app.use(helmat());

//Limita requests from same API Call
const limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, Please try again in an hour!'
});

app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xssClean());

// Prevent parameter pollution
app.use(hpp());

//START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

const DB = process.env.DATABASE_LOCAL;
const cloudDB = `mongodb+srv://${process.env.DATABASE}:${process.env.DATABASE_PASSWORD}@mrwebone.7hbal.mongodb.net/`;
const updateDB = `mongodb+srv://${process.env.DATABASE}:${process.env.DATABASE_PASSWORD}@mrwebone.7hbal.mongodb.net?retryWrites=true&w=majority`

mongoose
    .connect(updateDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ssl: true,
        tls: true,
        tlsInsecure: false,
    })
    .then(() => {
        console.log('DB Connection Successfully!');
    });

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/client', clientReqRoutes);


app.use('/', (req, res) => {
    return res.status(200).json({
        status: 'success',
        message: 'API Works...'
    });
});
