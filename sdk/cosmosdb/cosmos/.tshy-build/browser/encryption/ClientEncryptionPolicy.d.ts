import type { ClientEncryptionIncludedPath } from "./ClientEncryptionIncludedPath.js";
/**
 * Represents the client encryption policy associated with a container.
 */
export interface ClientEncryptionPolicy {
    /** list of paths that needs to be encrypted along with their encryption settings. */
    includedPaths: ClientEncryptionIncludedPath[];
    /**
     * Version of the client encryption policy definition.
     * The supported versions are 1 and 2. Default is 1.
     * Id and partition key paths encryption are only supported in version 2.
     */
    policyFormatVersion?: number;
}
//# sourceMappingURL=ClientEncryptionPolicy.d.ts.map