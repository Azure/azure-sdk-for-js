// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedHatOpenShiftContext } from "../../api/redHatOpenShiftContext.js";
import {
  listByParent,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/nodePools/operations.js";
import type {
  NodePoolsListByParentOptionalParams,
  NodePoolsDeleteOptionalParams,
  NodePoolsUpdateOptionalParams,
  NodePoolsCreateOrUpdateOptionalParams,
  NodePoolsGetOptionalParams,
} from "../../api/nodePools/options.js";
import type { NodePool, UpdateablePropertiesNodePoolProperties } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NodePools operations. */
export interface NodePoolsOperations {
  /** List NodePool resources by HcpOpenShiftCluster */
  listByParent: (
    resourceGroupName: string,
    hcpOpenShiftClusterName: string,
    options?: NodePoolsListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<NodePool>;
  /** Delete a NodePool */
  delete: (
    resourceGroupName: string,
    hcpOpenShiftClusterName: string,
    nodePoolName: string,
    options?: NodePoolsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a NodePool */
  update: (
    resourceGroupName: string,
    hcpOpenShiftClusterName: string,
    nodePoolName: string,
    properties: UpdateablePropertiesNodePoolProperties,
    options?: NodePoolsUpdateOptionalParams,
  ) => PollerLike<OperationState<NodePool>, NodePool>;
  /** Create a NodePool */
  createOrUpdate: (
    resourceGroupName: string,
    hcpOpenShiftClusterName: string,
    nodePoolName: string,
    resource: NodePool,
    options?: NodePoolsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<NodePool>, NodePool>;
  /** Get a NodePool */
  get: (
    resourceGroupName: string,
    hcpOpenShiftClusterName: string,
    nodePoolName: string,
    options?: NodePoolsGetOptionalParams,
  ) => Promise<NodePool>;
}

function _getNodePools(context: RedHatOpenShiftContext) {
  return {
    listByParent: (
      resourceGroupName: string,
      hcpOpenShiftClusterName: string,
      options?: NodePoolsListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, hcpOpenShiftClusterName, options),
    delete: (
      resourceGroupName: string,
      hcpOpenShiftClusterName: string,
      nodePoolName: string,
      options?: NodePoolsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, hcpOpenShiftClusterName, nodePoolName, options),
    update: (
      resourceGroupName: string,
      hcpOpenShiftClusterName: string,
      nodePoolName: string,
      properties: UpdateablePropertiesNodePoolProperties,
      options?: NodePoolsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        hcpOpenShiftClusterName,
        nodePoolName,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      hcpOpenShiftClusterName: string,
      nodePoolName: string,
      resource: NodePool,
      options?: NodePoolsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        hcpOpenShiftClusterName,
        nodePoolName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      hcpOpenShiftClusterName: string,
      nodePoolName: string,
      options?: NodePoolsGetOptionalParams,
    ) => get(context, resourceGroupName, hcpOpenShiftClusterName, nodePoolName, options),
  };
}

export function _getNodePoolsOperations(context: RedHatOpenShiftContext): NodePoolsOperations {
  return {
    ..._getNodePools(context),
  };
}
