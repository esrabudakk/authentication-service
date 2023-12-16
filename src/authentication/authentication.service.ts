import { EncryptionService } from '../helpers/encryption.service';
import { AuthTokenService } from '../token/token.service';
import { UserService } from '../user/user.service';
import { UserStatues } from '../user/enums/user-status.enum';
import { UsersData } from '../user/user.model';
import { UserRoles } from '../user/enums/user-role.enum';

export namespace AuthenticationService {
    export function createUser(newUser: NewUserData) {
        const hashedPassword = EncryptionService.hashPassword(newUser.password);
        const createdUser = {
            ...newUser,
            id: UsersData.length + 1,
            passwordHash: hashedPassword.hashedPassword,
            passwordSalt: hashedPassword.salt,
            role: UserRoles.CUSTOMER,
            status: UserStatues.EMAIL_VERIFICATION_PENDING,
            createdAt: new Date()
        };
        UsersData.push(createdUser);
        const authToken = AuthTokenService.saveToken(createdUser.id);
        sendEmailVerification(newUser.email, authToken);
    }

    export function loginUser(email: string, password: string) {
        return UserService.checkUserCredentials(email, password);
    }

}

