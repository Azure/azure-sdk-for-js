// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import { list } from "../../api/containerAppsBuildsByContainerApp/operations.js";
import { ContainerAppsBuildsByContainerAppListOptionalParams } from "../../api/containerAppsBuildsByContainerApp/options.js";
import { ContainerAppsBuildResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ContainerAppsBuildsByContainerApp operations. */
export interface ContainerAppsBuildsByContainerAppOperations {
  /** List Container Apps Build resources by Container App */
  list: (
    resourceGroupName: string,
    containerAppName: string,
    options?: ContainerAppsBuildsByContainerAppListOptionalParams,
  ) => PagedAsyncIterableIterator<ContainerAppsBuildResource>;
}

function _getContainerAppsBuildsByContainerApp(context: ContainerAppsAPIContext) {
  return {
    list: (
      resourceGroupName: string,
      containerAppName: string,
      options?: ContainerAppsBuildsByContainerAppListOptionalParams,
    ) => list(context, resourceGroupName, containerAppName, options),
  };
}

export function _getContainerAppsBuildsByContainerAppOperations(
  context: ContainerAppsAPIContext,
): ContainerAppsBuildsByContainerAppOperations {
  return {
    ..._getContainerAppsBuildsByContainerApp(context),
  };
}
