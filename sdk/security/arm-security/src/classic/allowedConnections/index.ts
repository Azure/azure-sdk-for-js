// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, listByHomeRegion, get } from "../../api/allowedConnections/operations.js";
import type {
  AllowedConnectionsListOptionalParams,
  AllowedConnectionsListByHomeRegionOptionalParams,
  AllowedConnectionsGetOptionalParams,
} from "../../api/allowedConnections/options.js";
import type {
  AllowedConnectionsResource,
  ConnectionType,
} from "../../models/securitySolutionsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AllowedConnections operations. */
export interface AllowedConnectionsOperations {
  /** Gets the list of all possible traffic between resources for the subscription */
  list: (
    options?: AllowedConnectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<AllowedConnectionsResource>;
  /** Gets the list of all possible traffic between resources for the subscription and location. */
  listByHomeRegion: (
    ascLocation: string,
    options?: AllowedConnectionsListByHomeRegionOptionalParams,
  ) => PagedAsyncIterableIterator<AllowedConnectionsResource>;
  /** Gets the list of all possible traffic between resources for the subscription and location, based on connection type. */
  get: (
    resourceGroupName: string,
    ascLocation: string,
    connectionType: ConnectionType,
    options?: AllowedConnectionsGetOptionalParams,
  ) => Promise<AllowedConnectionsResource>;
}

function _getAllowedConnections(context: SecurityCenterContext) {
  return {
    list: (options?: AllowedConnectionsListOptionalParams) => list(context, options),
    listByHomeRegion: (
      ascLocation: string,
      options?: AllowedConnectionsListByHomeRegionOptionalParams,
    ) => listByHomeRegion(context, ascLocation, options),
    get: (
      resourceGroupName: string,
      ascLocation: string,
      connectionType: ConnectionType,
      options?: AllowedConnectionsGetOptionalParams,
    ) => get(context, resourceGroupName, ascLocation, connectionType, options),
  };
}

export function _getAllowedConnectionsOperations(
  context: SecurityCenterContext,
): AllowedConnectionsOperations {
  return {
    ..._getAllowedConnections(context),
  };
}
