// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PaloAltoNetworksCloudngfwContext } from "../../api/paloAltoNetworksCloudngfwContext.js";
import {
  listByFirewalls,
  $delete,
  createOrUpdate,
  get,
} from "../../api/metricsObjectFirewall/operations.js";
import type {
  MetricsObjectFirewallListByFirewallsOptionalParams,
  MetricsObjectFirewallDeleteOptionalParams,
  MetricsObjectFirewallCreateOrUpdateOptionalParams,
  MetricsObjectFirewallGetOptionalParams,
} from "../../api/metricsObjectFirewall/options.js";
import type { MetricsObjectFirewallResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a MetricsObjectFirewall operations. */
export interface MetricsObjectFirewallOperations {
  /** List MetricsObjectFirewallResource resources by Firewalls */
  listByFirewalls: (
    resourceGroupName: string,
    firewallName: string,
    options?: MetricsObjectFirewallListByFirewallsOptionalParams,
  ) => PagedAsyncIterableIterator<MetricsObjectFirewallResource>;
  /** Delete a MetricsObjectFirewallResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    firewallName: string,
    options?: MetricsObjectFirewallDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a MetricsObjectFirewallResource */
  createOrUpdate: (
    resourceGroupName: string,
    firewallName: string,
    resource: MetricsObjectFirewallResource,
    options?: MetricsObjectFirewallCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<MetricsObjectFirewallResource>, MetricsObjectFirewallResource>;
  /** Get a MetricsObjectFirewallResource */
  get: (
    resourceGroupName: string,
    firewallName: string,
    options?: MetricsObjectFirewallGetOptionalParams,
  ) => Promise<MetricsObjectFirewallResource>;
}

function _getMetricsObjectFirewall(context: PaloAltoNetworksCloudngfwContext) {
  return {
    listByFirewalls: (
      resourceGroupName: string,
      firewallName: string,
      options?: MetricsObjectFirewallListByFirewallsOptionalParams,
    ) => listByFirewalls(context, resourceGroupName, firewallName, options),
    delete: (
      resourceGroupName: string,
      firewallName: string,
      options?: MetricsObjectFirewallDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, firewallName, options),
    createOrUpdate: (
      resourceGroupName: string,
      firewallName: string,
      resource: MetricsObjectFirewallResource,
      options?: MetricsObjectFirewallCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, firewallName, resource, options),
    get: (
      resourceGroupName: string,
      firewallName: string,
      options?: MetricsObjectFirewallGetOptionalParams,
    ) => get(context, resourceGroupName, firewallName, options),
  };
}

export function _getMetricsObjectFirewallOperations(
  context: PaloAltoNetworksCloudngfwContext,
): MetricsObjectFirewallOperations {
  return {
    ..._getMetricsObjectFirewall(context),
  };
}
