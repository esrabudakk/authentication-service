import * as crypto from 'crypto';
import { EmailOptions } from './Register';
import { nodemailer } from "nodemailer"

export function generateSalt(length = this.rounds): string {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
}

export function generateHashedPassword(password: string, salt: string): string {
    return crypto
      .createHmac(
        'sha512',
        salt,
      )
      .update(password)
      .digest(this.encoding);
}

export function sendEmail(emailOptions:EmailOptions){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'expathy@gmail.com',
            pass: 'expathy123'
        }
    });

    transporter.sendMail(emailOptions, function (error, info) {
        if (error) {
            console.log('Email sent succes');
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}