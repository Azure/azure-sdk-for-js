// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import { listByParent, get } from "../../api/clusterPeers/operations.js";
import type {
  ClusterPeersListByParentOptionalParams,
  ClusterPeersGetOptionalParams,
} from "../../api/clusterPeers/options.js";
import type { ClusterPeer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ClusterPeers operations. */
export interface ClusterPeersOperations {
  /** List all Cluster Peers under an External Cluster */
  listByParent: (
    resourceGroupName: string,
    externalClusterName: string,
    options?: ClusterPeersListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<ClusterPeer>;
  /** Get the Cluster Peer */
  get: (
    resourceGroupName: string,
    externalClusterName: string,
    peerId: string,
    options?: ClusterPeersGetOptionalParams,
  ) => Promise<ClusterPeer>;
}

function _getClusterPeers(context: NetAppManagementContext) {
  return {
    listByParent: (
      resourceGroupName: string,
      externalClusterName: string,
      options?: ClusterPeersListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, externalClusterName, options),
    get: (
      resourceGroupName: string,
      externalClusterName: string,
      peerId: string,
      options?: ClusterPeersGetOptionalParams,
    ) => get(context, resourceGroupName, externalClusterName, peerId, options),
  };
}

export function _getClusterPeersOperations(
  context: NetAppManagementContext,
): ClusterPeersOperations {
  return {
    ..._getClusterPeers(context),
  };
}
