// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import { list } from "../../api/managedEnvironmentUsages/operations.js";
import { ManagedEnvironmentUsagesListOptionalParams } from "../../api/managedEnvironmentUsages/options.js";
import { Usage } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ManagedEnvironmentUsages operations. */
export interface ManagedEnvironmentUsagesOperations {
  /** Gets the current usage information as well as the limits for environment. */
  list: (
    resourceGroupName: string,
    environmentName: string,
    options?: ManagedEnvironmentUsagesListOptionalParams,
  ) => PagedAsyncIterableIterator<Usage>;
}

function _getManagedEnvironmentUsages(context: ContainerAppsAPIContext) {
  return {
    list: (
      resourceGroupName: string,
      environmentName: string,
      options?: ManagedEnvironmentUsagesListOptionalParams,
    ) => list(context, resourceGroupName, environmentName, options),
  };
}

export function _getManagedEnvironmentUsagesOperations(
  context: ContainerAppsAPIContext,
): ManagedEnvironmentUsagesOperations {
  return {
    ..._getManagedEnvironmentUsages(context),
  };
}
