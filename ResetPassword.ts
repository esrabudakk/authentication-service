import { generateHashedPassword, generateSalt, sendEmail } from "./Utils"
import { EmailOptions, UsersData } from "./Register"

function sendEmailToResetPassword(email: string): void {

    const resetPassword: EmailOptions = {
        to: email,
        from: 'expathy@gmail.com',
        subject: 'Reset Password',
        text: 'Reset your password'
    }
    sendEmail(resetPassword);
}

function resetPassword(userId: number): void {

    const index = UsersData.findIndex(item => item.id === userId)
    if(index === -1)
        throw new Error("User does not exist");
    UsersData[index].passwordHash = ""
    UsersData[index].passwordSalt = ""
}

function updateCredentials(userId:number, password: string): void {
    const index = UsersData.findIndex(item => item.id === userId)
    if(index === -1)
        throw new Error("User does not exist");
    UsersData[index].passwordSalt = generateSalt(7);
    UsersData[index].passwordHash = generateHashedPassword(password,UsersData[index].passwordSalt);
}