// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import { list } from "../../api/managedEnvironmentPrivateLinkResources/operations.js";
import { ManagedEnvironmentPrivateLinkResourcesListOptionalParams } from "../../api/managedEnvironmentPrivateLinkResources/options.js";
import { PrivateLinkResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ManagedEnvironmentPrivateLinkResources operations. */
export interface ManagedEnvironmentPrivateLinkResourcesOperations {
  /** List private link resources for a given managed environment. */
  list: (
    resourceGroupName: string,
    environmentName: string,
    options?: ManagedEnvironmentPrivateLinkResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkResource>;
}

function _getManagedEnvironmentPrivateLinkResources(context: ContainerAppsAPIContext) {
  return {
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
