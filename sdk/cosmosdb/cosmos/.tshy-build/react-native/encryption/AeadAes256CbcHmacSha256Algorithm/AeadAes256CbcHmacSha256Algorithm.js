// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { EncryptionType } from "../enums/index.js";
import { createCipheriv, randomBytes, createHmac, createDecipheriv } from "node:crypto";
export class AeadAes256CbcHmacSha256Algorithm {
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
        if (this.encryptionType === EncryptionType.RANDOMIZED) {
            iv = randomBytes(16);
        }
        else {
            const ivHmac = createHmac("sha256", this.dataEncryptionKey.ivKeyBuffer);
            ivHmac.update(plainTextBuffer);
            iv = ivHmac.digest().slice(0, this.blockSizeInBytes);
        }
        // create cipher text
        const cipher = createCipheriv("aes-256-cbc", this.dataEncryptionKey.encryptionKeyBuffer, iv);
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
        const decipher = createDecipheriv("aes-256-cbc", this.dataEncryptionKey.encryptionKeyBuffer, iv);
        const decrypted = decipher.update(cipherText);
        const result = Buffer.concat([decrypted, decipher.final()]);
        return result;
    }
    generateAuthenticationTag(iv, cipherTextBuffer) {
        const hmac = createHmac("sha256", this.dataEncryptionKey.macKeyBuffer);
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
//# sourceMappingURL=AeadAes256CbcHmacSha256Algorithm.js.map