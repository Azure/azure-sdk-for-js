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

export { SasIPRange } from "./SasIPRange.js";
export { Range } from "./Range.js";
export {
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
  PipelineLike,
  PipelineOptions,
  isPipelineLike,
  newPipeline,
  StoragePipelineOptions,
  ServiceClientOptions,
} from "./Pipeline.js";
export * from "./ShareServiceClient.js";
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
