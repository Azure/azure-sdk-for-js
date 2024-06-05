// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RestError } from "@azure/core-rest-pipeline";

export * from "./Clients";
export * from "../../storage-blob/src/credentials/AnonymousCredential";
export * from "../../storage-blob/src/credentials/Credential";
export { SasIPRange } from "./SasIPRange";
export { Range } from "./Range";
export {
  FilePermissionInheritType,
  FilePermissionPreserveType,
  TimeNowType,
  TimePreserveType,
  FileAttributesPreserveType,
  CloseHandlesInfo,
  HttpAuthorization,
} from "./models";
export * from "./FileSystemAttributes";
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
export * from "./StorageRetryPolicyFactory";
export * from "../../storage-blob/src/StorageBrowserPolicyFactory";
export * from "./ShareServiceClient";
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
