// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedNetworkFabricContext } from "../../api/managedNetworkFabricContext.js";
import {
  armConfigurationDiff,
  viewDeviceConfiguration,
  lockFabric,
  discardCommitBatch,
  commitBatchStatus,
  commitConfiguration,
  getTopology,
  validateConfiguration,
  updateInfraManagementBfdConfiguration,
  updateWorkloadManagementBfdConfiguration,
  refreshConfiguration,
  upgrade,
  deprovision,
  provision,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/networkFabrics/operations.js";
import type {
  NetworkFabricsArmConfigurationDiffOptionalParams,
  NetworkFabricsViewDeviceConfigurationOptionalParams,
  NetworkFabricsLockFabricOptionalParams,
  NetworkFabricsDiscardCommitBatchOptionalParams,
  NetworkFabricsCommitBatchStatusOptionalParams,
  NetworkFabricsCommitConfigurationOptionalParams,
  NetworkFabricsGetTopologyOptionalParams,
  NetworkFabricsValidateConfigurationOptionalParams,
  NetworkFabricsUpdateInfraManagementBfdConfigurationOptionalParams,
  NetworkFabricsUpdateWorkloadManagementBfdConfigurationOptionalParams,
  NetworkFabricsRefreshConfigurationOptionalParams,
  NetworkFabricsUpgradeOptionalParams,
  NetworkFabricsDeprovisionOptionalParams,
  NetworkFabricsProvisionOptionalParams,
  NetworkFabricsListBySubscriptionOptionalParams,
  NetworkFabricsListByResourceGroupOptionalParams,
  NetworkFabricsDeleteOptionalParams,
  NetworkFabricsUpdateOptionalParams,
  NetworkFabricsCreateOptionalParams,
  NetworkFabricsGetOptionalParams,
} from "../../api/networkFabrics/options.js";
import type {
  UpdateAdministrativeState,
  CommonPostActionResponseForStateUpdate,
  ValidateConfigurationResponse,
  CommonPostActionResponseForDeviceUpdate,
  NetworkFabric,
  NetworkFabricPatch,
  UpgradeNetworkFabricProperties,
  ValidateConfigurationProperties,
  CommitBatchStatusRequest,
  CommitBatchStatusResponse,
  DiscardCommitBatchRequest,
  DiscardCommitBatchResponse,
  NetworkFabricLockRequest,
  ViewDeviceConfigurationResponse,
  ArmConfigurationDiffResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkFabrics operations. */
export interface NetworkFabricsOperations {
  /** Post action: Triggers diff of NetworkFabric ARM Configuration. */
  armConfigurationDiff: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsArmConfigurationDiffOptionalParams,
  ) => PollerLike<OperationState<ArmConfigurationDiffResponse>, ArmConfigurationDiffResponse>;
  /** Post action: Triggers view of network fabric configuration. */
  viewDeviceConfiguration: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsViewDeviceConfigurationOptionalParams,
  ) => PollerLike<OperationState<ViewDeviceConfigurationResponse>, ViewDeviceConfigurationResponse>;
  /** Post action: Triggers network fabric lock operation. */
  lockFabric: (
    resourceGroupName: string,
    networkFabricName: string,
    body: NetworkFabricLockRequest,
    options?: NetworkFabricsLockFabricOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
  /** Post action: Discards a Batch operation in progress. */
  discardCommitBatch: (
    resourceGroupName: string,
    networkFabricName: string,
    body: DiscardCommitBatchRequest,
    options?: NetworkFabricsDiscardCommitBatchOptionalParams,
  ) => PollerLike<OperationState<DiscardCommitBatchResponse>, DiscardCommitBatchResponse>;
  /** Post action: Returns a status of commit batch operation. */
  commitBatchStatus: (
    resourceGroupName: string,
    networkFabricName: string,
    body: CommitBatchStatusRequest,
    options?: NetworkFabricsCommitBatchStatusOptionalParams,
  ) => PollerLike<OperationState<CommitBatchStatusResponse>, CommitBatchStatusResponse>;
  /** Atomic update of the given Network Fabric instance. Sync update of NFA resources at Fabric level. */
  commitConfiguration: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsCommitConfigurationOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
  /** Gets Topology of the underlying resources in the given Network Fabric instance. */
  getTopology: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsGetTopologyOptionalParams,
  ) => PollerLike<OperationState<ValidateConfigurationResponse>, ValidateConfigurationResponse>;
  /** Validates the configuration of the underlying resources in the given Network Fabric instance. */
  validateConfiguration: (
    resourceGroupName: string,
    networkFabricName: string,
    body: ValidateConfigurationProperties,
    options?: NetworkFabricsValidateConfigurationOptionalParams,
  ) => PollerLike<OperationState<ValidateConfigurationResponse>, ValidateConfigurationResponse>;
  /** Updates the Infra Management BFD Configuration of the underlying resources in the given Network Fabric instance. */
  updateInfraManagementBfdConfiguration: (
    resourceGroupName: string,
    networkFabricName: string,
    body: UpdateAdministrativeState,
    options?: NetworkFabricsUpdateInfraManagementBfdConfigurationOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
  /** Updates the Workload Management BFD Configuration of the underlying resources in the given Network Fabric instance. */
  updateWorkloadManagementBfdConfiguration: (
    resourceGroupName: string,
    networkFabricName: string,
    body: UpdateAdministrativeState,
    options?: NetworkFabricsUpdateWorkloadManagementBfdConfigurationOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
  /** Refreshes the configuration of the underlying resources in the given Network Fabric instance. */
  refreshConfiguration: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsRefreshConfigurationOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
  /** Upgrades the version of the underlying resources in the given Network Fabric instance. */
  upgrade: (
    resourceGroupName: string,
    networkFabricName: string,
    body: UpgradeNetworkFabricProperties,
    options?: NetworkFabricsUpgradeOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
  /** Deprovisions the underlying resources in the given Network Fabric instance. */
  deprovision: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsDeprovisionOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForDeviceUpdate>,
    CommonPostActionResponseForDeviceUpdate
  >;
  /** Provisions the underlying resources in the given Network Fabric instance. */
  provision: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsProvisionOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForDeviceUpdate>,
    CommonPostActionResponseForDeviceUpdate
  >;
  /** List all the Network Fabric resources in the given subscription. */
  listBySubscription: (
    options?: NetworkFabricsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkFabric>;
  /** List all the Network Fabric resources in the given resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: NetworkFabricsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkFabric>;
  /** Delete Network Fabric resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update certain properties of the Network Fabric resource. */
  update: (
    resourceGroupName: string,
    networkFabricName: string,
    properties: NetworkFabricPatch,
    options?: NetworkFabricsUpdateOptionalParams,
  ) => PollerLike<OperationState<NetworkFabric>, NetworkFabric>;
  /** Create Network Fabric resource. */
  create: (
    resourceGroupName: string,
    networkFabricName: string,
    resource: NetworkFabric,
    options?: NetworkFabricsCreateOptionalParams,
  ) => PollerLike<OperationState<NetworkFabric>, NetworkFabric>;
  /** Get Network Fabric resource details. */
  get: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsGetOptionalParams,
  ) => Promise<NetworkFabric>;
}

function _getNetworkFabrics(context: ManagedNetworkFabricContext) {
  return {
    armConfigurationDiff: (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsArmConfigurationDiffOptionalParams,
    ) => armConfigurationDiff(context, resourceGroupName, networkFabricName, options),
    viewDeviceConfiguration: (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsViewDeviceConfigurationOptionalParams,
    ) => viewDeviceConfiguration(context, resourceGroupName, networkFabricName, options),
    lockFabric: (
      resourceGroupName: string,
      networkFabricName: string,
      body: NetworkFabricLockRequest,
      options?: NetworkFabricsLockFabricOptionalParams,
    ) => lockFabric(context, resourceGroupName, networkFabricName, body, options),
    discardCommitBatch: (
      resourceGroupName: string,
      networkFabricName: string,
      body: DiscardCommitBatchRequest,
      options?: NetworkFabricsDiscardCommitBatchOptionalParams,
    ) => discardCommitBatch(context, resourceGroupName, networkFabricName, body, options),
    commitBatchStatus: (
      resourceGroupName: string,
      networkFabricName: string,
      body: CommitBatchStatusRequest,
      options?: NetworkFabricsCommitBatchStatusOptionalParams,
    ) => commitBatchStatus(context, resourceGroupName, networkFabricName, body, options),
    commitConfiguration: (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsCommitConfigurationOptionalParams,
    ) => commitConfiguration(context, resourceGroupName, networkFabricName, options),
    getTopology: (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsGetTopologyOptionalParams,
    ) => getTopology(context, resourceGroupName, networkFabricName, options),
    validateConfiguration: (
      resourceGroupName: string,
      networkFabricName: string,
      body: ValidateConfigurationProperties,
      options?: NetworkFabricsValidateConfigurationOptionalParams,
    ) => validateConfiguration(context, resourceGroupName, networkFabricName, body, options),
    updateInfraManagementBfdConfiguration: (
      resourceGroupName: string,
      networkFabricName: string,
      body: UpdateAdministrativeState,
      options?: NetworkFabricsUpdateInfraManagementBfdConfigurationOptionalParams,
    ) =>
      updateInfraManagementBfdConfiguration(
        context,
        resourceGroupName,
        networkFabricName,
        body,
        options,
      ),
    updateWorkloadManagementBfdConfiguration: (
      resourceGroupName: string,
      networkFabricName: string,
      body: UpdateAdministrativeState,
      options?: NetworkFabricsUpdateWorkloadManagementBfdConfigurationOptionalParams,
    ) =>
      updateWorkloadManagementBfdConfiguration(
        context,
        resourceGroupName,
        networkFabricName,
        body,
        options,
      ),
    refreshConfiguration: (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsRefreshConfigurationOptionalParams,
    ) => refreshConfiguration(context, resourceGroupName, networkFabricName, options),
    upgrade: (
      resourceGroupName: string,
      networkFabricName: string,
      body: UpgradeNetworkFabricProperties,
      options?: NetworkFabricsUpgradeOptionalParams,
    ) => upgrade(context, resourceGroupName, networkFabricName, body, options),
    deprovision: (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsDeprovisionOptionalParams,
    ) => deprovision(context, resourceGroupName, networkFabricName, options),
    provision: (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsProvisionOptionalParams,
    ) => provision(context, resourceGroupName, networkFabricName, options),
    listBySubscription: (options?: NetworkFabricsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: NetworkFabricsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkFabricName, options),
    update: (
      resourceGroupName: string,
      networkFabricName: string,
      properties: NetworkFabricPatch,
      options?: NetworkFabricsUpdateOptionalParams,
    ) => update(context, resourceGroupName, networkFabricName, properties, options),
    create: (
      resourceGroupName: string,
      networkFabricName: string,
      resource: NetworkFabric,
      options?: NetworkFabricsCreateOptionalParams,
    ) => create(context, resourceGroupName, networkFabricName, resource, options),
    get: (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsGetOptionalParams,
    ) => get(context, resourceGroupName, networkFabricName, options),
  };
}

export function _getNetworkFabricsOperations(
  context: ManagedNetworkFabricContext,
): NetworkFabricsOperations {
  return {
    ..._getNetworkFabrics(context),
  };
}
