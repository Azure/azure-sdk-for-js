import type { EncryptionKeyStoreProvider } from "../EncryptionKeyStoreProvider.js";
import { KeyEncryptionKey } from "../KeyEncryptionKey.js";
/**
 * The cache used to store the key encryption keys.
 * see {@link KeyEncryptionKey}
 * @hidden
 */
export declare class KeyEncryptionKeyCache {
    cache: Map<string, KeyEncryptionKey>;
    constructor();
    getOrCreate(name: string, path: string, keyStoreProvider: EncryptionKeyStoreProvider): KeyEncryptionKey;
    private get;
    private set;
}
//# sourceMappingURL=KeyEncryptionKeyCache.d.ts.map