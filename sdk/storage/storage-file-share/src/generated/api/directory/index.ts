// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  rename,
  forceCloseHandles,
  listHandles,
  listFilesAndDirectoriesSegment,
  setMetadata,
  setProperties,
  $delete,
  getProperties,
  create,
} from "./operations.js";
export type {
  DirectoryRenameOptionalParams,
  DirectoryForceCloseHandlesOptionalParams,
  DirectoryListHandlesOptionalParams,
  DirectoryListFilesAndDirectoriesSegmentOptionalParams,
  DirectorySetMetadataOptionalParams,
  DirectorySetPropertiesOptionalParams,
  DirectoryDeleteOptionalParams,
  DirectoryGetPropertiesOptionalParams,
  DirectoryCreateOptionalParams,
} from "./options.js";
