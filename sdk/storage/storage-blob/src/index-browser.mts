// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RestError } from "@azure/core-rest-pipeline";

export * from "./BlobServiceClient.js";
export * from "./Clients.js";
export * from "./ContainerClient.js";
export * from "./BlobLeaseClient.js";
export * from "./BlobBatch.js";
export * from "./BlobBatchClient.js";
export * from "./BatchResponse.js";
export { SasIPRange } from "./sas/SasIPRange.js";
export { Range } from "./Range.js";
export {
  BlockBlobTier,
  BlobImmutabilityPolicy,
  PremiumPageBlobTier,
  Tags,
  TagConditions,
  ContainerRequestConditions,
  HttpAuthorization,
  ModificationConditions,
  MatchConditions,
  ObjectReplicationPolicy,
  ObjectReplicationRule,
  ObjectReplicationStatus,
  AppendBlobRequestConditions,
  BlobRequestConditions,
  Metadata,
  ModifiedAccessConditions,
  PollerLikeWithCancellation,
  BlobDownloadResponseParsed,
  BlobQueryArrowField,
  BlobQueryArrowFieldType,
  PageBlobRequestConditions,
  getBlobServiceAccountAudience,
} from "./models.js";
export {
  BlobBeginCopyFromUrlPollState,
  CopyPollerBlobClient,
} from "./pollers/BlobStartCopyFromUrlPoller.js";
export * from "./sas/AccountSASPermissions.js";
export * from "./sas/BlobSASPermissions.js";
export * from "./sas/ContainerSASPermissions.js";
export * from "./sas/SASQueryParameters.js";
export {
  Pipeline,
  PipelineLike,
  PipelineOptions,
  isPipelineLike,
  newPipeline,
  StoragePipelineOptions,
  RequestPolicyFactory,
  RequestPolicy,
  RequestPolicyOptions,
  WebResource,
  HttpOperationResponse,
  HttpHeaders,
  HttpRequestBody,
  IHttpClient,
  StorageOAuthScopes,
  ServiceClientOptions,
} from "./Pipeline.js";
export * from "./StorageClient.js";
export * from "./generatedModels.js";
export { RestError };
export {
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
