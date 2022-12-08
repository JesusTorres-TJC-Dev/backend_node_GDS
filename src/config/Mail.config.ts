import nodemailer from 'nodemailer'

const mail = {
    user: 'tjc.dev.1997@gmail.com',
    pass: 'urfmbgpuhybardnm'
}

const config = {
    host: "smtp.gmail.com",
    port: 587,
    tls: {
        rejectUnauthorized: false
    },
    secure: false,
    auth: mail
}

const transporter = nodemailer.createTransport(config)

export {
    mail,
    config,
    transporter,
}