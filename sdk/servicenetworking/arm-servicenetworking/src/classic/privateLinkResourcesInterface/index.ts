// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceNetworkingManagementContext } from "../../api/serviceNetworkingManagementContext.js";
import {
  listByTrafficController,
  get,
} from "../../api/privateLinkResourcesInterface/operations.js";
import type {
  PrivateLinkResourcesInterfaceListByTrafficControllerOptionalParams,
  PrivateLinkResourcesInterfaceGetOptionalParams,
} from "../../api/privateLinkResourcesInterface/options.js";
import type { PrivateLinkResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PrivateLinkResourcesInterface operations. */
export interface PrivateLinkResourcesInterfaceOperations {
  /** List PrivateLinkResource resources by TrafficController */
  listByTrafficController: (
    resourceGroupName: string,
    trafficControllerName: string,
    options?: PrivateLinkResourcesInterfaceListByTrafficControllerOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkResource>;
  /** Get a PrivateLinkResource */
  get: (
    resourceGroupName: string,
    trafficControllerName: string,
    privateLinkResourceName: string,
    options?: PrivateLinkResourcesInterfaceGetOptionalParams,
  ) => Promise<PrivateLinkResource>;
}

function _getPrivateLinkResourcesInterface(context: ServiceNetworkingManagementContext) {
  return {
    listByTrafficController: (
      resourceGroupName: string,
      trafficControllerName: string,
      options?: PrivateLinkResourcesInterfaceListByTrafficControllerOptionalParams,
    ) => listByTrafficController(context, resourceGroupName, trafficControllerName, options),
    get: (
      resourceGroupName: string,
      trafficControllerName: string,
      privateLinkResourceName: string,
      options?: PrivateLinkResourcesInterfaceGetOptionalParams,
    ) => get(context, resourceGroupName, trafficControllerName, privateLinkResourceName, options),
  };
}

export function _getPrivateLinkResourcesInterfaceOperations(
  context: ServiceNetworkingManagementContext,
): PrivateLinkResourcesInterfaceOperations {
  return {
    ..._getPrivateLinkResourcesInterface(context),
  };
}
