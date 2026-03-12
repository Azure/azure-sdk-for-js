// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementClient } from "./siteRecoveryManagementClient.js";
import { _refreshDeserialize } from "./api/replicationVaultHealth/operations.js";
import { _createDeserialize } from "./api/replicationVaultSetting/operations.js";
import {
  _unplannedFailoverDeserialize,
  _testFailoverCleanupDeserialize,
  _testFailoverDeserialize,
  _reprotectDeserialize,
  _plannedFailoverDeserialize,
  _failoverCommitDeserialize,
  _failoverCancelDeserialize,
  _$deleteDeserialize,
  _updateDeserialize,
  _createDeserialize as _createDeserializeReplicationRecoveryPlans,
} from "./api/replicationRecoveryPlans/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeReplicationPolicies,
  _updateDeserialize as _updateDeserializeReplicationPolicies,
  _createDeserialize as _createDeserializeReplicationPolicies,
} from "./api/replicationPolicies/operations.js";
import {
  _$exportDeserialize,
  _resumeDeserialize,
  _restartDeserialize,
  _cancelDeserialize,
} from "./api/replicationJobs/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeReplicationvCenters,
  _updateDeserialize as _updateDeserializeReplicationvCenters,
  _createDeserialize as _createDeserializeReplicationvCenters,
} from "./api/replicationvCenters/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeReplicationStorageClassificationMappings,
  _createDeserialize as _createDeserializeReplicationStorageClassificationMappings,
} from "./api/replicationStorageClassificationMappings/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeReplicationRecoveryServicesProviders,
  _refreshProviderDeserialize,
  _purgeDeserialize,
  _createDeserialize as _createDeserializeReplicationRecoveryServicesProviders,
} from "./api/replicationRecoveryServicesProviders/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeReplicationProtectionContainerMappings,
  _purgeDeserialize as _purgeDeserializeReplicationProtectionContainerMappings,
  _updateDeserialize as _updateDeserializeReplicationProtectionContainerMappings,
  _createDeserialize as _createDeserializeReplicationProtectionContainerMappings,
} from "./api/replicationProtectionContainerMappings/operations.js";
import {
  _testMigrateCleanupDeserialize,
  _testMigrateDeserialize,
  _resyncDeserialize,
  _resumeReplicationDeserialize,
  _pauseReplicationDeserialize,
  _migrateDeserialize,
  _$deleteDeserialize as _$deleteDeserializeReplicationMigrationItems,
  _updateDeserialize as _updateDeserializeReplicationMigrationItems,
  _createDeserialize as _createDeserializeReplicationMigrationItems,
} from "./api/replicationMigrationItems/operations.js";
import {
  _switchProtectionDeserialize,
  _switchClusterProtectionDeserialize,
  _$deleteDeserialize as _$deleteDeserializeReplicationProtectionContainers,
  _discoverProtectableItemDeserialize,
  _createDeserialize as _createDeserializeReplicationProtectionContainers,
} from "./api/replicationProtectionContainers/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeReplicationNetworkMappings,
  _updateDeserialize as _updateDeserializeReplicationNetworkMappings,
  _createDeserialize as _createDeserializeReplicationNetworkMappings,
} from "./api/replicationNetworkMappings/operations.js";
import {
  _removeInfraDeserialize,
  _renewCertificateDeserialize,
  _$deleteDeserialize as _$deleteDeserializeReplicationFabrics,
  _reassociateGatewayDeserialize,
  _migrateToAadDeserialize,
  _checkConsistencyDeserialize,
  _purgeDeserialize as _purgeDeserializeReplicationFabrics,
  _createDeserialize as _createDeserializeReplicationFabrics,
} from "./api/replicationFabrics/operations.js";
import {
  _unplannedFailoverDeserialize as _unplannedFailoverDeserializeReplicationProtectionClusters,
  _testFailoverCleanupDeserialize as _testFailoverCleanupDeserializeReplicationProtectionClusters,
  _testFailoverDeserialize as _testFailoverDeserializeReplicationProtectionClusters,
  _repairReplicationDeserialize,
  _failoverCommitDeserialize as _failoverCommitDeserializeReplicationProtectionClusters,
  _applyRecoveryPointDeserialize,
  _purgeDeserialize as _purgeDeserializeReplicationProtectionClusters,
  _createDeserialize as _createDeserializeReplicationProtectionClusters,
} from "./api/replicationProtectionClusters/operations.js";
import {
  _reinstallMobilityServiceDeserialize,
  _updateMobilityServiceDeserialize,
  _updateApplianceDeserialize,
  _unplannedFailoverDeserialize as _unplannedFailoverDeserializeReplicationProtectedItems,
  _testFailoverCleanupDeserialize as _testFailoverCleanupDeserializeReplicationProtectedItems,
  _testFailoverDeserialize as _testFailoverDeserializeReplicationProtectedItems,
  _switchProviderDeserialize,
  _resolveHealthErrorsDeserialize,
  _reprotectDeserialize as _reprotectDeserializeReplicationProtectedItems,
  _repairReplicationDeserialize as _repairReplicationDeserializeReplicationProtectedItems,
  _removeDisksDeserialize,
  _$deleteDeserialize as _$deleteDeserializeReplicationProtectedItems,
  _plannedFailoverDeserialize as _plannedFailoverDeserializeReplicationProtectedItems,
  _failoverCommitDeserialize as _failoverCommitDeserializeReplicationProtectedItems,
  _failoverCancelDeserialize as _failoverCancelDeserializeReplicationProtectedItems,
  _applyRecoveryPointDeserialize as _applyRecoveryPointDeserializeReplicationProtectedItems,
  _addDisksDeserialize,
  _purgeDeserialize as _purgeDeserializeReplicationProtectedItems,
  _updateDeserialize as _updateDeserializeReplicationProtectedItems,
  _createDeserialize as _createDeserializeReplicationProtectedItems,
} from "./api/replicationProtectedItems/operations.js";
import { getLongRunningPoller } from "./static-helpers/pollingHelpers.js";
import type { OperationOptions, PathUncheckedResponse } from "@azure-rest/core-client";
import type { AbortSignalLike } from "@azure/abort-controller";
import type { PollerLike, OperationState, ResourceLocationConfig } from "@azure/core-lro";
import { deserializeState } from "@azure/core-lro";

