// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list, get } from "../../api/expressRouteLinks/operations.js";
import type {
  ExpressRouteLinksListOptionalParams,
  ExpressRouteLinksGetOptionalParams,
} from "../../api/expressRouteLinks/options.js";
import type { ExpressRouteLink } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ExpressRouteLinks operations. */
export interface ExpressRouteLinksOperations {
  /** Retrieve the ExpressRouteLink sub-resources of the specified ExpressRoutePort resource. */
  list: (
    resourceGroupName: string,
    expressRoutePortName: string,
    options?: ExpressRouteLinksListOptionalParams,
  ) => PagedAsyncIterableIterator<ExpressRouteLink>;
  /** Retrieves the specified ExpressRouteLink resource. */
  get: (
    resourceGroupName: string,
    expressRoutePortName: string,
    linkName: string,
    options?: ExpressRouteLinksGetOptionalParams,
  ) => Promise<ExpressRouteLink>;
}

function _getExpressRouteLinks(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      expressRoutePortName: string,
      options?: ExpressRouteLinksListOptionalParams,
    ) => list(context, resourceGroupName, expressRoutePortName, options),
    get: (
      resourceGroupName: string,
      expressRoutePortName: string,
      linkName: string,
      options?: ExpressRouteLinksGetOptionalParams,
    ) => get(context, resourceGroupName, expressRoutePortName, linkName, options),
  };
}

export function _getExpressRouteLinksOperations(
  context: NetworkManagementContext,
): ExpressRouteLinksOperations {
  return {
    ..._getExpressRouteLinks(context),
  };
}
