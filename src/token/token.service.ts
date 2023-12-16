import { nanoid } from "nanoid";
import { AuthTokens } from "./token.model";

export namespace AuthTokenService {

    export function generateUniqueToken(): string {
        return nanoid(36);
    }
    
    export function saveToken(userId: number): Object {
        const newToken = generateUniqueToken();
        const authToken = {
            id: AuthTokens.length + 1,
            token: newToken,
            userId,
            expiresIn: '7h',
            createdAt: new Date()
        };
    
        AuthTokens.push(authToken);
        return authToken;
    }

    export function getAuthTokenByUserId(userId:number){
        return AuthTokens.find(item => item.userId == userId)
    }
    
}