export interface RestorePollerOptions<
  TResult,
  TResponse extends PathUncheckedResponse = PathUncheckedResponse,
> extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /**
   * The signal which can be used to abort requests.
   */
  abortSignal?: AbortSignalLike;
  /** Deserialization function for raw response body */
  processResponseBody?: (result: TResponse) => Promise<TResult>;
}

/**
 * Creates a poller from the serialized state of another poller. This can be
 * useful when you want to create pollers on a different host or a poller
 * needs to be constructed after the original one is not in scope.
 */
export function restorePoller<TResponse extends PathUncheckedResponse, TResult>(
  client: SiteRecoveryManagementClient,
  serializedState: string,
  sourceOperation: (...args: any[]) => PollerLike<OperationState<TResult>, TResult>,
  options?: RestorePollerOptions<TResult>,
): PollerLike<OperationState<TResult>, TResult> {
  const pollerConfig = deserializeState(serializedState).config;
  const { initialRequestUrl, requestMethod, metadata } = pollerConfig;
  if (!initialRequestUrl || !requestMethod) {
    throw new Error(
      `Invalid serialized state: ${serializedState} for sourceOperation ${sourceOperation?.name}`,
    );
  }
  const resourceLocationConfig = metadata?.["resourceLocationConfig"] as
    | ResourceLocationConfig
    | undefined;
  const { deserializer, expectedStatuses = [] } =
    getDeserializationHelper(initialRequestUrl, requestMethod) ?? {};
  const deserializeHelper = options?.processResponseBody ?? deserializer;
  if (!deserializeHelper) {
    throw new Error(
      `Please ensure the operation is in this client! We can't find its deserializeHelper for ${sourceOperation?.name}.`,
    );
  }
  const apiVersion = getApiVersionFromUrl(initialRequestUrl);
  return getLongRunningPoller(
    (client as any)["_client"] ?? client,
    deserializeHelper as (result: TResponse) => Promise<TResult>,
    expectedStatuses,
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      resourceLocationConfig,
      restoreFrom: serializedState,
      initialRequestUrl,
      apiVersion,
    },
  );
}

