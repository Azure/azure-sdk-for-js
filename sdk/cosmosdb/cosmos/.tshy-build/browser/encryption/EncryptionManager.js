// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ProtectedDataEncryptionKeyCache } from "./Cache/ProtectedDataEncryptionKeyCache.js";
import { KeyEncryptionKeyCache } from "./Cache/KeyEncryptionKeyCache.js";
import { EncryptionSettingsCache } from "./Cache/EncryptionSettingsCache.js";
import { ClientEncryptionKeyPropertiesCache } from "./Cache/ClientEncryptionKeyPropertiesCache.js";
import { EncryptionKeyStoreProvider } from "./EncryptionKeyStoreProvider.js";
import { Constants } from "../common/constants.js";
/**
 * Cache manager for encryption related caches.
 * @hidden
 */
export class EncryptionManager {
    constructor(encryptionKeyResolver, cacheTimeToLive) {
        this.cacheTimeToLive =
            cacheTimeToLive !== undefined
                ? cacheTimeToLive
                : Constants.DefaultEncryptionCacheTimeToLiveInSeconds;
        const cacheTtlInMs = this.getCacheTTlInMs();
        this.encryptionKeyStoreProvider = new EncryptionKeyStoreProvider(encryptionKeyResolver, cacheTtlInMs);
        this.protectedDataEncryptionKeyCache = new ProtectedDataEncryptionKeyCache(cacheTtlInMs);
        this.keyEncryptionKeyCache = new KeyEncryptionKeyCache();
        this.encryptionSettingsCache = new EncryptionSettingsCache();
        this.clientEncryptionKeyPropertiesCache = new ClientEncryptionKeyPropertiesCache();
    }
    /**
     * Converts the EncryptionTimeToLive instance to a number (milliseconds).
     */
    getCacheTTlInMs() {
        const millisecondsPerSecond = 1000;
        return Number(this.cacheTimeToLive * millisecondsPerSecond);
    }
}
//# sourceMappingURL=EncryptionManager.js.map