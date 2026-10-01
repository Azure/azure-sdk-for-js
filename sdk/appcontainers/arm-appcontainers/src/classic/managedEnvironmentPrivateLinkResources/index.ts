// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import { get, list } from "../../api/managedEnvironmentPrivateLinkResources/operations.js";
import type {
  ManagedEnvironmentPrivateLinkResourcesGetOptionalParams,
  ManagedEnvironmentPrivateLinkResourcesListOptionalParams,
} from "../../api/managedEnvironmentPrivateLinkResources/options.js";
import type { PrivateLinkResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ManagedEnvironmentPrivateLinkResources operations. */
export interface ManagedEnvironmentPrivateLinkResourcesOperations {
  /** Gets the details of a private link resource supported by a managed environment. */
  get: (
    resourceGroupName: string,
    environmentName: string,
    privateLinkResourceName: string,
    options?: ManagedEnvironmentPrivateLinkResourcesGetOptionalParams,
  ) => Promise<PrivateLinkResource>;
  /** List private link resources for a given managed environment. */
  list: (
    resourceGroupName: string,
    environmentName: string,
    options?: ManagedEnvironmentPrivateLinkResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkResource>;
}

function _getManagedEnvironmentPrivateLinkResources(context: ContainerAppsAPIContext) {
  return {
    get: (
      resourceGroupName: string,
      environmentName: string,
      privateLinkResourceName: string,
      options?: ManagedEnvironmentPrivateLinkResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, environmentName, privateLinkResourceName, options),
    list: (
      resourceGroupName: string,
      environmentName: string,
      options?: ManagedEnvironmentPrivateLinkResourcesListOptionalParams,
    ) => list(context, resourceGroupName, environmentName, options),
  };
}

export function _getManagedEnvironmentPrivateLinkResourcesOperations(
  context: ContainerAppsAPIContext,
): ManagedEnvironmentPrivateLinkResourcesOperations {
  return {
    ..._getManagedEnvironmentPrivateLinkResources(context),
  };
}
