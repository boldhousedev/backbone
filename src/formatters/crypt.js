/* eslint-disable no-useless-escape */
import aes256 from 'aes256';

const setEncryptedField = function (s, cipher, json = false) {
    json && typeof s === 'object' && (s = JSON.stringify(s));
    if (s && !/^cipher\=/.test(s)) {
        s = `cipher=${cipher.encrypt(s)}`;
    }
    return s;
};

const readEncryptedField = function (s, cipher, json = false) {
    if (s) {
        if (/^cipher\=/.test(s)) {
            s = s.replace(/^cipher\=/, '');
            s = cipher.decrypt(s);
        }

        if (json) {
            try {
                s = JSON.parse(s);
            } catch (e) {}
        }
        return s;
    }
    return null;
};

let cipher = null;

const getCipher = (key) => {
    if (!cipher) {
        cipher = aes256.createCipher(key);
    }

    return cipher;
};

const cryptFormat = function (v, m, json = false, key) {
    if (typeof v === 'undefined') return v;
    return !m
        ? readEncryptedField(v, getCipher(key), json)
        : setEncryptedField(v, getCipher(key), json);
};

export default cryptFormat;
