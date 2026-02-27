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
export * from "./FileSASPermissions.js";
export {
  parseOctalFileMode,
  toOctalFileMode,
  parseSymbolicFileMode,
  toSymbolicFileMode,
} from "./utils/utils.common.js";
export {
  type FileSASSignatureValues,
  generateFileSASQueryParameters,
} from "./FileSASSignatureValues.js";
export * from "./Clients.js";
export * from "./ShareSASPermissions.js";

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

export type { SasIPRange } from "./SasIPRange.js";
export type { Range } from "./Range.js";
export {
  type FileAndDirectoryCreateCommonOptions,
  type FileAndDirectorySetPropertiesCommonOptions,
  type FileHttpHeaders,
  type FilePermissionInheritType,
  type FilePermissionPreserveType,
  type PosixRolePermissions,
  type NfsFileMode,
  type FilePosixProperties,
  type Metadata,
  type TimeNowType,
  type TimePreserveType,
  type FileAttributesPreserveType,
  type CloseHandlesInfo,
  type ShareProtocols,
  type HttpAuthorization,
  StorageFileAudience,
  getFileServiceAccountAudience,
} from "./models.js";
export * from "./FileSystemAttributes.js";
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
export * from "./ShareServiceClient.js";
export * from "./SASQueryParameters.js";
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
