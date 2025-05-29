"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.AeadAes256CbcHmacSha256Algorithm = void 0;
const index_js_1 = require("../enums/index.js");
const node_crypto_1 = require("node:crypto");
class AeadAes256CbcHmacSha256Algorithm {
    constructor(dataEncryptionKey, encryptionType) {
        this.algoVersion = 0x1;
        this.blockSizeInBytes = 16;
        this.dataEncryptionKey = dataEncryptionKey;
        this.encryptionType = encryptionType;
        this.version = Buffer.from([this.algoVersion]);
        this.versionSize = Buffer.from([1]);
        this.keySizeInBytes = 32;
        this.minimumCipherTextLength = 1 + 2 * this.blockSizeInBytes + this.keySizeInBytes;
    }
    encrypt(plainTextBuffer) {
        let iv;
        // create initialization vector
        if (this.encryptionType === index_js_1.EncryptionType.RANDOMIZED) {
            iv = (0, node_crypto_1.randomBytes)(16);
        }
        else {
            const ivHmac = (0, node_crypto_1.createHmac)("sha256", this.dataEncryptionKey.ivKeyBuffer);
            ivHmac.update(plainTextBuffer);
            iv = ivHmac.digest().slice(0, this.blockSizeInBytes);
        }
        // create cipher text
        const cipher = (0, node_crypto_1.createCipheriv)("aes-256-cbc", this.dataEncryptionKey.encryptionKeyBuffer, iv);
        const cipherTextBuffer = Buffer.concat([cipher.update(plainTextBuffer), cipher.final()]);
        const authTagBuffer = this.generateAuthenticationTag(iv, cipherTextBuffer);
        return Buffer.concat([Buffer.from([this.algoVersion]), authTagBuffer, iv, cipherTextBuffer]);
    }
    decrypt(cipherTextBuffer) {
        if (cipherTextBuffer.length < this.minimumCipherTextLength) {
            throw new Error("Invalid cipher text length");
        }
        if (cipherTextBuffer[0] !== this.algoVersion) {
            throw new Error("Invalid cipher text version");
        }
        const authTagStartIndex = 1;
        const authTagLength = this.keySizeInBytes;
        const ivStartIndex = authTagStartIndex + authTagLength;
        const ivLength = this.blockSizeInBytes;
        const cipherTextStartIndex = ivStartIndex + ivLength;
        const cipherTextLength = cipherTextBuffer.length - cipherTextStartIndex;
        const authenticationTag = cipherTextBuffer.slice(authTagStartIndex, authTagStartIndex + authTagLength);
        const iv = cipherTextBuffer.slice(ivStartIndex, ivStartIndex + ivLength);
        const cipherText = cipherTextBuffer.slice(cipherTextStartIndex, cipherTextStartIndex + cipherTextLength);
        this.validateAuthenticationTag(authenticationTag, iv, cipherText);
        const decipher = (0, node_crypto_1.createDecipheriv)("aes-256-cbc", this.dataEncryptionKey.encryptionKeyBuffer, iv);
        const decrypted = decipher.update(cipherText);
        const result = Buffer.concat([decrypted, decipher.final()]);
        return result;
    }
    generateAuthenticationTag(iv, cipherTextBuffer) {
        const hmac = (0, node_crypto_1.createHmac)("sha256", this.dataEncryptionKey.macKeyBuffer);
        const buffer = Buffer.concat([this.version, iv, cipherTextBuffer, this.versionSize]);
        return hmac.update(buffer).digest();
    }
    validateAuthenticationTag(authenticationTag, iv, cipherText) {
        const expectedAuthTag = this.generateAuthenticationTag(iv, cipherText);
        if (!authenticationTag.equals(expectedAuthTag)) {
            throw new Error("Invalid authentication tag");
        }
    }
}
exports.AeadAes256CbcHmacSha256Algorithm = AeadAes256CbcHmacSha256Algorithm;
//# sourceMappingURL=AeadAes256CbcHmacSha256Algorithm.js.map