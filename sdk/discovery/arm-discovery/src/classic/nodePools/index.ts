// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DiscoveryContext } from "../../api/discoveryContext.js";
import {
  listBySupercomputer,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/nodePools/operations.js";
import type {
  NodePoolsListBySupercomputerOptionalParams,
  NodePoolsDeleteOptionalParams,
  NodePoolsUpdateOptionalParams,
  NodePoolsCreateOrUpdateOptionalParams,
  NodePoolsGetOptionalParams,
} from "../../api/nodePools/options.js";
import type { NodePool, NodePoolUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NodePools operations. */
export interface NodePoolsOperations {
  /** List NodePool resources by Supercomputer */
  listBySupercomputer: (
    resourceGroupName: string,
    supercomputerName: string,
    options?: NodePoolsListBySupercomputerOptionalParams,
  ) => PagedAsyncIterableIterator<NodePool>;
  /** Delete a NodePool */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    supercomputerName: string,
    nodePoolName: string,
    options?: NodePoolsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a NodePool */
  update: (
    resourceGroupName: string,
    supercomputerName: string,
    nodePoolName: string,
    properties: NodePoolUpdate,
    options?: NodePoolsUpdateOptionalParams,
  ) => PollerLike<OperationState<NodePool>, NodePool>;
  /** Create a NodePool */
  createOrUpdate: (
    resourceGroupName: string,
    supercomputerName: string,
    nodePoolName: string,
    resource: NodePool,
    options?: NodePoolsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<NodePool>, NodePool>;
  /** Get a NodePool */
  get: (
    resourceGroupName: string,
    supercomputerName: string,
    nodePoolName: string,
    options?: NodePoolsGetOptionalParams,
  ) => Promise<NodePool>;
}

function _getNodePools(context: DiscoveryContext) {
  return {
    listBySupercomputer: (
      resourceGroupName: string,
      supercomputerName: string,
      options?: NodePoolsListBySupercomputerOptionalParams,
    ) => listBySupercomputer(context, resourceGroupName, supercomputerName, options),
    delete: (
      resourceGroupName: string,
      supercomputerName: string,
      nodePoolName: string,
      options?: NodePoolsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, supercomputerName, nodePoolName, options),
    update: (
      resourceGroupName: string,
      supercomputerName: string,
      nodePoolName: string,
      properties: NodePoolUpdate,
      options?: NodePoolsUpdateOptionalParams,
    ) => update(context, resourceGroupName, supercomputerName, nodePoolName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      supercomputerName: string,
      nodePoolName: string,
      resource: NodePool,
      options?: NodePoolsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        supercomputerName,
        nodePoolName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      supercomputerName: string,
      nodePoolName: string,
      options?: NodePoolsGetOptionalParams,
    ) => get(context, resourceGroupName, supercomputerName, nodePoolName, options),
  };
}

export function _getNodePoolsOperations(context: DiscoveryContext): NodePoolsOperations {
  return {
    ..._getNodePools(context),
  };
}
