"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientEncryptionKeyPropertiesCache = void 0;
/**
 * The cache used to store the properties of the client encryption key
 * see {@link ClientEncryptionKeyProperties}
 * @hidden
 */
class ClientEncryptionKeyPropertiesCache {
    constructor() {
        this.clientEncryptionKeyPropertiesCache = new Map();
    }
    get(key) {
        return this.clientEncryptionKeyPropertiesCache.get(key);
    }
    set(key, clientEncryptionKeyProperties) {
        this.clientEncryptionKeyPropertiesCache.set(key, clientEncryptionKeyProperties);
    }
}
exports.ClientEncryptionKeyPropertiesCache = ClientEncryptionKeyPropertiesCache;
//# sourceMappingURL=ClientEncryptionKeyPropertiesCache.js.map