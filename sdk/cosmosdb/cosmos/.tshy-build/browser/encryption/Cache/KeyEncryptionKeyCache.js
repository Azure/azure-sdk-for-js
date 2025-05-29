// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { KeyEncryptionKey } from "../KeyEncryptionKey.js";
/**
 * The cache used to store the key encryption keys.
 * see {@link KeyEncryptionKey}
 * @hidden
 */
export class KeyEncryptionKeyCache {
    constructor() {
        this.cache = new Map();
    }
    getOrCreate(name, path, keyStoreProvider) {
        const key = JSON.stringify([name, path]);
        let keyEncryptionKey = this.get(key);
        if (!keyEncryptionKey) {
            keyEncryptionKey = new KeyEncryptionKey(name, path, keyStoreProvider);
            this.set(key, keyEncryptionKey);
        }
        return keyEncryptionKey;
    }
    get(key) {
        return this.cache.get(key);
    }
    set(key, keyEncryptionKey) {
        this.cache.set(key, keyEncryptionKey);
    }
}
//# sourceMappingURL=KeyEncryptionKeyCache.js.map