// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DnsResolverManagementContext } from "../../api/dnsResolverManagementContext.js";
import {
  listByVirtualNetwork,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/dnsResolverPolicies/operations.js";
import type {
  DnsResolverPoliciesListByVirtualNetworkOptionalParams,
  DnsResolverPoliciesListOptionalParams,
  DnsResolverPoliciesListByResourceGroupOptionalParams,
  DnsResolverPoliciesDeleteOptionalParams,
  DnsResolverPoliciesUpdateOptionalParams,
  DnsResolverPoliciesCreateOrUpdateOptionalParams,
  DnsResolverPoliciesGetOptionalParams,
} from "../../api/dnsResolverPolicies/options.js";
import type {
  SubResource,
  DnsResolverPolicy,
  DnsResolverPolicyPatch,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DnsResolverPolicies operations. */
export interface DnsResolverPoliciesOperations {
  /** Lists DNS resolver policy resource IDs linked to a virtual network. */
  listByVirtualNetwork: (
    resourceGroupName: string,
    virtualNetworkName: string,
    options?: DnsResolverPoliciesListByVirtualNetworkOptionalParams,
  ) => PagedAsyncIterableIterator<SubResource>;
  /** Lists DNS resolver policies in all resource groups of a subscription. */
  list: (
    options?: DnsResolverPoliciesListOptionalParams,
  ) => PagedAsyncIterableIterator<DnsResolverPolicy>;
  /** Lists DNS resolver policies within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: DnsResolverPoliciesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DnsResolverPolicy>;
  /** Deletes a DNS resolver policy. WARNING: This operation cannot be undone. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    options?: DnsResolverPoliciesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a DNS resolver policy. */
  update: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    parameters: DnsResolverPolicyPatch,
    options?: DnsResolverPoliciesUpdateOptionalParams,
  ) => PollerLike<OperationState<DnsResolverPolicy>, DnsResolverPolicy>;
  /** Creates or updates a DNS resolver policy. */
  createOrUpdate: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    parameters: DnsResolverPolicy,
    options?: DnsResolverPoliciesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DnsResolverPolicy>, DnsResolverPolicy>;
  /** Gets properties of a DNS resolver policy. */
  get: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    options?: DnsResolverPoliciesGetOptionalParams,
  ) => Promise<DnsResolverPolicy>;
}

function _getDnsResolverPolicies(context: DnsResolverManagementContext) {
  return {
    listByVirtualNetwork: (
      resourceGroupName: string,
      virtualNetworkName: string,
      options?: DnsResolverPoliciesListByVirtualNetworkOptionalParams,
    ) => listByVirtualNetwork(context, resourceGroupName, virtualNetworkName, options),
    list: (options?: DnsResolverPoliciesListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: DnsResolverPoliciesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      options?: DnsResolverPoliciesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, dnsResolverPolicyName, options),
    update: (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      parameters: DnsResolverPolicyPatch,
      options?: DnsResolverPoliciesUpdateOptionalParams,
    ) => update(context, resourceGroupName, dnsResolverPolicyName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      parameters: DnsResolverPolicy,
      options?: DnsResolverPoliciesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, dnsResolverPolicyName, parameters, options),
    get: (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      options?: DnsResolverPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, dnsResolverPolicyName, options),
  };
}

export function _getDnsResolverPoliciesOperations(
  context: DnsResolverManagementContext,
): DnsResolverPoliciesOperations {
  return {
    ..._getDnsResolverPolicies(context),
  };
}
