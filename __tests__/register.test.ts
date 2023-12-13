import { createUser , UsersData} from '../Register.ts';
import {describe, expect, it} from '@jest/globals';
describe('createUser function test', () => {
    it('should create a new user', () => {
        const newUser = {
            name: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            password: 'securepassword'
        };

        const initialUsersCount = UsersData.length;

        createUser(newUser);

        expect(UsersData.length).toBe(initialUsersCount + 1);

    });
});
