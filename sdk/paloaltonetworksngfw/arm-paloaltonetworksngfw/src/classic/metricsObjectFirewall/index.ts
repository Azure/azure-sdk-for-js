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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  delete: (
    resourceGroupName: string,
    firewallName: string,
    options?: MetricsObjectFirewallDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    firewallName: string,
    options?: MetricsObjectFirewallDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    firewallName: string,
    options?: MetricsObjectFirewallDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a MetricsObjectFirewallResource */
  createOrUpdate: (
    resourceGroupName: string,
    firewallName: string,
    resource: MetricsObjectFirewallResource,
    options?: MetricsObjectFirewallCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<MetricsObjectFirewallResource>, MetricsObjectFirewallResource>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    firewallName: string,
    resource: MetricsObjectFirewallResource,
    options?: MetricsObjectFirewallCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<MetricsObjectFirewallResource>, MetricsObjectFirewallResource>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    firewallName: string,
    resource: MetricsObjectFirewallResource,
    options?: MetricsObjectFirewallCreateOrUpdateOptionalParams,
  ) => Promise<MetricsObjectFirewallResource>;
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
    beginDelete: async (
      resourceGroupName: string,
      firewallName: string,
      options?: MetricsObjectFirewallDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, firewallName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      firewallName: string,
      options?: MetricsObjectFirewallDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, firewallName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      firewallName: string,
      resource: MetricsObjectFirewallResource,
      options?: MetricsObjectFirewallCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, firewallName, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      firewallName: string,
      resource: MetricsObjectFirewallResource,
      options?: MetricsObjectFirewallCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, firewallName, resource, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      firewallName: string,
      resource: MetricsObjectFirewallResource,
      options?: MetricsObjectFirewallCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, firewallName, resource, options);
    },
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
