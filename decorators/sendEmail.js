const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { BASE_URL, SENDGRID_EMAIL } = process.env;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (email, verificationToken) => {
    const smg = {
        to: email,
        from: SENDGRID_EMAIL,
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
    };
    await sgMail
        .send(smg)
        .then(() => {
            console.log('Email sent');
        })
        .catch(error => {
            console.error(error);
        });
}

module.exports = {sendEmail};