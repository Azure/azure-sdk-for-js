// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/modelContainers/operations.js";
import type {
  ModelContainersListOptionalParams,
  ModelContainersDeleteOptionalParams,
  ModelContainersCreateOrUpdateOptionalParams,
  ModelContainersGetOptionalParams,
} from "../../api/modelContainers/options.js";
import type { ModelContainer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ModelContainers operations. */
export interface ModelContainersOperations {
  /** List model containers. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: ModelContainersListOptionalParams,
  ) => PagedAsyncIterableIterator<ModelContainer>;
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
    options?: ModelContainersDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update container. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: ModelContainer,
    options?: ModelContainersCreateOrUpdateOptionalParams,
  ) => Promise<ModelContainer>;
  /** Get container. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: ModelContainersGetOptionalParams,
  ) => Promise<ModelContainer>;
}

function _getModelContainers(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: ModelContainersListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: ModelContainersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, name, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: ModelContainer,
      options?: ModelContainersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, name, body, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: ModelContainersGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, name, options),
  };
}

export function _getModelContainersOperations(
  context: AzureMachineLearningServicesManagementContext,
): ModelContainersOperations {
  return {
    ..._getModelContainers(context),
  };
}
