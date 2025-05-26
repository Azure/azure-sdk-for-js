// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricContext } from "../../api/serviceFabricContext.js";
import {
  ManagedCluster,
  ManagedClusterUpdateParameters,
  FaultSimulationIdContent,
  FaultSimulation,
  FaultSimulationContentWrapper,
} from "../../models/models.js";
import {
  ManagedClustersStopFaultSimulationOptionalParams,
  ManagedClustersStartFaultSimulationOptionalParams,
  ManagedClustersListFaultSimulationOptionalParams,
  ManagedClustersGetFaultSimulationOptionalParams,
  ManagedClustersListBySubscriptionOptionalParams,
  ManagedClustersListByResourceGroupOptionalParams,
  ManagedClustersDeleteOptionalParams,
  ManagedClustersUpdateOptionalParams,
  ManagedClustersCreateOrUpdateOptionalParams,
  ManagedClustersGetOptionalParams,
} from "../../api/managedClusters/options.js";
import {
  stopFaultSimulation,
  startFaultSimulation,
  listFaultSimulation,
  getFaultSimulation,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/managedClusters/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedClusters operations. */
export interface ManagedClustersOperations {
  /** Stops a fault simulation on the cluster. */
  stopFaultSimulation: (
    resourceGroupName: string,
    clusterName: string,
    parameters: FaultSimulationIdContent,
    options?: ManagedClustersStopFaultSimulationOptionalParams,
  ) => PollerLike<OperationState<FaultSimulation>, FaultSimulation>;
  /** Starts a fault simulation on the cluster. */
  startFaultSimulation: (
    resourceGroupName: string,
    clusterName: string,
    parameters: FaultSimulationContentWrapper,
    options?: ManagedClustersStartFaultSimulationOptionalParams,
  ) => PollerLike<OperationState<FaultSimulation>, FaultSimulation>;
  /** Gets the list of recent fault simulations for the cluster. */
  listFaultSimulation: (
    resourceGroupName: string,
    clusterName: string,
    options?: ManagedClustersListFaultSimulationOptionalParams,
  ) => PagedAsyncIterableIterator<FaultSimulation>;
  /** Gets a fault simulation by the simulationId. */
  getFaultSimulation: (
    resourceGroupName: string,
    clusterName: string,
    parameters: FaultSimulationIdContent,
    options?: ManagedClustersGetFaultSimulationOptionalParams,
  ) => Promise<FaultSimulation>;
  /** Gets all Service Fabric cluster resources created or in the process of being created in the subscription. */
  listBySubscription: (
    options?: ManagedClustersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedCluster>;
  /** Gets all Service Fabric cluster resources created or in the process of being created in the resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ManagedClustersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedCluster>;
  /** Delete a Service Fabric managed cluster resource with the specified name. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    options?: ManagedClustersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update the tags of of a Service Fabric managed cluster resource with the specified name. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    parameters: ManagedClusterUpdateParameters,
    options?: ManagedClustersUpdateOptionalParams,
  ) => Promise<ManagedCluster>;
  /** Create or update a Service Fabric managed cluster resource with the specified name. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    parameters: ManagedCluster,
    options?: ManagedClustersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ManagedCluster>, ManagedCluster>;
  /** Get a Service Fabric managed cluster resource created or in the process of being created in the specified resource group. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    options?: ManagedClustersGetOptionalParams,
  ) => Promise<ManagedCluster>;
}

function _getManagedClusters(context: ServiceFabricContext) {
  return {
    stopFaultSimulation: (
      resourceGroupName: string,
      clusterName: string,
      parameters: FaultSimulationIdContent,
      options?: ManagedClustersStopFaultSimulationOptionalParams,
    ) => stopFaultSimulation(context, resourceGroupName, clusterName, parameters, options),
    startFaultSimulation: (
      resourceGroupName: string,
      clusterName: string,
      parameters: FaultSimulationContentWrapper,
      options?: ManagedClustersStartFaultSimulationOptionalParams,
    ) => startFaultSimulation(context, resourceGroupName, clusterName, parameters, options),
    listFaultSimulation: (
      resourceGroupName: string,
      clusterName: string,
      options?: ManagedClustersListFaultSimulationOptionalParams,
    ) => listFaultSimulation(context, resourceGroupName, clusterName, options),
    getFaultSimulation: (
      resourceGroupName: string,
      clusterName: string,
      parameters: FaultSimulationIdContent,
      options?: ManagedClustersGetFaultSimulationOptionalParams,
    ) => getFaultSimulation(context, resourceGroupName, clusterName, parameters, options),
    listBySubscription: (options?: ManagedClustersListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ManagedClustersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      options?: ManagedClustersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, options),
    update: (
      resourceGroupName: string,
      clusterName: string,
      parameters: ManagedClusterUpdateParameters,
      options?: ManagedClustersUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      clusterName: string,
      parameters: ManagedCluster,
      options?: ManagedClustersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, clusterName, parameters, options),
    get: (
      resourceGroupName: string,
      clusterName: string,
      options?: ManagedClustersGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, options),
  };
}

export function _getManagedClustersOperations(
  context: ServiceFabricContext,
): ManagedClustersOperations {
  return {
    ..._getManagedClusters(context),
  };
}
