// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  SiteRecoveryManagementContext,
  SiteRecoveryManagementClientOptionalParams,
} from "./api/index.js";
import { createSiteRecoveryManagement } from "./api/index.js";
import type { ClusterRecoveryPointOperations } from "./classic/clusterRecoveryPoint/index.js";
import { _getClusterRecoveryPointOperations } from "./classic/clusterRecoveryPoint/index.js";
import type { ClusterRecoveryPointsOperations } from "./classic/clusterRecoveryPoints/index.js";
import { _getClusterRecoveryPointsOperations } from "./classic/clusterRecoveryPoints/index.js";
import type { MigrationRecoveryPointsOperations } from "./classic/migrationRecoveryPoints/index.js";
import { _getMigrationRecoveryPointsOperations } from "./classic/migrationRecoveryPoints/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { RecoveryPointsOperations } from "./classic/recoveryPoints/index.js";
import { _getRecoveryPointsOperations } from "./classic/recoveryPoints/index.js";
import type { ReplicationAlertSettingsOperations } from "./classic/replicationAlertSettings/index.js";
import { _getReplicationAlertSettingsOperations } from "./classic/replicationAlertSettings/index.js";
import type { ReplicationAppliancesOperations } from "./classic/replicationAppliances/index.js";
import { _getReplicationAppliancesOperations } from "./classic/replicationAppliances/index.js";
import type { ReplicationEligibilityResultsOperations } from "./classic/replicationEligibilityResults/index.js";
import { _getReplicationEligibilityResultsOperations } from "./classic/replicationEligibilityResults/index.js";
import type { ReplicationEventsOperations } from "./classic/replicationEvents/index.js";
import { _getReplicationEventsOperations } from "./classic/replicationEvents/index.js";
import type { ReplicationFabricsOperations } from "./classic/replicationFabrics/index.js";
import { _getReplicationFabricsOperations } from "./classic/replicationFabrics/index.js";
import type { ReplicationJobsOperations } from "./classic/replicationJobs/index.js";
import { _getReplicationJobsOperations } from "./classic/replicationJobs/index.js";
import type { ReplicationLogicalNetworksOperations } from "./classic/replicationLogicalNetworks/index.js";
import { _getReplicationLogicalNetworksOperations } from "./classic/replicationLogicalNetworks/index.js";
import type { ReplicationMigrationItemsOperations } from "./classic/replicationMigrationItems/index.js";
import { _getReplicationMigrationItemsOperations } from "./classic/replicationMigrationItems/index.js";
import type { ReplicationNetworkMappingsOperations } from "./classic/replicationNetworkMappings/index.js";
import { _getReplicationNetworkMappingsOperations } from "./classic/replicationNetworkMappings/index.js";
import type { ReplicationNetworksOperations } from "./classic/replicationNetworks/index.js";
import { _getReplicationNetworksOperations } from "./classic/replicationNetworks/index.js";
import type { ReplicationPoliciesOperations } from "./classic/replicationPolicies/index.js";
import { _getReplicationPoliciesOperations } from "./classic/replicationPolicies/index.js";
import type { ReplicationProtectableItemsOperations } from "./classic/replicationProtectableItems/index.js";
import { _getReplicationProtectableItemsOperations } from "./classic/replicationProtectableItems/index.js";
import type { ReplicationProtectedItemsOperations } from "./classic/replicationProtectedItems/index.js";
import { _getReplicationProtectedItemsOperations } from "./classic/replicationProtectedItems/index.js";
import type { ReplicationProtectionClustersOperations } from "./classic/replicationProtectionClusters/index.js";
import { _getReplicationProtectionClustersOperations } from "./classic/replicationProtectionClusters/index.js";
import type { ReplicationProtectionContainerMappingsOperations } from "./classic/replicationProtectionContainerMappings/index.js";
import { _getReplicationProtectionContainerMappingsOperations } from "./classic/replicationProtectionContainerMappings/index.js";
import type { ReplicationProtectionContainersOperations } from "./classic/replicationProtectionContainers/index.js";
import { _getReplicationProtectionContainersOperations } from "./classic/replicationProtectionContainers/index.js";
import type { ReplicationProtectionIntentsOperations } from "./classic/replicationProtectionIntents/index.js";
import { _getReplicationProtectionIntentsOperations } from "./classic/replicationProtectionIntents/index.js";
import type { ReplicationRecoveryPlansOperations } from "./classic/replicationRecoveryPlans/index.js";
import { _getReplicationRecoveryPlansOperations } from "./classic/replicationRecoveryPlans/index.js";
import type { ReplicationRecoveryServicesProvidersOperations } from "./classic/replicationRecoveryServicesProviders/index.js";
import { _getReplicationRecoveryServicesProvidersOperations } from "./classic/replicationRecoveryServicesProviders/index.js";
import type { ReplicationStorageClassificationMappingsOperations } from "./classic/replicationStorageClassificationMappings/index.js";
import { _getReplicationStorageClassificationMappingsOperations } from "./classic/replicationStorageClassificationMappings/index.js";
import type { ReplicationStorageClassificationsOperations } from "./classic/replicationStorageClassifications/index.js";
import { _getReplicationStorageClassificationsOperations } from "./classic/replicationStorageClassifications/index.js";
import type { ReplicationVaultHealthOperations } from "./classic/replicationVaultHealth/index.js";
import { _getReplicationVaultHealthOperations } from "./classic/replicationVaultHealth/index.js";
import type { ReplicationVaultSettingOperations } from "./classic/replicationVaultSetting/index.js";
import { _getReplicationVaultSettingOperations } from "./classic/replicationVaultSetting/index.js";
import type { ReplicationvCentersOperations } from "./classic/replicationvCenters/index.js";
import { _getReplicationvCentersOperations } from "./classic/replicationvCenters/index.js";
import type { SupportedOperatingSystemsOperations } from "./classic/supportedOperatingSystems/index.js";
import { _getSupportedOperatingSystemsOperations } from "./classic/supportedOperatingSystems/index.js";
import type { TargetComputeSizesOperations } from "./classic/targetComputeSizes/index.js";
import { _getTargetComputeSizesOperations } from "./classic/targetComputeSizes/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { SiteRecoveryManagementClientOptionalParams } from "./api/siteRecoveryManagementContext.js";

