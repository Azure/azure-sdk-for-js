// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { DataLakeClient } from "./dataLakeClient.js";
export type {
  FileSystemList,
  FileSystemItem,
  StorageError,
  StorageErrorBody,
  PathList,
  PathItem,
  ListBlobsHierarchySegmentResponse,
  BlobHierarchyListSegment,
  BlobPrefix,
  BlobItemInternal,
  BlobPropertiesInternal,
  SetAccessControlRecursiveResponse,
  AclFailedEntry,
  AccountResourceType,
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
} from "./models/azure/storage/files/dataLake/index.js";
export {
  KnownPathExpiryOptions,
  KnownVersions,
} from "./models/azure/storage/files/dataLake/index.js";
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
