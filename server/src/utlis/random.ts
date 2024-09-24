import crypto from 'crypto';

export const createRandomToken = () => {
    return crypto.randomBytes(64).toString('hex');
}