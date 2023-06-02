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
} from "./models";
export * from "./FileSystemAttributes";
export * from "../../storage-blob/src/Pipeline";
export * from "../../storage-blob/src/policies/AnonymousCredentialPolicy";
export * from "../../storage-blob/src/policies/CredentialPolicy";
export * from "../../storage-blob/src/StorageRetryPolicyFactory";
export * from "../../storage-blob/src/policies/StorageSharedKeyCredentialPolicy";
export * from "../../storage-blob/src/StorageBrowserPolicyFactory";
export * from "./ShareServiceClient";
export * from "./SASQueryParameters";
export { CommonOptions } from "./StorageClient";
export * from "./generatedModels";
export { RestError };
export { logger } from "./log";
