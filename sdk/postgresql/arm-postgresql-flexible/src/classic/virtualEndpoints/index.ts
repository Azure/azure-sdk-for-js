// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgreSQLManagementFlexibleServerContext } from "../../api/postgreSQLManagementFlexibleServerContext.js";
import {
  listByServer,
  $delete,
  update,
  create,
  get,
} from "../../api/virtualEndpoints/operations.js";
import type {
  VirtualEndpointsListByServerOptionalParams,
  VirtualEndpointsDeleteOptionalParams,
  VirtualEndpointsUpdateOptionalParams,
  VirtualEndpointsCreateOptionalParams,
  VirtualEndpointsGetOptionalParams,
} from "../../api/virtualEndpoints/options.js";
import type { VirtualEndpoint, VirtualEndpointResourceForPatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualEndpoints operations. */
export interface VirtualEndpointsOperations {
  /** Lists pair of virtual endpoints associated to a server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: VirtualEndpointsListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualEndpoint>;
  /** Deletes a pair of virtual endpoints. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serverName: string,
    virtualEndpointName: string,
    options?: VirtualEndpointsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a pair of virtual endpoints for a server. */
  update: (
    resourceGroupName: string,
    serverName: string,
    virtualEndpointName: string,
    parameters: VirtualEndpointResourceForPatch,
    options?: VirtualEndpointsUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualEndpoint>, VirtualEndpoint>;
  /** Creates a pair of virtual endpoints for a server. */
  create: (
    resourceGroupName: string,
    serverName: string,
    virtualEndpointName: string,
    parameters: VirtualEndpoint,
    options?: VirtualEndpointsCreateOptionalParams,
  ) => PollerLike<OperationState<VirtualEndpoint>, VirtualEndpoint>;
  /** Gets information about a pair of virtual endpoints. */
  get: (
    resourceGroupName: string,
    serverName: string,
    virtualEndpointName: string,
    options?: VirtualEndpointsGetOptionalParams,
  ) => Promise<VirtualEndpoint>;
}

function _getVirtualEndpoints(context: PostgreSQLManagementFlexibleServerContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: VirtualEndpointsListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    delete: (
      resourceGroupName: string,
      serverName: string,
      virtualEndpointName: string,
      options?: VirtualEndpointsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serverName, virtualEndpointName, options),
    update: (
      resourceGroupName: string,
      serverName: string,
      virtualEndpointName: string,
      parameters: VirtualEndpointResourceForPatch,
      options?: VirtualEndpointsUpdateOptionalParams,
    ) => update(context, resourceGroupName, serverName, virtualEndpointName, parameters, options),
    create: (
      resourceGroupName: string,
      serverName: string,
      virtualEndpointName: string,
      parameters: VirtualEndpoint,
      options?: VirtualEndpointsCreateOptionalParams,
    ) => create(context, resourceGroupName, serverName, virtualEndpointName, parameters, options),
    get: (
      resourceGroupName: string,
      serverName: string,
      virtualEndpointName: string,
      options?: VirtualEndpointsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, virtualEndpointName, options),
  };
}

export function _getVirtualEndpointsOperations(
  context: PostgreSQLManagementFlexibleServerContext,
): VirtualEndpointsOperations {
  return {
    ..._getVirtualEndpoints(context),
  };
}
