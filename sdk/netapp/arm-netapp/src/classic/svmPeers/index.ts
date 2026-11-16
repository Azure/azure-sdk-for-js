// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import { listByParent, get } from "../../api/svmPeers/operations.js";
import type {
  SvmPeersListByParentOptionalParams,
  SvmPeersGetOptionalParams,
} from "../../api/svmPeers/options.js";
import type { SvmPeer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SvmPeers operations. */
export interface SvmPeersOperations {
  /** List and describe all SVM Peers under a Cluster Peer */
  listByParent: (
    resourceGroupName: string,
    externalClusterName: string,
    peerId: string,
    options?: SvmPeersListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<SvmPeer>;
  /** Get the SVM Peer */
  get: (
    resourceGroupName: string,
    externalClusterName: string,
    peerId: string,
    svmPeerId: string,
    options?: SvmPeersGetOptionalParams,
  ) => Promise<SvmPeer>;
}

function _getSvmPeers(context: NetAppManagementContext) {
  return {
    listByParent: (
      resourceGroupName: string,
      externalClusterName: string,
      peerId: string,
      options?: SvmPeersListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, externalClusterName, peerId, options),
    get: (
      resourceGroupName: string,
      externalClusterName: string,
      peerId: string,
      svmPeerId: string,
      options?: SvmPeersGetOptionalParams,
    ) => get(context, resourceGroupName, externalClusterName, peerId, svmPeerId, options),
  };
}

export function _getSvmPeersOperations(context: NetAppManagementContext): SvmPeersOperations {
  return {
    ..._getSvmPeers(context),
  };
}
