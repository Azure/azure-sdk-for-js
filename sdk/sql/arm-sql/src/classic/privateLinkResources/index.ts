// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { listByServer, get } from "../../api/privateLinkResources/operations.js";
import type {
  PrivateLinkResourcesListByServerOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "../../api/privateLinkResources/options.js";
import type { PrivateLinkResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** Gets the private link resources for SQL server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: PrivateLinkResourcesListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkResource>;
  /** Gets a private link resource for SQL server. */
  get: (
    resourceGroupName: string,
    serverName: string,
    groupName: string,
    options?: PrivateLinkResourcesGetOptionalParams,
  ) => Promise<PrivateLinkResource>;
}

function _getPrivateLinkResources(context: SqlManagementContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: PrivateLinkResourcesListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    get: (
      resourceGroupName: string,
      serverName: string,
      groupName: string,
      options?: PrivateLinkResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, groupName, options),
  };
}

export function _getPrivateLinkResourcesOperations(
  context: SqlManagementContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}
