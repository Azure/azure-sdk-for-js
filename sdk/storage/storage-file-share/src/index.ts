// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RestError } from "@azure/core-rest-pipeline";

export * from "./AccountSASPermissions";
export * from "./AccountSASResourceTypes";
export * from "./AccountSASServices";
export * from "./AccountSASSignatureValues";
export * from "./FileSASPermissions";
export * from "./FileSASSignatureValues";
export * from "./Clients";
export * from "./ShareSASPermissions";
export * from "../../storage-blob/src/credentials/AnonymousCredential";
export * from "../../storage-blob/src/credentials/Credential";
export * from "../../storage-blob/src/credentials/StorageSharedKeyCredential";
export { SasIPRange } from "./SasIPRange";
export { Range } from "./Range";
export {
  FileAndDirectoryCreateCommonOptions,
  FileAndDirectorySetPropertiesCommonOptions,
  FileHttpHeaders,
  FilePermissionInheritType,
  FilePermissionPreserveType,
  Metadata,
  TimeNowType,
  TimePreserveType,
  FileAttributesPreserveType,
  CloseHandlesInfo,
  ShareProtocols,
  HttpAuthorization,
  StorageFileAudience,
  getFileServiceAccountAudience,
} from "./models";
export * from "./FileSystemAttributes";
export { BaseRequestPolicy } from "../../storage-blob/src/policies/RequestPolicy";
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
} from "./Pipeline";
export * from "../../storage-blob/src/policies/AnonymousCredentialPolicy";
export * from "../../storage-blob/src/policies/CredentialPolicy";
export * from "./StorageRetryPolicyFactory";
export * from "../../storage-blob/src/policies/StorageSharedKeyCredentialPolicy";
export * from "../../storage-blob/src/StorageBrowserPolicyFactory";
export * from "./ShareServiceClient";
export * from "./SASQueryParameters";
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
