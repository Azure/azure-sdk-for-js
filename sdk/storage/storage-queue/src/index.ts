// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RestError } from "@azure/core-rest-pipeline";

export * from "./AccountSASPermissions.js";
export * from "./AccountSASResourceTypes.js";
export * from "./AccountSASServices.js";
export {
  AccountSASSignatureValues,
  generateAccountSASQueryParameters,
} from "./AccountSASSignatureValues.js";
export {
  AnonymousCredential,
  AnonymousCredentialPolicy,
  BaseRequestPolicy,
  Credential,
  CredentialPolicy,
  StorageBrowserPolicyFactory,
  StorageRetryPolicyFactory,
  StorageSharedKeyCredential,
  StorageSharedKeyCredentialPolicy,
} from "@azure/storage-blob";
export { SasIPRange } from "./SasIPRange.js";
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
export { Metadata, StorageQueueAudience, getQueueServiceAccountAudience } from "./models.js";
export * from "./QueueClient.js";
export * from "./QueueSASPermissions.js";
export {
  QueueSASSignatureValues,
  generateQueueSASQueryParameters,
} from "./QueueSASSignatureValues.js";
export * from "./QueueServiceClient.js";
export * from "./SASQueryParameters.js";
export { CommonOptions, ListQueuesIncludeType } from "./StorageClient.js";
export * from "./generatedModels.js";
export {
  WithResponse,
  ResponseLike,
  ResponseWithBody,
  ResponseWithHeaders,
  HttpResponse,
} from "./utils/utils.common.js";
export { RestError };
export { logger } from "./log.js";
