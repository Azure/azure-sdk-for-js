// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/virtualHubRouteTableV2S/operations.js";
import type {
  VirtualHubRouteTableV2SListOptionalParams,
  VirtualHubRouteTableV2SDeleteOptionalParams,
  VirtualHubRouteTableV2SCreateOrUpdateOptionalParams,
  VirtualHubRouteTableV2SGetOptionalParams,
} from "../../api/virtualHubRouteTableV2S/options.js";
import type { VirtualHubRouteTableV2 } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualHubRouteTableV2S operations. */
export interface VirtualHubRouteTableV2SOperations {
  /** Retrieves the details of all VirtualHubRouteTableV2s. */
  list: (
    resourceGroupName: string,
    virtualHubName: string,
    options?: VirtualHubRouteTableV2SListOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualHubRouteTableV2>;
  /** Deletes a VirtualHubRouteTableV2. */
  /**
   *  @fixme Delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    virtualHubName: string,
    routeTableName: string,
    options?: VirtualHubRouteTableV2SDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    virtualHubName: string,
    routeTableName: string,
    options?: VirtualHubRouteTableV2SDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    virtualHubName: string,
    routeTableName: string,
    options?: VirtualHubRouteTableV2SDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a VirtualHubRouteTableV2 resource if it doesn't exist else updates the existing VirtualHubRouteTableV2. */
  createOrUpdate: (
    resourceGroupName: string,
    virtualHubName: string,
    routeTableName: string,
    virtualHubRouteTableV2Parameters: VirtualHubRouteTableV2,
    options?: VirtualHubRouteTableV2SCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualHubRouteTableV2>, VirtualHubRouteTableV2>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    virtualHubName: string,
    routeTableName: string,
    virtualHubRouteTableV2Parameters: VirtualHubRouteTableV2,
    options?: VirtualHubRouteTableV2SCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VirtualHubRouteTableV2>, VirtualHubRouteTableV2>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    virtualHubName: string,
    routeTableName: string,
    virtualHubRouteTableV2Parameters: VirtualHubRouteTableV2,
    options?: VirtualHubRouteTableV2SCreateOrUpdateOptionalParams,
  ) => Promise<VirtualHubRouteTableV2>;
  /** Retrieves the details of a VirtualHubRouteTableV2. */
  get: (
    resourceGroupName: string,
    virtualHubName: string,
    routeTableName: string,
    options?: VirtualHubRouteTableV2SGetOptionalParams,
  ) => Promise<VirtualHubRouteTableV2>;
}

function _getVirtualHubRouteTableV2S(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      virtualHubName: string,
      options?: VirtualHubRouteTableV2SListOptionalParams,
    ) => list(context, resourceGroupName, virtualHubName, options),
    delete: (
      resourceGroupName: string,
      virtualHubName: string,
      routeTableName: string,
      options?: VirtualHubRouteTableV2SDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, virtualHubName, routeTableName, options),
    beginDelete: async (
      resourceGroupName: string,
      virtualHubName: string,
      routeTableName: string,
      options?: VirtualHubRouteTableV2SDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, virtualHubName, routeTableName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      virtualHubName: string,
      routeTableName: string,
      options?: VirtualHubRouteTableV2SDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, virtualHubName, routeTableName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      virtualHubName: string,
      routeTableName: string,
      virtualHubRouteTableV2Parameters: VirtualHubRouteTableV2,
      options?: VirtualHubRouteTableV2SCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        virtualHubName,
        routeTableName,
        virtualHubRouteTableV2Parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      virtualHubName: string,
      routeTableName: string,
      virtualHubRouteTableV2Parameters: VirtualHubRouteTableV2,
      options?: VirtualHubRouteTableV2SCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        virtualHubName,
        routeTableName,
        virtualHubRouteTableV2Parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      virtualHubName: string,
      routeTableName: string,
      virtualHubRouteTableV2Parameters: VirtualHubRouteTableV2,
      options?: VirtualHubRouteTableV2SCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        virtualHubName,
        routeTableName,
        virtualHubRouteTableV2Parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      virtualHubName: string,
      routeTableName: string,
      options?: VirtualHubRouteTableV2SGetOptionalParams,
    ) => get(context, resourceGroupName, virtualHubName, routeTableName, options),
  };
}

export function _getVirtualHubRouteTableV2SOperations(
  context: NetworkManagementContext,
): VirtualHubRouteTableV2SOperations {
  return {
    ..._getVirtualHubRouteTableV2S(context),
  };
}
