// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricManagedClustersManagementContext } from "../../api/serviceFabricManagedClustersManagementContext.js";
import { NodeTypeAvailableSku } from "../../models/models.js";
import { NodeTypeSkusListOptionalParams } from "../../api/nodeTypeSkus/options.js";
import { list } from "../../api/nodeTypeSkus/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a NodeTypeSkus operations. */
export interface NodeTypeSkusOperations {
  /** Get a Service Fabric node type supported SKUs. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    nodeTypeName: string,
    options?: NodeTypeSkusListOptionalParams,
  ) => PagedAsyncIterableIterator<NodeTypeAvailableSku>;
}

function _getNodeTypeSkus(context: ServiceFabricManagedClustersManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      clusterName: string,
      nodeTypeName: string,
      options?: NodeTypeSkusListOptionalParams,
    ) => list(context, resourceGroupName, clusterName, nodeTypeName, options),
  };
}

export function _getNodeTypeSkusOperations(
  context: ServiceFabricManagedClustersManagementContext,
): NodeTypeSkusOperations {
  return {
    ..._getNodeTypeSkus(context),
  };
}
