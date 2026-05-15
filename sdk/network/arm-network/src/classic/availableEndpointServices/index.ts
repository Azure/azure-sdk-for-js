// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { list } from "../../api/availableEndpointServices/operations.js";
import { AvailableEndpointServicesListOptionalParams } from "../../api/availableEndpointServices/options.js";
import { EndpointServiceResult } from "../../models/microsoft/network/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AvailableEndpointServices operations. */
export interface AvailableEndpointServicesOperations {
  /** List what values of endpoint services are available for use. */
  list: (
    location: string,
    options?: AvailableEndpointServicesListOptionalParams,
  ) => PagedAsyncIterableIterator<EndpointServiceResult>;
}

function _getAvailableEndpointServices(context: NetworkManagementContext) {
  return {
    list: (location: string, options?: AvailableEndpointServicesListOptionalParams) =>
      list(context, location, options),
  };
}

export function _getAvailableEndpointServicesOperations(
  context: NetworkManagementContext,
): AvailableEndpointServicesOperations {
  return {
    ..._getAvailableEndpointServices(context),
  };
}
