import {describe, expect, test} from '@jest/globals';
import {EmailOptions, generateUniqueToken, saveToken} from '../Register';
import {createVerificationLink} from "../Utils";

const AuthTokens: { id: number, token: string, userId: number, expiresIn: string, createdAt: Date }[] = []
jest.mock("nanoid", () => { return { nanoid: () => "123" } });
describe('register module', () => {
    it('it should be generate unique token', () => {
        const token = generateUniqueToken();
        expect(token).toHaveProperty('token');
        expect(token).toHaveProperty('expiresIn');
        expect(token).toHaveProperty('createdAt');
        expect(token.token).toBe('123');
    });

    it('should be save token', () => {
        const userId = 1
        saveToken(userId);
        const newToken = generateUniqueToken();
        AuthTokens.push({
            ...newToken,
            id: AuthTokens.length + 1,
            userId,
        });
        expect(AuthTokens.length).toBe(1)
    });

    // it('should ', () => {
    //     const email = 'string@example.com';
    //     const token = 'abc'
    //     sendEmailVerification(email, token);
    //     const verificationLink = createVerificationLink(token, 'verify');
    //     const emailVerification : EmailOptions = {
    //         to: email,
    //         from: 'expathy@gmail.com',
    //         subject: 'Email verification',
    //         text: `Please verify your email by clicking this link: ${verificationLink}`
    //     }
    // });

    
});