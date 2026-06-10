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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  delete: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    options?: DnsResolverPoliciesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    options?: DnsResolverPoliciesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    options?: DnsResolverPoliciesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a DNS resolver policy. */
  update: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    parameters: DnsResolverPolicyPatch,
    options?: DnsResolverPoliciesUpdateOptionalParams,
  ) => PollerLike<OperationState<DnsResolverPolicy>, DnsResolverPolicy>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    parameters: DnsResolverPolicyPatch,
    options?: DnsResolverPoliciesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DnsResolverPolicy>, DnsResolverPolicy>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    parameters: DnsResolverPolicyPatch,
    options?: DnsResolverPoliciesUpdateOptionalParams,
  ) => Promise<DnsResolverPolicy>;
  /** Creates or updates a DNS resolver policy. */
  createOrUpdate: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    parameters: DnsResolverPolicy,
    options?: DnsResolverPoliciesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DnsResolverPolicy>, DnsResolverPolicy>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    parameters: DnsResolverPolicy,
    options?: DnsResolverPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DnsResolverPolicy>, DnsResolverPolicy>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    parameters: DnsResolverPolicy,
    options?: DnsResolverPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<DnsResolverPolicy>;
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
    beginDelete: async (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      options?: DnsResolverPoliciesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, dnsResolverPolicyName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      options?: DnsResolverPoliciesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, dnsResolverPolicyName, options);
    },
    update: (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      parameters: DnsResolverPolicyPatch,
      options?: DnsResolverPoliciesUpdateOptionalParams,
    ) => update(context, resourceGroupName, dnsResolverPolicyName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      parameters: DnsResolverPolicyPatch,
      options?: DnsResolverPoliciesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, dnsResolverPolicyName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      parameters: DnsResolverPolicyPatch,
      options?: DnsResolverPoliciesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, dnsResolverPolicyName, parameters, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      parameters: DnsResolverPolicy,
      options?: DnsResolverPoliciesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, dnsResolverPolicyName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      parameters: DnsResolverPolicy,
      options?: DnsResolverPoliciesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        dnsResolverPolicyName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      dnsResolverPolicyName: string,
      parameters: DnsResolverPolicy,
      options?: DnsResolverPoliciesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        dnsResolverPolicyName,
        parameters,
        options,
      );
    },
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
