import type { PipelinePolicy } from "@azure/core-rest-pipeline";
/**
 * The programmatic identifier of the storageSharedKeyCredentialPolicy.
 */
export declare const storageSharedKeyCredentialPolicyName = "storageSharedKeyCredentialPolicy";
/**
 * Options used to configure StorageSharedKeyCredentialPolicy.
 */
export interface StorageSharedKeyCredentialPolicyOptions {
    accountName: string;
    accountKey: Buffer;
}
/**
 * storageSharedKeyCredentialPolicy handles signing requests using storage account keys.
 */
export declare function storageSharedKeyCredentialPolicy(_options: StorageSharedKeyCredentialPolicyOptions): PipelinePolicy;
//# sourceMappingURL=StorageSharedKeyCredentialPolicyV2-browser.d.mts.map