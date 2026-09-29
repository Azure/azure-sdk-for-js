// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import { list, get } from "../../api/containerAppsRevisionFunctions/operations.js";
import type {
  ContainerAppsRevisionFunctionsListOptionalParams,
  ContainerAppsRevisionFunctionsGetOptionalParams,
} from "../../api/containerAppsRevisionFunctions/options.js";
import type { ContainerAppsFunction } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ContainerAppsRevisionFunctions operations. */
export interface ContainerAppsRevisionFunctionsOperations {
  /** Lists the functions available in a specific Container App revision. */
  list: (
    resourceGroupName: string,
    containerAppName: string,
    revisionName: string,
    options?: ContainerAppsRevisionFunctionsListOptionalParams,
  ) => PagedAsyncIterableIterator<ContainerAppsFunction>;
  /** Gets the details of a specific function in a Container App revision. */
  get: (
    resourceGroupName: string,
    containerAppName: string,
    revisionName: string,
    functionName: string,
    options?: ContainerAppsRevisionFunctionsGetOptionalParams,
  ) => Promise<ContainerAppsFunction>;
}

function _getContainerAppsRevisionFunctions(context: ContainerAppsAPIContext) {
  return {
    list: (
      resourceGroupName: string,
      containerAppName: string,
      revisionName: string,
      options?: ContainerAppsRevisionFunctionsListOptionalParams,
    ) => list(context, resourceGroupName, containerAppName, revisionName, options),
    get: (
      resourceGroupName: string,
      containerAppName: string,
      revisionName: string,
      functionName: string,
      options?: ContainerAppsRevisionFunctionsGetOptionalParams,
    ) => get(context, resourceGroupName, containerAppName, revisionName, functionName, options),
  };
}

export function _getContainerAppsRevisionFunctionsOperations(
  context: ContainerAppsAPIContext,
): ContainerAppsRevisionFunctionsOperations {
  return {
    ..._getContainerAppsRevisionFunctions(context),
  };
}
