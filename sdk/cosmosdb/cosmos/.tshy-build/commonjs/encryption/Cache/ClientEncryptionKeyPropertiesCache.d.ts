import type { ClientEncryptionKeyProperties } from "../ClientEncryptionKey/index.js";
/**
 * The cache used to store the properties of the client encryption key
 * see {@link ClientEncryptionKeyProperties}
 * @hidden
 */
export declare class ClientEncryptionKeyPropertiesCache {
    private clientEncryptionKeyPropertiesCache;
    constructor();
    get(key: string): ClientEncryptionKeyProperties | undefined;
    set(key: string, clientEncryptionKeyProperties: ClientEncryptionKeyProperties): void;
}
//# sourceMappingURL=ClientEncryptionKeyPropertiesCache.d.ts.map