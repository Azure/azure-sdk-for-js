// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RestError } from "@azure/core-rest-pipeline";
export type { SasIPRange } from "./SasIPRange.js";
export {
  Pipeline,
  type PipelineLike,
  type PipelineOptions,
  isPipelineLike,
  newPipeline,
  type StoragePipelineOptions,
  type ServiceClientOptions,
} from "./Pipeline.js";
export {
  AnonymousCredential,
  BaseRequestPolicy,
  Credential,
  AnonymousCredentialPolicy,
  CredentialPolicy,
  StorageRetryPolicyFactory,
  StorageBrowserPolicyFactory,
  UserDelegationKey,
} from "@azure/storage-common";
export type { Metadata } from "./models.js";
export * from "./QueueClient.js";
export * from "./QueueSASPermissions.js";
export * from "./QueueServiceClient.js";
export type { CommonOptions } from "./StorageClient.js";
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
