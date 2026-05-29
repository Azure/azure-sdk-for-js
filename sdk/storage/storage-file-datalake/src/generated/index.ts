// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { DataLakeClient } from "./dataLakeClient.js";
export type {
  StorageError,
  StorageErrorBody,
  PathList,
  PathItem,
  ListBlobsHierarchySegmentResponse,
  BlobHierarchyListSegment,
  BlobPrefix,
  BlobItemModel,
  BlobPropertiesModel,
  SetAccessControlRecursiveResponse,
  AclFailedEntry,
  FileSystemList,
  FileSystemItem,
  FileSystemResourceType,
  ListBlobsIncludeItem,
  ListBlobsShowOnly,
  PathResourceType,
  PathRenameMode,
  EncryptionAlgorithmType,
  PathExpiryOptions,
  PathUpdateAction,
  PathSetAccessControlRecursiveMode,
  PathLeaseAction,
  PathGetPropertiesAction,
  LeaseAction,
  AccountResourceType,
  PathReadResponse,
} from "./models/index.js";
export { KnownPathExpiryOptions, KnownVersions } from "./models/index.js";
export type { DataLakeClientOptionalParams } from "./api/index.js";
export type {
  FileSystemListBlobHierarchySegmentOptionalParams,
  FileSystemListPathsOptionalParams,
  FileSystemDeleteOptionalParams,
  FileSystemGetPropertiesOptionalParams,
  FileSystemSetPropertiesOptionalParams,
  FileSystemCreateOptionalParams,
} from "./api/fileSystem/index.js";
export type {
  PathUndeleteOptionalParams,
  PathSetExpiryOptionalParams,
  PathAppendDataOptionalParams,
  PathFlushDataOptionalParams,
  PathSetAccessControlRecursiveOptionalParams,
  PathSetAccessControlOptionalParams,
  PathDeleteOptionalParams,
  PathGetPropertiesOptionalParams,
  PathReadOptionalParams,
  PathLeaseOptionalParams,
  PathUpdateOptionalParams,
  PathCreateOptionalParams,
} from "./api/path/index.js";
export type { ServiceListFileSystemsOptionalParams } from "./api/service/index.js";
export type { FileSystemOperations, PathOperations, ServiceOperations } from "./classic/index.js";
