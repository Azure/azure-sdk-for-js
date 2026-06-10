// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PrivateDnsManagementContext } from "../../api/privateDnsManagementContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/virtualNetworkLinks/operations.js";
import type {
  VirtualNetworkLinksListOptionalParams,
  VirtualNetworkLinksDeleteOptionalParams,
  VirtualNetworkLinksUpdateOptionalParams,
  VirtualNetworkLinksCreateOrUpdateOptionalParams,
  VirtualNetworkLinksGetOptionalParams,
} from "../../api/virtualNetworkLinks/options.js";
import type { VirtualNetworkLink } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualNetworkLinks operations. */
export interface VirtualNetworkLinksOperations {
  /** Lists the virtual network links to the specified Private DNS zone. */
  list: (
    resourceGroupName: string,
    privateZoneName: string,
    options?: VirtualNetworkLinksListOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualNetworkLink>;
  /** Deletes a virtual network link to the specified Private DNS zone. WARNING: In case of a registration virtual network, all auto-registered DNS records in the zone for the virtual network will also be deleted. This operation cannot be undone. */
  delete: (
    resourceGroupName: string,
    privateZoneName: string,
    virtualNetworkLinkName: string,
    options?: VirtualNetworkLinksDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a virtual network link to the specified Private DNS zone. */
  update: (
    resourceGroupName: string,
    privateZoneName: string,
    virtualNetworkLinkName: string,
    parameters: VirtualNetworkLink,
    options?: VirtualNetworkLinksUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualNetworkLink>, VirtualNetworkLink>;
  /** Creates or updates a virtual network link to the specified Private DNS zone. */
  createOrUpdate: (
    resourceGroupName: string,
    privateZoneName: string,
    virtualNetworkLinkName: string,
    parameters: VirtualNetworkLink,
    options?: VirtualNetworkLinksCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualNetworkLink>, VirtualNetworkLink>;
  /** Gets a virtual network link to the specified Private DNS zone. */
  get: (
    resourceGroupName: string,
    privateZoneName: string,
    virtualNetworkLinkName: string,
    options?: VirtualNetworkLinksGetOptionalParams,
  ) => Promise<VirtualNetworkLink>;
}

function _getVirtualNetworkLinks(context: PrivateDnsManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      privateZoneName: string,
      options?: VirtualNetworkLinksListOptionalParams,
    ) => list(context, resourceGroupName, privateZoneName, options),
    delete: (
      resourceGroupName: string,
      privateZoneName: string,
      virtualNetworkLinkName: string,
      options?: VirtualNetworkLinksDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, privateZoneName, virtualNetworkLinkName, options),
    update: (
      resourceGroupName: string,
      privateZoneName: string,
      virtualNetworkLinkName: string,
      parameters: VirtualNetworkLink,
      options?: VirtualNetworkLinksUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        privateZoneName,
        virtualNetworkLinkName,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      privateZoneName: string,
      virtualNetworkLinkName: string,
      parameters: VirtualNetworkLink,
      options?: VirtualNetworkLinksCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        privateZoneName,
        virtualNetworkLinkName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      privateZoneName: string,
      virtualNetworkLinkName: string,
      options?: VirtualNetworkLinksGetOptionalParams,
    ) => get(context, resourceGroupName, privateZoneName, virtualNetworkLinkName, options),
  };
}

export function _getVirtualNetworkLinksOperations(
  context: PrivateDnsManagementContext,
): VirtualNetworkLinksOperations {
  return {
    ..._getVirtualNetworkLinks(context),
  };
}
