import {UserRoles, UserStatues} from "./Constants";
import {nanoid} from "nanoid";
import {createVerificationLink, generateHashedPassword, generateSalt, getAuthTokenByUserId, sendEmail} from "./Utils";


export const UsersData: { id: number, name: string, lastName: string, email: string, passwordHash: string, passwordSalt: string, status: UserStatues, role: UserRoles, createdAt: Date }[] = []

export const AuthTokens: { id: number, token: string, userId: number, expiresIn: string, createdAt: Date }[] = []


interface NewUserData {
    name: string,
    lastName: string,
    email: string,
    password: string
}


export type EmailOptions = {
    from: string,
    to: string,
    subject: string,
    text: string
};

function createUser(newUser: NewUserData) {
    const salt = generateSalt(7);
    const hashedPassword = generateHashedPassword(newUser.password, salt);
    const createdUser = {
        ...newUser,
        id: UsersData.length + 1,
        passwordHash: hashedPassword,
        passwordSalt: salt,
        role: UserRoles.CUSTOMER,
        status: UserStatues.EMAIL_VERIFICATION_PENDING,
        createdAt: new Date()
    };
    UsersData.push(createdUser);
    saveToken(createdUser.id);
   const authToken =  getAuthTokenByUserId(createdUser.id);
    sendEmailVerification(newUser.email, authToken);
}

function generateUniqueToken(): string {
    return nanoid(36);
}


function saveToken(userId: number): void {
    const newToken = generateUniqueToken();
    AuthTokens.push({
        id: AuthTokens.length + 1,
        token: newToken,
        userId,
        expiresIn: '7h',
        createdAt: new Date()
    });
}
function sendEmailVerification(email: string, token: string): void {
    const verificationLink = createVerificationLink(token, 'verify');
    const emailVerification : EmailOptions = {
        to: email,
        from: 'expathy@gmail.com',
        subject: 'Email verification',
        text: `Please verify your email by clicking this link: ${verificationLink}`
    }
    sendEmail(emailVerification);
}


