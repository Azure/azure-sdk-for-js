import { ProtectedDataEncryptionKey } from "../EncryptionKey/ProtectedDataEncryptionKey.js";
import type { KeyEncryptionKey } from "../KeyEncryptionKey.js";
/**
 * The cache used to store the protected data encryption key.
 * see {@link ProtectedDataEncryptionKey}
 * @hidden
 */
export declare class ProtectedDataEncryptionKeyCache {
    private cacheTimeToLive;
    private cache;
    cacheRefresher: NodeJS.Timeout;
    constructor(cacheTimeToLive: number);
    get(key: string): ProtectedDataEncryptionKey | undefined;
    private set;
    private clearCacheOnTtlExpiry;
    private createProtectedDataEncryptionKey;
    getOrCreate(name: string, keyEncryptionKey: KeyEncryptionKey, encryptedValue?: Uint8Array, forceRefresh?: boolean): Promise<ProtectedDataEncryptionKey>;
    private generateColumnEncryptionKey;
}
//# sourceMappingURL=ProtectedDataEncryptionKeyCache.d.ts.map