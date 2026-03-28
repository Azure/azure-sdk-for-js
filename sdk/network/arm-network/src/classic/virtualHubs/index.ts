// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  getOutboundRoutes,
  getInboundRoutes,
  getEffectiveVirtualHubRoutes,
  list,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/virtualHubs/operations.js";
import type {
  VirtualHubsGetOutboundRoutesOptionalParams,
  VirtualHubsGetInboundRoutesOptionalParams,
  VirtualHubsGetEffectiveVirtualHubRoutesOptionalParams,
  VirtualHubsListOptionalParams,
  VirtualHubsListByResourceGroupOptionalParams,
  VirtualHubsDeleteOptionalParams,
  VirtualHubsUpdateTagsOptionalParams,
  VirtualHubsCreateOrUpdateOptionalParams,
  VirtualHubsGetOptionalParams,
} from "../../api/virtualHubs/options.js";
import type {
  TagsObject,
  VirtualHub,
  VirtualHubEffectiveRouteList,
  GetInboundRoutesParameters,
  EffectiveRouteMapRouteList,
  GetOutboundRoutesParameters,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualHubs operations. */
export interface VirtualHubsOperations {
  /** Gets the outbound routes configured for the Virtual Hub on a particular connection. */
  getOutboundRoutes: (
    resourceGroupName: string,
    virtualHubName: string,
    getOutboundRoutesParameters: GetOutboundRoutesParameters,
    options?: VirtualHubsGetOutboundRoutesOptionalParams,
  ) => PollerLike<OperationState<EffectiveRouteMapRouteList>, EffectiveRouteMapRouteList>;
  /** @deprecated use getOutboundRoutes instead */
  beginGetOutboundRoutes: (
    resourceGroupName: string,
    virtualHubName: string,
    getOutboundRoutesParameters: GetOutboundRoutesParameters,
    options?: VirtualHubsGetOutboundRoutesOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<EffectiveRouteMapRouteList>, EffectiveRouteMapRouteList>
  >;
  /** @deprecated use getOutboundRoutes instead */
  beginGetOutboundRoutesAndWait: (
    resourceGroupName: string,
    virtualHubName: string,
    getOutboundRoutesParameters: GetOutboundRoutesParameters,
    options?: VirtualHubsGetOutboundRoutesOptionalParams,
  ) => Promise<EffectiveRouteMapRouteList>;
  /** Gets the inbound routes configured for the Virtual Hub on a particular connection. */
  getInboundRoutes: (
    resourceGroupName: string,
    virtualHubName: string,
    getInboundRoutesParameters: GetInboundRoutesParameters,
    options?: VirtualHubsGetInboundRoutesOptionalParams,
  ) => PollerLike<OperationState<EffectiveRouteMapRouteList>, EffectiveRouteMapRouteList>;
  /** @deprecated use getInboundRoutes instead */
  beginGetInboundRoutes: (
    resourceGroupName: string,
    virtualHubName: string,
    getInboundRoutesParameters: GetInboundRoutesParameters,
    options?: VirtualHubsGetInboundRoutesOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<EffectiveRouteMapRouteList>, EffectiveRouteMapRouteList>
  >;
  /** @deprecated use getInboundRoutes instead */
  beginGetInboundRoutesAndWait: (
    resourceGroupName: string,
    virtualHubName: string,
    getInboundRoutesParameters: GetInboundRoutesParameters,
    options?: VirtualHubsGetInboundRoutesOptionalParams,
  ) => Promise<EffectiveRouteMapRouteList>;
  /** Gets the effective routes configured for the Virtual Hub resource or the specified resource . */
  getEffectiveVirtualHubRoutes: (
    resourceGroupName: string,
    virtualHubName: string,
    options?: VirtualHubsGetEffectiveVirtualHubRoutesOptionalParams,
  ) => PollerLike<OperationState<VirtualHubEffectiveRouteList>, VirtualHubEffectiveRouteList>;
  /** @deprecated use getEffectiveVirtualHubRoutes instead */
  beginGetEffectiveVirtualHubRoutes: (
    resourceGroupName: string,
    virtualHubName: string,
    options?: VirtualHubsGetEffectiveVirtualHubRoutesOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<VirtualHubEffectiveRouteList>, VirtualHubEffectiveRouteList>
  >;
  /** @deprecated use getEffectiveVirtualHubRoutes instead */
  beginGetEffectiveVirtualHubRoutesAndWait: (
    resourceGroupName: string,
    virtualHubName: string,
    options?: VirtualHubsGetEffectiveVirtualHubRoutesOptionalParams,
  ) => Promise<VirtualHubEffectiveRouteList>;
  /** Lists all the VirtualHubs in a subscription. */
  list: (options?: VirtualHubsListOptionalParams) => PagedAsyncIterableIterator<VirtualHub>;
  /** Lists all the VirtualHubs in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: VirtualHubsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualHub>;
  /** Deletes a VirtualHub. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    virtualHubName: string,
    options?: VirtualHubsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    virtualHubName: string,
    options?: VirtualHubsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    virtualHubName: string,
    options?: VirtualHubsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates VirtualHub tags. */
  updateTags: (
    resourceGroupName: string,
    virtualHubName: string,
    virtualHubParameters: TagsObject,
    options?: VirtualHubsUpdateTagsOptionalParams,
  ) => Promise<VirtualHub>;
  /** Creates a VirtualHub resource if it doesn't exist else updates the existing VirtualHub. */
  createOrUpdate: (
    resourceGroupName: string,
    virtualHubName: string,
    virtualHubParameters: VirtualHub,
    options?: VirtualHubsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualHub>, VirtualHub>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    virtualHubName: string,
    virtualHubParameters: VirtualHub,
    options?: VirtualHubsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VirtualHub>, VirtualHub>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    virtualHubName: string,
    virtualHubParameters: VirtualHub,
    options?: VirtualHubsCreateOrUpdateOptionalParams,
  ) => Promise<VirtualHub>;
  /** Retrieves the details of a VirtualHub. */
  get: (
    resourceGroupName: string,
    virtualHubName: string,
    options?: VirtualHubsGetOptionalParams,
  ) => Promise<VirtualHub>;
}

function _getVirtualHubs(context: NetworkManagementContext) {
  return {
    getOutboundRoutes: (
      resourceGroupName: string,
      virtualHubName: string,
      getOutboundRoutesParameters: GetOutboundRoutesParameters,
      options?: VirtualHubsGetOutboundRoutesOptionalParams,
    ) =>
      getOutboundRoutes(
        context,
        resourceGroupName,
        virtualHubName,
        getOutboundRoutesParameters,
        options,
      ),
    beginGetOutboundRoutes: async (
      resourceGroupName: string,
      virtualHubName: string,
      getOutboundRoutesParameters: GetOutboundRoutesParameters,
      options?: VirtualHubsGetOutboundRoutesOptionalParams,
    ) => {
      const poller = getOutboundRoutes(
        context,
        resourceGroupName,
        virtualHubName,
        getOutboundRoutesParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetOutboundRoutesAndWait: async (
      resourceGroupName: string,
      virtualHubName: string,
      getOutboundRoutesParameters: GetOutboundRoutesParameters,
      options?: VirtualHubsGetOutboundRoutesOptionalParams,
    ) => {
      return await getOutboundRoutes(
        context,
        resourceGroupName,
        virtualHubName,
        getOutboundRoutesParameters,
        options,
      );
    },
    getInboundRoutes: (
      resourceGroupName: string,
      virtualHubName: string,
      getInboundRoutesParameters: GetInboundRoutesParameters,
      options?: VirtualHubsGetInboundRoutesOptionalParams,
    ) =>
      getInboundRoutes(
        context,
        resourceGroupName,
        virtualHubName,
        getInboundRoutesParameters,
        options,
      ),
    beginGetInboundRoutes: async (
      resourceGroupName: string,
      virtualHubName: string,
      getInboundRoutesParameters: GetInboundRoutesParameters,
      options?: VirtualHubsGetInboundRoutesOptionalParams,
    ) => {
      const poller = getInboundRoutes(
        context,
        resourceGroupName,
        virtualHubName,
        getInboundRoutesParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetInboundRoutesAndWait: async (
      resourceGroupName: string,
      virtualHubName: string,
      getInboundRoutesParameters: GetInboundRoutesParameters,
      options?: VirtualHubsGetInboundRoutesOptionalParams,
    ) => {
      return await getInboundRoutes(
        context,
        resourceGroupName,
        virtualHubName,
        getInboundRoutesParameters,
        options,
      );
    },
    getEffectiveVirtualHubRoutes: (
      resourceGroupName: string,
      virtualHubName: string,
      options?: VirtualHubsGetEffectiveVirtualHubRoutesOptionalParams,
    ) => getEffectiveVirtualHubRoutes(context, resourceGroupName, virtualHubName, options),
    beginGetEffectiveVirtualHubRoutes: async (
      resourceGroupName: string,
      virtualHubName: string,
      options?: VirtualHubsGetEffectiveVirtualHubRoutesOptionalParams,
    ) => {
      const poller = getEffectiveVirtualHubRoutes(
        context,
        resourceGroupName,
        virtualHubName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetEffectiveVirtualHubRoutesAndWait: async (
      resourceGroupName: string,
      virtualHubName: string,
      options?: VirtualHubsGetEffectiveVirtualHubRoutesOptionalParams,
    ) => {
      return await getEffectiveVirtualHubRoutes(
        context,
        resourceGroupName,
        virtualHubName,
        options,
      );
    },
    list: (options?: VirtualHubsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: VirtualHubsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      virtualHubName: string,
      options?: VirtualHubsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, virtualHubName, options),
    beginDelete: async (
      resourceGroupName: string,
      virtualHubName: string,
      options?: VirtualHubsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, virtualHubName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      virtualHubName: string,
      options?: VirtualHubsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, virtualHubName, options);
    },
    updateTags: (
      resourceGroupName: string,
      virtualHubName: string,
      virtualHubParameters: TagsObject,
      options?: VirtualHubsUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, virtualHubName, virtualHubParameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      virtualHubName: string,
      virtualHubParameters: VirtualHub,
      options?: VirtualHubsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, virtualHubName, virtualHubParameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      virtualHubName: string,
      virtualHubParameters: VirtualHub,
      options?: VirtualHubsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        virtualHubName,
        virtualHubParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      virtualHubName: string,
      virtualHubParameters: VirtualHub,
      options?: VirtualHubsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        virtualHubName,
        virtualHubParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      virtualHubName: string,
      options?: VirtualHubsGetOptionalParams,
    ) => get(context, resourceGroupName, virtualHubName, options),
  };
}

export function _getVirtualHubsOperations(
  context: NetworkManagementContext,
): VirtualHubsOperations {
  return {
    ..._getVirtualHubs(context),
  };
}
