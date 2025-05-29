"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyEncryptionKeyCache = void 0;
const KeyEncryptionKey_js_1 = require("../KeyEncryptionKey.js");
/**
 * The cache used to store the key encryption keys.
 * see {@link KeyEncryptionKey}
 * @hidden
 */
class KeyEncryptionKeyCache {
    constructor() {
        this.cache = new Map();
    }
    getOrCreate(name, path, keyStoreProvider) {
        const key = JSON.stringify([name, path]);
        let keyEncryptionKey = this.get(key);
        if (!keyEncryptionKey) {
            keyEncryptionKey = new KeyEncryptionKey_js_1.KeyEncryptionKey(name, path, keyStoreProvider);
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
exports.KeyEncryptionKeyCache = KeyEncryptionKeyCache;
//# sourceMappingURL=KeyEncryptionKeyCache.js.map