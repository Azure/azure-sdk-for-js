// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import { get, list } from "../../api/containerAppPrivateLinkResources/operations.js";
import type {
  ContainerAppPrivateLinkResourcesGetOptionalParams,
  ContainerAppPrivateLinkResourcesListOptionalParams,
} from "../../api/containerAppPrivateLinkResources/options.js";
import type { PrivateLinkResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ContainerAppPrivateLinkResources operations. */
export interface ContainerAppPrivateLinkResourcesOperations {
  /** Gets the details of a private link resource supported by a Container App. */
  get: (
    resourceGroupName: string,
    containerAppName: string,
    privateLinkResourceName: string,
    options?: ContainerAppPrivateLinkResourcesGetOptionalParams,
  ) => Promise<PrivateLinkResource>;
  /** Lists the private link resources supported by a Container App. */
  list: (
    resourceGroupName: string,
    containerAppName: string,
    options?: ContainerAppPrivateLinkResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkResource>;
}

function _getContainerAppPrivateLinkResources(context: ContainerAppsAPIContext) {
  return {
    get: (
      resourceGroupName: string,
      containerAppName: string,
      privateLinkResourceName: string,
      options?: ContainerAppPrivateLinkResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, containerAppName, privateLinkResourceName, options),
    list: (
      resourceGroupName: string,
      containerAppName: string,
      options?: ContainerAppPrivateLinkResourcesListOptionalParams,
    ) => list(context, resourceGroupName, containerAppName, options),
  };
}

export function _getContainerAppPrivateLinkResourcesOperations(
  context: ContainerAppsAPIContext,
): ContainerAppPrivateLinkResourcesOperations {
  return {
    ..._getContainerAppPrivateLinkResources(context),
  };
}
