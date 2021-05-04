const nodemailer = require('nodemailer');
const { resolve } = require("path");

require('dotenv').config({ path: resolve(process.cwd(), 'src/.env') });

async function mailConfig() {
    const config = {
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: process.env.EMAIL_SECURE == 'true',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    };



    return config;
}

module.exports = mailConfig;