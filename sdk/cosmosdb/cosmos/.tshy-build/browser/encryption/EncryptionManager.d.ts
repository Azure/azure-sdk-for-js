import { ProtectedDataEncryptionKeyCache } from "./Cache/ProtectedDataEncryptionKeyCache.js";
import { KeyEncryptionKeyCache } from "./Cache/KeyEncryptionKeyCache.js";
import { EncryptionSettingsCache } from "./Cache/EncryptionSettingsCache.js";
import { ClientEncryptionKeyPropertiesCache } from "./Cache/ClientEncryptionKeyPropertiesCache.js";
import { EncryptionKeyStoreProvider } from "./EncryptionKeyStoreProvider.js";
import type { EncryptionKeyResolver } from "./EncryptionKeyResolver/index.js";
/**
 * Cache manager for encryption related caches.
 * @hidden
 */
export declare class EncryptionManager {
    cacheTimeToLive: number;
    encryptionKeyStoreProvider: EncryptionKeyStoreProvider;
    protectedDataEncryptionKeyCache: ProtectedDataEncryptionKeyCache;
    keyEncryptionKeyCache: KeyEncryptionKeyCache;
    encryptionSettingsCache: EncryptionSettingsCache;
    clientEncryptionKeyPropertiesCache: ClientEncryptionKeyPropertiesCache;
    constructor(encryptionKeyResolver: EncryptionKeyResolver, cacheTimeToLive?: number);
    /**
     * Converts the EncryptionTimeToLive instance to a number (milliseconds).
     */
    private getCacheTTlInMs;
}
//# sourceMappingURL=EncryptionManager.d.ts.map