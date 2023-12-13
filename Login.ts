import { UsersData } from "./Register";
import { generateHashedPassword } from "./Utils";
import { UserStatues } from "./Constants";

export function checkUserCredentials(email: string, password: string): boolean {
    const user = getUserByEmail(email);
    const authToken = getUserById(user[0].id);
    const userStatus = checkUserStatus(authToken[0].token)
    if (userStatus !== UserStatues.ACTIVE)
        throw new Error(`You cannot log in user status: ${userStatus}`)
    return !!generateHashedPassword(password, user[0].passwordSalt);
}
function getUserByEmail(email: string): Object {
    const foundUser = UsersData.find(user => user.email === email);
    if (!foundUser)
        throw new Error('User not found')
    return foundUser;
}

function getUserById(userId: number): Object {
    const foundUser = UsersData.find(user => user.id === userId);
    if (!foundUser)
        throw new Error('User not found')
    return foundUser;
}
function checkUserStatus(token: Object): string {
    const user = getUserById(token[0].userId);
    return user[0].status;
}