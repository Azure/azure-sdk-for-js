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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  delete: (
    resourceGroupName: string,
    dnsForwardingRulesetName: string,
    virtualNetworkLinkName: string,
    options?: VirtualNetworkLinksDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    dnsForwardingRulesetName: string,
    virtualNetworkLinkName: string,
    options?: VirtualNetworkLinksDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    dnsForwardingRulesetName: string,
    virtualNetworkLinkName: string,
    options?: VirtualNetworkLinksDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a virtual network link to a DNS forwarding ruleset. */
  update: (
    resourceGroupName: string,
    dnsForwardingRulesetName: string,
    virtualNetworkLinkName: string,
    parameters: VirtualNetworkLinkPatch,
    options?: VirtualNetworkLinksUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualNetworkLink>, VirtualNetworkLink>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    dnsForwardingRulesetName: string,
    virtualNetworkLinkName: string,
    parameters: VirtualNetworkLinkPatch,
    options?: VirtualNetworkLinksUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VirtualNetworkLink>, VirtualNetworkLink>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    dnsForwardingRulesetName: string,
    virtualNetworkLinkName: string,
    parameters: VirtualNetworkLinkPatch,
    options?: VirtualNetworkLinksUpdateOptionalParams,
  ) => Promise<VirtualNetworkLink>;
  /** Creates or updates a virtual network link to a DNS forwarding ruleset. */
  createOrUpdate: (
    resourceGroupName: string,
    dnsForwardingRulesetName: string,
    virtualNetworkLinkName: string,
    parameters: VirtualNetworkLink,
    options?: VirtualNetworkLinksCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualNetworkLink>, VirtualNetworkLink>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    dnsForwardingRulesetName: string,
    virtualNetworkLinkName: string,
    parameters: VirtualNetworkLink,
    options?: VirtualNetworkLinksCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VirtualNetworkLink>, VirtualNetworkLink>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    dnsForwardingRulesetName: string,
    virtualNetworkLinkName: string,
    parameters: VirtualNetworkLink,
    options?: VirtualNetworkLinksCreateOrUpdateOptionalParams,
  ) => Promise<VirtualNetworkLink>;
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
    beginDelete: async (
      resourceGroupName: string,
      dnsForwardingRulesetName: string,
      virtualNetworkLinkName: string,
      options?: VirtualNetworkLinksDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        dnsForwardingRulesetName,
        virtualNetworkLinkName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      dnsForwardingRulesetName: string,
      virtualNetworkLinkName: string,
      options?: VirtualNetworkLinksDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        dnsForwardingRulesetName,
        virtualNetworkLinkName,
        options,
      );
    },
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
    beginUpdate: async (
      resourceGroupName: string,
      dnsForwardingRulesetName: string,
      virtualNetworkLinkName: string,
      parameters: VirtualNetworkLinkPatch,
      options?: VirtualNetworkLinksUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        dnsForwardingRulesetName,
        virtualNetworkLinkName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      dnsForwardingRulesetName: string,
      virtualNetworkLinkName: string,
      parameters: VirtualNetworkLinkPatch,
      options?: VirtualNetworkLinksUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        dnsForwardingRulesetName,
        virtualNetworkLinkName,
        parameters,
        options,
      );
    },
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
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      dnsForwardingRulesetName: string,
      virtualNetworkLinkName: string,
      parameters: VirtualNetworkLink,
      options?: VirtualNetworkLinksCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        dnsForwardingRulesetName,
        virtualNetworkLinkName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      dnsForwardingRulesetName: string,
      virtualNetworkLinkName: string,
      parameters: VirtualNetworkLink,
      options?: VirtualNetworkLinksCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        dnsForwardingRulesetName,
        virtualNetworkLinkName,
        parameters,
        options,
      );
    },
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
