import * as path from 'path';
import * as fs from 'fs';
import nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import { EmailType } from './enums/email-type.enum';
import { IEmailOptions } from './interfaces/email-options.interface';
import { ConfigService } from '../common/services/config.service';
import { IEmailVerificationMailContent } from './interfaces/email-verification-content.interface';
import { UsersData } from '../user/user.model';
import { AuthTokenService } from '../token/token.service';
import { IResetPasswordMailContent } from './interfaces/reset-password-content.interface';
import { LinkCreationService } from '../helpers/link-creation.service';

export namespace MaillingService {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: ConfigService.getEnvVariableOrFail('EMAIL_SENT_FROM_SUPPORT'), // NO HARD CODED CREDENTIALS !!!!!
      pass: 'expathy123'
    }
  });

  const EMAIL_TYPE_PATH_HASH_MAP = {
    [EmailType.EMAIL_VERIFICATION]: {
      headers: {},
      path: './views/email-verification.handlebars',
      from: ConfigService.getEnvVariableOrFail('EMAIL_SENT_FROM_SUPPORT')
    },
    [EmailType.PASSWORD_RESET]: {
      headers: {},
      path: './views/password-reset.handlebars',
      from: ConfigService.getEnvVariableOrFail('EMAIL_SENT_FROM_SUPPORT')
    }
  }

  export async function sendEmail<T>(emailOptions: IEmailOptions<T>) {
    try {
      const { type: emailType, content: contentForCompiling, ...senderOptions } = emailOptions;

      const { path: rawHtmlPath, ...senderOptionsByEmailType } = EMAIL_TYPE_PATH_HASH_MAP[emailType];

      const templatePath = path.join(__dirname, 'views', rawHtmlPath);
      const templateSource = fs.readFileSync(templatePath, 'utf8');
      const template = handlebars.compile(templateSource);

      const html = template({
        ...contentForCompiling,
      });

      await transporter.sendMail({
        ...senderOptions,
        ...senderOptionsByEmailType,
        html
      });


    } catch (error) {
      console.log(error);
    }
  }

 

  export function sendEmailVerification(email: string, token: string): void {
    const foundUser = UsersData.find(item => item.email == email);
    if (!foundUser)
      throw new Error('User does not exist')
    const createdVerificationLink = LinkCreationService.createLink(token, 'verify');
    const content: IEmailVerificationMailContent = { verificationLink: createdVerificationLink , name: foundUser.name};
    const emailVerification: IEmailOptions<IEmailVerificationMailContent> = {
      to: email,
      subject: 'Email verification',
      type: EmailType.EMAIL_VERIFICATION,
      content: content
    }
    sendEmail(emailVerification);
  }


  export function sendEmailToResetPassword(email: string): void {
    const foundUser = UsersData.find(item => item.email == email);
    if (!foundUser)
      throw new Error('User does not exist')
    const foundToken = AuthTokenService.getAuthTokenByUserId(foundUser.id);
    if (!foundToken)
      throw new Error('Token does not exist')
    const createdResetPasswordLink = LinkCreationService.createLink(foundToken.token, 'reset-password');
    const content: IResetPasswordMailContent = { resetLink: createdResetPasswordLink , name: foundUser.name}
    const resetPassword: IEmailOptions<IResetPasswordMailContent> = {
      to: email,
      subject: 'Reset Password',
      type: EmailType.EMAIL_VERIFICATION,
      content: content
    }
    sendEmail(resetPassword);
  }

}