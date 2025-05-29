import type { RequestPolicy, RequestPolicyOptionsLike as RequestPolicyOptions, RequestPolicyFactory } from "@azure/core-http-compat";
import { StorageRetryPolicy } from "./policies/StorageRetryPolicy.js";
import { StorageRetryPolicyType } from "./policies/StorageRetryPolicyType.js";
export { StorageRetryPolicyType, StorageRetryPolicy };
/**
 * Storage Blob retry options interface.
 */
export interface StorageRetryOptions {
    /**
     * Optional. StorageRetryPolicyType, default is exponential retry policy.
     */
    readonly retryPolicyType?: StorageRetryPolicyType;
    /**
     * Optional. Max try number of attempts, default is 4.
     * A value of 1 means 1 try and no retries.
     * A value smaller than 1 means default retry number of attempts.
     */
    readonly maxTries?: number;
    /**
     * Optional. Indicates the maximum time in ms allowed for any single try of an HTTP request.
     * A value of zero or undefined means no default timeout on SDK client, Azure
     * Storage server's default timeout policy will be used.
     *
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-blob-service-operations
     */
    readonly tryTimeoutInMs?: number;
    /**
     * Optional. Specifies the amount of delay to use before retrying an operation (default is 4s or 4 * 1000ms).
     * The delay increases (exponentially or linearly) with each retry up to a maximum specified by
     * maxRetryDelayInMs. If you specify 0, then you must also specify 0 for maxRetryDelayInMs.
     */
    readonly retryDelayInMs?: number;
    /**
     * Optional. Specifies the maximum delay allowed before retrying an operation (default is 120s or 120 * 1000ms).
     * If you specify 0, then you must also specify 0 for retryDelayInMs.
     */
    readonly maxRetryDelayInMs?: number;
    /**
     * If a secondaryHost is specified, retries will be tried against this host. If secondaryHost is undefined
     * (the default) then operations are not retried against another host.
     *
     * NOTE: Before setting this field, make sure you understand the issues around
     * reading stale and potentially-inconsistent data at
     * {@link https://learn.microsoft.com/en-us/azure/storage/common/storage-designing-ha-apps-with-ragrs}
     */
    readonly secondaryHost?: string;
}
/**
 * StorageRetryPolicyFactory is a factory class helping generating {@link StorageRetryPolicy} objects.
 */
export declare class StorageRetryPolicyFactory implements RequestPolicyFactory {
    private retryOptions?;
    /**
     * Creates an instance of StorageRetryPolicyFactory.
     * @param retryOptions -
     */
    constructor(retryOptions?: StorageRetryOptions);
    /**
     * Creates a StorageRetryPolicy object.
     *
     * @param nextPolicy -
     * @param options -
     */
    create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): StorageRetryPolicy;
}
//# sourceMappingURL=StorageRetryPolicyFactory.d.ts.map