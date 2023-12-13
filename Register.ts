import { UserRoles, UserStatues } from "./Constants";
import { nanoid } from "nanoid";
import { generateHashedPassword, generateSalt, sendEmail } from "./Utils";


export const UsersData: { id: number, name: string, lastName: string, email: string, passwordHash: string, passwordSalt: string, status: UserStatues, role: UserRoles, createdAt: Date }[] = []

export const AuthTokens: { id: number, token: string, userId: number, expiresIn: string, createdAt: Date }[] = []


interface NewUserData {
    name: string,
    lastName: string,
    email: string,
    password: string
}

interface NewTokenData {
    token: string,
    expiresIn: string,
    createdAt: Date
}

export type EmailOptions = {
    from: string,
    to: string,
    subject: string,
    text: string,
    html?: string
    verificationLink: string
};

export function createUser(newUser: NewUserData) {
    const salt = generateSalt(7);
    const hashedPassword = generateHashedPassword(newUser.password, salt);
    const updatedUser = {
        ...newUser,
        id: UsersData.length + 1,
        passwordHash: hashedPassword,
        passwordSalt: salt,
        role: UserRoles.CUSTOMER,
        status: UserStatues.EMAIL_VERIFICATION_PENDING,
        createdAt: new Date()
    };
    UsersData.push(updatedUser);
    saveToken(updatedUser.id);
    sendEmailVerification(newUser.email);
}

export function generateUniqueToken(): NewTokenData {
    const token = nanoid(36);
    return ({
        token: token,
        expiresIn: '7h',
        createdAt: new Date()
    });
}


function saveToken(userId: number): void {
    const newToken = generateUniqueToken();

    AuthTokens.push({
        ...newToken,
        id: AuthTokens.length + 1,
        userId,
    });
}


function sendEmailVerification(email: string): void {
    const newToken = generateUniqueToken();
    const verificationLink = `http://expathy.com/verify?token=${newToken}`;

    const emailVerification: EmailOptions = {
        to: email,
        from: 'expathy@gmail.com',
        subject: 'Email verification',
        text: 'Please verify your email',
        verificationLink: verificationLink
    }
    sendEmail(emailVerification);
}


