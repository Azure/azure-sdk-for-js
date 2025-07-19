// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RestError } from "@azure/core-rest-pipeline";
export { AnonymousCredential } from "@azure/storage-blob";
export { Credential } from "@azure/storage-blob";
export { SasIPRange } from "./SasIPRange.js";
export {
  Pipeline,
  PipelineLike,
  PipelineOptions,
  isPipelineLike,
  newPipeline,
  StoragePipelineOptions,
  ServiceClientOptions,
} from "./Pipeline.js";
export { BaseRequestPolicy } from "@azure/storage-blob";
export { AnonymousCredentialPolicy } from "@azure/storage-blob";
export { CredentialPolicy } from "@azure/storage-blob";
export { StorageRetryPolicyFactory } from "@azure/storage-blob";
export { StorageBrowserPolicyFactory } from "@azure/storage-blob";
export { Metadata } from "./models.js";
export * from "./QueueClient.js";
export * from "./QueueSASPermissions.js";
export * from "./QueueServiceClient.js";
export { CommonOptions } from "./StorageClient.js";
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
