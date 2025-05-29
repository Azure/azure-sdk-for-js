// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createHmac } from "node:crypto";
export class DataEncryptionKey {
    constructor(rootKey, name) {
        this.keySizeInBits = 256;
        this.keySizeInBytes = this.keySizeInBits / 8;
        if (rootKey.length !== this.keySizeInBytes) {
            throw new Error("Invalid root key size");
        }
        this.rootKeyBuffer = rootKey;
        this.name = name;
        const encryptionKeySalt = `Microsoft SQL Server cell encryption key with encryption algorithm:AEAD_AES_256_CBC_HMAC_SHA256 and key length:${this.keySizeInBits}`;
        const macKeySalt = `Microsoft SQL Server cell MAC key with encryption algorithm:AEAD_AES_256_CBC_HMAC_SHA256 and key length:${this.keySizeInBits}`;
        const ivKeySalt = `Microsoft SQL Server cell IV key with encryption algorithm:AEAD_AES_256_CBC_HMAC_SHA256 and key length:${this.keySizeInBits}`;
        this.encryptionKeyBuffer = this.getHmacWithSha256(encryptionKeySalt, this.rootKeyBuffer);
        this.macKeyBuffer = this.getHmacWithSha256(macKeySalt, this.rootKeyBuffer);
        this.ivKeyBuffer = this.getHmacWithSha256(ivKeySalt, this.rootKeyBuffer);
    }
    getHmacWithSha256(plainText, key) {
        const hmac = createHmac("sha256", key);
        hmac.update(Buffer.from(plainText, "utf16le"));
        return hmac.digest();
    }
}
//# sourceMappingURL=DataEncryptionKey.js.map