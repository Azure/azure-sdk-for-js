// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RestError } from "@azure/core-rest-pipeline";

export * from "./AccountSASPermissions.js";
export * from "./AccountSASResourceTypes.js";
export * from "./AccountSASServices.js";
export {
  type AccountSASSignatureValues,
  generateAccountSASQueryParameters,
} from "./AccountSASSignatureValues.js";
export type { SasIPRange } from "./SasIPRange.js";

export {
  AnonymousCredential,
  Credential,
  StorageSharedKeyCredential,
  BaseRequestPolicy,
  AnonymousCredentialPolicy,
  CredentialPolicy,
  StorageRetryOptions,
  StorageRetryPolicyType,
  StorageRetryPolicy,
  StorageRetryPolicyFactory,
  StorageSharedKeyCredentialPolicy,
  StorageBrowserPolicyFactory,
  UserDelegationKey,
  CredentialPolicyCreator,
} from "@azure/storage-common";

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

export { type Metadata, StorageQueueAudience, getQueueServiceAccountAudience } from "./models.js";
export * from "./QueueClient.js";
export * from "./QueueSASPermissions.js";
export {
  type QueueSASSignatureValues,
  generateQueueSASQueryParameters,
} from "./QueueSASSignatureValues.js";
export * from "./QueueServiceClient.js";
export * from "./SASQueryParameters.js";
export type { CommonOptions, ListQueuesIncludeType } from "./StorageClient.js";
export type * from "./generatedModels.js";
export type {
  WithResponse,
  ResponseLike,
  ResponseWithBody,
  ResponseWithHeaders,
  HttpResponse,
} from "./utils/utils.common.js";
export { RestError };
export { logger } from "./log.js";
