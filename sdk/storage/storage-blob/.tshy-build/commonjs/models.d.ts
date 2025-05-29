import type { AbortSignalLike } from "@azure/abort-controller";
import type { CancelOnProgress, PollOperationState } from "@azure/core-lro";
import type { BlobImmutabilityPolicyMode } from "./generatedModels.js";
import type { LeaseAccessConditions, SequenceNumberAccessConditions, AppendPositionAccessConditions, AccessTier, CpkInfo, BlobDownloadResponseModel } from "./generatedModels.js";
/**
 * Blob tags.
 */
export type Tags = Record<string, string>;
/**
 * A map of name-value pairs to associate with the resource.
 */
export interface Metadata {
    /**
     * A name-value pair.
     */
    [propertyName: string]: string;
}
/**
 * standard HTTP conditional headers and tags condition.
 */
export interface ModifiedAccessConditions extends MatchConditions, ModificationConditions, TagConditions {
}
/**
 * standard HTTP conditional headers, tags condition and lease condition
 */
export interface BlobRequestConditions extends ModifiedAccessConditions, LeaseAccessConditions {
}
/**
 * Conditions to add to the creation of this page blob.
 */
export interface PageBlobRequestConditions extends BlobRequestConditions, SequenceNumberAccessConditions {
}
/**
 * Conditions to add to the creation of this append blob.
 */
export interface AppendBlobRequestConditions extends BlobRequestConditions, AppendPositionAccessConditions {
}
/**
 * Specifies HTTP options for conditional requests based on modification time.
 */
export interface ModificationConditions {
    /**
     * Specify this header value to operate only on a blob if it has been modified since the
     * specified date/time.
     */
    ifModifiedSince?: Date;
    /**
     * Specify this header value to operate only on a blob if it has not been modified since the
     * specified date/time.
     */
    ifUnmodifiedSince?: Date;
}
/**
 * Specifies HTTP options for conditional requests based on ETag matching.
 */
export interface MatchConditions {
    /**
     * Specify an ETag value to operate only on blobs with a matching value.
     */
    ifMatch?: string;
    /**
     * Specify an ETag value to operate only on blobs without a matching value.
     */
    ifNoneMatch?: string;
}
/**
 * Specifies HTTP options for conditional requests based on blob tags.
 */
export interface TagConditions {
    /**
     * Optional SQL statement to apply to the tags of the blob.
     */
    tagConditions?: string;
}
/**
 * Conditions to meet for the container.
 */
export interface ContainerRequestConditions extends LeaseAccessConditions, ModificationConditions {
}
/**
 * Represents the access tier on a blob.
 * For detailed information about block blob level tiering see {@link https://learn.microsoft.com/azure/storage/blobs/storage-blob-storage-tiers|Hot, cool and archive storage tiers.}
 */
export declare enum BlockBlobTier {
    /**
     * Optimized for storing data that is accessed frequently.
     */
    Hot = "Hot",
    /**
     * Optimized for storing data that is infrequently accessed and stored for at least 30 days.
     */
    Cool = "Cool",
    /**
     * Optimized for storing data that is rarely accessed.
     */
    Cold = "Cold",
    /**
     * Optimized for storing data that is rarely accessed and stored for at least 180 days
     * with flexible latency requirements (on the order of hours).
     */
    Archive = "Archive"
}
/**
 * Specifies the page blob tier to set the blob to. This is only applicable to page blobs on premium storage accounts.
 * Please see {@link https://learn.microsoft.com/azure/storage/storage-premium-storage#scalability-and-performance-targets|here}
 * for detailed information on the corresponding IOPS and throughput per PageBlobTier.
 */
export declare enum PremiumPageBlobTier {
    /**
     * P4 Tier.
     */
    P4 = "P4",
    /**
     * P6 Tier.
     */
    P6 = "P6",
    /**
     * P10 Tier.
     */
    P10 = "P10",
    /**
     * P15 Tier.
     */
    P15 = "P15",
    /**
     * P20 Tier.
     */
    P20 = "P20",
    /**
     * P30 Tier.
     */
    P30 = "P30",
    /**
     * P40 Tier.
     */
    P40 = "P40",
    /**
     * P50 Tier.
     */
    P50 = "P50",
    /**
     * P60 Tier.
     */
    P60 = "P60",
    /**
     * P70 Tier.
     */
    P70 = "P70",
    /**
     * P80 Tier.
     */
    P80 = "P80"
}
export declare function toAccessTier(tier: BlockBlobTier | PremiumPageBlobTier | string | undefined): AccessTier | undefined;
export declare function ensureCpkIfSpecified(cpk: CpkInfo | undefined, isHttps: boolean): void;
/**
 * Specifies the Replication Status of a blob. This is used when a storage account has
 * Object Replication Policy(s) applied. See {@link ObjectReplicationPolicy} and {@link ObjectReplicationRule}.
 */
export type ObjectReplicationStatus = "complete" | "failed";
/**
 * Contains the Object Replication Rule ID and {@link ObjectReplicationStatus} of a blob.
 * There can be more than one {@link ObjectReplicationRule} under a {@link ObjectReplicationPolicy}.
 */
