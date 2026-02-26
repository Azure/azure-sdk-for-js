// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RestError } from "@azure/core-rest-pipeline";

export * from "./Clients.js";

export {
  AnonymousCredential,
  Credential,
  BaseRequestPolicy,
  AnonymousCredentialPolicy,
  CredentialPolicy,
  StorageRetryOptions,
  StorageRetryPolicyType,
  StorageRetryPolicy,
  StorageRetryPolicyFactory,
  StorageBrowserPolicyFactory,
  UserDelegationKey,
} from "@azure/storage-common";

export type { SasIPRange } from "./SasIPRange.js";
export type { Range } from "./Range.js";
export type {
  FilePermissionInheritType,
  FilePermissionPreserveType,
  TimeNowType,
  TimePreserveType,
  FileAttributesPreserveType,
  CloseHandlesInfo,
  HttpAuthorization,
} from "./models.js";
export {
  parseOctalFileMode,
  toOctalFileMode,
  parseSymbolicFileMode,
  toSymbolicFileMode,
} from "./utils/utils.common.js";
export * from "./FileSystemAttributes.js";
export {
  Pipeline,
  type PipelineLike,
  type PipelineOptions,
  isPipelineLike,
  newPipeline,
  type StoragePipelineOptions,
  type ServiceClientOptions,
} from "./Pipeline.js";
export * from "./ShareServiceClient.js";
export type { CommonOptions } from "./StorageClient.js";
export * from "./generatedModels.js";
export type {
  WithResponse,
  ResponseLike,
  ResponseWithBody,
  ResponseWithHeaders,
  HttpResponse,
} from "./utils/utils.common.js";
export { RestError };
export { logger } from "./log.js";
