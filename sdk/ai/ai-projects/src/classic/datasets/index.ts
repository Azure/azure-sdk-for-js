// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
import {
  getCredentials,
  pendingUpload,
  createOrUpdate,
  $delete,
  get,
  list,
  listVersions,
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
    pendingUploadRequest: PendingUploadRequest,
    version: string,
    options?: DatasetsPendingUploadOptionalParams,
  ) => Promise<PendingUploadResponse>;
  /** Create a new or update an existing DatasetVersion with the given version id */
  createOrUpdate: (
    name: string,
    datasetVersion: DatasetVersionUnion,
    version: string,
    options?: DatasetsCreateOrUpdateOptionalParams,
  ) => Promise<DatasetVersionUnion>;
  /** Delete the specific version of the DatasetVersion. The service returns 204 No Content if the DatasetVersion was deleted successfully or if the DatasetVersion does not exist. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
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
      pendingUploadRequest: PendingUploadRequest,
      version: string,
      options?: DatasetsPendingUploadOptionalParams,
    ) => pendingUpload(context, name, pendingUploadRequest, version, options),
    createOrUpdate: (
      name: string,
      datasetVersion: DatasetVersionUnion,
      version: string,
      options?: DatasetsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, name, datasetVersion, version, options),
    delete: (name: string, version: string, options?: DatasetsDeleteOptionalParams) =>
      $delete(context, name, version, options),
    get: (name: string, version: string, options?: DatasetsGetOptionalParams) =>
      get(context, name, version, options),
    list: (options?: DatasetsListOptionalParams) => list(context, options),
    listVersions: (name: string, options?: DatasetsListVersionsOptionalParams) =>
      listVersions(context, name, options),
  };
}

export function _getDatasetsOperations(context: AIProjectContext): DatasetsOperations {
  return {
    ..._getDatasets(context),
  };
}
