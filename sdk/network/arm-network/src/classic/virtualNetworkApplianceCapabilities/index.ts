// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/virtualNetworkApplianceCapabilities/operations.js";
import type {
  VirtualNetworkApplianceCapabilitiesListOptionalParams,
  VirtualNetworkApplianceCapabilitiesDeleteOptionalParams,
  VirtualNetworkApplianceCapabilitiesCreateOrUpdateOptionalParams,
  VirtualNetworkApplianceCapabilitiesGetOptionalParams,
} from "../../api/virtualNetworkApplianceCapabilities/options.js";
import type { VirtualNetworkApplianceCapabilityUnion } from "../../models/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualNetworkApplianceCapabilities operations. */
export interface VirtualNetworkApplianceCapabilitiesOperations {
  /** Gets all capabilities of a virtual network appliance. */
  list: (
    resourceGroupName: string,
    virtualNetworkApplianceName: string,
    options?: VirtualNetworkApplianceCapabilitiesListOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualNetworkApplianceCapabilityUnion>;
  /** Deletes the specified capability of a virtual network appliance. */
  delete: (
    resourceGroupName: string,
    virtualNetworkApplianceName: string,
    capabilityName: string,
    options?: VirtualNetworkApplianceCapabilitiesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    virtualNetworkApplianceName: string,
    capabilityName: string,
    options?: VirtualNetworkApplianceCapabilitiesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    virtualNetworkApplianceName: string,
    capabilityName: string,
    options?: VirtualNetworkApplianceCapabilitiesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a capability on a virtual network appliance. */
  createOrUpdate: (
    resourceGroupName: string,
    virtualNetworkApplianceName: string,
    capabilityName: string,
    parameters: VirtualNetworkApplianceCapabilityUnion,
    options?: VirtualNetworkApplianceCapabilitiesCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<VirtualNetworkApplianceCapabilityUnion>,
    VirtualNetworkApplianceCapabilityUnion
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    virtualNetworkApplianceName: string,
    capabilityName: string,
    parameters: VirtualNetworkApplianceCapabilityUnion,
    options?: VirtualNetworkApplianceCapabilitiesCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<VirtualNetworkApplianceCapabilityUnion>,
      VirtualNetworkApplianceCapabilityUnion
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    virtualNetworkApplianceName: string,
    capabilityName: string,
    parameters: VirtualNetworkApplianceCapabilityUnion,
    options?: VirtualNetworkApplianceCapabilitiesCreateOrUpdateOptionalParams,
  ) => Promise<VirtualNetworkApplianceCapabilityUnion>;
  /** Gets the specified capability of a virtual network appliance. */
  get: (
    resourceGroupName: string,
    virtualNetworkApplianceName: string,
    capabilityName: string,
    options?: VirtualNetworkApplianceCapabilitiesGetOptionalParams,
  ) => Promise<VirtualNetworkApplianceCapabilityUnion>;
}

function _getVirtualNetworkApplianceCapabilities(context: NetworkManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      virtualNetworkApplianceName: string,
      options?: VirtualNetworkApplianceCapabilitiesListOptionalParams,
    ) => list(context, resourceGroupName, virtualNetworkApplianceName, options),
    delete: (
      resourceGroupName: string,
      virtualNetworkApplianceName: string,
      capabilityName: string,
      options?: VirtualNetworkApplianceCapabilitiesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, virtualNetworkApplianceName, capabilityName, options),
    beginDelete: async (
      resourceGroupName: string,
      virtualNetworkApplianceName: string,
      capabilityName: string,
      options?: VirtualNetworkApplianceCapabilitiesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        virtualNetworkApplianceName,
        capabilityName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      virtualNetworkApplianceName: string,
      capabilityName: string,
      options?: VirtualNetworkApplianceCapabilitiesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        virtualNetworkApplianceName,
        capabilityName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      virtualNetworkApplianceName: string,
      capabilityName: string,
      parameters: VirtualNetworkApplianceCapabilityUnion,
      options?: VirtualNetworkApplianceCapabilitiesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        virtualNetworkApplianceName,
        capabilityName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      virtualNetworkApplianceName: string,
      capabilityName: string,
      parameters: VirtualNetworkApplianceCapabilityUnion,
      options?: VirtualNetworkApplianceCapabilitiesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        virtualNetworkApplianceName,
        capabilityName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      virtualNetworkApplianceName: string,
      capabilityName: string,
      parameters: VirtualNetworkApplianceCapabilityUnion,
      options?: VirtualNetworkApplianceCapabilitiesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        virtualNetworkApplianceName,
        capabilityName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      virtualNetworkApplianceName: string,
      capabilityName: string,
      options?: VirtualNetworkApplianceCapabilitiesGetOptionalParams,
    ) => get(context, resourceGroupName, virtualNetworkApplianceName, capabilityName, options),
  };
}

export function _getVirtualNetworkApplianceCapabilitiesOperations(
  context: NetworkManagementContext,
): VirtualNetworkApplianceCapabilitiesOperations {
  return {
    ..._getVirtualNetworkApplianceCapabilities(context),
  };
}
