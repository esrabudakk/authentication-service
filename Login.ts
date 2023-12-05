import { error } from "console";
import { UsersData } from "./Register";
import { generateHashedPassword } from "./Utils";

function getUserByEmail(email: string): Object {
    const existingUser = UsersData.find(user => user.email === email);
    if (!existingUser)
        throw error
    return existingUser;
}

function getUserById(userId: number): Object {
    const existingUser = UsersData.find(user => user.id === userId);
    if (!existingUser)
        throw error
    return existingUser;
}

function checkUserCredentials(email: string, password: string): boolean {
    const user = getUserByEmail(email);
    return generateHashedPassword(password, user[0].passwordSalt) ? true : false;

}

function checkUserStatus(token: Object): string {
    const user = getUserById(token[0].userId);
    return user[0].status;
}