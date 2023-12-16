import * as crypto from 'crypto';

export namespace EncryptionService {
  export function generateSalt(length = this.rounds): string {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  }

  export function generateHashString(password: string, salt: string): string {
    return crypto
      .createHmac(
        'sha512',
        salt,
      )
      .update(password)
      .digest(this.encoding);
  }

  export function hashPassword(password: string) {
    const salt = generateSalt(7);
    const hashedPassword = generateHashString(password, salt);
    return {salt, hashedPassword};
  }
}