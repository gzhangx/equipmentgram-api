import * as crypto from "crypto";
import * as uuid from 'uuid';
const secret = {
    seed: uuid.v1(),
    pwdSeed: 'somethingUniqueDontChange',
}

export interface User {
    id: string;
    username: string;
    password: string;
    provider: string;
    active: boolean;
    verified: boolean;
    created: string;
    lastSignIn: string;
}

interface HashedObject {
    hash: string,
}

function getUserKey(user: User) {
    return `${user.username}:${user.password}`;
}

///
// user: username, password, provider, id, created, verified
//
//
///
function getUserHash(user: User) {
    return crypto
        .createHmac('sha256', secret.seed)
        .update(getUserKey(user))
        .digest('hex');
}

export function getPwdHash(pwd: string) {
    return crypto
        .createHmac('sha256', secret.pwdSeed)
        .update(pwd)
        .digest('hex');
}

export function signUser(user: User): HashedObject {
    return {
        hash: getUserHash(user)
    }
}

export function verifyUser(user: User, vhash: string) {
    const hash = getUserHash(user);
    return (vhash === hash)
}
