// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RestError } from "@azure/core-rest-pipeline";

export * from "../../storage-blob/src/credentials/AnonymousCredential.js";
export * from "../../storage-blob/src/credentials/Credential.js";
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
export { BaseRequestPolicy } from "../../storage-blob/src/policies/RequestPolicy.js";
export * from "../../storage-blob/src/policies/AnonymousCredentialPolicy.js";
export * from "../../storage-blob/src/policies/CredentialPolicy.js";
export * from "../../storage-blob/src/StorageRetryPolicyFactory.js";
export * from "../../storage-blob/src/StorageBrowserPolicyFactory.js";
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
