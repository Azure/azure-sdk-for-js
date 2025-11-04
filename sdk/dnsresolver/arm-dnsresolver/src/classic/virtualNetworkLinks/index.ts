// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DnsResolverManagementContext } from "../../api/dnsResolverManagementContext.js";
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
import type { VirtualNetworkLink, VirtualNetworkLinkPatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualNetworkLinks operations. */
export interface VirtualNetworkLinksOperations {
  /** Lists virtual network links to a DNS forwarding ruleset. */
  list: (
    resourceGroupName: string,
    dnsForwardingRulesetName: string,
    options?: VirtualNetworkLinksListOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualNetworkLink>;
  /** Deletes a virtual network link to a DNS forwarding ruleset. WARNING: This operation cannot be undone. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    dnsForwardingRulesetName: string,
    virtualNetworkLinkName: string,
    options?: VirtualNetworkLinksDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a virtual network link to a DNS forwarding ruleset. */
  update: (
    resourceGroupName: string,
    dnsForwardingRulesetName: string,
    virtualNetworkLinkName: string,
    parameters: VirtualNetworkLinkPatch,
    options?: VirtualNetworkLinksUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualNetworkLink>, VirtualNetworkLink>;
  /** Creates or updates a virtual network link to a DNS forwarding ruleset. */
  createOrUpdate: (
    resourceGroupName: string,
    dnsForwardingRulesetName: string,
    virtualNetworkLinkName: string,
    parameters: VirtualNetworkLink,
    options?: VirtualNetworkLinksCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualNetworkLink>, VirtualNetworkLink>;
  /** Gets properties of a virtual network link to a DNS forwarding ruleset. */
  get: (
    resourceGroupName: string,
    dnsForwardingRulesetName: string,
    virtualNetworkLinkName: string,
    options?: VirtualNetworkLinksGetOptionalParams,
  ) => Promise<VirtualNetworkLink>;
}

function _getVirtualNetworkLinks(context: DnsResolverManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      dnsForwardingRulesetName: string,
      options?: VirtualNetworkLinksListOptionalParams,
    ) => list(context, resourceGroupName, dnsForwardingRulesetName, options),
    delete: (
      resourceGroupName: string,
      dnsForwardingRulesetName: string,
      virtualNetworkLinkName: string,
      options?: VirtualNetworkLinksDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        dnsForwardingRulesetName,
        virtualNetworkLinkName,
        options,
      ),
    update: (
      resourceGroupName: string,
      dnsForwardingRulesetName: string,
      virtualNetworkLinkName: string,
      parameters: VirtualNetworkLinkPatch,
      options?: VirtualNetworkLinksUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        dnsForwardingRulesetName,
        virtualNetworkLinkName,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      dnsForwardingRulesetName: string,
      virtualNetworkLinkName: string,
      parameters: VirtualNetworkLink,
      options?: VirtualNetworkLinksCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        dnsForwardingRulesetName,
        virtualNetworkLinkName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      dnsForwardingRulesetName: string,
      virtualNetworkLinkName: string,
      options?: VirtualNetworkLinksGetOptionalParams,
    ) => get(context, resourceGroupName, dnsForwardingRulesetName, virtualNetworkLinkName, options),
  };
}

export function _getVirtualNetworkLinksOperations(
  context: DnsResolverManagementContext,
): VirtualNetworkLinksOperations {
  return {
    ..._getVirtualNetworkLinks(context),
  };
}