export interface ObjectReplicationRule {
    /**
     * The Object Replication Rule ID.
     */
    ruleId: string;
    /**
     * The Replication Status
     */
    replicationStatus: ObjectReplicationStatus;
}
/**
 * Contains Object Replication Policy ID and the respective list of {@link ObjectReplicationRule}.
 * This is used when retrieving the Object Replication Properties on the source blob. The policy id for the
 * destination blob is set in ObjectReplicationDestinationPolicyId of the respective method responses
 * (e.g. {@link BlobProperties.ObjectReplicationDestinationPolicyId}.
 */
export interface ObjectReplicationPolicy {
    /**
     * The Object Replication Policy ID.
     */
    policyId: string;
    /**
     * The Rule ID(s) and respective Replication Status(s) that are under the Policy ID.
     */
    rules: ObjectReplicationRule[];
}
/**
 * Contains response data for the {@link BlobClient.download} operation.
 */
export interface BlobDownloadResponseParsed extends BlobDownloadResponseModel {
    /**
     * Parsed Object Replication Policy Id, Rule Id(s) and status of the source blob.
     */
    objectReplicationSourceProperties?: ObjectReplicationPolicy[];
    /**
     * Object Replication Policy Id of the destination blob.
     */
    objectReplicationDestinationPolicyId?: string;
}
/**
 * The type of a {@link BlobQueryArrowField}.
 */
export type BlobQueryArrowFieldType = "int64" | "bool" | "timestamp[ms]" | "string" | "double" | "decimal";
/**
 * Describe a field in {@link BlobQueryArrowConfiguration}.
 */
export interface BlobQueryArrowField {
    /**
     * The type of the field.
     */
    type: BlobQueryArrowFieldType;
    /**
     * The name of the field.
     */
    name?: string;
    /**
     * The precision of the field. Required if type is "decimal".
     */
    precision?: number;
    /**
     * The scale of the field.  Required if type is is "decimal".
     */
    scale?: number;
}
/**
 * Describe immutable policy for blob.
 */
export interface BlobImmutabilityPolicy {
    /**
     * Specifies the date time when the blobs immutability policy is set to expire.
     */
    expiriesOn?: Date;
    /**
     * Specifies the immutability policy mode to set on the blob.
     */
    policyMode?: BlobImmutabilityPolicyMode;
}
/**
 * Represents authentication information in Authorization, ProxyAuthorization,
 * WWW-Authenticate, and Proxy-Authenticate header values.
 */
export interface HttpAuthorization {
    /**
     * The scheme to use for authorization.
     */
    scheme: string;
    /**
     * the credentials containing the authentication information of the user agent for the resource being requested.
     */
    value: string;
}
/**
 * Defines the known cloud audiences for Storage.
 */
export declare enum StorageBlobAudience {
    /**
     * The OAuth scope to use to retrieve an AAD token for Azure Storage.
     */
    StorageOAuthScopes = "https://storage.azure.com/.default",
    /**
     * The OAuth scope to use to retrieve an AAD token for Azure Disk.
     */
    DiskComputeOAuthScopes = "https://disk.compute.azure.com/.default"
}
/**
 *
 * To get OAuth audience for a storage account for blob service.
 */
export declare function getBlobServiceAccountAudience(storageAccountName: string): string;
/**
 * Abstract representation of a poller, intended to expose just the minimal API that the user needs to work with.
 */
export interface PollerLikeWithCancellation<TState extends PollOperationState<TResult>, TResult> {
    /**
     * Returns a promise that will resolve once a single polling request finishes.
     * It does this by calling the update method of the Poller's operation.
     */
    poll(options?: {
        abortSignal?: AbortSignalLike;
    }): Promise<void>;
    /**
     * Returns a promise that will resolve once the underlying operation is completed.
     */
    pollUntilDone(): Promise<TResult>;
    /**
     * Invokes the provided callback after each polling is completed,
     * sending the current state of the poller's operation.
     *
     * It returns a method that can be used to stop receiving updates on the given callback function.
     */
    onProgress(callback: (state: TState) => void): CancelOnProgress;
    /**
     * Returns true if the poller has finished polling.
     */
    isDone(): boolean;
    /**
     * Stops the poller. After this, no manual or automated requests can be sent.
     */
    stopPolling(): void;
    /**
     * Returns true if the poller is stopped.
     */
    isStopped(): boolean;
    /**
     * Attempts to cancel the underlying operation.
     */
    cancelOperation(options?: {
        abortSignal?: AbortSignalLike;
    }): Promise<void>;
    /**
     * Returns the state of the operation.
     * The TState defined in PollerLike can be a subset of the TState defined in
     * the Poller implementation.
     */
    getOperationState(): TState;
    /**
     * Returns the result value of the operation,
     * regardless of the state of the poller.
     * It can return undefined or an incomplete form of the final TResult value
     * depending on the implementation.
     */
    getResult(): TResult | undefined;
    /**
     * Returns a serialized version of the poller's operation
     * by invoking the operation's toString method.
     */
    toString(): string;
}
//# sourceMappingURL=models.d.ts.map