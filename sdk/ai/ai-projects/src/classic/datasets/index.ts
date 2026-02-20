// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectClientOptionalParams, AIProjectContext } from "../../api/aiProjectContext.js";
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
  DatasetVersionUnion,
  PendingUploadRequest,
  PendingUploadResponse,
  DatasetCredential,
} from "../../models/models.js";
import { DatasetUploadOptions } from "../../api/index.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Datasets operations. */
export interface DatasetsOperations {
  /** Get the SAS credential to access the storage account associated with a Dataset version. */
  getCredentials: (
    name: string,
    version: string,
    options?: DatasetsGetCredentialsOptionalParams,
  ) => Promise<DatasetCredential>;
  /** Start a new or get an existing pending upload of a dataset for a specific version. */
  pendingUpload: (
    name: string,
    version: string,
    pendingUploadRequest: PendingUploadRequest,
    options?: DatasetsPendingUploadOptionalParams,
  ) => Promise<PendingUploadResponse>;
  /** Create a new or update an existing DatasetVersion with the given version id */
  createOrUpdate: (
    name: string,
    version: string,
    datasetVersion: DatasetVersionUnion,
    options?: DatasetsCreateOrUpdateOptionalParams,
  ) => Promise<DatasetVersionUnion>;
  /** Delete the specific version of the DatasetVersion. The service returns 204 No Content if the DatasetVersion was deleted successfully or if the DatasetVersion does not exist. */
  delete: (name: string, version: string, options?: DatasetsDeleteOptionalParams) => Promise<void>;
  /** Get the specific version of the DatasetVersion. The service returns 404 Not Found error if the DatasetVersion does not exist. */
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
    options?: DatasetUploadOptions,
  ) => Promise<DatasetVersionUnion>;
  /** Upload a folder to the DatasetVersion */
  uploadFolder: (
    name: string,
    version: string,
    folderPath: string,
    options?: DatasetUploadOptions,
  ) => Promise<DatasetVersionUnion>;
}

function _getDatasets(
  context: AIProjectContext,
  projectOptions: AIProjectClientOptionalParams = {},
) {
  return {
    getCredentials: (
      name: string,
      version: string,
      options?: DatasetsGetCredentialsOptionalParams,
    ) => getCredentials(context, name, version, options),
    pendingUpload: (
      name: string,
      version: string,
      pendingUploadRequest: PendingUploadRequest,
      options?: DatasetsPendingUploadOptionalParams,
    ) => pendingUpload(context, name, version, pendingUploadRequest, options),
    createOrUpdate: (
      name: string,
      version: string,
      datasetVersion: DatasetVersionUnion,
      options?: DatasetsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, name, version, datasetVersion, options),
    delete: (name: string, version: string, options?: DatasetsDeleteOptionalParams) =>
      $delete(context, name, version, options),
    get: (name: string, version: string, options?: DatasetsGetOptionalParams) =>
      get(context, name, version, options),
    list: (options?: DatasetsListOptionalParams) => list(context, options),
    listVersions: (name: string, options?: DatasetsListVersionsOptionalParams) =>
      listVersions(context, name, options),
    uploadFile: (name: string, version: string, filePath: string, options?: DatasetUploadOptions) =>
      uploadFile(context, name, version, filePath, { ...options, projectOptions }),
    uploadFolder: (
      name: string,
      version: string,
      folderPath: string,
      options?: DatasetUploadOptions,
    ) => uploadFolder(context, name, version, folderPath, { ...options, projectOptions }),
  };
}

export function _getDatasetsOperations(
  context: AIProjectContext,
  projectOptions: AIProjectClientOptionalParams = {},
): DatasetsOperations {
  return {
    ..._getDatasets(context, projectOptions),
  };
}
