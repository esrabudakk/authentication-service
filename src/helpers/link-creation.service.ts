export namespace LinkCreationService {
    
    export function createLink(token: string, act: string) {
        return `http://expathy.com/verify?${act}=${token}`;
      }
}