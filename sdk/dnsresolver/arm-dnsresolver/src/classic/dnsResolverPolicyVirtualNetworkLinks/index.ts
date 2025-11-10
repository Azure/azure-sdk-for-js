// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DnsResolverManagementContext } from "../../api/dnsResolverManagementContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/dnsResolverPolicyVirtualNetworkLinks/operations.js";
import type {
  DnsResolverPolicyVirtualNetworkLinksListOptionalParams,
  DnsResolverPolicyVirtualNetworkLinksDeleteOptionalParams,
  DnsResolverPolicyVirtualNetworkLinksUpdateOptionalParams,
  DnsResolverPolicyVirtualNetworkLinksCreateOrUpdateOptionalParams,
  DnsResolverPolicyVirtualNetworkLinksGetOptionalParams,
} from "../../api/dnsResolverPolicyVirtualNetworkLinks/options.js";
import type {
  DnsResolverPolicyVirtualNetworkLink,
  DnsResolverPolicyVirtualNetworkLinkPatch,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DnsResolverPolicyVirtualNetworkLinks operations. */
export interface DnsResolverPolicyVirtualNetworkLinksOperations {
  /** Lists DNS resolver policy virtual network links. */
  list: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    options?: DnsResolverPolicyVirtualNetworkLinksListOptionalParams,
  ) => PagedAsyncIterableIterator<DnsResolverPolicyVirtualNetworkLink>;
  /** Deletes a DNS resolver policy virtual network link. WARNING: This operation cannot be undone. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    dnsResolverPolicyVirtualNetworkLinkName: string,
    options?: DnsResolverPolicyVirtualNetworkLinksDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
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
