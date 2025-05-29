// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Constants } from "../common/index.js";
/**
 * Class to store encryption keys in unwrapped form and provide an interface for wrapping and unwrapping the keys.
 */
export class EncryptionKeyStoreProvider {
    constructor(keyEncryptionKeyResolver, cacheTimeToLive) {
        this.keyEncryptionKeyResolver = keyEncryptionKeyResolver;
        this.cacheTimeToLive = cacheTimeToLive;
        this.RsaOaepEncryptionAlgorithm = "RSA-OAEP";
        this.keyEncryptionKeyResolver = keyEncryptionKeyResolver;
        this.providerName = keyEncryptionKeyResolver.encryptionKeyResolverName;
        this.unwrappedEncryptionKeyCache = {};
        this.cacheTimeToLive = cacheTimeToLive;
        this.clearCacheOnTtlExpiry();
    }
    async wrapKey(encryptionKeyId, algorithm, key) {
        const uInt8ArrayKey = new Uint8Array(key);
        const wrappedEncryptionKey = await this.keyEncryptionKeyResolver.wrapKey(encryptionKeyId, algorithm, uInt8ArrayKey);
        return Buffer.from(wrappedEncryptionKey);
    }
    async unwrapKey(encryptionKeyId, algorithm, wrappedKey) {
        if (this.cacheTimeToLive === 0) {
            const res = await this.keyEncryptionKeyResolver.unwrapKey(encryptionKeyId, algorithm, wrappedKey);
            return Buffer.from(res);
        }
        if (!this.unwrappedEncryptionKeyCache[encryptionKeyId]) {
            const wrappedKeyUint8Array = new Uint8Array(wrappedKey);
            const plainEncryptionKey = await this.keyEncryptionKeyResolver.unwrapKey(encryptionKeyId, algorithm, wrappedKeyUint8Array);
            const plainEncryptionKeyBuffer = Buffer.from(plainEncryptionKey);
            this.unwrappedEncryptionKeyCache[encryptionKeyId] = [new Date(), plainEncryptionKeyBuffer];
        }
        return this.unwrappedEncryptionKeyCache[encryptionKeyId][1];
    }
    async clearCacheOnTtlExpiry() {
        this.cacheRefresher = setInterval(() => {
            const now = new Date();
            for (const key in this.unwrappedEncryptionKeyCache) {
                if (now.getTime() - this.unwrappedEncryptionKeyCache[key][0].getTime() >
                    this.cacheTimeToLive) {
                    delete this.unwrappedEncryptionKeyCache[key];
                }
            }
        }, Constants.EncryptionCacheRefreshIntervalInMs);
    }
}
//# sourceMappingURL=EncryptionKeyStoreProvider.js.map