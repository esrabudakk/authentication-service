import * as path from 'path';
import * as crypto from 'crypto';
import { EmailOptions } from './Register';
import nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as handlebars from 'handlebars';

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

export async function sendEmail(emailOptions: EmailOptions) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'expathy@gmail.com',
            pass: 'expathy123'
        }
    });

    const templatePath = path.join(__dirname, 'views', 'email-verification.handlebars');
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateSource);

    const html = template({
        name: emailOptions.to,
        verificationLink: emailOptions.verificationLink,
    });

    emailOptions.html = html;

    transporter.sendMail(emailOptions, function (error, info) {
        if (error) {
            console.log('Email sent succes');
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}