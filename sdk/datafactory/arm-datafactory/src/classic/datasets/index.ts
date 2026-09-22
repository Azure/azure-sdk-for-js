// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementContext } from "../../api/dataFactoryManagementContext.js";
import { listByFactory, $delete, createOrUpdate, get } from "../../api/datasets/operations.js";
import {
  DatasetsListByFactoryOptionalParams,
  DatasetsDeleteOptionalParams,
  DatasetsCreateOrUpdateOptionalParams,
  DatasetsGetOptionalParams,
} from "../../api/datasets/options.js";
import { DatasetResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Datasets operations. */
export interface DatasetsOperations {
  /** Lists datasets. */
  listByFactory: (
    resourceGroupName: string,
    factoryName: string,
    options?: DatasetsListByFactoryOptionalParams,
  ) => PagedAsyncIterableIterator<DatasetResource>;
  /** Deletes a dataset. */
  delete: (
    resourceGroupName: string,
    factoryName: string,
    datasetName: string,
    options?: DatasetsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a dataset. */
  createOrUpdate: (
    resourceGroupName: string,
    factoryName: string,
    datasetName: string,
    dataset: DatasetResource,
    options?: DatasetsCreateOrUpdateOptionalParams,
  ) => Promise<DatasetResource>;
  /** Gets a dataset. */
  get: (
    resourceGroupName: string,
    factoryName: string,
    datasetName: string,
    options?: DatasetsGetOptionalParams,
  ) => Promise<DatasetResource>;
}

function _getDatasets(context: DataFactoryManagementContext) {
  return {
    listByFactory: (
      resourceGroupName: string,
      factoryName: string,
      options?: DatasetsListByFactoryOptionalParams,
    ) => listByFactory(context, resourceGroupName, factoryName, options),
    delete: (
      resourceGroupName: string,
      factoryName: string,
      datasetName: string,
      options?: DatasetsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, factoryName, datasetName, options),
    createOrUpdate: (
      resourceGroupName: string,
      factoryName: string,
      datasetName: string,
      dataset: DatasetResource,
      options?: DatasetsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, factoryName, datasetName, dataset, options),
    get: (
      resourceGroupName: string,
      factoryName: string,
      datasetName: string,
      options?: DatasetsGetOptionalParams,
    ) => get(context, resourceGroupName, factoryName, datasetName, options),
  };
}

export function _getDatasetsOperations(context: DataFactoryManagementContext): DatasetsOperations {
  return {
    ..._getDatasets(context),
  };
}
