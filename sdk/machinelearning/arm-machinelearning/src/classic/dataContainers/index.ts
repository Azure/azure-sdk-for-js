// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/dataContainers/operations.js";
import type {
  DataContainersListOptionalParams,
  DataContainersDeleteOptionalParams,
  DataContainersCreateOrUpdateOptionalParams,
  DataContainersGetOptionalParams,
} from "../../api/dataContainers/options.js";
import type { DataContainer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DataContainers operations. */
export interface DataContainersOperations {
  /** List data containers. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: DataContainersListOptionalParams,
  ) => PagedAsyncIterableIterator<DataContainer>;
  /** Delete container. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: DataContainersDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update container. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: DataContainer,
    options?: DataContainersCreateOrUpdateOptionalParams,
  ) => Promise<DataContainer>;
  /** Get container. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: DataContainersGetOptionalParams,
  ) => Promise<DataContainer>;
}

function _getDataContainers(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: DataContainersListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: DataContainersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, name, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: DataContainer,
      options?: DataContainersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, name, body, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: DataContainersGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, name, options),
  };
}

export function _getDataContainersOperations(
  context: AzureMachineLearningServicesManagementContext,
): DataContainersOperations {
  return {
    ..._getDataContainers(context),
  };
}
