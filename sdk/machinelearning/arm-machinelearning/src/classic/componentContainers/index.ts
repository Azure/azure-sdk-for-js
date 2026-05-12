// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/componentContainers/operations.js";
import {
  ComponentContainersListOptionalParams,
  ComponentContainersDeleteOptionalParams,
  ComponentContainersCreateOrUpdateOptionalParams,
  ComponentContainersGetOptionalParams,
} from "../../api/componentContainers/options.js";
import { ComponentContainer } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ComponentContainers operations. */
export interface ComponentContainersOperations {
  /** List component containers. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: ComponentContainersListOptionalParams,
  ) => PagedAsyncIterableIterator<ComponentContainer>;
  /** Delete container. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: ComponentContainersDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update container. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: ComponentContainer,
    options?: ComponentContainersCreateOrUpdateOptionalParams,
  ) => Promise<ComponentContainer>;
  /** Get container. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: ComponentContainersGetOptionalParams,
  ) => Promise<ComponentContainer>;
}

function _getComponentContainers(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: ComponentContainersListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: ComponentContainersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, name, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: ComponentContainer,
      options?: ComponentContainersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, name, body, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: ComponentContainersGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, name, options),
  };
}

export function _getComponentContainersOperations(
  context: AzureMachineLearningServicesManagementContext,
): ComponentContainersOperations {
  return {
    ..._getComponentContainers(context),
  };
}
