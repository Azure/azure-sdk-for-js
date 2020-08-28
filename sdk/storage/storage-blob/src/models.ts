// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  ModifiedAccessConditions,
  LeaseAccessConditions,
  SequenceNumberAccessConditions,
  AppendPositionAccessConditions,
  AccessTier,
  CpkInfo,
  BlobDownloadResponseModel
} from "./generatedModels";
import { EncryptionAlgorithmAES25 } from "./utils/constants";

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
 * Conditions to add to the creation of this blob.
 */
export interface BlobRequestConditions extends ModifiedAccessConditions, LeaseAccessConditions {}

/**
 * Conditions to add to the creation of this page blob.
 */
export interface PageBlobRequestConditions
  extends BlobRequestConditions,
    SequenceNumberAccessConditions {}

/**
 * Conditions to add to the creation of this append blob.
 */
export interface AppendBlobRequestConditions
  extends BlobRequestConditions,
    AppendPositionAccessConditions {}

/**
 * Represents the access tier on a blob.
 * For detailed information about block blob level tiering see {@link https://docs.microsoft.com/azure/storage/blobs/storage-blob-storage-tiers|Hot, cool and archive storage tiers.}
 */
export enum BlockBlobTier {
  /**
   * Optimized for storing data that is accessed frequently.
   */
  Hot = "Hot",
  /**
   * Optimized for storing data that is infrequently accessed and stored for at least 30 days.
   */
  Cool = "Cool",
  /**
   * Optimized for storing data that is rarely accessed and stored for at least 180 days
   * with flexible latency requirements (on the order of hours).
   */
  Archive = "Archive"
}

/**
 * Specifies the page blob tier to set the blob to. This is only applicable to page blobs on premium storage accounts.
 * Please see {@link https://docs.microsoft.com/azure/storage/storage-premium-storage#scalability-and-performance-targets|here}
 * for detailed information on the corresponding IOPS and throughput per PageBlobTier.
 */
export enum PremiumPageBlobTier {
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

export function toAccessTier(
  tier: BlockBlobTier | PremiumPageBlobTier | string | undefined
): AccessTier | undefined {
  if (tier == undefined) {
    return undefined;
  }

  return tier as AccessTier; // No more check if string is a valid AccessTier, and left this to underlay logic to decide(service).
}

export function ensureCpkIfSpecified(cpk: CpkInfo | undefined, isHttps: boolean) {
  if (cpk && !isHttps) {
    throw new RangeError("Customer-provided encryption key must be used over HTTPS.");
  }

  if (cpk && !cpk.encryptionAlgorithm) {
    cpk.encryptionAlgorithm = EncryptionAlgorithmAES25;
  }
}

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
   *
   * @type {string}
   * @memberof ObjectReplicationRule
   */
  ruleId: string;

  /**
   * The Replication Status
   *
   * @type {ObjectReplicationStatus}
   * @memberof ObjectReplicationRule
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
   *
   * @type {string}
   * @memberof ObjectReplicationPolicy
   */
  policyId: string;

  /**
   * The Rule ID(s) and respective Replication Status(s) that are under the Policy ID.
   *
   * @type {string}
   * @memberof ObjectReplicationPolicy
   */
  rules: ObjectReplicationRule[];
}

/**
 * Contains response data for the {@link BlobClient.download} operation.
 *
 * @export
 * @interface BlobDownloadResponseParsed
 */
export interface BlobDownloadResponseParsed extends BlobDownloadResponseModel {
  /**
   * Parsed Object Replication Policy Id, Rule Id(s) and status of the source blob.
   *
   * @type {ObjectReplicationPolicy[]}
   * @memberof BlobDownloadResponseParsed
   */
  objectReplicationSourceProperties?: ObjectReplicationPolicy[];

  /**
   * Object Replication Policy Id of the destination blob.
   *
   * @type {string}
   * @memberof BlobDownloadResponseParsed
   */
  objectReplicationDestinationPolicyId?: string;
}
