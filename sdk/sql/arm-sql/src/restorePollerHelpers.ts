// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementClient } from "./sqlManagementClient.js";
import {
  _suspendDeserialize,
  _resumeDeserialize,
  _createOrUpdateDeserialize,
} from "./api/transparentDataEncryptions/operations.js";
import { _createOrUpdateDeserialize as _createOrUpdateDeserializeServerAdvancedThreatProtectionSettings } from "./api/serverAdvancedThreatProtectionSettings/operations.js";
import {
  _disableDeserialize,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeManagedLedgerDigestUploads,
} from "./api/managedLedgerDigestUploads/operations.js";
import { _createOrUpdateDeserialize as _createOrUpdateDeserializeManagedInstanceAdvancedThreatProtectionSettings } from "./api/managedInstanceAdvancedThreatProtectionSettings/operations.js";
import {
  _disableDeserialize as _disableDeserializeLedgerDigestUploads,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeLedgerDigestUploads,
} from "./api/ledgerDigestUploads/operations.js";
import { _createDeserialize } from "./api/managedInstanceTdeCertificates/operations.js";
import { _initiateScanDeserialize } from "./api/databaseVulnerabilityAssessmentScans/operations.js";
import { _executeDeserialize } from "./api/sqlVulnerabilityAssessmentExecuteScan/operations.js";
import { _executeDeserialize as _executeDeserializeDatabaseSqlVulnerabilityAssessmentExecuteScan } from "./api/databaseSqlVulnerabilityAssessmentExecuteScan/operations.js";
import { _createOrUpdateDeserialize as _createOrUpdateDeserializeDatabaseExtensions } from "./api/databaseExtensions/operations.js";
import { _createDeserialize as _createDeserializeTdeCertificates } from "./api/tdeCertificates/operations.js";
import {
  _revertDeserialize,
  _revalidateDeserialize,
} from "./api/databaseEncryptionProtectors/operations.js";
import {
  _$deleteDeserialize,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeWorkloadGroups,
} from "./api/workloadGroups/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeWorkloadClassifiers,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeWorkloadClassifiers,
} from "./api/workloadClassifiers/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeVirtualNetworkRules,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVirtualNetworkRules,
} from "./api/virtualNetworkRules/operations.js";
import {
  _updateDnsServersDeserialize,
  _$deleteDeserialize as _$deleteDeserializeVirtualClusters,
  _updateDeserialize,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVirtualClusters,
} from "./api/virtualClusters/operations.js";
import {
  _refreshMemberSchemaDeserialize,
  _$deleteDeserialize as _$deleteDeserializeSyncMembers,
  _updateDeserialize as _updateDeserializeSyncMembers,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeSyncMembers,
} from "./api/syncMembers/operations.js";
import {
  _refreshHubSchemaDeserialize,
  _$deleteDeserialize as _$deleteDeserializeSyncGroups,
  _updateDeserialize as _updateDeserializeSyncGroups,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeSyncGroups,
} from "./api/syncGroups/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeSyncAgents,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeSyncAgents,
} from "./api/syncAgents/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeServerTrustCertificates,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeServerTrustCertificates,
} from "./api/serverTrustCertificates/operations.js";
import { _createOrUpdateDeserialize as _createOrUpdateDeserializeServerSecurityAlertPolicies } from "./api/serverSecurityAlertPolicies/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeServerKeys,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeServerKeys,
} from "./api/serverKeys/operations.js";
import {
  _acquireDeserialize,
  _$deleteDeserialize as _$deleteDeserializeServerDnsAliases,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeServerDnsAliases,
} from "./api/serverDnsAliases/operations.js";
import { _createOrUpdateDeserialize as _createOrUpdateDeserializeServerDevOpsAuditSettings } from "./api/serverDevOpsAuditSettings/operations.js";
import { _createOrUpdateDeserialize as _createOrUpdateDeserializeServerConnectionPolicies } from "./api/serverConnectionPolicies/operations.js";
import { _createOrUpdateDeserialize as _createOrUpdateDeserializeServerConfigurationOptions } from "./api/serverConfigurationOptions/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeServerAzureADOnlyAuthentications,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeServerAzureADOnlyAuthentications,
} from "./api/serverAzureADOnlyAuthentications/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeServerAzureADAdministrators,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeServerAzureADAdministrators,
} from "./api/serverAzureADAdministrators/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializePrivateEndpointConnections,
  _createOrUpdateDeserialize as _createOrUpdateDeserializePrivateEndpointConnections,
} from "./api/privateEndpointConnections/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeOutboundFirewallRules,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeOutboundFirewallRules,
} from "./api/outboundFirewallRules/operations.js";
import { _reconcileDeserialize } from "./api/networkSecurityPerimeterConfigurations/operations.js";
import { _createOrUpdateDeserialize as _createOrUpdateDeserializeManagedServerSecurityAlertPolicies } from "./api/managedServerSecurityAlertPolicies/operations.js";
import {
  _acquireDeserialize as _acquireDeserializeManagedServerDnsAliases,
  _$deleteDeserialize as _$deleteDeserializeManagedServerDnsAliases,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeManagedServerDnsAliases,
} from "./api/managedServerDnsAliases/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeManagedInstancePrivateEndpointConnections,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeManagedInstancePrivateEndpointConnections,
} from "./api/managedInstancePrivateEndpointConnections/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeManagedInstanceLongTermRetentionPolicies,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeManagedInstanceLongTermRetentionPolicies,
} from "./api/managedInstanceLongTermRetentionPolicies/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeManagedInstanceKeys,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeManagedInstanceKeys,
} from "./api/managedInstanceKeys/operations.js";
import {
  _revalidateDeserialize as _revalidateDeserializeManagedInstanceEncryptionProtectors,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeManagedInstanceEncryptionProtectors,
} from "./api/managedInstanceEncryptionProtectors/operations.js";
import { _createOrUpdateDeserialize as _createOrUpdateDeserializeManagedInstanceDtcs } from "./api/managedInstanceDtcs/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeManagedInstanceAzureADOnlyAuthentications,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeManagedInstanceAzureADOnlyAuthentications,
} from "./api/managedInstanceAzureADOnlyAuthentications/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeManagedInstanceAdministrators,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeManagedInstanceAdministrators,
} from "./api/managedInstanceAdministrators/operations.js";
import {
  _updateDeserialize as _updateDeserializeManagedRestorableDroppedDatabaseBackupShortTermRetentionPolicies,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeManagedRestorableDroppedDatabaseBackupShortTermRetentionPolicies,
} from "./api/managedRestorableDroppedDatabaseBackupShortTermRetentionPolicies/operations.js";
import {
  _updateDeserialize as _updateDeserializeManagedBackupShortTermRetentionPolicies,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeManagedBackupShortTermRetentionPolicies,
} from "./api/managedBackupShortTermRetentionPolicies/operations.js";
import { _createOrUpdateDeserialize as _createOrUpdateDeserializeLongTermRetentionPolicies } from "./api/longTermRetentionPolicies/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeLongTermRetentionManagedInstanceBackups,
  _deleteByResourceGroupDeserialize,
} from "./api/longTermRetentionManagedInstanceBackups/operations.js";
import {
  _updateByResourceGroupDeserialize,
  _setLegalHoldImmutabilityByResourceGroupDeserialize,
  _removeTimeBasedImmutabilityByResourceGroupDeserialize,
  _removeLegalHoldImmutabilityByResourceGroupDeserialize,
  _lockTimeBasedImmutabilityByResourceGroupDeserialize,
  _copyByResourceGroupDeserialize,
  _changeAccessTierByResourceGroupDeserialize,
  _deleteByResourceGroupDeserialize as _deleteByResourceGroupDeserializeLongTermRetentionBackups,
  _updateDeserialize as _updateDeserializeLongTermRetentionBackups,
  _setLegalHoldImmutabilityDeserialize,
  _removeTimeBasedImmutabilityDeserialize,
  _removeLegalHoldImmutabilityDeserialize,
  _lockTimeBasedImmutabilityDeserialize,
  _copyDeserialize,
  _changeAccessTierDeserialize,
  _$deleteDeserialize as _$deleteDeserializeLongTermRetentionBackups,
} from "./api/longTermRetentionBackups/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeJobPrivateEndpoints,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeJobPrivateEndpoints,
} from "./api/jobPrivateEndpoints/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeJobAgents,
  _updateDeserialize as _updateDeserializeJobAgents,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeJobAgents,
} from "./api/jobAgents/operations.js";
import {
  _createDeserialize as _createDeserializeJobExecutions,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeJobExecutions,
} from "./api/jobExecutions/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeInstancePools,
  _updateDeserialize as _updateDeserializeInstancePools,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeInstancePools,
} from "./api/instancePools/operations.js";
import {
  _forceFailoverAllowDataLossDeserialize,
  _failoverDeserialize,
  _$deleteDeserialize as _$deleteDeserializeInstanceFailoverGroups,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeInstanceFailoverGroups,
} from "./api/instanceFailoverGroups/operations.js";
import {
  _tryPlannedBeforeForcedFailoverDeserialize,
  _forceFailoverAllowDataLossDeserialize as _forceFailoverAllowDataLossDeserializeFailoverGroups,
  _failoverDeserialize as _failoverDeserializeFailoverGroups,
  _$deleteDeserialize as _$deleteDeserializeFailoverGroups,
  _updateDeserialize as _updateDeserializeFailoverGroups,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeFailoverGroups,
} from "./api/failoverGroups/operations.js";
import {
  _revalidateDeserialize as _revalidateDeserializeEncryptionProtectors,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeEncryptionProtectors,
} from "./api/encryptionProtectors/operations.js";
import {
  _failoverDeserialize as _failoverDeserializeElasticPools,
  _$deleteDeserialize as _$deleteDeserializeElasticPools,
  _updateDeserialize as _updateDeserializeElasticPools,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeElasticPools,
} from "./api/elasticPools/operations.js";
import {
  _validateAzureKeyVaultEncryptionKeyDeserialize,
  _stopDeserialize,
  _startDeserialize,
  _refreshStatusDeserialize,
  _reevaluateInaccessibleDatabaseStateDeserialize,
  _failoverDeserialize as _failoverDeserializeManagedInstances,
  _$deleteDeserialize as _$deleteDeserializeManagedInstances,
  _updateDeserialize as _updateDeserializeManagedInstances,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeManagedInstances,
} from "./api/managedInstances/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeServerTrustGroups,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeServerTrustGroups,
} from "./api/serverTrustGroups/operations.js";
import {
  _startMoveDeserialize,
  _reevaluateInaccessibleDatabaseStateDeserialize as _reevaluateInaccessibleDatabaseStateDeserializeManagedDatabases,
  _completeRestoreDeserialize,
  _completeMoveDeserialize,
  _cancelMoveDeserialize,
  _$deleteDeserialize as _$deleteDeserializeManagedDatabases,
  _updateDeserialize as _updateDeserializeManagedDatabases,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeManagedDatabases,
} from "./api/managedDatabases/operations.js";
import {
  _setRoleDeserialize,
  _failoverDeserialize as _failoverDeserializeDistributedAvailabilityGroups,
  _$deleteDeserialize as _$deleteDeserializeDistributedAvailabilityGroups,
  _updateDeserialize as _updateDeserializeDistributedAvailabilityGroups,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeDistributedAvailabilityGroups,
} from "./api/distributedAvailabilityGroups/operations.js";
import { _recoverDeserialize } from "./api/deletedServers/operations.js";
import { _initiateScanDeserialize as _initiateScanDeserializeManagedDatabaseVulnerabilityAssessmentScans } from "./api/managedDatabaseVulnerabilityAssessmentScans/operations.js";
import { _createOrUpdateDeserialize as _createOrUpdateDeserializeExtendedServerBlobAuditingPolicies } from "./api/extendedServerBlobAuditingPolicies/operations.js";
import { _createOrUpdateDeserialize as _createOrUpdateDeserializeServerBlobAuditingPolicies } from "./api/serverBlobAuditingPolicies/operations.js";
import {
  _refreshStatusDeserialize as _refreshStatusDeserializeServers,
  _importDatabaseDeserialize,
  _$deleteDeserialize as _$deleteDeserializeServers,
  _updateDeserialize as _updateDeserializeServers,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeServers,
} from "./api/servers/operations.js";
import {
  _failoverAllowDataLossDeserialize,
  _failoverDeserialize as _failoverDeserializeReplicationLinks,
  _$deleteDeserialize as _$deleteDeserializeReplicationLinks,
  _updateDeserialize as _updateDeserializeReplicationLinks,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeReplicationLinks,
} from "./api/replicationLinks/operations.js";
import {
  _upgradeDataWarehouseDeserialize,
  _resumeDeserialize as _resumeDeserializeDatabases,
  _pauseDeserialize,
  _$importDeserialize,
  _failoverDeserialize as _failoverDeserializeDatabases,
  _$exportDeserialize,
  _$deleteDeserialize as _$deleteDeserializeDatabases,
  _updateDeserialize as _updateDeserializeDatabases,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeDatabases,
} from "./api/databases/operations.js";
import { _createDeserialize as _createDeserializeRestorePoints } from "./api/restorePoints/operations.js";
import {
  _updateDeserialize as _updateDeserializeBackupShortTermRetentionPolicies,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeBackupShortTermRetentionPolicies,
} from "./api/backupShortTermRetentionPolicies/operations.js";
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
  client: SqlManagementClient,
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
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/transparentDataEncryption/{tdeName}/suspend":
    { deserializer: _suspendDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/transparentDataEncryption/{tdeName}/resume":
    { deserializer: _resumeDeserialize, expectedStatuses: ["202", "200", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/transparentDataEncryption/{tdeName}":
    { deserializer: _createOrUpdateDeserialize, expectedStatuses: ["200", "201", "202"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/advancedThreatProtectionSettings/{advancedThreatProtectionName}":
    {
      deserializer: _createOrUpdateDeserializeServerAdvancedThreatProtectionSettings,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/ledgerDigestUploads/{ledgerDigestUploads}/disable":
    { deserializer: _disableDeserialize, expectedStatuses: ["202", "200", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/ledgerDigestUploads/{ledgerDigestUploads}":
    {
      deserializer: _createOrUpdateDeserializeManagedLedgerDigestUploads,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/advancedThreatProtectionSettings/{advancedThreatProtectionName}":
    {
      deserializer: _createOrUpdateDeserializeManagedInstanceAdvancedThreatProtectionSettings,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/ledgerDigestUploads/{ledgerDigestUploads}/disable":
    {
      deserializer: _disableDeserializeLedgerDigestUploads,
      expectedStatuses: ["202", "200", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/ledgerDigestUploads/{ledgerDigestUploads}":
    {
      deserializer: _createOrUpdateDeserializeLedgerDigestUploads,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/tdeCertificates":
    { deserializer: _createDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}/scans/{scanId}/initiateScan":
    { deserializer: _initiateScanDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/sqlVulnerabilityAssessments/{vulnerabilityAssessmentName}/initiateScan":
    { deserializer: _executeDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/sqlVulnerabilityAssessments/{vulnerabilityAssessmentName}/initiateScan":
    {
      deserializer: _executeDeserializeDatabaseSqlVulnerabilityAssessmentExecuteScan,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/extensions/{extensionName}":
    {
      deserializer: _createOrUpdateDeserializeDatabaseExtensions,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/tdeCertificates":
    { deserializer: _createDeserializeTdeCertificates, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/encryptionProtector/{encryptionProtectorName}/revert":
    { deserializer: _revertDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/encryptionProtector/{encryptionProtectorName}/revalidate":
    { deserializer: _revalidateDeserialize, expectedStatuses: ["200", "202", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/workloadGroups/{workloadGroupName}":
    { deserializer: _$deleteDeserialize, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/workloadGroups/{workloadGroupName}":
    {
      deserializer: _createOrUpdateDeserializeWorkloadGroups,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/workloadGroups/{workloadGroupName}/workloadClassifiers/{workloadClassifierName}":
    {
      deserializer: _$deleteDeserializeWorkloadClassifiers,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/workloadGroups/{workloadGroupName}/workloadClassifiers/{workloadClassifierName}":
    {
      deserializer: _createOrUpdateDeserializeWorkloadClassifiers,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/virtualNetworkRules/{virtualNetworkRuleName}":
    {
      deserializer: _$deleteDeserializeVirtualNetworkRules,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/virtualNetworkRules/{virtualNetworkRuleName}":
    {
      deserializer: _createOrUpdateDeserializeVirtualNetworkRules,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/virtualClusters/{virtualClusterName}/updateManagedInstanceDnsServers":
    { deserializer: _updateDnsServersDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/virtualClusters/{virtualClusterName}":
    { deserializer: _$deleteDeserializeVirtualClusters, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/virtualClusters/{virtualClusterName}":
    { deserializer: _updateDeserialize, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/virtualClusters/{virtualClusterName}":
    {
      deserializer: _createOrUpdateDeserializeVirtualClusters,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/syncMembers/{syncMemberName}/refreshSchema":
    { deserializer: _refreshMemberSchemaDeserialize, expectedStatuses: ["200", "202", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/syncMembers/{syncMemberName}":
    { deserializer: _$deleteDeserializeSyncMembers, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/syncMembers/{syncMemberName}":
    { deserializer: _updateDeserializeSyncMembers, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/syncMembers/{syncMemberName}":
    {
      deserializer: _createOrUpdateDeserializeSyncMembers,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/refreshHubSchema":
    { deserializer: _refreshHubSchemaDeserialize, expectedStatuses: ["200", "202", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}":
    { deserializer: _$deleteDeserializeSyncGroups, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}":
    { deserializer: _updateDeserializeSyncGroups, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}":
    { deserializer: _createOrUpdateDeserializeSyncGroups, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/syncAgents/{syncAgentName}":
    { deserializer: _$deleteDeserializeSyncAgents, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/syncAgents/{syncAgentName}":
    { deserializer: _createOrUpdateDeserializeSyncAgents, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/serverTrustCertificates/{certificateName}":
    {
      deserializer: _$deleteDeserializeServerTrustCertificates,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/serverTrustCertificates/{certificateName}":
    {
      deserializer: _createOrUpdateDeserializeServerTrustCertificates,
      expectedStatuses: ["200", "201", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/securityAlertPolicies/{securityAlertPolicyName}":
    {
      deserializer: _createOrUpdateDeserializeServerSecurityAlertPolicies,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/keys/{keyName}":
    { deserializer: _$deleteDeserializeServerKeys, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/keys/{keyName}":
    { deserializer: _createOrUpdateDeserializeServerKeys, expectedStatuses: ["200", "201", "202"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/dnsAliases/{dnsAliasName}/acquire":
    { deserializer: _acquireDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/dnsAliases/{dnsAliasName}":
    { deserializer: _$deleteDeserializeServerDnsAliases, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/dnsAliases/{dnsAliasName}":
    {
      deserializer: _createOrUpdateDeserializeServerDnsAliases,
      expectedStatuses: ["200", "201", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/devOpsAuditingSettings/{devOpsAuditingSettingsName}":
    {
      deserializer: _createOrUpdateDeserializeServerDevOpsAuditSettings,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/connectionPolicies/{connectionPolicyName}":
    {
      deserializer: _createOrUpdateDeserializeServerConnectionPolicies,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/serverConfigurationOptions/{serverConfigurationOptionName}":
    {
      deserializer: _createOrUpdateDeserializeServerConfigurationOptions,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/azureADOnlyAuthentications/{authenticationName}":
    {
      deserializer: _$deleteDeserializeServerAzureADOnlyAuthentications,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/azureADOnlyAuthentications/{authenticationName}":
    {
      deserializer: _createOrUpdateDeserializeServerAzureADOnlyAuthentications,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/administrators/{administratorName}":
    {
      deserializer: _$deleteDeserializeServerAzureADAdministrators,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/administrators/{administratorName}":
    {
      deserializer: _createOrUpdateDeserializeServerAzureADAdministrators,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/privateEndpointConnections/{privateEndpointConnectionName}":
    {
      deserializer: _$deleteDeserializePrivateEndpointConnections,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/privateEndpointConnections/{privateEndpointConnectionName}":
    {
      deserializer: _createOrUpdateDeserializePrivateEndpointConnections,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/outboundFirewallRules/{outboundRuleFqdn}":
    {
      deserializer: _$deleteDeserializeOutboundFirewallRules,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/outboundFirewallRules/{outboundRuleFqdn}":
    {
      deserializer: _createOrUpdateDeserializeOutboundFirewallRules,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/networkSecurityPerimeterConfigurations/{nspConfigName}/reconcile":
    { deserializer: _reconcileDeserialize, expectedStatuses: ["202", "200", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/securityAlertPolicies/{securityAlertPolicyName}":
    {
      deserializer: _createOrUpdateDeserializeManagedServerSecurityAlertPolicies,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/dnsAliases/{dnsAliasName}/acquire":
    {
      deserializer: _acquireDeserializeManagedServerDnsAliases,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/dnsAliases/{dnsAliasName}":
    {
      deserializer: _$deleteDeserializeManagedServerDnsAliases,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/dnsAliases/{dnsAliasName}":
    {
      deserializer: _createOrUpdateDeserializeManagedServerDnsAliases,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/privateEndpointConnections/{privateEndpointConnectionName}":
    {
      deserializer: _$deleteDeserializeManagedInstancePrivateEndpointConnections,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/privateEndpointConnections/{privateEndpointConnectionName}":
    {
      deserializer: _createOrUpdateDeserializeManagedInstancePrivateEndpointConnections,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/backupLongTermRetentionPolicies/{policyName}":
    {
      deserializer: _$deleteDeserializeManagedInstanceLongTermRetentionPolicies,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/backupLongTermRetentionPolicies/{policyName}":
    {
      deserializer: _createOrUpdateDeserializeManagedInstanceLongTermRetentionPolicies,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/keys/{keyName}":
    {
      deserializer: _$deleteDeserializeManagedInstanceKeys,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/keys/{keyName}":
    {
      deserializer: _createOrUpdateDeserializeManagedInstanceKeys,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/encryptionProtector/{encryptionProtectorName}/revalidate":
    {
      deserializer: _revalidateDeserializeManagedInstanceEncryptionProtectors,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/encryptionProtector/{encryptionProtectorName}":
    {
      deserializer: _createOrUpdateDeserializeManagedInstanceEncryptionProtectors,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/dtc/{dtcName}":
    {
      deserializer: _createOrUpdateDeserializeManagedInstanceDtcs,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/azureADOnlyAuthentications/{authenticationName}":
    {
      deserializer: _$deleteDeserializeManagedInstanceAzureADOnlyAuthentications,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/azureADOnlyAuthentications/{authenticationName}":
    {
      deserializer: _createOrUpdateDeserializeManagedInstanceAzureADOnlyAuthentications,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/administrators/{administratorName}":
    {
      deserializer: _$deleteDeserializeManagedInstanceAdministrators,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/administrators/{administratorName}":
    {
      deserializer: _createOrUpdateDeserializeManagedInstanceAdministrators,
      expectedStatuses: ["200", "201", "202"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/restorableDroppedDatabases/{restorableDroppedDatabaseId}/backupShortTermRetentionPolicies/{policyName}":
    {
      deserializer:
        _updateDeserializeManagedRestorableDroppedDatabaseBackupShortTermRetentionPolicies,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/restorableDroppedDatabases/{restorableDroppedDatabaseId}/backupShortTermRetentionPolicies/{policyName}":
    {
      deserializer:
        _createOrUpdateDeserializeManagedRestorableDroppedDatabaseBackupShortTermRetentionPolicies,
      expectedStatuses: ["200", "202", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/backupShortTermRetentionPolicies/{policyName}":
    {
      deserializer: _updateDeserializeManagedBackupShortTermRetentionPolicies,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/backupShortTermRetentionPolicies/{policyName}":
    {
      deserializer: _createOrUpdateDeserializeManagedBackupShortTermRetentionPolicies,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/backupLongTermRetentionPolicies/{policyName}":
    {
      deserializer: _createOrUpdateDeserializeLongTermRetentionPolicies,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionManagedInstances/{managedInstanceName}/longTermRetentionDatabases/{databaseName}/longTermRetentionManagedInstanceBackups/{backupName}":
    {
      deserializer: _$deleteDeserializeLongTermRetentionManagedInstanceBackups,
      expectedStatuses: ["200", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionManagedInstances/{managedInstanceName}/longTermRetentionDatabases/{databaseName}/longTermRetentionManagedInstanceBackups/{backupName}":
    { deserializer: _deleteByResourceGroupDeserialize, expectedStatuses: ["200", "202"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/update":
    { deserializer: _updateByResourceGroupDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/setLegalHoldImmutability":
    {
      deserializer: _setLegalHoldImmutabilityByResourceGroupDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/removeTimeBasedImmutability":
    {
      deserializer: _removeTimeBasedImmutabilityByResourceGroupDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/removeLegalHoldImmutability":
    {
      deserializer: _removeLegalHoldImmutabilityByResourceGroupDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/lockTimeBasedImmutability":
    {
      deserializer: _lockTimeBasedImmutabilityByResourceGroupDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/copy":
    { deserializer: _copyByResourceGroupDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/changeAccessTier":
    {
      deserializer: _changeAccessTierByResourceGroupDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}":
    {
      deserializer: _deleteByResourceGroupDeserializeLongTermRetentionBackups,
      expectedStatuses: ["200", "202"],
    },
  "POST /subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/update":
    {
      deserializer: _updateDeserializeLongTermRetentionBackups,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/setLegalHoldImmutability":
    { deserializer: _setLegalHoldImmutabilityDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/removeTimeBasedImmutability":
    {
      deserializer: _removeTimeBasedImmutabilityDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/removeLegalHoldImmutability":
    {
      deserializer: _removeLegalHoldImmutabilityDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/lockTimeBasedImmutability":
    {
      deserializer: _lockTimeBasedImmutabilityDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/copy":
    { deserializer: _copyDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/changeAccessTier":
    { deserializer: _changeAccessTierDeserialize, expectedStatuses: ["200", "202", "201"] },
  "DELETE /subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}":
    { deserializer: _$deleteDeserializeLongTermRetentionBackups, expectedStatuses: ["200", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/privateEndpoints/{privateEndpointName}":
    {
      deserializer: _$deleteDeserializeJobPrivateEndpoints,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/privateEndpoints/{privateEndpointName}":
    {
      deserializer: _createOrUpdateDeserializeJobPrivateEndpoints,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}":
    { deserializer: _$deleteDeserializeJobAgents, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}":
    { deserializer: _updateDeserializeJobAgents, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}":
    { deserializer: _createOrUpdateDeserializeJobAgents, expectedStatuses: ["200", "201", "202"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/start":
    { deserializer: _createDeserializeJobExecutions, expectedStatuses: ["202", "200", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/executions/{jobExecutionId}":
    {
      deserializer: _createOrUpdateDeserializeJobExecutions,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/instancePools/{instancePoolName}":
    { deserializer: _$deleteDeserializeInstancePools, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/instancePools/{instancePoolName}":
    { deserializer: _updateDeserializeInstancePools, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/instancePools/{instancePoolName}":
    {
      deserializer: _createOrUpdateDeserializeInstancePools,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/instanceFailoverGroups/{failoverGroupName}/forceFailoverAllowDataLoss":
    {
      deserializer: _forceFailoverAllowDataLossDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/instanceFailoverGroups/{failoverGroupName}/failover":
    { deserializer: _failoverDeserialize, expectedStatuses: ["200", "202", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/instanceFailoverGroups/{failoverGroupName}":
    {
      deserializer: _$deleteDeserializeInstanceFailoverGroups,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/instanceFailoverGroups/{failoverGroupName}":
    {
      deserializer: _createOrUpdateDeserializeInstanceFailoverGroups,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/failoverGroups/{failoverGroupName}/tryPlannedBeforeForcedFailover":
    {
      deserializer: _tryPlannedBeforeForcedFailoverDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/failoverGroups/{failoverGroupName}/forceFailoverAllowDataLoss":
    {
      deserializer: _forceFailoverAllowDataLossDeserializeFailoverGroups,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/failoverGroups/{failoverGroupName}/failover":
    { deserializer: _failoverDeserializeFailoverGroups, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/failoverGroups/{failoverGroupName}":
    { deserializer: _$deleteDeserializeFailoverGroups, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/failoverGroups/{failoverGroupName}":
    { deserializer: _updateDeserializeFailoverGroups, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/failoverGroups/{failoverGroupName}":
    {
      deserializer: _createOrUpdateDeserializeFailoverGroups,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/encryptionProtector/{encryptionProtectorName}/revalidate":
    {
      deserializer: _revalidateDeserializeEncryptionProtectors,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/encryptionProtector/{encryptionProtectorName}":
    {
      deserializer: _createOrUpdateDeserializeEncryptionProtectors,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/elasticPools/{elasticPoolName}/failover":
    { deserializer: _failoverDeserializeElasticPools, expectedStatuses: ["200", "202", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/elasticPools/{elasticPoolName}":
    { deserializer: _$deleteDeserializeElasticPools, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/elasticPools/{elasticPoolName}":
    { deserializer: _updateDeserializeElasticPools, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/elasticPools/{elasticPoolName}":
    {
      deserializer: _createOrUpdateDeserializeElasticPools,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/validateAzureKeyVaultEncryptionKey":
    {
      deserializer: _validateAzureKeyVaultEncryptionKeyDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/stop":
    { deserializer: _stopDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/start":
    { deserializer: _startDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/refreshExternalGovernanceStatus":
    { deserializer: _refreshStatusDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/reevaluateInaccessibleDatabaseState":
    {
      deserializer: _reevaluateInaccessibleDatabaseStateDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/failover":
    { deserializer: _failoverDeserializeManagedInstances, expectedStatuses: ["200", "202", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}":
    { deserializer: _$deleteDeserializeManagedInstances, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}":
    { deserializer: _updateDeserializeManagedInstances, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}":
    {
      deserializer: _createOrUpdateDeserializeManagedInstances,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/serverTrustGroups/{serverTrustGroupName}":
    { deserializer: _$deleteDeserializeServerTrustGroups, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/serverTrustGroups/{serverTrustGroupName}":
    {
      deserializer: _createOrUpdateDeserializeServerTrustGroups,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/startMove":
    { deserializer: _startMoveDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/reevaluateInaccessibleDatabaseState":
    {
      deserializer: _reevaluateInaccessibleDatabaseStateDeserializeManagedDatabases,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/completeRestore":
    { deserializer: _completeRestoreDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/completeMove":
    { deserializer: _completeMoveDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/cancelMove":
    { deserializer: _cancelMoveDeserialize, expectedStatuses: ["200", "202", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}":
    { deserializer: _$deleteDeserializeManagedDatabases, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}":
    { deserializer: _updateDeserializeManagedDatabases, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}":
    {
      deserializer: _createOrUpdateDeserializeManagedDatabases,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/distributedAvailabilityGroups/{distributedAvailabilityGroupName}/setRole":
    { deserializer: _setRoleDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/distributedAvailabilityGroups/{distributedAvailabilityGroupName}/failover":
    {
      deserializer: _failoverDeserializeDistributedAvailabilityGroups,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/distributedAvailabilityGroups/{distributedAvailabilityGroupName}":
    {
      deserializer: _$deleteDeserializeDistributedAvailabilityGroups,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/distributedAvailabilityGroups/{distributedAvailabilityGroupName}":
    {
      deserializer: _updateDeserializeDistributedAvailabilityGroups,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/distributedAvailabilityGroups/{distributedAvailabilityGroupName}":
    {
      deserializer: _createOrUpdateDeserializeDistributedAvailabilityGroups,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/deletedServers/{deletedServerName}/recover":
    { deserializer: _recoverDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}/scans/{scanId}/initiateScan":
    {
      deserializer: _initiateScanDeserializeManagedDatabaseVulnerabilityAssessmentScans,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/extendedAuditingSettings/{blobAuditingPolicyName}":
    {
      deserializer: _createOrUpdateDeserializeExtendedServerBlobAuditingPolicies,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/auditingSettings/{blobAuditingPolicyName}":
    {
      deserializer: _createOrUpdateDeserializeServerBlobAuditingPolicies,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/refreshExternalGovernanceStatus":
    { deserializer: _refreshStatusDeserializeServers, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/import":
    { deserializer: _importDatabaseDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}":
    { deserializer: _$deleteDeserializeServers, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}":
    { deserializer: _updateDeserializeServers, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}":
    { deserializer: _createOrUpdateDeserializeServers, expectedStatuses: ["200", "201", "202"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/replicationLinks/{linkId}/forceFailoverAllowDataLoss":
    { deserializer: _failoverAllowDataLossDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/replicationLinks/{linkId}/failover":
    { deserializer: _failoverDeserializeReplicationLinks, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/replicationLinks/{linkId}":
    { deserializer: _$deleteDeserializeReplicationLinks, expectedStatuses: ["200", "202"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/replicationLinks/{linkId}":
    { deserializer: _updateDeserializeReplicationLinks, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/replicationLinks/{linkId}":
    {
      deserializer: _createOrUpdateDeserializeReplicationLinks,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/upgradeDataWarehouse":
    { deserializer: _upgradeDataWarehouseDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/resume":
    { deserializer: _resumeDeserializeDatabases, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/pause":
    { deserializer: _pauseDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/import":
    { deserializer: _$importDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/failover":
    { deserializer: _failoverDeserializeDatabases, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/export":
    { deserializer: _$exportDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}":
    { deserializer: _$deleteDeserializeDatabases, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}":
    { deserializer: _updateDeserializeDatabases, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}":
    { deserializer: _createOrUpdateDeserializeDatabases, expectedStatuses: ["200", "201", "202"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/restorePoints":
    { deserializer: _createDeserializeRestorePoints, expectedStatuses: ["200", "201", "202"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/backupShortTermRetentionPolicies/{policyName}":
    {
      deserializer: _updateDeserializeBackupShortTermRetentionPolicies,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/backupShortTermRetentionPolicies/{policyName}":
    {
      deserializer: _createOrUpdateDeserializeBackupShortTermRetentionPolicies,
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
