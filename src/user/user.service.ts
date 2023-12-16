import { EncryptionService } from "../helpers/encryption.service";
import { MaillingService } from "../mail/mail.service";
import { UserStatues } from "./enums/user-status.enum";
import { UsersData } from "./user.model";

export namespace UserService {

    export function checkUserCredentials(email: string, password: string) {
        const user = getUserByEmail(email);
        const userStatus = checkUserStatus(user.id)
        if (userStatus !== UserStatues.ACTIVE)
            throw new Error(`You cannot log in user status: ${userStatus}`)
        const hashString = EncryptionService.generateHashString(password, user[0].passwordSalt);
        if (user.passwordHash !== hashString)
            throw new Error(`Invalid credentials`)
        return user;
    }
    function getUserByEmail(email: string) {
        const foundUser = UsersData.find(user => user.email === email);
        if (!foundUser)
            throw new Error('User not found')
        return foundUser;
    }

    function getUserById(userId: number) {
        const foundUser = UsersData.find(user => user.id === userId);
        if (!foundUser)
            throw new Error('User not found')
        return foundUser;
    }
    function checkUserStatus(userId: number): string {
        const user = getUserById(userId);
        return user.status;
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
        MaillingService.sendEmailToResetPassword(user.email);
        resetPassword(userId)
        UsersData[index].passwordSalt = EncryptionService.generateSalt(7);
        UsersData[index].passwordHash = EncryptionService.generateHashString(password, UsersData[index].passwordSalt);
    }
}