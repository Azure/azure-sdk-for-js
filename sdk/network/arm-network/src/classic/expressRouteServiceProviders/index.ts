// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list } from "../../api/expressRouteServiceProviders/operations.js";
import type { ExpressRouteServiceProvidersListOptionalParams } from "../../api/expressRouteServiceProviders/options.js";
import type { ExpressRouteServiceProvider } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ExpressRouteServiceProviders operations. */
export interface ExpressRouteServiceProvidersOperations {
  /** Gets all the available express route service providers. */
  list: (
    options?: ExpressRouteServiceProvidersListOptionalParams,
  ) => PagedAsyncIterableIterator<ExpressRouteServiceProvider>;
}

function _getExpressRouteServiceProviders(context: NetworkManagementContext) {
  return {
    list: (options?: ExpressRouteServiceProvidersListOptionalParams) => list(context, options),
  };
}

export function _getExpressRouteServiceProvidersOperations(
  context: NetworkManagementContext,
): ExpressRouteServiceProvidersOperations {
  return {
    ..._getExpressRouteServiceProviders(context),
  };
}
