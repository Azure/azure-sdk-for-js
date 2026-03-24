// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/environmentContainers/operations.js";
import type {
  EnvironmentContainersListOptionalParams,
  EnvironmentContainersDeleteOptionalParams,
  EnvironmentContainersCreateOrUpdateOptionalParams,
  EnvironmentContainersGetOptionalParams,
} from "../../api/environmentContainers/options.js";
import type { EnvironmentContainer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a EnvironmentContainers operations. */
export interface EnvironmentContainersOperations {
  /** List environment containers. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: EnvironmentContainersListOptionalParams,
  ) => PagedAsyncIterableIterator<EnvironmentContainer>;
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
    options?: EnvironmentContainersDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update container. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: EnvironmentContainer,
    options?: EnvironmentContainersCreateOrUpdateOptionalParams,
  ) => Promise<EnvironmentContainer>;
  /** Get container. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: EnvironmentContainersGetOptionalParams,
  ) => Promise<EnvironmentContainer>;
}

function _getEnvironmentContainers(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: EnvironmentContainersListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: EnvironmentContainersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, name, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: EnvironmentContainer,
      options?: EnvironmentContainersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, name, body, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: EnvironmentContainersGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, name, options),
  };
}

export function _getEnvironmentContainersOperations(
  context: AzureMachineLearningServicesManagementContext,
): EnvironmentContainersOperations {
  return {
    ..._getEnvironmentContainers(context),
  };
}
