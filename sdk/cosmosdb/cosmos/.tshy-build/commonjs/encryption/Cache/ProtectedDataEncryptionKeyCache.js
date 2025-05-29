"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtectedDataEncryptionKeyCache = void 0;
const node_crypto_1 = require("node:crypto");
const ProtectedDataEncryptionKey_js_1 = require("../EncryptionKey/ProtectedDataEncryptionKey.js");
const index_js_1 = require("../../common/index.js");
/**
 * The cache used to store the protected data encryption key.
 * see {@link ProtectedDataEncryptionKey}
 * @hidden
 */
class ProtectedDataEncryptionKeyCache {
    constructor(cacheTimeToLive) {
        this.cacheTimeToLive = cacheTimeToLive;
        this.cache = new Map();
        this.clearCacheOnTtlExpiry();
    }
    get(key) {
        if (!this.cache.has(key)) {
            return undefined;
        }
        return this.cache.get(key)[1];
    }
    set(key, protectedDataEncryptionKey) {
        if (this.cacheTimeToLive === 0) {
            return;
        }
        this.cache.set(key, [new Date(), protectedDataEncryptionKey]);
    }
    async clearCacheOnTtlExpiry() {
        this.cacheRefresher = setInterval(() => {
            const now = new Date();
            for (const key of this.cache.keys()) {
                if (now.getTime() - this.cache.get(key)[0].getTime() > this.cacheTimeToLive) {
                    this.cache.delete(key);
                }
            }
        }, index_js_1.Constants.EncryptionCacheRefreshIntervalInMs);
    }
    async createProtectedDataEncryptionKey(name, keyEncryptionKey, encryptedValue) {
        let rawKey;
        let encryptedKey;
        if (encryptedValue) {
            rawKey = await keyEncryptionKey.unwrapEncryptionKey(encryptedValue);
            encryptedKey = encryptedValue;
        }
        else {
            rawKey = this.generateColumnEncryptionKey();
            encryptedKey = await keyEncryptionKey.wrapEncryptionKey(rawKey);
        }
        const newKey = new ProtectedDataEncryptionKey_js_1.ProtectedDataEncryptionKey(name, keyEncryptionKey, rawKey, encryptedKey);
        if (this.cacheTimeToLive !== 0) {
            const key = JSON.stringify([
                name,
                keyEncryptionKey.name,
                keyEncryptionKey.path,
                encryptedKey.toString("hex"),
            ]);
            this.set(key, newKey);
        }
        return newKey;
    }
    async getOrCreate(name, keyEncryptionKey, encryptedValue, forceRefresh) {
        const encryptedValueBuffer = encryptedValue ? Buffer.from(encryptedValue) : undefined;
        if (this.cacheTimeToLive === 0 || forceRefresh) {
            return this.createProtectedDataEncryptionKey(name, keyEncryptionKey, encryptedValueBuffer);
        }
        if (encryptedValueBuffer) {
            const key = JSON.stringify([
                name,
                keyEncryptionKey.name,
                keyEncryptionKey.path,
                encryptedValueBuffer.toString("hex"),
            ]);
            const protectedDataEncryptionKey = this.get(key);
            if (protectedDataEncryptionKey) {
                return protectedDataEncryptionKey;
            }
        }
        return this.createProtectedDataEncryptionKey(name, keyEncryptionKey, encryptedValueBuffer);
    }
    generateColumnEncryptionKey() {
        return (0, node_crypto_1.randomBytes)(32);
    }
}
exports.ProtectedDataEncryptionKeyCache = ProtectedDataEncryptionKeyCache;
//# sourceMappingURL=ProtectedDataEncryptionKeyCache.js.map