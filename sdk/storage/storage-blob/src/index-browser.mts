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
  BlockBlobTier,
  type BlobImmutabilityPolicy,
  PremiumPageBlobTier,
  type Tags,
  type TagConditions,
  type ContainerRequestConditions,
  type HttpAuthorization,
  type ModificationConditions,
  type MatchConditions,
} from "./models.js";
export {
  Pipeline,
  type PipelineLike,
  type PipelineOptions,
  isPipelineLike,
  newPipeline,
  type StoragePipelineOptions,
  RequestPolicyFactory,
  RequestPolicy,
  RequestPolicyOptions,
  WebResource,
  HttpOperationResponse,
  HttpHeaders,
  type HttpRequestBody,
  IHttpClient,
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
  StorageRetryOptions,
  StorageRetryPolicyType,
  AnonymousCredentialPolicy,
  CredentialPolicy,
  StorageBrowserPolicy,
  StorageRetryPolicy,
  storageBrowserPolicy,
  storageRetryPolicy,
  storageCorrectContentLengthPolicy,
  UserDelegationKey,
} from "@azure/storage-common";
