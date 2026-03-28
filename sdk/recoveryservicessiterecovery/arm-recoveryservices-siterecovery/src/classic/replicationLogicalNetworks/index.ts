// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext } from "../../api/siteRecoveryManagementContext.js";
import { listByReplicationFabrics, get } from "../../api/replicationLogicalNetworks/operations.js";
import type {
  ReplicationLogicalNetworksListByReplicationFabricsOptionalParams,
  ReplicationLogicalNetworksGetOptionalParams,
} from "../../api/replicationLogicalNetworks/options.js";
import type { LogicalNetwork } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ReplicationLogicalNetworks operations. */
export interface ReplicationLogicalNetworksOperations {
  /** Lists all the logical networks of the Azure Site Recovery fabric. */
  listByReplicationFabrics: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    options?: ReplicationLogicalNetworksListByReplicationFabricsOptionalParams,
  ) => PagedAsyncIterableIterator<LogicalNetwork>;
  /** Gets the details of a logical network. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    logicalNetworkName: string,
    options?: ReplicationLogicalNetworksGetOptionalParams,
  ) => Promise<LogicalNetwork>;
}

function _getReplicationLogicalNetworks(context: SiteRecoveryManagementContext) {
  return {
    listByReplicationFabrics: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      options?: ReplicationLogicalNetworksListByReplicationFabricsOptionalParams,
    ) => listByReplicationFabrics(context, resourceGroupName, resourceName, fabricName, options),
    get: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      logicalNetworkName: string,
      options?: ReplicationLogicalNetworksGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, fabricName, logicalNetworkName, options),
  };
}

export function _getReplicationLogicalNetworksOperations(
  context: SiteRecoveryManagementContext,
): ReplicationLogicalNetworksOperations {
  return {
    ..._getReplicationLogicalNetworks(context),
  };
}
