// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkContext } from "../../api/networkContext.js";
import { VirtualNetworkLink } from "../../models/models.js";
import {
  VirtualNetworkLinksListOptionalParams,
  VirtualNetworkLinksDeleteOptionalParams,
  VirtualNetworkLinksUpdateOptionalParams,
  VirtualNetworkLinksCreateOrUpdateOptionalParams,
  VirtualNetworkLinksGetOptionalParams,
} from "../../api/virtualNetworkLinks/options.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/virtualNetworkLinks/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualNetworkLinks operations. */
export interface VirtualNetworkLinksOperations {
  /** Lists the virtual network links to the specified Private DNS zone. */
  list: (
    resourceGroupName: string,
    privateZoneName: string,
    options?: VirtualNetworkLinksListOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualNetworkLink>;
  /** Deletes a virtual network link to the specified Private DNS zone. WARNING: In case of a registration virtual network, all auto-registered DNS records in the zone for the virtual network will also be deleted. This operation cannot be undone. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
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

function _getVirtualNetworkLinks(context: NetworkContext) {
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
  context: NetworkContext,
): VirtualNetworkLinksOperations {
  return {
    ..._getVirtualNetworkLinks(context),
  };
}
