// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * The cache used to store the properties of the client encryption key
 * see {@link ClientEncryptionKeyProperties}
 * @hidden
 */
export class ClientEncryptionKeyPropertiesCache {
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
//# sourceMappingURL=ClientEncryptionKeyPropertiesCache.js.map