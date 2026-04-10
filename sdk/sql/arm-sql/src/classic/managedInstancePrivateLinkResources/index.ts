// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  listByManagedInstance,
  get,
} from "../../api/managedInstancePrivateLinkResources/operations.js";
import type {
  ManagedInstancePrivateLinkResourcesListByManagedInstanceOptionalParams,
  ManagedInstancePrivateLinkResourcesGetOptionalParams,
} from "../../api/managedInstancePrivateLinkResources/options.js";
import type { ManagedInstancePrivateLink } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ManagedInstancePrivateLinkResources operations. */
export interface ManagedInstancePrivateLinkResourcesOperations {
  /** Gets the private link resources for SQL server. */
  listByManagedInstance: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedInstancePrivateLinkResourcesListByManagedInstanceOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedInstancePrivateLink>;
  /** Gets a private link resource for SQL server. */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    groupName: string,
    options?: ManagedInstancePrivateLinkResourcesGetOptionalParams,
  ) => Promise<ManagedInstancePrivateLink>;
}

function _getManagedInstancePrivateLinkResources(context: SqlManagementContext) {
  return {
    listByManagedInstance: (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedInstancePrivateLinkResourcesListByManagedInstanceOptionalParams,
    ) => listByManagedInstance(context, resourceGroupName, managedInstanceName, options),
    get: (
      resourceGroupName: string,
      managedInstanceName: string,
      groupName: string,
      options?: ManagedInstancePrivateLinkResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, managedInstanceName, groupName, options),
  };
}

export function _getManagedInstancePrivateLinkResourcesOperations(
  context: SqlManagementContext,
): ManagedInstancePrivateLinkResourcesOperations {
  return {
    ..._getManagedInstancePrivateLinkResources(context),
  };
}
