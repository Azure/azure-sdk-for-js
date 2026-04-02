// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  listByResourceGroup,
  $delete,
  createOrUpdate,
  get,
} from "../../api/virtualRouters/operations.js";
import type {
  VirtualRoutersListOptionalParams,
  VirtualRoutersListByResourceGroupOptionalParams,
  VirtualRoutersDeleteOptionalParams,
  VirtualRoutersCreateOrUpdateOptionalParams,
  VirtualRoutersGetOptionalParams,
} from "../../api/virtualRouters/options.js";
import type { VirtualRouter } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualRouters operations. */
export interface VirtualRoutersOperations {
  /** Gets all the Virtual Routers in a subscription. */
  list: (options?: VirtualRoutersListOptionalParams) => PagedAsyncIterableIterator<VirtualRouter>;
  /** Lists all Virtual Routers in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: VirtualRoutersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualRouter>;
  /** Deletes the specified Virtual Router. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    virtualRouterName: string,
    options?: VirtualRoutersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    virtualRouterName: string,
    options?: VirtualRoutersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    virtualRouterName: string,
    options?: VirtualRoutersDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates the specified Virtual Router. */
  createOrUpdate: (
    resourceGroupName: string,
    virtualRouterName: string,
    parameters: VirtualRouter,
    options?: VirtualRoutersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualRouter>, VirtualRouter>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    virtualRouterName: string,
    parameters: VirtualRouter,
    options?: VirtualRoutersCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VirtualRouter>, VirtualRouter>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    virtualRouterName: string,
    parameters: VirtualRouter,
    options?: VirtualRoutersCreateOrUpdateOptionalParams,
  ) => Promise<VirtualRouter>;
  /** Gets the specified Virtual Router. */
  get: (
    resourceGroupName: string,
    virtualRouterName: string,
    options?: VirtualRoutersGetOptionalParams,
  ) => Promise<VirtualRouter>;
}

function _getVirtualRouters(context: NetworkManagementContext) {
  return {
    list: (options?: VirtualRoutersListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: VirtualRoutersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      virtualRouterName: string,
      options?: VirtualRoutersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, virtualRouterName, options),
    beginDelete: async (
      resourceGroupName: string,
      virtualRouterName: string,
      options?: VirtualRoutersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, virtualRouterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      virtualRouterName: string,
      options?: VirtualRoutersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, virtualRouterName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      virtualRouterName: string,
      parameters: VirtualRouter,
      options?: VirtualRoutersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, virtualRouterName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      virtualRouterName: string,
      parameters: VirtualRouter,
      options?: VirtualRoutersCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        virtualRouterName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      virtualRouterName: string,
      parameters: VirtualRouter,
      options?: VirtualRoutersCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        virtualRouterName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      virtualRouterName: string,
      options?: VirtualRoutersGetOptionalParams,
    ) => get(context, resourceGroupName, virtualRouterName, options),
  };
}

export function _getVirtualRoutersOperations(
  context: NetworkManagementContext,
): VirtualRoutersOperations {
  return {
    ..._getVirtualRouters(context),
  };
}
