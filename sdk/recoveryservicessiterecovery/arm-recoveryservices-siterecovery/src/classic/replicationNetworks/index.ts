// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext } from "../../api/siteRecoveryManagementContext.js";
import { list, listByReplicationFabrics, get } from "../../api/replicationNetworks/operations.js";
import type {
  ReplicationNetworksListOptionalParams,
  ReplicationNetworksListByReplicationFabricsOptionalParams,
  ReplicationNetworksGetOptionalParams,
} from "../../api/replicationNetworks/options.js";
import type { Network } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ReplicationNetworks operations. */
export interface ReplicationNetworksOperations {
  /** Lists the networks available in a vault. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: ReplicationNetworksListOptionalParams,
  ) => PagedAsyncIterableIterator<Network>;
  /** Lists the networks available for a fabric. */
  listByReplicationFabrics: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    options?: ReplicationNetworksListByReplicationFabricsOptionalParams,
  ) => PagedAsyncIterableIterator<Network>;
  /** Gets the details of a network. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    networkName: string,
    options?: ReplicationNetworksGetOptionalParams,
  ) => Promise<Network>;
}

function _getReplicationNetworks(context: SiteRecoveryManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: ReplicationNetworksListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    listByReplicationFabrics: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      options?: ReplicationNetworksListByReplicationFabricsOptionalParams,
    ) => listByReplicationFabrics(context, resourceGroupName, resourceName, fabricName, options),
    get: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      networkName: string,
      options?: ReplicationNetworksGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, fabricName, networkName, options),
  };
}

export function _getReplicationNetworksOperations(
  context: SiteRecoveryManagementContext,
): ReplicationNetworksOperations {
  return {
    ..._getReplicationNetworks(context),
  };
}
