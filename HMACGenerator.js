import { createHmac } from 'crypto';
import { generateKey } from './KeyGenerator.js';

export class HMACGenerator {
    #key;

    constructor(message) {
        this.message = message;
        this.createHMAC();
    }

    createHMAC() {
        this.#key = generateKey();
        this.value = createHmac('sha3-256', Buffer.from(this.#key, 'hex'))
            .update(this.message)
            .digest('hex');
    }

    getKey() {
        return this.#key;
    }
}
