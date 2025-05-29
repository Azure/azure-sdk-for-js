import type { EncryptionKeyResolverName, KeyEncryptionAlgorithm } from "./enums/index.js";
/**
 * Metadata used to wrap/unwrap data encryption key using a customer managed key
 */
export interface EncryptionKeyWrapMetadata {
    /** Identifier of the key resolver */
    type: EncryptionKeyResolverName;
    /** Identifier of customer managed key */
    name: string;
    /** Path to customer managed key. */
    value: string;
    /** Algorithm to be used for wrapping/unwrapping the data encryption key */
    algorithm: KeyEncryptionAlgorithm;
}
//# sourceMappingURL=EncryptionKeyWrapMetadata.d.ts.map