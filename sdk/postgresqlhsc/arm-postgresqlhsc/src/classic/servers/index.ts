// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DBforPostgreSQLContext } from "../../api/dBforPostgreSQLContext.js";
import { listByCluster, get } from "../../api/servers/operations.js";
import {
  ServersListByClusterOptionalParams,
  ServersGetOptionalParams,
} from "../../api/servers/options.js";
import { ClusterServer } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Servers operations. */
export interface ServersOperations {
  /** Lists servers of a cluster. */
  listByCluster: (
    resourceGroupName: string,
    clusterName: string,
    options?: ServersListByClusterOptionalParams,
  ) => PagedAsyncIterableIterator<ClusterServer>;
  /** Gets information about a server in cluster. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    serverName: string,
    options?: ServersGetOptionalParams,
  ) => Promise<ClusterServer>;
}

function _getServers(context: DBforPostgreSQLContext) {
  return {
    listByCluster: (
      resourceGroupName: string,
      clusterName: string,
      options?: ServersListByClusterOptionalParams,
    ) => listByCluster(context, resourceGroupName, clusterName, options),
    get: (
      resourceGroupName: string,
      clusterName: string,
      serverName: string,
      options?: ServersGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, serverName, options),
  };
}

export function _getServersOperations(context: DBforPostgreSQLContext): ServersOperations {
  return {
    ..._getServers(context),
  };
}
