// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import { list, get } from "../../api/containerAppsRevisionFunctions/operations.js";
import {
  ContainerAppsRevisionFunctionsListOptionalParams,
  ContainerAppsRevisionFunctionsGetOptionalParams,
} from "../../api/containerAppsRevisionFunctions/options.js";
import { ContainerAppsFunction } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ContainerAppsRevisionFunctions operations. */
export interface ContainerAppsRevisionFunctionsOperations {
  /** List the functions for a given Container App Revision. */
  list: (
    resourceGroupName: string,
    containerAppName: string,
    revisionName: string,
    options?: ContainerAppsRevisionFunctionsListOptionalParams,
  ) => PagedAsyncIterableIterator<ContainerAppsFunction>;
  /** Get a specific function of a Container App Revision. */
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
