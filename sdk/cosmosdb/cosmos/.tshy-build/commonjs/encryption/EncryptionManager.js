"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionManager = void 0;
const ProtectedDataEncryptionKeyCache_js_1 = require("./Cache/ProtectedDataEncryptionKeyCache.js");
const KeyEncryptionKeyCache_js_1 = require("./Cache/KeyEncryptionKeyCache.js");
const EncryptionSettingsCache_js_1 = require("./Cache/EncryptionSettingsCache.js");
const ClientEncryptionKeyPropertiesCache_js_1 = require("./Cache/ClientEncryptionKeyPropertiesCache.js");
const EncryptionKeyStoreProvider_js_1 = require("./EncryptionKeyStoreProvider.js");
const constants_js_1 = require("../common/constants.js");
/**
 * Cache manager for encryption related caches.
 * @hidden
 */
class EncryptionManager {
    constructor(encryptionKeyResolver, cacheTimeToLive) {
        this.cacheTimeToLive =
            cacheTimeToLive !== undefined
                ? cacheTimeToLive
                : constants_js_1.Constants.DefaultEncryptionCacheTimeToLiveInSeconds;
        const cacheTtlInMs = this.getCacheTTlInMs();
        this.encryptionKeyStoreProvider = new EncryptionKeyStoreProvider_js_1.EncryptionKeyStoreProvider(encryptionKeyResolver, cacheTtlInMs);
        this.protectedDataEncryptionKeyCache = new ProtectedDataEncryptionKeyCache_js_1.ProtectedDataEncryptionKeyCache(cacheTtlInMs);
        this.keyEncryptionKeyCache = new KeyEncryptionKeyCache_js_1.KeyEncryptionKeyCache();
        this.encryptionSettingsCache = new EncryptionSettingsCache_js_1.EncryptionSettingsCache();
        this.clientEncryptionKeyPropertiesCache = new ClientEncryptionKeyPropertiesCache_js_1.ClientEncryptionKeyPropertiesCache();
    }
    /**
     * Converts the EncryptionTimeToLive instance to a number (milliseconds).
     */
    getCacheTTlInMs() {
        const millisecondsPerSecond = 1000;
        return Number(this.cacheTimeToLive * millisecondsPerSecond);
    }
}
exports.EncryptionManager = EncryptionManager;
//# sourceMappingURL=EncryptionManager.js.map