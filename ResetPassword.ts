import { generateHashedPassword, generateSalt, sendEmail } from "./Utils"
import { EmailOptions, UsersData } from "./Register"
import { generateUniqueToken } from "./Register";

function sendEmailToResetPassword(email: string): void {
    const newToken = generateUniqueToken();
    const verificationLink = `http://expathy.com/verify?token=${newToken}`;

    const resetPassword: EmailOptions = {
        to: email,
        from: 'expathy@gmail.com',
        subject: 'Reset Password',
        text: 'Reset your password',
        verificationLink: verificationLink
    }
    sendEmail(resetPassword);
}

function resetPassword(userId: number): void {
    const index = UsersData.findIndex(item => item.id === userId)
    if (index === -1)
        throw new Error("User does not exist");
    UsersData[index].passwordHash = ""
    UsersData[index].passwordSalt = ""
}

export function updateCredentials(userId: number, password: string): void {
    const index = UsersData.findIndex(item => item.id === userId)
    if (index === -1)
        throw new Error("User does not exist");
    const user = UsersData[index];
    sendEmailToResetPassword(user.email);
    resetPassword(userId)
    UsersData[index].passwordSalt = generateSalt(7);
    UsersData[index].passwordHash = generateHashedPassword(password, UsersData[index].passwordSalt);
}