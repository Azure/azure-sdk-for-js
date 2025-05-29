import type { ClientEncryptionIncludedPath } from "./ClientEncryptionIncludedPath.js";
import type { ClientEncryptionKeyProperties } from "./ClientEncryptionKey/index.js";
import type { EncryptionAlgorithm, EncryptionType } from "./enums/index.js";
import { AeadAes256CbcHmacSha256Algorithm } from "./AeadAes256CbcHmacSha256Algorithm/index.js";
import type { EncryptionManager } from "./EncryptionManager.js";
/**
 * Represents the encryption setting for a specific property in an item.
 * @hidden
 */
export declare class EncryptionSettingForProperty {
    encryptionKeyId: string;
    encryptionType: EncryptionType;
    encryptionAlgorithm: EncryptionAlgorithm;
    constructor(clientEncryptionIncludedPath: ClientEncryptionIncludedPath);
    buildEncryptionAlgorithm(clientEncryptionKeyProperties: ClientEncryptionKeyProperties, encryptionManager: EncryptionManager, forceRefresh?: boolean): Promise<AeadAes256CbcHmacSha256Algorithm>;
    private buildProtectedDataEncryptionKey;
}
//# sourceMappingURL=EncryptionSettingForProperty.d.ts.map