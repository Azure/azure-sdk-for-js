import type { ClientEncryptionPolicy } from "../ClientEncryptionPolicy.js";
import { EncryptionSettings } from "../EncryptionSettings.js";
/**
 * The cache used to store encryption settings for a container.
 * see {@link EncryptionSettings}
 * @hidden
 */
export declare class EncryptionSettingsCache {
    private cache;
    constructor();
    create(id: string, containerRid: string, partitionKeyPaths: string[], clientEncryptionPolicy: ClientEncryptionPolicy): Promise<EncryptionSettings>;
    get(key: string): EncryptionSettings | undefined;
    set(key: string, encryptionSettings: EncryptionSettings): void;
}
//# sourceMappingURL=EncryptionSettingsCache.d.ts.map