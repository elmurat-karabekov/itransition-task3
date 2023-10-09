import { randomBytes } from 'crypto';

class KeyGenerator {
    static generateKey() {
        return randomBytes(32).toString('hex');
    }
}

export function generateKey() {
    return KeyGenerator.generateKey();
}
