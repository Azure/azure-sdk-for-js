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
export * from "./FileSASPermissions.js";
export {
  parseOctalFileMode,
  toOctalFileMode,
  parseSymbolicFileMode,
  toSymbolicFileMode,
} from "./utils/utils.common.js";
export {
  FileSASSignatureValues,
  generateFileSASQueryParameters,
} from "./FileSASSignatureValues.js";
export * from "./Clients.js";
export * from "./ShareSASPermissions.js";
export * from "../../storage-blob/src/credentials/AnonymousCredential.js";
export * from "../../storage-blob/src/credentials/Credential.js";
export * from "../../storage-blob/src/credentials/StorageSharedKeyCredential.js";
export { SasIPRange } from "./SasIPRange.js";
export { Range } from "./Range.js";
export {
  FileAndDirectoryCreateCommonOptions,
  FileAndDirectorySetPropertiesCommonOptions,
  FileHttpHeaders,
  FilePermissionInheritType,
  FilePermissionPreserveType,
  PosixRolePermissions,
  NfsFileMode,
  FilePosixProperties,
  Metadata,
  TimeNowType,
  TimePreserveType,
  FileAttributesPreserveType,
  CloseHandlesInfo,
  ShareProtocols,
  HttpAuthorization,
  StorageFileAudience,
  getFileServiceAccountAudience,
} from "./models.js";
export * from "./FileSystemAttributes.js";
export { BaseRequestPolicy } from "@azure/storage-blob";
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
export { AnonymousCredentialPolicy } from "@azure/storage-blob";
export { CredentialPolicy } from "@azure/storage-blob";
export * from "./StorageRetryPolicyFactory.js";
export { StorageSharedKeyCredentialPolicy } from "@azure/storage-blob";
export { StorageBrowserPolicyFactory } from "@azure/storage-blob";
export * from "./ShareServiceClient.js";
export * from "./SASQueryParameters.js";
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
