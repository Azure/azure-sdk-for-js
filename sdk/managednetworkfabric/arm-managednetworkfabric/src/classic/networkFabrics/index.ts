// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureNetworkFabricManagementServiceAPIContext } from "../../api/azureNetworkFabricManagementServiceAPIContext.js";
import {
  resyncCertificates,
  rotateCertificates,
  resyncPasswords,
  rotatePasswords,
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
  NetworkFabricsResyncCertificatesOptionalParams,
  NetworkFabricsRotateCertificatesOptionalParams,
  NetworkFabricsResyncPasswordsOptionalParams,
  NetworkFabricsRotatePasswordsOptionalParams,
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
  UpdateAdministrativeStateResponse,
  OperationStatusResult,
  ValidateConfigurationResponse,
  NetworkFabricResyncCertificatesResponse,
  NetworkFabric,
  NetworkFabricPatch,
  UpgradeNetworkFabricProperties,
  ValidateConfigurationProperties,
  GetTopologyResponse,
  CommitConfigurationResponse,
  CommitBatchStatusRequest,
  CommitBatchStatusOperationResponse,
  DiscardCommitBatchRequest,
  DiscardCommitBatchOperationResponse,
  NetworkFabricLockRequest,
  ViewDeviceConfigurationOperationResponse,
  ArmConfigurationDiffOperationResponse,
  NetworkFabricRotatePasswordsResponse,
  NetworkFabricResyncPasswordsResponse,
  NetworkFabricRotateCertificatesResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkFabrics operations. */
export interface NetworkFabricsOperations {
  /** Updates all Network Devices to use the latest certificates. Does not generate new certificates. Allows network devices missed during a previous certificate rotation to be brought back into sync. */
  resyncCertificates: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsResyncCertificatesOptionalParams,
  ) => PollerLike<
    OperationState<NetworkFabricResyncCertificatesResponse>,
    NetworkFabricResyncCertificatesResponse
  >;
  /** @deprecated use resyncCertificates instead */
  beginResyncCertificates: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsResyncCertificatesOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<NetworkFabricResyncCertificatesResponse>,
      NetworkFabricResyncCertificatesResponse
    >
  >;
  /** @deprecated use resyncCertificates instead */
  beginResyncCertificatesAndWait: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsResyncCertificatesOptionalParams,
  ) => Promise<NetworkFabricResyncCertificatesResponse>;
  /** Creates new certificates, then updates the Network Devices to use the new certificates. Note that disabled devices cannot be updated and must be resynchronized with the new certificates once they are enabled. */
  rotateCertificates: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsRotateCertificatesOptionalParams,
  ) => PollerLike<
    OperationState<NetworkFabricRotateCertificatesResponse>,
    NetworkFabricRotateCertificatesResponse
  >;
  /** @deprecated use rotateCertificates instead */
  beginRotateCertificates: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsRotateCertificatesOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<NetworkFabricRotateCertificatesResponse>,
      NetworkFabricRotateCertificatesResponse
    >
  >;
  /** @deprecated use rotateCertificates instead */
  beginRotateCertificatesAndWait: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsRotateCertificatesOptionalParams,
  ) => Promise<NetworkFabricRotateCertificatesResponse>;
  /**
   * Updates the Terminal Server and all Network Devices to use the latest passwords. Does not generate new passwords.
   *
   * Allows devices to be brought back in sync after a partially successful password rotation.
   */
  resyncPasswords: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsResyncPasswordsOptionalParams,
  ) => PollerLike<
    OperationState<NetworkFabricResyncPasswordsResponse>,
    NetworkFabricResyncPasswordsResponse
  >;
  /** @deprecated use resyncPasswords instead */
  beginResyncPasswords: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsResyncPasswordsOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<NetworkFabricResyncPasswordsResponse>,
      NetworkFabricResyncPasswordsResponse
    >
  >;
  /** @deprecated use resyncPasswords instead */
  beginResyncPasswordsAndWait: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsResyncPasswordsOptionalParams,
  ) => Promise<NetworkFabricResyncPasswordsResponse>;
  /**
   * Creates new passwords, then updates the Terminal Server and Network Devices to use the new passwords.
   *
   * Note that disabled devices cannot be updated and must be resynchronized with the new passwords once they are enabled.
   *
   * Fails if any of the devices could not be updated with the new password.
   * Failed devices should be resynchronized with the new passwords once possible.
   */
  rotatePasswords: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsRotatePasswordsOptionalParams,
  ) => PollerLike<
    OperationState<NetworkFabricRotatePasswordsResponse>,
    NetworkFabricRotatePasswordsResponse
  >;
  /** @deprecated use rotatePasswords instead */
  beginRotatePasswords: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsRotatePasswordsOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<NetworkFabricRotatePasswordsResponse>,
      NetworkFabricRotatePasswordsResponse
    >
  >;
  /** @deprecated use rotatePasswords instead */
  beginRotatePasswordsAndWait: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsRotatePasswordsOptionalParams,
  ) => Promise<NetworkFabricRotatePasswordsResponse>;
  /** Post action: Triggers diff of NetworkFabric ARM Configuration. */
  armConfigurationDiff: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsArmConfigurationDiffOptionalParams,
  ) => PollerLike<
    OperationState<ArmConfigurationDiffOperationResponse>,
    ArmConfigurationDiffOperationResponse
  >;
  /** @deprecated use armConfigurationDiff instead */
  beginArmConfigurationDiff: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsArmConfigurationDiffOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ArmConfigurationDiffOperationResponse>,
      ArmConfigurationDiffOperationResponse
    >
  >;
  /** @deprecated use armConfigurationDiff instead */
  beginArmConfigurationDiffAndWait: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsArmConfigurationDiffOptionalParams,
  ) => Promise<ArmConfigurationDiffOperationResponse>;
  /** Post action: Triggers view of network fabric configuration. */
  viewDeviceConfiguration: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsViewDeviceConfigurationOptionalParams,
  ) => PollerLike<
    OperationState<ViewDeviceConfigurationOperationResponse>,
    ViewDeviceConfigurationOperationResponse
  >;
  /** @deprecated use viewDeviceConfiguration instead */
  beginViewDeviceConfiguration: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsViewDeviceConfigurationOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ViewDeviceConfigurationOperationResponse>,
      ViewDeviceConfigurationOperationResponse
    >
  >;
  /** @deprecated use viewDeviceConfiguration instead */
  beginViewDeviceConfigurationAndWait: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsViewDeviceConfigurationOptionalParams,
  ) => Promise<ViewDeviceConfigurationOperationResponse>;
  /** Post action: Triggers network fabric lock operation. */
  lockFabric: (
    resourceGroupName: string,
    networkFabricName: string,
    body: NetworkFabricLockRequest,
    options?: NetworkFabricsLockFabricOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use lockFabric instead */
  beginLockFabric: (
    resourceGroupName: string,
    networkFabricName: string,
    body: NetworkFabricLockRequest,
    options?: NetworkFabricsLockFabricOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use lockFabric instead */
  beginLockFabricAndWait: (
    resourceGroupName: string,
    networkFabricName: string,
    body: NetworkFabricLockRequest,
    options?: NetworkFabricsLockFabricOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Post action: Discards a Batch operation in progress. */
  discardCommitBatch: (
    resourceGroupName: string,
    networkFabricName: string,
    body: DiscardCommitBatchRequest,
    options?: NetworkFabricsDiscardCommitBatchOptionalParams,
  ) => PollerLike<
    OperationState<DiscardCommitBatchOperationResponse>,
    DiscardCommitBatchOperationResponse
  >;
  /** @deprecated use discardCommitBatch instead */
  beginDiscardCommitBatch: (
    resourceGroupName: string,
    networkFabricName: string,
    body: DiscardCommitBatchRequest,
    options?: NetworkFabricsDiscardCommitBatchOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<DiscardCommitBatchOperationResponse>,
      DiscardCommitBatchOperationResponse
    >
  >;
  /** @deprecated use discardCommitBatch instead */
  beginDiscardCommitBatchAndWait: (
    resourceGroupName: string,
    networkFabricName: string,
    body: DiscardCommitBatchRequest,
    options?: NetworkFabricsDiscardCommitBatchOptionalParams,
  ) => Promise<DiscardCommitBatchOperationResponse>;
  /** Post action: Returns a status of commit batch operation. */
  commitBatchStatus: (
    resourceGroupName: string,
    networkFabricName: string,
    body: CommitBatchStatusRequest,
    options?: NetworkFabricsCommitBatchStatusOptionalParams,
  ) => PollerLike<
    OperationState<CommitBatchStatusOperationResponse>,
    CommitBatchStatusOperationResponse
  >;
  /** @deprecated use commitBatchStatus instead */
  beginCommitBatchStatus: (
    resourceGroupName: string,
    networkFabricName: string,
    body: CommitBatchStatusRequest,
    options?: NetworkFabricsCommitBatchStatusOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<CommitBatchStatusOperationResponse>,
      CommitBatchStatusOperationResponse
    >
  >;
  /** @deprecated use commitBatchStatus instead */
  beginCommitBatchStatusAndWait: (
    resourceGroupName: string,
    networkFabricName: string,
    body: CommitBatchStatusRequest,
    options?: NetworkFabricsCommitBatchStatusOptionalParams,
  ) => Promise<CommitBatchStatusOperationResponse>;
  /** Atomic update of the given Network Fabric instance. Sync update of NFA resources at Fabric level. */
  commitConfiguration: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsCommitConfigurationOptionalParams,
  ) => PollerLike<OperationState<CommitConfigurationResponse>, CommitConfigurationResponse>;
  /** @deprecated use commitConfiguration instead */
  beginCommitConfiguration: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsCommitConfigurationOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<CommitConfigurationResponse>, CommitConfigurationResponse>
  >;
  /** @deprecated use commitConfiguration instead */
  beginCommitConfigurationAndWait: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsCommitConfigurationOptionalParams,
  ) => Promise<CommitConfigurationResponse>;
  /** Gets Topology of the underlying resources in the given Network Fabric instance. */
  getTopology: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsGetTopologyOptionalParams,
  ) => PollerLike<OperationState<GetTopologyResponse>, GetTopologyResponse>;
  /** @deprecated use getTopology instead */
  beginGetTopology: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsGetTopologyOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<GetTopologyResponse>, GetTopologyResponse>>;
  /** @deprecated use getTopology instead */
  beginGetTopologyAndWait: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsGetTopologyOptionalParams,
  ) => Promise<GetTopologyResponse>;
  /** Validates the configuration of the underlying resources in the given Network Fabric instance. */
  validateConfiguration: (
    resourceGroupName: string,
    networkFabricName: string,
    body: ValidateConfigurationProperties,
    options?: NetworkFabricsValidateConfigurationOptionalParams,
  ) => PollerLike<OperationState<ValidateConfigurationResponse>, ValidateConfigurationResponse>;
  /** @deprecated use validateConfiguration instead */
  beginValidateConfiguration: (
    resourceGroupName: string,
    networkFabricName: string,
    body: ValidateConfigurationProperties,
    options?: NetworkFabricsValidateConfigurationOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ValidateConfigurationResponse>, ValidateConfigurationResponse>
  >;
  /** @deprecated use validateConfiguration instead */
  beginValidateConfigurationAndWait: (
    resourceGroupName: string,
    networkFabricName: string,
    body: ValidateConfigurationProperties,
    options?: NetworkFabricsValidateConfigurationOptionalParams,
  ) => Promise<ValidateConfigurationResponse>;
  /** Updates the Infra Management BFD Configuration of the underlying resources in the given Network Fabric instance. */
  updateInfraManagementBfdConfiguration: (
    resourceGroupName: string,
    networkFabricName: string,
    body: UpdateAdministrativeState,
    options?: NetworkFabricsUpdateInfraManagementBfdConfigurationOptionalParams,
  ) => PollerLike<
    OperationState<UpdateAdministrativeStateResponse>,
    UpdateAdministrativeStateResponse
  >;
  /** @deprecated use updateInfraManagementBfdConfiguration instead */
  beginUpdateInfraManagementBfdConfiguration: (
    resourceGroupName: string,
    networkFabricName: string,
    body: UpdateAdministrativeState,
    options?: NetworkFabricsUpdateInfraManagementBfdConfigurationOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<UpdateAdministrativeStateResponse>,
      UpdateAdministrativeStateResponse
    >
  >;
  /** @deprecated use updateInfraManagementBfdConfiguration instead */
  beginUpdateInfraManagementBfdConfigurationAndWait: (
    resourceGroupName: string,
    networkFabricName: string,
    body: UpdateAdministrativeState,
    options?: NetworkFabricsUpdateInfraManagementBfdConfigurationOptionalParams,
  ) => Promise<UpdateAdministrativeStateResponse>;
  /** Updates the Workload Management BFD Configuration of the underlying resources in the given Network Fabric instance. */
  updateWorkloadManagementBfdConfiguration: (
    resourceGroupName: string,
    networkFabricName: string,
    body: UpdateAdministrativeState,
    options?: NetworkFabricsUpdateWorkloadManagementBfdConfigurationOptionalParams,
  ) => PollerLike<
    OperationState<UpdateAdministrativeStateResponse>,
    UpdateAdministrativeStateResponse
  >;
  /** @deprecated use updateWorkloadManagementBfdConfiguration instead */
  beginUpdateWorkloadManagementBfdConfiguration: (
    resourceGroupName: string,
    networkFabricName: string,
    body: UpdateAdministrativeState,
    options?: NetworkFabricsUpdateWorkloadManagementBfdConfigurationOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<UpdateAdministrativeStateResponse>,
      UpdateAdministrativeStateResponse
    >
  >;
  /** @deprecated use updateWorkloadManagementBfdConfiguration instead */
  beginUpdateWorkloadManagementBfdConfigurationAndWait: (
    resourceGroupName: string,
    networkFabricName: string,
    body: UpdateAdministrativeState,
    options?: NetworkFabricsUpdateWorkloadManagementBfdConfigurationOptionalParams,
  ) => Promise<UpdateAdministrativeStateResponse>;
  /** Refreshes the configuration of the underlying resources in the given Network Fabric instance. */
  refreshConfiguration: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsRefreshConfigurationOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use refreshConfiguration instead */
  beginRefreshConfiguration: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsRefreshConfigurationOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use refreshConfiguration instead */
  beginRefreshConfigurationAndWait: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsRefreshConfigurationOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Upgrades the version of the underlying resources in the given Network Fabric instance. */
  upgrade: (
    resourceGroupName: string,
    networkFabricName: string,
    body: UpgradeNetworkFabricProperties,
    options?: NetworkFabricsUpgradeOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use upgrade instead */
  beginUpgrade: (
    resourceGroupName: string,
    networkFabricName: string,
    body: UpgradeNetworkFabricProperties,
    options?: NetworkFabricsUpgradeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use upgrade instead */
  beginUpgradeAndWait: (
    resourceGroupName: string,
    networkFabricName: string,
    body: UpgradeNetworkFabricProperties,
    options?: NetworkFabricsUpgradeOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Deprovisions the underlying resources in the given Network Fabric instance. */
  deprovision: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsDeprovisionOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use deprovision instead */
  beginDeprovision: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsDeprovisionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use deprovision instead */
  beginDeprovisionAndWait: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsDeprovisionOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Provisions the underlying resources in the given Network Fabric instance. */
  provision: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsProvisionOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** @deprecated use provision instead */
  beginProvision: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsProvisionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use provision instead */
  beginProvisionAndWait: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsProvisionOptionalParams,
  ) => Promise<OperationStatusResult>;
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update certain properties of the Network Fabric resource. */
  update: (
    resourceGroupName: string,
    networkFabricName: string,
    body: NetworkFabricPatch,
    options?: NetworkFabricsUpdateOptionalParams,
  ) => PollerLike<OperationState<NetworkFabric>, NetworkFabric>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    networkFabricName: string,
    body: NetworkFabricPatch,
    options?: NetworkFabricsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NetworkFabric>, NetworkFabric>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    networkFabricName: string,
    body: NetworkFabricPatch,
    options?: NetworkFabricsUpdateOptionalParams,
  ) => Promise<NetworkFabric>;
  /** Create Network Fabric resource. */
  create: (
    resourceGroupName: string,
    networkFabricName: string,
    body: NetworkFabric,
    options?: NetworkFabricsCreateOptionalParams,
  ) => PollerLike<OperationState<NetworkFabric>, NetworkFabric>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    networkFabricName: string,
    body: NetworkFabric,
    options?: NetworkFabricsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NetworkFabric>, NetworkFabric>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    networkFabricName: string,
    body: NetworkFabric,
    options?: NetworkFabricsCreateOptionalParams,
  ) => Promise<NetworkFabric>;
  /** Get Network Fabric resource details. */
  get: (
    resourceGroupName: string,
    networkFabricName: string,
    options?: NetworkFabricsGetOptionalParams,
  ) => Promise<NetworkFabric>;
}

function _getNetworkFabrics(context: AzureNetworkFabricManagementServiceAPIContext) {
  return {
    resyncCertificates: (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsResyncCertificatesOptionalParams,
    ) => resyncCertificates(context, resourceGroupName, networkFabricName, options),
    beginResyncCertificates: async (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsResyncCertificatesOptionalParams,
    ) => {
      const poller = resyncCertificates(context, resourceGroupName, networkFabricName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResyncCertificatesAndWait: async (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsResyncCertificatesOptionalParams,
    ) => {
      return await resyncCertificates(context, resourceGroupName, networkFabricName, options);
    },
    rotateCertificates: (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsRotateCertificatesOptionalParams,
    ) => rotateCertificates(context, resourceGroupName, networkFabricName, options),
    beginRotateCertificates: async (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsRotateCertificatesOptionalParams,
    ) => {
      const poller = rotateCertificates(context, resourceGroupName, networkFabricName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRotateCertificatesAndWait: async (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsRotateCertificatesOptionalParams,
    ) => {
      return await rotateCertificates(context, resourceGroupName, networkFabricName, options);
    },
    resyncPasswords: (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsResyncPasswordsOptionalParams,
    ) => resyncPasswords(context, resourceGroupName, networkFabricName, options),
    beginResyncPasswords: async (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsResyncPasswordsOptionalParams,
    ) => {
      const poller = resyncPasswords(context, resourceGroupName, networkFabricName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResyncPasswordsAndWait: async (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsResyncPasswordsOptionalParams,
    ) => {
      return await resyncPasswords(context, resourceGroupName, networkFabricName, options);
    },
    rotatePasswords: (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsRotatePasswordsOptionalParams,
    ) => rotatePasswords(context, resourceGroupName, networkFabricName, options),
    beginRotatePasswords: async (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsRotatePasswordsOptionalParams,
    ) => {
      const poller = rotatePasswords(context, resourceGroupName, networkFabricName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRotatePasswordsAndWait: async (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsRotatePasswordsOptionalParams,
    ) => {
      return await rotatePasswords(context, resourceGroupName, networkFabricName, options);
    },
    armConfigurationDiff: (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsArmConfigurationDiffOptionalParams,
    ) => armConfigurationDiff(context, resourceGroupName, networkFabricName, options),
    beginArmConfigurationDiff: async (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsArmConfigurationDiffOptionalParams,
    ) => {
      const poller = armConfigurationDiff(context, resourceGroupName, networkFabricName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginArmConfigurationDiffAndWait: async (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsArmConfigurationDiffOptionalParams,
    ) => {
      return await armConfigurationDiff(context, resourceGroupName, networkFabricName, options);
    },
    viewDeviceConfiguration: (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsViewDeviceConfigurationOptionalParams,
    ) => viewDeviceConfiguration(context, resourceGroupName, networkFabricName, options),
    beginViewDeviceConfiguration: async (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsViewDeviceConfigurationOptionalParams,
    ) => {
      const poller = viewDeviceConfiguration(
        context,
        resourceGroupName,
        networkFabricName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginViewDeviceConfigurationAndWait: async (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsViewDeviceConfigurationOptionalParams,
    ) => {
      return await viewDeviceConfiguration(context, resourceGroupName, networkFabricName, options);
    },
    lockFabric: (
      resourceGroupName: string,
      networkFabricName: string,
      body: NetworkFabricLockRequest,
      options?: NetworkFabricsLockFabricOptionalParams,
    ) => lockFabric(context, resourceGroupName, networkFabricName, body, options),
    beginLockFabric: async (
      resourceGroupName: string,
      networkFabricName: string,
      body: NetworkFabricLockRequest,
      options?: NetworkFabricsLockFabricOptionalParams,
    ) => {
      const poller = lockFabric(context, resourceGroupName, networkFabricName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginLockFabricAndWait: async (
      resourceGroupName: string,
      networkFabricName: string,
      body: NetworkFabricLockRequest,
      options?: NetworkFabricsLockFabricOptionalParams,
    ) => {
      return await lockFabric(context, resourceGroupName, networkFabricName, body, options);
    },
    discardCommitBatch: (
      resourceGroupName: string,
      networkFabricName: string,
      body: DiscardCommitBatchRequest,
      options?: NetworkFabricsDiscardCommitBatchOptionalParams,
    ) => discardCommitBatch(context, resourceGroupName, networkFabricName, body, options),
    beginDiscardCommitBatch: async (
      resourceGroupName: string,
      networkFabricName: string,
      body: DiscardCommitBatchRequest,
      options?: NetworkFabricsDiscardCommitBatchOptionalParams,
    ) => {
      const poller = discardCommitBatch(
        context,
        resourceGroupName,
        networkFabricName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDiscardCommitBatchAndWait: async (
      resourceGroupName: string,
      networkFabricName: string,
      body: DiscardCommitBatchRequest,
      options?: NetworkFabricsDiscardCommitBatchOptionalParams,
    ) => {
      return await discardCommitBatch(context, resourceGroupName, networkFabricName, body, options);
    },
    commitBatchStatus: (
      resourceGroupName: string,
      networkFabricName: string,
      body: CommitBatchStatusRequest,
      options?: NetworkFabricsCommitBatchStatusOptionalParams,
    ) => commitBatchStatus(context, resourceGroupName, networkFabricName, body, options),
    beginCommitBatchStatus: async (
      resourceGroupName: string,
      networkFabricName: string,
      body: CommitBatchStatusRequest,
      options?: NetworkFabricsCommitBatchStatusOptionalParams,
    ) => {
      const poller = commitBatchStatus(
        context,
        resourceGroupName,
        networkFabricName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCommitBatchStatusAndWait: async (
      resourceGroupName: string,
      networkFabricName: string,
      body: CommitBatchStatusRequest,
      options?: NetworkFabricsCommitBatchStatusOptionalParams,
    ) => {
      return await commitBatchStatus(context, resourceGroupName, networkFabricName, body, options);
    },
    commitConfiguration: (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsCommitConfigurationOptionalParams,
    ) => commitConfiguration(context, resourceGroupName, networkFabricName, options),
    beginCommitConfiguration: async (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsCommitConfigurationOptionalParams,
    ) => {
      const poller = commitConfiguration(context, resourceGroupName, networkFabricName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCommitConfigurationAndWait: async (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsCommitConfigurationOptionalParams,
    ) => {
      return await commitConfiguration(context, resourceGroupName, networkFabricName, options);
    },
    getTopology: (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsGetTopologyOptionalParams,
    ) => getTopology(context, resourceGroupName, networkFabricName, options),
    beginGetTopology: async (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsGetTopologyOptionalParams,
    ) => {
      const poller = getTopology(context, resourceGroupName, networkFabricName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetTopologyAndWait: async (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsGetTopologyOptionalParams,
    ) => {
      return await getTopology(context, resourceGroupName, networkFabricName, options);
    },
    validateConfiguration: (
      resourceGroupName: string,
      networkFabricName: string,
      body: ValidateConfigurationProperties,
      options?: NetworkFabricsValidateConfigurationOptionalParams,
    ) => validateConfiguration(context, resourceGroupName, networkFabricName, body, options),
    beginValidateConfiguration: async (
      resourceGroupName: string,
      networkFabricName: string,
      body: ValidateConfigurationProperties,
      options?: NetworkFabricsValidateConfigurationOptionalParams,
    ) => {
      const poller = validateConfiguration(
        context,
        resourceGroupName,
        networkFabricName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginValidateConfigurationAndWait: async (
      resourceGroupName: string,
      networkFabricName: string,
      body: ValidateConfigurationProperties,
      options?: NetworkFabricsValidateConfigurationOptionalParams,
    ) => {
      return await validateConfiguration(
        context,
        resourceGroupName,
        networkFabricName,
        body,
        options,
      );
    },
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
    beginUpdateInfraManagementBfdConfiguration: async (
      resourceGroupName: string,
      networkFabricName: string,
      body: UpdateAdministrativeState,
      options?: NetworkFabricsUpdateInfraManagementBfdConfigurationOptionalParams,
    ) => {
      const poller = updateInfraManagementBfdConfiguration(
        context,
        resourceGroupName,
        networkFabricName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateInfraManagementBfdConfigurationAndWait: async (
      resourceGroupName: string,
      networkFabricName: string,
      body: UpdateAdministrativeState,
      options?: NetworkFabricsUpdateInfraManagementBfdConfigurationOptionalParams,
    ) => {
      return await updateInfraManagementBfdConfiguration(
        context,
        resourceGroupName,
        networkFabricName,
        body,
        options,
      );
    },
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
    beginUpdateWorkloadManagementBfdConfiguration: async (
      resourceGroupName: string,
      networkFabricName: string,
      body: UpdateAdministrativeState,
      options?: NetworkFabricsUpdateWorkloadManagementBfdConfigurationOptionalParams,
    ) => {
      const poller = updateWorkloadManagementBfdConfiguration(
        context,
        resourceGroupName,
        networkFabricName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateWorkloadManagementBfdConfigurationAndWait: async (
      resourceGroupName: string,
      networkFabricName: string,
      body: UpdateAdministrativeState,
      options?: NetworkFabricsUpdateWorkloadManagementBfdConfigurationOptionalParams,
    ) => {
      return await updateWorkloadManagementBfdConfiguration(
        context,
        resourceGroupName,
        networkFabricName,
        body,
        options,
      );
    },
    refreshConfiguration: (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsRefreshConfigurationOptionalParams,
    ) => refreshConfiguration(context, resourceGroupName, networkFabricName, options),
    beginRefreshConfiguration: async (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsRefreshConfigurationOptionalParams,
    ) => {
      const poller = refreshConfiguration(context, resourceGroupName, networkFabricName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRefreshConfigurationAndWait: async (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsRefreshConfigurationOptionalParams,
    ) => {
      return await refreshConfiguration(context, resourceGroupName, networkFabricName, options);
    },
    upgrade: (
      resourceGroupName: string,
      networkFabricName: string,
      body: UpgradeNetworkFabricProperties,
      options?: NetworkFabricsUpgradeOptionalParams,
    ) => upgrade(context, resourceGroupName, networkFabricName, body, options),
    beginUpgrade: async (
      resourceGroupName: string,
      networkFabricName: string,
      body: UpgradeNetworkFabricProperties,
      options?: NetworkFabricsUpgradeOptionalParams,
    ) => {
      const poller = upgrade(context, resourceGroupName, networkFabricName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpgradeAndWait: async (
      resourceGroupName: string,
      networkFabricName: string,
      body: UpgradeNetworkFabricProperties,
      options?: NetworkFabricsUpgradeOptionalParams,
    ) => {
      return await upgrade(context, resourceGroupName, networkFabricName, body, options);
    },
    deprovision: (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsDeprovisionOptionalParams,
    ) => deprovision(context, resourceGroupName, networkFabricName, options),
    beginDeprovision: async (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsDeprovisionOptionalParams,
    ) => {
      const poller = deprovision(context, resourceGroupName, networkFabricName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeprovisionAndWait: async (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsDeprovisionOptionalParams,
    ) => {
      return await deprovision(context, resourceGroupName, networkFabricName, options);
    },
    provision: (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsProvisionOptionalParams,
    ) => provision(context, resourceGroupName, networkFabricName, options),
    beginProvision: async (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsProvisionOptionalParams,
    ) => {
      const poller = provision(context, resourceGroupName, networkFabricName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginProvisionAndWait: async (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsProvisionOptionalParams,
    ) => {
      return await provision(context, resourceGroupName, networkFabricName, options);
    },
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
    beginDelete: async (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, networkFabricName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, networkFabricName, options);
    },
    update: (
      resourceGroupName: string,
      networkFabricName: string,
      body: NetworkFabricPatch,
      options?: NetworkFabricsUpdateOptionalParams,
    ) => update(context, resourceGroupName, networkFabricName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      networkFabricName: string,
      body: NetworkFabricPatch,
      options?: NetworkFabricsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, networkFabricName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      networkFabricName: string,
      body: NetworkFabricPatch,
      options?: NetworkFabricsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, networkFabricName, body, options);
    },
    create: (
      resourceGroupName: string,
      networkFabricName: string,
      body: NetworkFabric,
      options?: NetworkFabricsCreateOptionalParams,
    ) => create(context, resourceGroupName, networkFabricName, body, options),
    beginCreate: async (
      resourceGroupName: string,
      networkFabricName: string,
      body: NetworkFabric,
      options?: NetworkFabricsCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, networkFabricName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      networkFabricName: string,
      body: NetworkFabric,
      options?: NetworkFabricsCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, networkFabricName, body, options);
    },
    get: (
      resourceGroupName: string,
      networkFabricName: string,
      options?: NetworkFabricsGetOptionalParams,
    ) => get(context, resourceGroupName, networkFabricName, options),
  };
}

export function _getNetworkFabricsOperations(
  context: AzureNetworkFabricManagementServiceAPIContext,
): NetworkFabricsOperations {
  return {
    ..._getNetworkFabrics(context),
  };
}
