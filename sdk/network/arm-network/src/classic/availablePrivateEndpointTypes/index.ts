// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { listByResourceGroup, list } from "../../api/availablePrivateEndpointTypes/operations.js";
import {
  AvailablePrivateEndpointTypesListByResourceGroupOptionalParams,
  AvailablePrivateEndpointTypesListOptionalParams,
} from "../../api/availablePrivateEndpointTypes/options.js";
import { AvailablePrivateEndpointType } from "../../models/microsoft/network/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AvailablePrivateEndpointTypes operations. */
export interface AvailablePrivateEndpointTypesOperations {
  /** Returns all of the resource types that can be linked to a Private Endpoint in this subscription in this region. */
  listByResourceGroup: (
    resourceGroupName: string,
    location: string,
    options?: AvailablePrivateEndpointTypesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AvailablePrivateEndpointType>;
  /** Returns all of the resource types that can be linked to a Private Endpoint in this subscription in this region. */
  list: (
    location: string,
    options?: AvailablePrivateEndpointTypesListOptionalParams,
  ) => PagedAsyncIterableIterator<AvailablePrivateEndpointType>;
}

function _getAvailablePrivateEndpointTypes(context: NetworkManagementContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      location: string,
      options?: AvailablePrivateEndpointTypesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, location, options),
    list: (location: string, options?: AvailablePrivateEndpointTypesListOptionalParams) =>
      list(context, location, options),
  };
}

export function _getAvailablePrivateEndpointTypesOperations(
  context: NetworkManagementContext,
): AvailablePrivateEndpointTypesOperations {
  return {
    ..._getAvailablePrivateEndpointTypes(context),
  };
}
