// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DnsResolverManagementContext } from "../../api/dnsResolverManagementContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/dnsResolverPolicyVirtualNetworkLinks/operations.js";
import {
  DnsResolverPolicyVirtualNetworkLinksListOptionalParams,
  DnsResolverPolicyVirtualNetworkLinksDeleteOptionalParams,
  DnsResolverPolicyVirtualNetworkLinksUpdateOptionalParams,
  DnsResolverPolicyVirtualNetworkLinksCreateOrUpdateOptionalParams,
  DnsResolverPolicyVirtualNetworkLinksGetOptionalParams,
} from "../../api/dnsResolverPolicyVirtualNetworkLinks/options.js";
import {
  DnsResolverPolicyVirtualNetworkLink,
  DnsResolverPolicyVirtualNetworkLinkPatch,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DnsResolverPolicyVirtualNetworkLinks operations. */
export interface DnsResolverPolicyVirtualNetworkLinksOperations {
  /** Lists DNS resolver policy virtual network links. */
  list: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    options?: DnsResolverPolicyVirtualNetworkLinksListOptionalParams,
  ) => PagedAsyncIterableIterator<DnsResolverPolicyVirtualNetworkLink>;
  /** Deletes a DNS resolver policy virtual network link. WARNING: This operation cannot be undone. */
  delete: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    dnsResolverPolicyVirtualNetworkLinkName: string,
    options?: DnsResolverPolicyVirtualNetworkLinksDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    dnsResolverPolicyVirtualNetworkLinkName: string,
    options?: DnsResolverPolicyVirtualNetworkLinksDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    dnsResolverPolicyVirtualNetworkLinkName: string,
    options?: DnsResolverPolicyVirtualNetworkLinksDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a DNS resolver policy virtual network link. */
  update: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    dnsResolverPolicyVirtualNetworkLinkName: string,
    parameters: DnsResolverPolicyVirtualNetworkLinkPatch,
    options?: DnsResolverPolicyVirtualNetworkLinksUpdateOptionalParams,
  ) => PollerLike<
    OperationState<DnsResolverPolicyVirtualNetworkLink>,
    DnsResolverPolicyVirtualNetworkLink
  >;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    dnsResolverPolicyVirtualNetworkLinkName: string,
    parameters: DnsResolverPolicyVirtualNetworkLinkPatch,
    options?: DnsResolverPolicyVirtualNetworkLinksUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<DnsResolverPolicyVirtualNetworkLink>,
      DnsResolverPolicyVirtualNetworkLink
    >
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    dnsResolverPolicyVirtualNetworkLinkName: string,
    parameters: DnsResolverPolicyVirtualNetworkLinkPatch,
    options?: DnsResolverPolicyVirtualNetworkLinksUpdateOptionalParams,
  ) => Promise<DnsResolverPolicyVirtualNetworkLink>;
  /** Creates or updates a DNS resolver policy virtual network link. */
  createOrUpdate: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    dnsResolverPolicyVirtualNetworkLinkName: string,
    parameters: DnsResolverPolicyVirtualNetworkLink,
    options?: DnsResolverPolicyVirtualNetworkLinksCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<DnsResolverPolicyVirtualNetworkLink>,
    DnsResolverPolicyVirtualNetworkLink
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    dnsResolverPolicyVirtualNetworkLinkName: string,
    parameters: DnsResolverPolicyVirtualNetworkLink,
    options?: DnsResolverPolicyVirtualNetworkLinksCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<DnsResolverPolicyVirtualNetworkLink>,
      DnsResolverPolicyVirtualNetworkLink
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    dnsResolverPolicyVirtualNetworkLinkName: string,
    parameters: DnsResolverPolicyVirtualNetworkLink,
    options?: DnsResolverPolicyVirtualNetworkLinksCreateOrUpdateOptionalParams,
  ) => Promise<DnsResolverPolicyVirtualNetworkLink>;
  /** Gets properties of a DNS resolver policy virtual network link. */
  get: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    dnsResolverPolicyVirtualNetworkLinkName: string,
    options?: DnsResolverPolicyVirtualNetworkLinksGetOptionalParams,
  ) => Promise<DnsResolverPolicyVirtualNetworkLink>;
}

function _getDnsResolverPolicyVirtualNetworkLinks(context: DnsResolverManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      options?: DnsResolverPolicyVirtualNetworkLinksListOptionalParams,
    ) => list(context, resourceGroupName, dnsResolverPolicyName, options),
    delete: (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      dnsResolverPolicyVirtualNetworkLinkName: string,
      options?: DnsResolverPolicyVirtualNetworkLinksDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        dnsResolverPolicyName,
        dnsResolverPolicyVirtualNetworkLinkName,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      dnsResolverPolicyVirtualNetworkLinkName: string,
      options?: DnsResolverPolicyVirtualNetworkLinksDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        dnsResolverPolicyName,
        dnsResolverPolicyVirtualNetworkLinkName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      dnsResolverPolicyVirtualNetworkLinkName: string,
      options?: DnsResolverPolicyVirtualNetworkLinksDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        dnsResolverPolicyName,
        dnsResolverPolicyVirtualNetworkLinkName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      dnsResolverPolicyVirtualNetworkLinkName: string,
      parameters: DnsResolverPolicyVirtualNetworkLinkPatch,
      options?: DnsResolverPolicyVirtualNetworkLinksUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        dnsResolverPolicyName,
        dnsResolverPolicyVirtualNetworkLinkName,
        parameters,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      dnsResolverPolicyVirtualNetworkLinkName: string,
      parameters: DnsResolverPolicyVirtualNetworkLinkPatch,
      options?: DnsResolverPolicyVirtualNetworkLinksUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        dnsResolverPolicyName,
        dnsResolverPolicyVirtualNetworkLinkName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      dnsResolverPolicyVirtualNetworkLinkName: string,
      parameters: DnsResolverPolicyVirtualNetworkLinkPatch,
      options?: DnsResolverPolicyVirtualNetworkLinksUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        dnsResolverPolicyName,
        dnsResolverPolicyVirtualNetworkLinkName,
        parameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      dnsResolverPolicyVirtualNetworkLinkName: string,
      parameters: DnsResolverPolicyVirtualNetworkLink,
      options?: DnsResolverPolicyVirtualNetworkLinksCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        dnsResolverPolicyName,
        dnsResolverPolicyVirtualNetworkLinkName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      dnsResolverPolicyVirtualNetworkLinkName: string,
      parameters: DnsResolverPolicyVirtualNetworkLink,
      options?: DnsResolverPolicyVirtualNetworkLinksCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        dnsResolverPolicyName,
        dnsResolverPolicyVirtualNetworkLinkName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      dnsResolverPolicyVirtualNetworkLinkName: string,
      parameters: DnsResolverPolicyVirtualNetworkLink,
      options?: DnsResolverPolicyVirtualNetworkLinksCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        dnsResolverPolicyName,
        dnsResolverPolicyVirtualNetworkLinkName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      dnsResolverPolicyVirtualNetworkLinkName: string,
      options?: DnsResolverPolicyVirtualNetworkLinksGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        dnsResolverPolicyName,
        dnsResolverPolicyVirtualNetworkLinkName,
        options,
      ),
  };
}

export function _getDnsResolverPolicyVirtualNetworkLinksOperations(
  context: DnsResolverManagementContext,
): DnsResolverPolicyVirtualNetworkLinksOperations {
  return {
    ..._getDnsResolverPolicyVirtualNetworkLinks(context),
  };
}
