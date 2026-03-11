// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RestError } from "@azure/core-rest-pipeline";

export * from "./BlobServiceClient.js";
export * from "./Clients.js";
export * from "./ContainerClient.js";
export * from "./BlobLeaseClient.js";
export * from "./BlobBatch.js";
export * from "./BlobBatchClient.js";
export type * from "./BatchResponse.js";
export type { SasIPRange } from "./sas/SasIPRange.js";
export type { Range } from "./Range.js";
export {
  type BlobClientOptions,
  type BlobClientConfig,
  BlockBlobTier,
  type BlobImmutabilityPolicy,
  PremiumPageBlobTier,
  type Tags,
  type TagConditions,
  type ContainerRequestConditions,
  type HttpAuthorization,
  type ModificationConditions,
  type MatchConditions,
  type StorageChecksumAlgorithm,
  type AccessTierModifiedConditions,
  type RequestHeaders,
  type RequestQueryParameters,
  StorageBlobAudience,
  getBlobServiceAccountAudience,
} from "./models.js";
export {
  Pipeline,
  type PipelineLike,
  type PipelineOptions,
  isPipelineLike,
  newPipeline,
  type StoragePipelineOptions,
  type RequestPolicyFactory,
  type RequestPolicy,
  type RequestPolicyOptions,
  type WebResource,
  type HttpOperationResponse,
  type HttpHeaders,
  type HttpRequestBody,
  type IHttpClient,
  StorageOAuthScopes,
  type ServiceClientOptions,
} from "./Pipeline.js";
export type { CommonOptions } from "./StorageClient.js";
export * from "./generatedModels.js";
export { RestError };
export type {
  PageBlobGetPageRangesDiffResponse,
  PageBlobGetPageRangesResponse,
  PageList,
} from "./PageBlobRangeResponse.js";
export { logger } from "./log.js";

// Re-export from @azure/storage-common for backward compatibility
export {
  BaseRequestPolicy,
  AnonymousCredential,
  Credential,
  StorageBrowserPolicyFactory,
  StorageRetryPolicyFactory,
  type StorageRetryOptions,
  StorageRetryPolicyType,
  AnonymousCredentialPolicy,
  CredentialPolicy,
  StorageBrowserPolicy,
  StorageRetryPolicy,
  storageBrowserPolicy,
  storageRetryPolicy,
  storageCorrectContentLengthPolicy,
  type UserDelegationKey,
} from "@azure/storage-common";
