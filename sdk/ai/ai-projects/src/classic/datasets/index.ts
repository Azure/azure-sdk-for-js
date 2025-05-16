// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/* eslint-disable tsdoc/syntax */

import { AIProjectContext } from "../../api/aiProjectContext.js";
import {
  DatasetVersionUnion,
  PendingUploadRequest,
  PendingUploadResponse,
  AssetCredentialResponse,
} from "../../models/models.js";
import {
  DatasetsGetCredentialsOptionalParams,
  DatasetsPendingUploadOptionalParams,
  DatasetsCreateOrUpdateOptionalParams,
  DatasetsDeleteOptionalParams,
  DatasetsGetOptionalParams,
  DatasetsListOptionalParams,
  DatasetsListVersionsOptionalParams,
} from "../../api/datasets/options.js";
import {
  getCredentials,
  pendingUpload,
  createOrUpdate,
  $delete,
  get,
  list,
  listVersions,
  uploadFile,
  uploadFolder,
} from "../../api/datasets/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Datasets operations. */
export interface DatasetsOperations {
  /** Get the SAS credential to access the storage account associated with a Dataset version. */
  getCredentials: (
    name: string,
    version: string,
    options?: DatasetsGetCredentialsOptionalParams,
  ) => Promise<AssetCredentialResponse>;
  /** Start a new or get an existing pending upload of a dataset for a specific version. */
  pendingUpload: (
    name: string,
    version: string,
    body: PendingUploadRequest,
    options?: DatasetsPendingUploadOptionalParams,
  ) => Promise<PendingUploadResponse>;
  /** Create a new or update an existing DatasetVersion with the given version id */
  createOrUpdate: (
    name: string,
    version: string,
    body: DatasetVersionUnion,
    options?: DatasetsCreateOrUpdateOptionalParams,
  ) => Promise<DatasetVersionUnion>;
  /** Delete the specific version of the DatasetVersion */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (name: string, version: string, options?: DatasetsDeleteOptionalParams) => Promise<void>;
  /** Get the specific version of the DatasetVersion */
  get: (
    name: string,
    version: string,
    options?: DatasetsGetOptionalParams,
  ) => Promise<DatasetVersionUnion>;
  /** List the latest version of each DatasetVersion */
  list: (options?: DatasetsListOptionalParams) => PagedAsyncIterableIterator<DatasetVersionUnion>;
  /** List all versions of the given DatasetVersion */
  listVersions: (
    name: string,
    options?: DatasetsListVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<DatasetVersionUnion>;
  /** Upload a file to the DatasetVersion */
  uploadFile: (
    name: string,
    version: string,
    filePath: string,
    connectionName?: string,
  ) => Promise<DatasetVersionUnion>;
  /** Upload a folder to the DatasetVersion */
  uploadFolder: (
    name: string,
    version: string,
    folderPath: string,
    connectionName?: string,
  ) => Promise<DatasetVersionUnion>;
}

function _getDatasets(context: AIProjectContext) {
  return {
    getCredentials: (
      name: string,
      version: string,
      options?: DatasetsGetCredentialsOptionalParams,
    ) => getCredentials(context, name, version, options),
    pendingUpload: (
      name: string,
      version: string,
      body: PendingUploadRequest,
      options?: DatasetsPendingUploadOptionalParams,
    ) => pendingUpload(context, name, version, body, options),
    createOrUpdate: (
      name: string,
      version: string,
      body: DatasetVersionUnion,
      options?: DatasetsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, name, version, body, options),
    delete: (name: string, version: string, options?: DatasetsDeleteOptionalParams) =>
      $delete(context, name, version, options),
    get: (name: string, version: string, options?: DatasetsGetOptionalParams) =>
      get(context, name, version, options),
    list: (options?: DatasetsListOptionalParams) => list(context, options),
    listVersions: (name: string, options?: DatasetsListVersionsOptionalParams) =>
      listVersions(context, name, options),
    uploadFile: (name: string, version: string, filePath: string, connectionName?: string) =>
      uploadFile(context, name, version, filePath, connectionName),
    uploadFolder: (name: string, version: string, folderPath: string, connectionName?: string) =>
      uploadFolder(context, name, version, folderPath, connectionName),
  };
}

export function _getDatasetsOperations(context: AIProjectContext): DatasetsOperations {
  return {
    ..._getDatasets(context),
  };
}
