import type { EncryptionKeyResolver } from "./EncryptionKeyResolver/index.js";
import type { KeyEncryptionAlgorithm } from "./enums/index.js";
/**
 * Class to store encryption keys in unwrapped form and provide an interface for wrapping and unwrapping the keys.
 */
export declare class EncryptionKeyStoreProvider {
    private keyEncryptionKeyResolver;
    private cacheTimeToLive;
    RsaOaepEncryptionAlgorithm: string;
    cacheRefresher: NodeJS.Timeout;
    unwrappedEncryptionKeyCache: {
        [key: string]: [Date, Buffer];
    };
    providerName: string;
    constructor(keyEncryptionKeyResolver: EncryptionKeyResolver, cacheTimeToLive: number);
    wrapKey(encryptionKeyId: string, algorithm: KeyEncryptionAlgorithm, key: Buffer): Promise<Buffer>;
    unwrapKey(encryptionKeyId: string, algorithm: KeyEncryptionAlgorithm, wrappedKey: Buffer): Promise<Buffer>;
    private clearCacheOnTtlExpiry;
}
//# sourceMappingURL=EncryptionKeyStoreProvider.d.ts.map