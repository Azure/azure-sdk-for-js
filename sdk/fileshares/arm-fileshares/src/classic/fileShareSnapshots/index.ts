// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FileSharesContext } from "../../api/fileSharesContext.js";
import {
  listByFileShare,
  deleteFileShareSnapshot,
  updateFileShareSnapshot,
  createOrUpdateFileShareSnapshot,
  getFileShareSnapshot,
} from "../../api/fileShareSnapshots/operations.js";
import {
  FileShareSnapshotsListByFileShareOptionalParams,
  FileShareSnapshotsDeleteFileShareSnapshotOptionalParams,
  FileShareSnapshotsUpdateFileShareSnapshotOptionalParams,
  FileShareSnapshotsCreateOrUpdateFileShareSnapshotOptionalParams,
  FileShareSnapshotsGetFileShareSnapshotOptionalParams,
} from "../../api/fileShareSnapshots/options.js";
import { FileShareSnapshot, FileShareSnapshotUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FileShareSnapshots operations. */
export interface FileShareSnapshotsOperations {
  /** List FileShareSnapshot by FileShare. */
  listByFileShare: (
    resourceGroupName: string,
    resourceName: string,
    options?: FileShareSnapshotsListByFileShareOptionalParams,
  ) => PagedAsyncIterableIterator<FileShareSnapshot>;
  /** Delete a FileShareSnapshot. */
  deleteFileShareSnapshot: (
    resourceGroupName: string,
    resourceName: string,
    name: string,
    options?: FileShareSnapshotsDeleteFileShareSnapshotOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a FileShareSnapshot. */
  updateFileShareSnapshot: (
    resourceGroupName: string,
    resourceName: string,
    name: string,
    properties: FileShareSnapshotUpdate,
    options?: FileShareSnapshotsUpdateFileShareSnapshotOptionalParams,
  ) => PollerLike<OperationState<FileShareSnapshot>, FileShareSnapshot>;
  /** Create a FileShareSnapshot. */
  createOrUpdateFileShareSnapshot: (
    resourceGroupName: string,
    resourceName: string,
    name: string,
    resource: FileShareSnapshot,
    options?: FileShareSnapshotsCreateOrUpdateFileShareSnapshotOptionalParams,
  ) => PollerLike<OperationState<FileShareSnapshot>, FileShareSnapshot>;
  /** Get a FileShareSnapshot */
  getFileShareSnapshot: (
    resourceGroupName: string,
    resourceName: string,
    name: string,
    options?: FileShareSnapshotsGetFileShareSnapshotOptionalParams,
  ) => Promise<FileShareSnapshot>;
}

function _getFileShareSnapshots(context: FileSharesContext) {
  return {
    listByFileShare: (
      resourceGroupName: string,
      resourceName: string,
      options?: FileShareSnapshotsListByFileShareOptionalParams,
    ) => listByFileShare(context, resourceGroupName, resourceName, options),
    deleteFileShareSnapshot: (
      resourceGroupName: string,
      resourceName: string,
      name: string,
      options?: FileShareSnapshotsDeleteFileShareSnapshotOptionalParams,
    ) => deleteFileShareSnapshot(context, resourceGroupName, resourceName, name, options),
    updateFileShareSnapshot: (
      resourceGroupName: string,
      resourceName: string,
      name: string,
      properties: FileShareSnapshotUpdate,
      options?: FileShareSnapshotsUpdateFileShareSnapshotOptionalParams,
    ) =>
      updateFileShareSnapshot(context, resourceGroupName, resourceName, name, properties, options),
    createOrUpdateFileShareSnapshot: (
      resourceGroupName: string,
      resourceName: string,
      name: string,
      resource: FileShareSnapshot,
      options?: FileShareSnapshotsCreateOrUpdateFileShareSnapshotOptionalParams,
    ) =>
      createOrUpdateFileShareSnapshot(
        context,
        resourceGroupName,
        resourceName,
        name,
        resource,
        options,
      ),
    getFileShareSnapshot: (
      resourceGroupName: string,
      resourceName: string,
      name: string,
      options?: FileShareSnapshotsGetFileShareSnapshotOptionalParams,
    ) => getFileShareSnapshot(context, resourceGroupName, resourceName, name, options),
  };
}

export function _getFileShareSnapshotsOperations(
  context: FileSharesContext,
): FileShareSnapshotsOperations {
  return {
    ..._getFileShareSnapshots(context),
  };
}
