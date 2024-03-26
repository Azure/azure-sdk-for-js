// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RestError } from "@azure/core-rest-pipeline";

export * from "../../storage-blob/src/credentials/AnonymousCredential";
export * from "../../storage-blob/src/credentials/Credential";
export { SasIPRange } from "./SasIPRange";
export {
  Pipeline,
  PipelineLike,
  PipelineOptions,
  isPipelineLike,
  newPipeline,
  StoragePipelineOptions,
  ServiceClientOptions,
} from "./Pipeline";
export { BaseRequestPolicy } from "../../storage-blob/src/policies/RequestPolicy";
export * from "../../storage-blob/src/policies/AnonymousCredentialPolicy";
export * from "../../storage-blob/src/policies/CredentialPolicy";
export * from "../../storage-blob/src/StorageRetryPolicyFactory";
export * from "../../storage-blob/src/StorageBrowserPolicyFactory";
export { Metadata } from "./models";
export * from "./QueueClient";
export * from "./QueueSASPermissions";
export * from "./QueueServiceClient";
export { CommonOptions } from "./StorageClient";
export * from "./generatedModels";
export {
  WithResponse,
  ResponseLike,
  ResponseWithBody,
  ResponseWithHeaders,
  HttpResponse,
} from "./utils/utils.common";
export { RestError };
export { logger } from "./log";
