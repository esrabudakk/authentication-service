import { checkUserCredentials, getUserByEmail, getUserById } from "../Login";

// const mockUser1 = {
//     id: 1,
//     email: 'test@example.com',
//     password: 'hashedPassword',
//     passwordSalt: 'passwordSalt',
//     status: 'ACTIVE', // Assuming ACTIVE is the correct status
// };



// describe('login module', () => {
//     it('check user credentials', () => {
//         const email = 'abc@axample.com';
//         const foundUser = getUserByEmail(email);
//         const status = "ACTIVE"
//     })

//     it('should get user by email', () => {
//         const email = 'abc@example.com';
        
//         getUserByEmail();
//     })
// })
jest.mock("nanoid", () => { return { nanoid: () => "123" } });


describe('Authentication Functions', () => {
  const mockUser = {
    id: 1,
    email: 'test@example.com',
    password: 'hashedPassword',
    passwordSalt: 'passwordSalt',
    status: 'ACTIVE', // Assuming ACTIVE is the correct status
  };

  const mockUsersData = [mockUser];

  jest.mock('../Login', () => ({
    UsersData: mockUsersData,
    generateHashedPassword: jest.fn((password, salt) => password + salt),
  }));

  
//   jest.mock('./your-authentication-module', () => ({
//     UsersData: mockUsersData,
//     generateHashedPassword: jest.fn((password, salt) => password + salt), // Mocking the password hashing function
//   }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('checkUserCredentials', () => {
    it.skip('should return true for valid credentials', () => {


      const result = checkUserCredentials(mockUser.email, 'hashedPasswordpasswordSalt');
      expect(result).toBe(true);
    });

    it.skip('should throw an error for inactive user', () => {
      mockUser.status = 'INACTIVE'; // Assuming INACTIVE is the correct status for inactive users
      expect(() => checkUserCredentials(mockUser.email, 'password')).toThrowError(
        'You cannot log in user status: INACTIVE'
      );
    });

    it.skip('should throw an error for invalid email', () => {
      expect(() => checkUserCredentials('nonexistent@example.com', 'password')).toThrowError(
        'User not found'
      );
    });
  });

  describe('getUserByEmail', () => {
    it('should return user for a valid email', () => {
      const result = getUserByEmail(mockUser.email);
      expect(result).toEqual(mockUser);
    });

    it.skip('should throw an error for an invalid email', () => {
      expect(() => getUserByEmail('nonexistent@example.com')).toThrowError('User not found');
    });
  });

  describe('getUserById', () => {
    it.skip('should return user for a valid ID', () => {
      const result = getUserById(mockUser.id);
      expect(result).toEqual(mockUser);
    });

    it.skip('should throw an error for an invalid ID', () => {
      expect(() => getUserById(999)).toThrowError('User not found');
    });
  });
});
