// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceNetworkingManagementContext } from "../../api/serviceNetworkingManagementContext.js";
import {
  frontendsInterfaceListByTrafficController,
  frontendsInterfaceDelete,
  frontendsInterfaceUpdate,
  frontendsInterfaceCreateOrUpdate,
  frontendsInterfaceGet,
} from "../../api/frontendsInterface/index.js";
import { Frontend, FrontendUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  FrontendsInterfaceListByTrafficControllerOptionalParams,
  FrontendsInterfaceDeleteOptionalParams,
  FrontendsInterfaceUpdateOptionalParams,
  FrontendsInterfaceCreateOrUpdateOptionalParams,
  FrontendsInterfaceGetOptionalParams,
} from "../../api/options.js";

/** Interface representing a FrontendsInterface operations. */
export interface FrontendsInterfaceOperations {
  /** List Frontend resources by TrafficController */
  listByTrafficController: (
    resourceGroupName: string,
    trafficControllerName: string,
    options?: FrontendsInterfaceListByTrafficControllerOptionalParams,
  ) => PagedAsyncIterableIterator<Frontend>;
  /** Delete a Frontend */
  delete: (
    resourceGroupName: string,
    trafficControllerName: string,
    frontendName: string,
    options?: FrontendsInterfaceDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a Frontend */
  update: (
    resourceGroupName: string,
    trafficControllerName: string,
    frontendName: string,
    properties: FrontendUpdate,
    options?: FrontendsInterfaceUpdateOptionalParams,
  ) => Promise<Frontend>;
  /** Create a Frontend */
  createOrUpdate: (
    resourceGroupName: string,
    trafficControllerName: string,
    frontendName: string,
    resource: Frontend,
    options?: FrontendsInterfaceCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Frontend>, Frontend>;
  /** Get a Frontend */
  get: (
    resourceGroupName: string,
    trafficControllerName: string,
    frontendName: string,
    options?: FrontendsInterfaceGetOptionalParams,
  ) => Promise<Frontend>;
}

function _getFrontendsInterface(context: ServiceNetworkingManagementContext) {
  return {
    listByTrafficController: (
      resourceGroupName: string,
      trafficControllerName: string,
      options?: FrontendsInterfaceListByTrafficControllerOptionalParams,
    ) =>
      frontendsInterfaceListByTrafficController(
        context,
        resourceGroupName,
        trafficControllerName,
        options,
      ),
    delete: (
      resourceGroupName: string,
      trafficControllerName: string,
      frontendName: string,
      options?: FrontendsInterfaceDeleteOptionalParams,
    ) =>
      frontendsInterfaceDelete(
        context,
        resourceGroupName,
        trafficControllerName,
        frontendName,
        options,
      ),
    update: (
      resourceGroupName: string,
      trafficControllerName: string,
      frontendName: string,
      properties: FrontendUpdate,
      options?: FrontendsInterfaceUpdateOptionalParams,
    ) =>
      frontendsInterfaceUpdate(
        context,
        resourceGroupName,
        trafficControllerName,
        frontendName,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      trafficControllerName: string,
      frontendName: string,
      resource: Frontend,
      options?: FrontendsInterfaceCreateOrUpdateOptionalParams,
    ) =>
      frontendsInterfaceCreateOrUpdate(
        context,
        resourceGroupName,
        trafficControllerName,
        frontendName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      trafficControllerName: string,
      frontendName: string,
      options?: FrontendsInterfaceGetOptionalParams,
    ) =>
      frontendsInterfaceGet(
        context,
        resourceGroupName,
        trafficControllerName,
        frontendName,
        options,
      ),
  };
}

export function _getFrontendsInterfaceOperations(
  context: ServiceNetworkingManagementContext,
): FrontendsInterfaceOperations {
  return {
    ..._getFrontendsInterface(context),
  };
}
