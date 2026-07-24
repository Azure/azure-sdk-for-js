// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureArcDataContext } from "../../api/azureArcDataContext.js";
import { list, $delete, create, get } from "../../api/failoverGroups/operations.js";
import type {
  FailoverGroupsListOptionalParams,
  FailoverGroupsDeleteOptionalParams,
  FailoverGroupsCreateOptionalParams,
  FailoverGroupsGetOptionalParams,
} from "../../api/failoverGroups/options.js";
import type { FailoverGroupResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FailoverGroups operations. */
export interface FailoverGroupsOperations {
  /** List the failover groups associated with the given sql managed instance. */
  list: (
    resourceGroupName: string,
    sqlManagedInstanceName: string,
    options?: FailoverGroupsListOptionalParams,
  ) => PagedAsyncIterableIterator<FailoverGroupResource>;
  /** Deletes a failover group resource */
  delete: (
    resourceGroupName: string,
    sqlManagedInstanceName: string,
    failoverGroupName: string,
    options?: FailoverGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates or replaces a failover group resource. */
  create: (
    resourceGroupName: string,
    sqlManagedInstanceName: string,
    failoverGroupName: string,
    failoverGroupResource: FailoverGroupResource,
    options?: FailoverGroupsCreateOptionalParams,
  ) => PollerLike<OperationState<FailoverGroupResource>, FailoverGroupResource>;
  /** Retrieves a failover group resource */
  get: (
    resourceGroupName: string,
    sqlManagedInstanceName: string,
    failoverGroupName: string,
    options?: FailoverGroupsGetOptionalParams,
  ) => Promise<FailoverGroupResource>;
}

function _getFailoverGroups(context: AzureArcDataContext) {
  return {
    list: (
      resourceGroupName: string,
      sqlManagedInstanceName: string,
      options?: FailoverGroupsListOptionalParams,
    ) => list(context, resourceGroupName, sqlManagedInstanceName, options),
    delete: (
      resourceGroupName: string,
      sqlManagedInstanceName: string,
      failoverGroupName: string,
      options?: FailoverGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, sqlManagedInstanceName, failoverGroupName, options),
    create: (
      resourceGroupName: string,
      sqlManagedInstanceName: string,
      failoverGroupName: string,
      failoverGroupResource: FailoverGroupResource,
      options?: FailoverGroupsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        sqlManagedInstanceName,
        failoverGroupName,
        failoverGroupResource,
        options,
      ),
    get: (
      resourceGroupName: string,
      sqlManagedInstanceName: string,
      failoverGroupName: string,
      options?: FailoverGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, sqlManagedInstanceName, failoverGroupName, options),
  };
}

export function _getFailoverGroupsOperations(
  context: AzureArcDataContext,
): FailoverGroupsOperations {
  return {
    ..._getFailoverGroups(context),
  };
}
