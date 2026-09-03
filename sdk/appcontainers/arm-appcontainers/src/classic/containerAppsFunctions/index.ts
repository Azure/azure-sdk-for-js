// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import { list, get } from "../../api/containerAppsFunctions/operations.js";
import {
  ContainerAppsFunctionsListOptionalParams,
  ContainerAppsFunctionsGetOptionalParams,
} from "../../api/containerAppsFunctions/options.js";
import { ContainerAppsFunction } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ContainerAppsFunctions operations. */
export interface ContainerAppsFunctionsOperations {
  /** List the functions for a given Container App from the latest Revision. */
  list: (
    resourceGroupName: string,
    containerAppName: string,
    options?: ContainerAppsFunctionsListOptionalParams,
  ) => PagedAsyncIterableIterator<ContainerAppsFunction>;
  /** Get a specific function of a Container App from the latest Revision. */
  get: (
    resourceGroupName: string,
    containerAppName: string,
    functionName: string,
    options?: ContainerAppsFunctionsGetOptionalParams,
  ) => Promise<ContainerAppsFunction>;
}

function _getContainerAppsFunctions(context: ContainerAppsAPIContext) {
  return {
    list: (
      resourceGroupName: string,
      containerAppName: string,
      options?: ContainerAppsFunctionsListOptionalParams,
    ) => list(context, resourceGroupName, containerAppName, options),
    get: (
      resourceGroupName: string,
      containerAppName: string,
      functionName: string,
      options?: ContainerAppsFunctionsGetOptionalParams,
    ) => get(context, resourceGroupName, containerAppName, functionName, options),
  };
}

export function _getContainerAppsFunctionsOperations(
  context: ContainerAppsAPIContext,
): ContainerAppsFunctionsOperations {
  return {
    ..._getContainerAppsFunctions(context),
  };
}
