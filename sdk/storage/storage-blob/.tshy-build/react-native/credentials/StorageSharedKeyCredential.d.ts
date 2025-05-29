import type { RequestPolicy, RequestPolicyOptionsLike as RequestPolicyOptions } from "@azure/core-http-compat";
import { StorageSharedKeyCredentialPolicy } from "../policies/StorageSharedKeyCredentialPolicy.js";
import { Credential } from "./Credential.js";
/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * StorageSharedKeyCredential for account key authorization of Azure Storage service.
 */
export declare class StorageSharedKeyCredential extends Credential {
    /**
     * Azure Storage account name; readonly.
     */
    readonly accountName: string;
    /**
     * Azure Storage account key; readonly.
     */
    private readonly accountKey;
    /**
     * Creates an instance of StorageSharedKeyCredential.
     * @param accountName -
     * @param accountKey -
     */
    constructor(accountName: string, accountKey: string);
    /**
     * Creates a StorageSharedKeyCredentialPolicy object.
     *
     * @param nextPolicy -
     * @param options -
     */
    create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): StorageSharedKeyCredentialPolicy;
    /**
     * Generates a hash signature for an HTTP request or for a SAS.
     *
     * @param stringToSign -
     */
    computeHMACSHA256(stringToSign: string): string;
}
//# sourceMappingURL=StorageSharedKeyCredential.d.ts.map