interface DeserializationHelper {
  deserializer: (result: PathUncheckedResponse) => Promise<any>;
  expectedStatuses: string[];
}

const deserializeMap: Record<string, DeserializationHelper> = {
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationVaultHealth/default/refresh":
    { deserializer: _refreshDeserialize, expectedStatuses: ["202", "200", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationVaultSettings/{vaultSettingName}":
    { deserializer: _createDeserialize, expectedStatuses: ["200", "201", "202"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationRecoveryPlans/{recoveryPlanName}/unplannedFailover":
    { deserializer: _unplannedFailoverDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationRecoveryPlans/{recoveryPlanName}/testFailoverCleanup":
    { deserializer: _testFailoverCleanupDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationRecoveryPlans/{recoveryPlanName}/testFailover":
    { deserializer: _testFailoverDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationRecoveryPlans/{recoveryPlanName}/reProtect":
    { deserializer: _reprotectDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationRecoveryPlans/{recoveryPlanName}/plannedFailover":
    { deserializer: _plannedFailoverDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationRecoveryPlans/{recoveryPlanName}/failoverCommit":
    { deserializer: _failoverCommitDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationRecoveryPlans/{recoveryPlanName}/failoverCancel":
    { deserializer: _failoverCancelDeserialize, expectedStatuses: ["200", "202", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationRecoveryPlans/{recoveryPlanName}":
    { deserializer: _$deleteDeserialize, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationRecoveryPlans/{recoveryPlanName}":
    { deserializer: _updateDeserialize, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationRecoveryPlans/{recoveryPlanName}":
    {
      deserializer: _createDeserializeReplicationRecoveryPlans,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationPolicies/{policyName}":
    {
      deserializer: _$deleteDeserializeReplicationPolicies,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationPolicies/{policyName}":
    {
      deserializer: _updateDeserializeReplicationPolicies,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationPolicies/{policyName}":
    {
      deserializer: _createDeserializeReplicationPolicies,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationJobs/export":
    { deserializer: _$exportDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationJobs/{jobName}/resume":
    { deserializer: _resumeDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationJobs/{jobName}/restart":
    { deserializer: _restartDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationJobs/{jobName}/cancel":
    { deserializer: _cancelDeserialize, expectedStatuses: ["200", "202", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationvCenters/{vcenterName}":
    {
      deserializer: _$deleteDeserializeReplicationvCenters,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationvCenters/{vcenterName}":
    {
      deserializer: _updateDeserializeReplicationvCenters,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationvCenters/{vcenterName}":
    {
      deserializer: _createDeserializeReplicationvCenters,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationStorageClassifications/{storageClassificationName}/replicationStorageClassificationMappings/{storageClassificationMappingName}":
    {
      deserializer: _$deleteDeserializeReplicationStorageClassificationMappings,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationStorageClassifications/{storageClassificationName}/replicationStorageClassificationMappings/{storageClassificationMappingName}":
    {
      deserializer: _createDeserializeReplicationStorageClassificationMappings,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationRecoveryServicesProviders/{providerName}/remove":
    {
      deserializer: _$deleteDeserializeReplicationRecoveryServicesProviders,
      expectedStatuses: ["204", "202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationRecoveryServicesProviders/{providerName}/refreshProvider":
    { deserializer: _refreshProviderDeserialize, expectedStatuses: ["200", "202", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationRecoveryServicesProviders/{providerName}":
    { deserializer: _purgeDeserialize, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationRecoveryServicesProviders/{providerName}":
    {
      deserializer: _createDeserializeReplicationRecoveryServicesProviders,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectionContainerMappings/{mappingName}/remove":
    {
      deserializer: _$deleteDeserializeReplicationProtectionContainerMappings,
      expectedStatuses: ["204", "202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectionContainerMappings/{mappingName}":
    {
      deserializer: _purgeDeserializeReplicationProtectionContainerMappings,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectionContainerMappings/{mappingName}":
    {
      deserializer: _updateDeserializeReplicationProtectionContainerMappings,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectionContainerMappings/{mappingName}":
    {
      deserializer: _createDeserializeReplicationProtectionContainerMappings,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationMigrationItems/{migrationItemName}/testMigrateCleanup":
    { deserializer: _testMigrateCleanupDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationMigrationItems/{migrationItemName}/testMigrate":
    { deserializer: _testMigrateDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationMigrationItems/{migrationItemName}/resync":
    { deserializer: _resyncDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationMigrationItems/{migrationItemName}/resumeReplication":
    { deserializer: _resumeReplicationDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationMigrationItems/{migrationItemName}/pauseReplication":
    { deserializer: _pauseReplicationDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationMigrationItems/{migrationItemName}/migrate":
    { deserializer: _migrateDeserialize, expectedStatuses: ["200", "202", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationMigrationItems/{migrationItemName}":
    {
      deserializer: _$deleteDeserializeReplicationMigrationItems,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationMigrationItems/{migrationItemName}":
    {
      deserializer: _updateDeserializeReplicationMigrationItems,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationMigrationItems/{migrationItemName}":
    {
      deserializer: _createDeserializeReplicationMigrationItems,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/switchprotection":
    { deserializer: _switchProtectionDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/switchClusterProtection":
    { deserializer: _switchClusterProtectionDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/remove":
    {
      deserializer: _$deleteDeserializeReplicationProtectionContainers,
      expectedStatuses: ["204", "202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/discoverProtectableItem":
    { deserializer: _discoverProtectableItemDeserialize, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}":
    {
      deserializer: _createDeserializeReplicationProtectionContainers,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationNetworks/{networkName}/replicationNetworkMappings/{networkMappingName}":
    {
      deserializer: _$deleteDeserializeReplicationNetworkMappings,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationNetworks/{networkName}/replicationNetworkMappings/{networkMappingName}":
    {
      deserializer: _updateDeserializeReplicationNetworkMappings,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationNetworks/{networkName}/replicationNetworkMappings/{networkMappingName}":
    {
      deserializer: _createDeserializeReplicationNetworkMappings,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/removeInfra":
    { deserializer: _removeInfraDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/renewCertificate":
    { deserializer: _renewCertificateDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/remove":
    {
      deserializer: _$deleteDeserializeReplicationFabrics,
      expectedStatuses: ["204", "202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/reassociateGateway":
    { deserializer: _reassociateGatewayDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/migratetoaad":
    { deserializer: _migrateToAadDeserialize, expectedStatuses: ["204", "202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/checkConsistency":
    { deserializer: _checkConsistencyDeserialize, expectedStatuses: ["200", "202", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}":
    { deserializer: _purgeDeserializeReplicationFabrics, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}":
    { deserializer: _createDeserializeReplicationFabrics, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectionClusters/{replicationProtectionClusterName}/unplannedFailover":
    {
      deserializer: _unplannedFailoverDeserializeReplicationProtectionClusters,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectionClusters/{replicationProtectionClusterName}/testFailoverCleanup":
    {
      deserializer: _testFailoverCleanupDeserializeReplicationProtectionClusters,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectionClusters/{replicationProtectionClusterName}/testFailover":
    {
      deserializer: _testFailoverDeserializeReplicationProtectionClusters,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectionClusters/{replicationProtectionClusterName}/repairReplication":
    { deserializer: _repairReplicationDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectionClusters/{replicationProtectionClusterName}/failoverCommit":
    {
      deserializer: _failoverCommitDeserializeReplicationProtectionClusters,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectionClusters/{replicationProtectionClusterName}/applyRecoveryPoint":
    { deserializer: _applyRecoveryPointDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectionClusters/{replicationProtectionClusterName}":
    {
      deserializer: _purgeDeserializeReplicationProtectionClusters,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectionClusters/{replicationProtectionClusterName}":
    {
      deserializer: _createDeserializeReplicationProtectionClusters,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/reinstallMobilityService":
    { deserializer: _reinstallMobilityServiceDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/updateMobilityService":
    { deserializer: _updateMobilityServiceDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/updateAppliance":
    { deserializer: _updateApplianceDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/unplannedFailover":
    {
      deserializer: _unplannedFailoverDeserializeReplicationProtectedItems,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/testFailoverCleanup":
    {
      deserializer: _testFailoverCleanupDeserializeReplicationProtectedItems,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/testFailover":
    {
      deserializer: _testFailoverDeserializeReplicationProtectedItems,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/switchProvider":
    { deserializer: _switchProviderDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/resolveHealthErrors":
    { deserializer: _resolveHealthErrorsDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/reProtect":
    {
      deserializer: _reprotectDeserializeReplicationProtectedItems,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/repairReplication":
    {
      deserializer: _repairReplicationDeserializeReplicationProtectedItems,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/removeDisks":
    { deserializer: _removeDisksDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/remove":
    {
      deserializer: _$deleteDeserializeReplicationProtectedItems,
      expectedStatuses: ["204", "202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/plannedFailover":
    {
      deserializer: _plannedFailoverDeserializeReplicationProtectedItems,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/failoverCommit":
    {
      deserializer: _failoverCommitDeserializeReplicationProtectedItems,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/failoverCancel":
    {
      deserializer: _failoverCancelDeserializeReplicationProtectedItems,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/applyRecoveryPoint":
    {
      deserializer: _applyRecoveryPointDeserializeReplicationProtectedItems,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/addDisks":
    { deserializer: _addDisksDeserialize, expectedStatuses: ["200", "202", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}":
    {
      deserializer: _purgeDeserializeReplicationProtectedItems,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}":
    {
      deserializer: _updateDeserializeReplicationProtectedItems,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}":
    {
      deserializer: _createDeserializeReplicationProtectedItems,
      expectedStatuses: ["200", "202", "201"],
    },
};

function getDeserializationHelper(
  urlStr: string,
  method: string,
): DeserializationHelper | undefined {
  const path = new URL(urlStr).pathname;
  const pathParts = path.split("/");

  // Traverse list to match the longest candidate
  // matchedLen: the length of candidate path
  // matchedValue: the matched status code array
  let matchedLen = -1,
    matchedValue: DeserializationHelper | undefined;

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(deserializeMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    if (!key.startsWith(method)) {
      continue;
    }
    const candidatePath = getPathFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // track if we have found a match to return the values found.
    let found = true;
    for (let i = candidateParts.length - 1, j = pathParts.length - 1; i >= 1 && j >= 1; i--, j--) {
      if (candidateParts[i]?.startsWith("{") && candidateParts[i]?.indexOf("}") !== -1) {
        const start = candidateParts[i]!.indexOf("}") + 1,
          end = candidateParts[i]?.length;
        // If the current part of the candidate is a "template" part
        // Try to use the suffix of pattern to match the path
        // {guid} ==> $
        // {guid}:export ==> :export$
        const isMatched = new RegExp(`${candidateParts[i]?.slice(start, end)}`).test(
          pathParts[j] || "",
        );

        if (!isMatched) {
          found = false;
          break;
        }
        continue;
      }

      // If the candidate part is not a template and
      // the parts don't match mark the candidate as not found
      // to move on with the next candidate path.
      if (candidateParts[i] !== pathParts[j]) {
        found = false;
        break;
      }
    }

    // We finished evaluating the current candidate parts
    // Update the matched value if and only if we found the longer pattern
    if (found && candidatePath.length > matchedLen) {
      matchedLen = candidatePath.length;
      matchedValue = value;
    }
  }

  return matchedValue;
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}

function getApiVersionFromUrl(urlStr: string): string | undefined {
  const url = new URL(urlStr);
  return url.searchParams.get("api-version") ?? undefined;
}
