import { UsersData } from "./Register";
import { generateHashedPassword } from "./Utils";
import {UserStatues} from "./Constants";

export function checkUserCredentials(email: string, password: string): boolean {
    const foundUser = getUserByEmail(email);
    if(foundUser.status !== UserStatues.ACTIVE)
        throw new Error(`You cannot log in user status: ${foundUser.status}`)
    return !!generateHashedPassword(password, foundUser.passwordSalt);
}

export function getUserByEmail(email: string) {
    const foundUser = UsersData.find(user => user.email === email);
    if (!foundUser)
        throw new Error('User not found')
    return foundUser;
}

export function getUserById(userId: number) {
    const foundUser = UsersData.find(user => user.id === userId);
    if (!foundUser)
        throw new Error('User not found')
    return foundUser;
}

function checkUserStatus(userId: number): string {
    const user = getUserById(userId);
    return user.status;
}