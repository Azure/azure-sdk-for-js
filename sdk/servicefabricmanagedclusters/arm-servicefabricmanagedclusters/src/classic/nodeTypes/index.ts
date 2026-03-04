// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceFabricManagedClustersManagementContext } from "../../api/serviceFabricManagedClustersManagementContext.js";
import {
  start,
  restart,
  reimage,
  redeploy,
  deleteNode,
  deallocate,
  listByManagedClusters,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/nodeTypes/operations.js";
import type {
  NodeTypesStartOptionalParams,
  NodeTypesRestartOptionalParams,
  NodeTypesReimageOptionalParams,
  NodeTypesRedeployOptionalParams,
  NodeTypesDeleteNodeOptionalParams,
  NodeTypesDeallocateOptionalParams,
  NodeTypesListByManagedClustersOptionalParams,
  NodeTypesDeleteOptionalParams,
  NodeTypesUpdateOptionalParams,
  NodeTypesCreateOrUpdateOptionalParams,
  NodeTypesGetOptionalParams,
} from "../../api/nodeTypes/options.js";
import type {
  NodeType,
  NodeTypeUpdateParameters,
  NodeTypeActionParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NodeTypes operations. */
export interface NodeTypesOperations {
  /** Starts one or more nodes on the node type. It will trigger an allocation of the fabric node if needed and activate them. */
  start: (
    resourceGroupName: string,
    clusterName: string,
    nodeTypeName: string,
    parameters: NodeTypeActionParameters,
    options?: NodeTypesStartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Restarts one or more nodes on the node type. It will disable the fabric nodes, trigger a restart on the VMs and activate the nodes back again. */
  restart: (
    resourceGroupName: string,
    clusterName: string,
    nodeTypeName: string,
    parameters: NodeTypeActionParameters,
    options?: NodeTypesRestartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Reimages one or more nodes on the node type. It will disable the fabric nodes, trigger a reimage on the VMs and activate the nodes back again. */
  reimage: (
    resourceGroupName: string,
    clusterName: string,
    nodeTypeName: string,
    parameters: NodeTypeActionParameters,
    options?: NodeTypesReimageOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Redeploys one or more nodes on the node type. It will disable the fabric nodes, trigger a shut down on the VMs, move them to a new node, and power them back on. */
  redeploy: (
    resourceGroupName: string,
    clusterName: string,
    nodeTypeName: string,
    parameters: NodeTypeActionParameters,
    options?: NodeTypesRedeployOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Deletes one or more nodes on the node type. It will disable the fabric nodes, trigger a delete on the VMs and removes the state from the cluster. */
  deleteNode: (
    resourceGroupName: string,
    clusterName: string,
    nodeTypeName: string,
    parameters: NodeTypeActionParameters,
    options?: NodeTypesDeleteNodeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Deallocates one or more nodes on the node type. It will disable the fabric nodes, trigger a shutdown on the VMs and release them from the cluster. */
  deallocate: (
    resourceGroupName: string,
    clusterName: string,
    nodeTypeName: string,
    parameters: NodeTypeActionParameters,
    options?: NodeTypesDeallocateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Gets all Node types of the specified managed cluster. */
  listByManagedClusters: (
    resourceGroupName: string,
    clusterName: string,
    options?: NodeTypesListByManagedClustersOptionalParams,
  ) => PagedAsyncIterableIterator<NodeType>;
  /** Delete a Service Fabric node type of a given managed cluster. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    nodeTypeName: string,
    options?: NodeTypesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update the configuration of a node type of a given managed cluster, only updating tags or capacity. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    nodeTypeName: string,
    parameters: NodeTypeUpdateParameters,
    options?: NodeTypesUpdateOptionalParams,
  ) => PollerLike<OperationState<NodeType>, NodeType>;
  /** Create or update a Service Fabric node type of a given managed cluster. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    nodeTypeName: string,
    parameters: NodeType,
    options?: NodeTypesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<NodeType>, NodeType>;
  /** Get a Service Fabric node type of a given managed cluster. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    nodeTypeName: string,
    options?: NodeTypesGetOptionalParams,
  ) => Promise<NodeType>;
}

function _getNodeTypes(context: ServiceFabricManagedClustersManagementContext) {
  return {
    start: (
      resourceGroupName: string,
      clusterName: string,
      nodeTypeName: string,
      parameters: NodeTypeActionParameters,
      options?: NodeTypesStartOptionalParams,
    ) => start(context, resourceGroupName, clusterName, nodeTypeName, parameters, options),
    restart: (
      resourceGroupName: string,
      clusterName: string,
      nodeTypeName: string,
      parameters: NodeTypeActionParameters,
      options?: NodeTypesRestartOptionalParams,
    ) => restart(context, resourceGroupName, clusterName, nodeTypeName, parameters, options),
    reimage: (
      resourceGroupName: string,
      clusterName: string,
      nodeTypeName: string,
      parameters: NodeTypeActionParameters,
      options?: NodeTypesReimageOptionalParams,
    ) => reimage(context, resourceGroupName, clusterName, nodeTypeName, parameters, options),
    redeploy: (
      resourceGroupName: string,
      clusterName: string,
      nodeTypeName: string,
      parameters: NodeTypeActionParameters,
      options?: NodeTypesRedeployOptionalParams,
    ) => redeploy(context, resourceGroupName, clusterName, nodeTypeName, parameters, options),
    deleteNode: (
      resourceGroupName: string,
      clusterName: string,
      nodeTypeName: string,
      parameters: NodeTypeActionParameters,
      options?: NodeTypesDeleteNodeOptionalParams,
    ) => deleteNode(context, resourceGroupName, clusterName, nodeTypeName, parameters, options),
    deallocate: (
      resourceGroupName: string,
      clusterName: string,
      nodeTypeName: string,
      parameters: NodeTypeActionParameters,
      options?: NodeTypesDeallocateOptionalParams,
    ) => deallocate(context, resourceGroupName, clusterName, nodeTypeName, parameters, options),
    listByManagedClusters: (
      resourceGroupName: string,
      clusterName: string,
      options?: NodeTypesListByManagedClustersOptionalParams,
    ) => listByManagedClusters(context, resourceGroupName, clusterName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      nodeTypeName: string,
      options?: NodeTypesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, nodeTypeName, options),
    update: (
      resourceGroupName: string,
      clusterName: string,
      nodeTypeName: string,
      parameters: NodeTypeUpdateParameters,
      options?: NodeTypesUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, nodeTypeName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      clusterName: string,
      nodeTypeName: string,
      parameters: NodeType,
      options?: NodeTypesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, clusterName, nodeTypeName, parameters, options),
    get: (
      resourceGroupName: string,
      clusterName: string,
      nodeTypeName: string,
      options?: NodeTypesGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, nodeTypeName, options),
  };
}

export function _getNodeTypesOperations(
  context: ServiceFabricManagedClustersManagementContext,
): NodeTypesOperations {
  return {
    ..._getNodeTypes(context),
  };
}
