// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext } from "../../api/horizonDbContext.js";
import { list, get } from "../../api/nodes/operations.js";
import type { NodesListOptionalParams, NodesGetOptionalParams } from "../../api/nodes/options.js";
import type { Node } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Nodes operations. */
export interface NodesOperations {
  /** Lists the nodes allocated to a HorizonDB pool. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    options?: NodesListOptionalParams,
  ) => PagedAsyncIterableIterator<Node>;
  /** Gets a node allocated to a HorizonDB pool. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    nodeName: string,
    options?: NodesGetOptionalParams,
  ) => Promise<Node>;
}

function _getNodes(context: HorizonDbContext) {
  return {
    list: (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      options?: NodesListOptionalParams,
    ) => list(context, resourceGroupName, clusterName, poolName, options),
    get: (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      nodeName: string,
      options?: NodesGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, poolName, nodeName, options),
  };
}

export function _getNodesOperations(context: HorizonDbContext): NodesOperations {
  return {
    ..._getNodes(context),
  };
}
