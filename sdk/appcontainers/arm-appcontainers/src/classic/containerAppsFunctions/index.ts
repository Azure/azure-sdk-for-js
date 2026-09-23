// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import { list, get } from "../../api/containerAppsFunctions/operations.js";
import type {
  ContainerAppsFunctionsListOptionalParams,
  ContainerAppsFunctionsGetOptionalParams,
} from "../../api/containerAppsFunctions/options.js";
import type { ContainerAppsFunction } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ContainerAppsFunctions operations. */
export interface ContainerAppsFunctionsOperations {
  /** Lists the functions available in the latest revision of a Container App. */
  list: (
    resourceGroupName: string,
    containerAppName: string,
    options?: ContainerAppsFunctionsListOptionalParams,
  ) => PagedAsyncIterableIterator<ContainerAppsFunction>;
  /** Gets the details of a specific function from the latest Container App revision. */
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