export class SiteRecoveryManagementClient {
  private _client: SiteRecoveryManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Open API for RecoveryServicesSiteRecovery */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: SiteRecoveryManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createSiteRecoveryManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.replicationVaultHealth = _getReplicationVaultHealthOperations(this._client);
    this.supportedOperatingSystems = _getSupportedOperatingSystemsOperations(this._client);
    this.replicationAppliances = _getReplicationAppliancesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
    this.replicationVaultSetting = _getReplicationVaultSettingOperations(this._client);
    this.replicationRecoveryPlans = _getReplicationRecoveryPlansOperations(this._client);
    this.replicationPolicies = _getReplicationPoliciesOperations(this._client);
    this.replicationJobs = _getReplicationJobsOperations(this._client);
    this.replicationvCenters = _getReplicationvCentersOperations(this._client);
    this.replicationStorageClassificationMappings =
      _getReplicationStorageClassificationMappingsOperations(this._client);
    this.replicationStorageClassifications = _getReplicationStorageClassificationsOperations(
      this._client,
    );
    this.replicationRecoveryServicesProviders = _getReplicationRecoveryServicesProvidersOperations(
      this._client,
    );
    this.replicationProtectionContainerMappings =
      _getReplicationProtectionContainerMappingsOperations(this._client);
    this.clusterRecoveryPoint = _getClusterRecoveryPointOperations(this._client);
    this.replicationProtectableItems = _getReplicationProtectableItemsOperations(this._client);
    this.replicationMigrationItems = _getReplicationMigrationItemsOperations(this._client);
    this.replicationProtectionContainers = _getReplicationProtectionContainersOperations(
      this._client,
    );
    this.replicationNetworkMappings = _getReplicationNetworkMappingsOperations(this._client);
    this.replicationNetworks = _getReplicationNetworksOperations(this._client);
    this.replicationLogicalNetworks = _getReplicationLogicalNetworksOperations(this._client);
    this.replicationFabrics = _getReplicationFabricsOperations(this._client);
    this.replicationEvents = _getReplicationEventsOperations(this._client);
    this.replicationEligibilityResults = _getReplicationEligibilityResultsOperations(this._client);
    this.replicationAlertSettings = _getReplicationAlertSettingsOperations(this._client);
    this.replicationProtectionIntents = _getReplicationProtectionIntentsOperations(this._client);
    this.clusterRecoveryPoints = _getClusterRecoveryPointsOperations(this._client);
    this.replicationProtectionClusters = _getReplicationProtectionClustersOperations(this._client);
    this.recoveryPoints = _getRecoveryPointsOperations(this._client);
    this.targetComputeSizes = _getTargetComputeSizesOperations(this._client);
    this.replicationProtectedItems = _getReplicationProtectedItemsOperations(this._client);
    this.migrationRecoveryPoints = _getMigrationRecoveryPointsOperations(this._client);
  }

  /** The operation groups for replicationVaultHealth */
  public readonly replicationVaultHealth: ReplicationVaultHealthOperations;
  /** The operation groups for supportedOperatingSystems */
  public readonly supportedOperatingSystems: SupportedOperatingSystemsOperations;
  /** The operation groups for replicationAppliances */
  public readonly replicationAppliances: ReplicationAppliancesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for replicationVaultSetting */
  public readonly replicationVaultSetting: ReplicationVaultSettingOperations;
  /** The operation groups for replicationRecoveryPlans */
  public readonly replicationRecoveryPlans: ReplicationRecoveryPlansOperations;
  /** The operation groups for replicationPolicies */
  public readonly replicationPolicies: ReplicationPoliciesOperations;
  /** The operation groups for replicationJobs */
  public readonly replicationJobs: ReplicationJobsOperations;
  /** The operation groups for replicationvCenters */
  public readonly replicationvCenters: ReplicationvCentersOperations;
  /** The operation groups for replicationStorageClassificationMappings */
  public readonly replicationStorageClassificationMappings: ReplicationStorageClassificationMappingsOperations;
  /** The operation groups for replicationStorageClassifications */
  public readonly replicationStorageClassifications: ReplicationStorageClassificationsOperations;
  /** The operation groups for replicationRecoveryServicesProviders */
  public readonly replicationRecoveryServicesProviders: ReplicationRecoveryServicesProvidersOperations;
  /** The operation groups for replicationProtectionContainerMappings */
  public readonly replicationProtectionContainerMappings: ReplicationProtectionContainerMappingsOperations;
  /** The operation groups for clusterRecoveryPoint */
  public readonly clusterRecoveryPoint: ClusterRecoveryPointOperations;
  /** The operation groups for replicationProtectableItems */
  public readonly replicationProtectableItems: ReplicationProtectableItemsOperations;
  /** The operation groups for replicationMigrationItems */
  public readonly replicationMigrationItems: ReplicationMigrationItemsOperations;
  /** The operation groups for replicationProtectionContainers */
  public readonly replicationProtectionContainers: ReplicationProtectionContainersOperations;
  /** The operation groups for replicationNetworkMappings */
  public readonly replicationNetworkMappings: ReplicationNetworkMappingsOperations;
  /** The operation groups for replicationNetworks */
  public readonly replicationNetworks: ReplicationNetworksOperations;
  /** The operation groups for replicationLogicalNetworks */
  public readonly replicationLogicalNetworks: ReplicationLogicalNetworksOperations;
  /** The operation groups for replicationFabrics */
  public readonly replicationFabrics: ReplicationFabricsOperations;
  /** The operation groups for replicationEvents */
  public readonly replicationEvents: ReplicationEventsOperations;
  /** The operation groups for replicationEligibilityResults */
  public readonly replicationEligibilityResults: ReplicationEligibilityResultsOperations;
  /** The operation groups for replicationAlertSettings */
  public readonly replicationAlertSettings: ReplicationAlertSettingsOperations;
  /** The operation groups for replicationProtectionIntents */
  public readonly replicationProtectionIntents: ReplicationProtectionIntentsOperations;
  /** The operation groups for clusterRecoveryPoints */
  public readonly clusterRecoveryPoints: ClusterRecoveryPointsOperations;
  /** The operation groups for replicationProtectionClusters */
  public readonly replicationProtectionClusters: ReplicationProtectionClustersOperations;
  /** The operation groups for recoveryPoints */
  public readonly recoveryPoints: RecoveryPointsOperations;
  /** The operation groups for targetComputeSizes */
  public readonly targetComputeSizes: TargetComputeSizesOperations;
  /** The operation groups for replicationProtectedItems */
  public readonly replicationProtectedItems: ReplicationProtectedItemsOperations;
  /** The operation groups for migrationRecoveryPoints */
  public readonly migrationRecoveryPoints: MigrationRecoveryPointsOperations;
}
