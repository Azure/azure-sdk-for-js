// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PaloAltoNetworksCloudngfwContext } from "../../api/paloAltoNetworksCloudngfwContext.js";
import { listByFirewalls, get } from "../../api/firewallStatus/operations.js";
import type {
  FirewallStatusListByFirewallsOptionalParams,
  FirewallStatusGetOptionalParams,
} from "../../api/firewallStatus/options.js";
import type { FirewallStatusResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a FirewallStatus operations. */
export interface FirewallStatusOperations {
  /** List FirewallStatusResource resources by Firewalls */
  listByFirewalls: (
    resourceGroupName: string,
    firewallName: string,
    options?: FirewallStatusListByFirewallsOptionalParams,
  ) => PagedAsyncIterableIterator<FirewallStatusResource>;
  /** Get a FirewallStatusResource */
  get: (
    resourceGroupName: string,
    firewallName: string,
    options?: FirewallStatusGetOptionalParams,
  ) => Promise<FirewallStatusResource>;
}

function _getFirewallStatus(context: PaloAltoNetworksCloudngfwContext) {
  return {
    listByFirewalls: (
      resourceGroupName: string,
      firewallName: string,
      options?: FirewallStatusListByFirewallsOptionalParams,
    ) => listByFirewalls(context, resourceGroupName, firewallName, options),
    get: (
      resourceGroupName: string,
      firewallName: string,
      options?: FirewallStatusGetOptionalParams,
    ) => get(context, resourceGroupName, firewallName, options),
  };
}

export function _getFirewallStatusOperations(
  context: PaloAltoNetworksCloudngfwContext,
): FirewallStatusOperations {
  return {
    ..._getFirewallStatus(context),
  };
}
