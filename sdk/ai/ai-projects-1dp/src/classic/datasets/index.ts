// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
import {
  DatasetVersionUnion,
  PendingUploadRequest,
  PendingUploadResponse,
  AssetCredentialResponse,
} from "../../models/models.js";
import {
  DatasetsGetCredentialsOptionalParams,
  DatasetsStartPendingUploadVersionOptionalParams,
  DatasetsCreateVersionOptionalParams,
  DatasetsDeleteVersionOptionalParams,
  DatasetsGetVersionOptionalParams,
  DatasetsListLatestOptionalParams,
  DatasetsListVersionsOptionalParams,
} from "../../api/datasets/options.js";
import {
  getCredentials,
  startPendingUploadVersion,
  createVersion,
  deleteVersion,
  getVersion,
  listLatest,
  listVersions,
} from "../../api/datasets/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Datasets operations. */
export interface DatasetsOperations {
  /** Get download sas for dataset version. */
  getCredentials: (
    name: string,
    version: string,
    body: Record<string, any>,
    options?: DatasetsGetCredentialsOptionalParams,
  ) => Promise<AssetCredentialResponse>;
  /** Start a new or get an existing pending upload of a dataset for a specific version. */
  startPendingUploadVersion: (
    name: string,
    version: string,
    body: PendingUploadRequest,
    options?: DatasetsStartPendingUploadVersionOptionalParams,
  ) => Promise<PendingUploadResponse>;
  /** Create a new or replace an existing DatasetVersion with the given version id */
  createVersion: (
    name: string,
    version: string,
    body: DatasetVersionUnion,
    options?: DatasetsCreateVersionOptionalParams,
  ) => Promise<DatasetVersionUnion>;
  /** Delete the specific version of the DatasetVersion */
  deleteVersion: (
    name: string,
    version: string,
    options?: DatasetsDeleteVersionOptionalParams,
  ) => Promise<void>;
  /** Get the specific version of the DatasetVersion */
  getVersion: (
    name: string,
    version: string,
    options?: DatasetsGetVersionOptionalParams,
  ) => Promise<DatasetVersionUnion>;
  /** List the latest version of each DatasetVersion */
  listLatest: (
    options?: DatasetsListLatestOptionalParams,
  ) => PagedAsyncIterableIterator<DatasetVersionUnion>;
  /** List all versions of the given DatasetVersion */
  listVersions: (
    name: string,
    options?: DatasetsListVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<DatasetVersionUnion>;
}

function _getDatasets(context: AIProjectContext) {
  return {
    getCredentials: (
      name: string,
      version: string,
      body: Record<string, any>,
      options?: DatasetsGetCredentialsOptionalParams,
    ) => getCredentials(context, name, version, body, options),
    startPendingUploadVersion: (
      name: string,
      version: string,
      body: PendingUploadRequest,
      options?: DatasetsStartPendingUploadVersionOptionalParams,
    ) => startPendingUploadVersion(context, name, version, body, options),
    createVersion: (
      name: string,
      version: string,
      body: DatasetVersionUnion,
      options?: DatasetsCreateVersionOptionalParams,
    ) => createVersion(context, name, version, body, options),
    deleteVersion: (name: string, version: string, options?: DatasetsDeleteVersionOptionalParams) =>
      deleteVersion(context, name, version, options),
    getVersion: (name: string, version: string, options?: DatasetsGetVersionOptionalParams) =>
      getVersion(context, name, version, options),
    listLatest: (options?: DatasetsListLatestOptionalParams) => listLatest(context, options),
    listVersions: (name: string, options?: DatasetsListVersionsOptionalParams) =>
      listVersions(context, name, options),
  };
}

export function _getDatasetsOperations(context: AIProjectContext): DatasetsOperations {
  return {
    ..._getDatasets(context),
  };
}
