// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementClient } from "./netAppManagementClient.js";
import { _updateNetworkSiblingSetDeserialize } from "./api/netAppResource/operations.js";
import {
  _getMetadataDeserialize,
  _$deleteDeserialize,
  _updateDeserialize,
  _createDeserialize,
} from "./api/subvolumes/operations.js";
import { _migrateBackupsDeserialize } from "./api/backupsUnderVolume/operations.js";
import { _restoreFilesDeserialize } from "./api/backupsUnderBackupVault/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializePools,
  _updateDeserialize as _updateDeserializePools,
  _createOrUpdateDeserialize,
} from "./api/pools/operations.js";
import { _migrateBackupsDeserialize as _migrateBackupsDeserializeBackupsUnderAccount } from "./api/backupsUnderAccount/operations.js";
import {
  _changeKeyVaultDeserialize,
  _getChangeKeyVaultInformationDeserialize,
  _transitionToCmkDeserialize,
  _renewCredentialsDeserialize,
  _$deleteDeserialize as _$deleteDeserializeAccounts,
  _updateDeserialize as _updateDeserializeAccounts,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeAccounts,
} from "./api/accounts/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeActiveDirectoryConfigs,
  _updateDeserialize as _updateDeserializeActiveDirectoryConfigs,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeActiveDirectoryConfigs,
} from "./api/activeDirectoryConfigs/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeElasticBackups,
  _updateDeserialize as _updateDeserializeElasticBackups,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeElasticBackups,
} from "./api/elasticBackups/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeElasticBackupPolicies,
  _updateDeserialize as _updateDeserializeElasticBackupPolicies,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeElasticBackupPolicies,
} from "./api/elasticBackupPolicies/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeElasticBackupVaults,
  _updateDeserialize as _updateDeserializeElasticBackupVaults,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeElasticBackupVaults,
} from "./api/elasticBackupVaults/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeElasticSnapshotPolicies,
  _updateDeserialize as _updateDeserializeElasticSnapshotPolicies,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeElasticSnapshotPolicies,
} from "./api/elasticSnapshotPolicies/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeElasticSnapshots,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeElasticSnapshots,
} from "./api/elasticSnapshots/operations.js";
import {
  _revertDeserialize,
  _$deleteDeserialize as _$deleteDeserializeElasticVolumes,
  _updateDeserialize as _updateDeserializeElasticVolumes,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeElasticVolumes,
} from "./api/elasticVolumes/operations.js";
import {
  _changeZoneDeserialize,
  _$deleteDeserialize as _$deleteDeserializeElasticCapacityPools,
  _updateDeserialize as _updateDeserializeElasticCapacityPools,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeElasticCapacityPools,
} from "./api/elasticCapacityPools/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeElasticAccounts,
  _updateDeserialize as _updateDeserializeElasticAccounts,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeElasticAccounts,
} from "./api/elasticAccounts/operations.js";
import {
  _poolChangeDeserialize,
  _$deleteDeserialize as _$deleteDeserializeCaches,
  _updateDeserialize as _updateDeserializeCaches,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeCaches,
} from "./api/caches/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeBuckets,
  _updateDeserialize as _updateDeserializeBuckets,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeBuckets,
} from "./api/buckets/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeBackupVaults,
  _updateDeserialize as _updateDeserializeBackupVaults,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeBackupVaults,
} from "./api/backupVaults/operations.js";
import { _clearSuspectsDeserialize } from "./api/ransomwareReports/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeVolumeQuotaRules,
  _updateDeserialize as _updateDeserializeVolumeQuotaRules,
  _createDeserialize as _createDeserializeVolumeQuotaRules,
} from "./api/volumeQuotaRules/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeBackupPolicies,
  _updateDeserialize as _updateDeserializeBackupPolicies,
  _createDeserialize as _createDeserializeBackupPolicies,
} from "./api/backupPolicies/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeSnapshotPolicies,
  _updateDeserialize as _updateDeserializeSnapshotPolicies,
} from "./api/snapshotPolicies/operations.js";
import {
  _restoreFilesDeserialize as _restoreFilesDeserializeSnapshots,
  _$deleteDeserialize as _$deleteDeserializeSnapshots,
  _updateDeserialize as _updateDeserializeSnapshots,
  _createDeserialize as _createDeserializeSnapshots,
} from "./api/snapshots/operations.js";
import {
  _listQuotaReportDeserialize,
  _revertRelocationDeserialize,
  _finalizeRelocationDeserialize,
  _relocateDeserialize,
  _poolChangeDeserialize as _poolChangeDeserializeVolumes,
  _performReplicationTransferDeserialize,
  _finalizeExternalReplicationDeserialize,
  _authorizeExternalReplicationDeserialize,
  _peerExternalClusterDeserialize,
  _reInitializeReplicationDeserialize,
  _authorizeReplicationDeserialize,
  _deleteReplicationDeserialize,
  _resyncReplicationDeserialize,
  _reestablishReplicationDeserialize,
  _breakReplicationDeserialize,
  _listGetGroupIdListForLdapUserDeserialize,
  _breakFileLocksDeserialize,
  _splitCloneFromParentDeserialize,
  _resetCifsPasswordDeserialize,
  _revertDeserialize as _revertDeserializeVolumes,
  _populateAvailabilityZoneDeserialize,
  _$deleteDeserialize as _$deleteDeserializeVolumes,
  _updateDeserialize as _updateDeserializeVolumes,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVolumes,
} from "./api/volumes/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeBackups,
  _updateDeserialize as _updateDeserializeBackups,
  _createDeserialize as _createDeserializeBackups,
} from "./api/backups/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeVolumeGroups,
  _createDeserialize as _createDeserializeVolumeGroups,
} from "./api/volumeGroups/operations.js";
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
  client: NetAppManagementClient,
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
    },
  );
}

interface DeserializationHelper {
  deserializer: (result: PathUncheckedResponse) => Promise<any>;
  expectedStatuses: string[];
}

const deserializeMap: Record<string, DeserializationHelper> = {
  "POST /subscriptions/{subscriptionId}/providers/Microsoft.NetApp/locations/{location}/updateNetworkSiblingSet":
    {
      deserializer: _updateNetworkSiblingSetDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/subvolumes/{subvolumeName}/getMetadata":
    {
      deserializer: _getMetadataDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/subvolumes/{subvolumeName}":
    {
      deserializer: _$deleteDeserialize,
      expectedStatuses: ["200", "202", "204", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/subvolumes/{subvolumeName}":
    {
      deserializer: _updateDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/subvolumes/{subvolumeName}":
    {
      deserializer: _createDeserialize,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/migrateBackups":
    {
      deserializer: _migrateBackupsDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupVaults/{backupVaultName}/backups/{backupName}/restoreFiles":
    {
      deserializer: _restoreFilesDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}":
    {
      deserializer: _$deleteDeserializePools,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}":
    {
      deserializer: _updateDeserializePools,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}":
    {
      deserializer: _createOrUpdateDeserialize,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/migrateBackups":
    {
      deserializer: _migrateBackupsDeserializeBackupsUnderAccount,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/changeKeyVault":
    {
      deserializer: _changeKeyVaultDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/getKeyVaultStatus":
    {
      deserializer: _getChangeKeyVaultInformationDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/transitiontocmk":
    {
      deserializer: _transitionToCmkDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/renewCredentials":
    {
      deserializer: _renewCredentialsDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}":
    {
      deserializer: _$deleteDeserializeAccounts,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}":
    {
      deserializer: _updateDeserializeAccounts,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}":
    {
      deserializer: _createOrUpdateDeserializeAccounts,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/activeDirectoryConfigs/{activeDirectoryConfigName}":
    {
      deserializer: _$deleteDeserializeActiveDirectoryConfigs,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/activeDirectoryConfigs/{activeDirectoryConfigName}":
    {
      deserializer: _updateDeserializeActiveDirectoryConfigs,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/activeDirectoryConfigs/{activeDirectoryConfigName}":
    {
      deserializer: _createOrUpdateDeserializeActiveDirectoryConfigs,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticBackupVaults/{backupVaultName}/elasticBackups/{backupName}":
    {
      deserializer: _$deleteDeserializeElasticBackups,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticBackupVaults/{backupVaultName}/elasticBackups/{backupName}":
    {
      deserializer: _updateDeserializeElasticBackups,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticBackupVaults/{backupVaultName}/elasticBackups/{backupName}":
    {
      deserializer: _createOrUpdateDeserializeElasticBackups,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticBackupPolicies/{backupPolicyName}":
    {
      deserializer: _$deleteDeserializeElasticBackupPolicies,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticBackupPolicies/{backupPolicyName}":
    {
      deserializer: _updateDeserializeElasticBackupPolicies,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticBackupPolicies/{backupPolicyName}":
    {
      deserializer: _createOrUpdateDeserializeElasticBackupPolicies,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticBackupVaults/{backupVaultName}":
    {
      deserializer: _$deleteDeserializeElasticBackupVaults,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticBackupVaults/{backupVaultName}":
    {
      deserializer: _updateDeserializeElasticBackupVaults,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticBackupVaults/{backupVaultName}":
    {
      deserializer: _createOrUpdateDeserializeElasticBackupVaults,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticSnapshotPolicies/{snapshotPolicyName}":
    {
      deserializer: _$deleteDeserializeElasticSnapshotPolicies,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticSnapshotPolicies/{snapshotPolicyName}":
    {
      deserializer: _updateDeserializeElasticSnapshotPolicies,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticSnapshotPolicies/{snapshotPolicyName}":
    {
      deserializer: _createOrUpdateDeserializeElasticSnapshotPolicies,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticCapacityPools/{poolName}/elasticVolumes/{volumeName}/elasticSnapshots/{snapshotName}":
    {
      deserializer: _$deleteDeserializeElasticSnapshots,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticCapacityPools/{poolName}/elasticVolumes/{volumeName}/elasticSnapshots/{snapshotName}":
    {
      deserializer: _createOrUpdateDeserializeElasticSnapshots,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticCapacityPools/{poolName}/elasticVolumes/{volumeName}/revert":
    {
      deserializer: _revertDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticCapacityPools/{poolName}/elasticVolumes/{volumeName}":
    {
      deserializer: _$deleteDeserializeElasticVolumes,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticCapacityPools/{poolName}/elasticVolumes/{volumeName}":
    {
      deserializer: _updateDeserializeElasticVolumes,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticCapacityPools/{poolName}/elasticVolumes/{volumeName}":
    {
      deserializer: _createOrUpdateDeserializeElasticVolumes,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticCapacityPools/{poolName}/changeZone":
    {
      deserializer: _changeZoneDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticCapacityPools/{poolName}":
    {
      deserializer: _$deleteDeserializeElasticCapacityPools,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticCapacityPools/{poolName}":
    {
      deserializer: _updateDeserializeElasticCapacityPools,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticCapacityPools/{poolName}":
    {
      deserializer: _createOrUpdateDeserializeElasticCapacityPools,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}":
    {
      deserializer: _$deleteDeserializeElasticAccounts,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}":
    {
      deserializer: _updateDeserializeElasticAccounts,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}":
    {
      deserializer: _createOrUpdateDeserializeElasticAccounts,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/caches/{cacheName}/poolChange":
    {
      deserializer: _poolChangeDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/caches/{cacheName}":
    {
      deserializer: _$deleteDeserializeCaches,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/caches/{cacheName}":
    {
      deserializer: _updateDeserializeCaches,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/caches/{cacheName}":
    {
      deserializer: _createOrUpdateDeserializeCaches,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/buckets/{bucketName}":
    {
      deserializer: _$deleteDeserializeBuckets,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/buckets/{bucketName}":
    {
      deserializer: _updateDeserializeBuckets,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/buckets/{bucketName}":
    {
      deserializer: _createOrUpdateDeserializeBuckets,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupVaults/{backupVaultName}":
    {
      deserializer: _$deleteDeserializeBackupVaults,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupVaults/{backupVaultName}":
    {
      deserializer: _updateDeserializeBackupVaults,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupVaults/{backupVaultName}":
    {
      deserializer: _createOrUpdateDeserializeBackupVaults,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/ransomwareReports/{ransomwareReportName}/clearSuspects":
    {
      deserializer: _clearSuspectsDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/volumeQuotaRules/{volumeQuotaRuleName}":
    {
      deserializer: _$deleteDeserializeVolumeQuotaRules,
      expectedStatuses: ["200", "202", "204", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/volumeQuotaRules/{volumeQuotaRuleName}":
    {
      deserializer: _updateDeserializeVolumeQuotaRules,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/volumeQuotaRules/{volumeQuotaRuleName}":
    {
      deserializer: _createDeserializeVolumeQuotaRules,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupPolicies/{backupPolicyName}":
    {
      deserializer: _$deleteDeserializeBackupPolicies,
      expectedStatuses: ["200", "202", "204", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupPolicies/{backupPolicyName}":
    {
      deserializer: _updateDeserializeBackupPolicies,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupPolicies/{backupPolicyName}":
    {
      deserializer: _createDeserializeBackupPolicies,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/snapshotPolicies/{snapshotPolicyName}":
    {
      deserializer: _$deleteDeserializeSnapshotPolicies,
      expectedStatuses: ["200", "202", "204", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/snapshotPolicies/{snapshotPolicyName}":
    {
      deserializer: _updateDeserializeSnapshotPolicies,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/snapshots/{snapshotName}/restoreFiles":
    {
      deserializer: _restoreFilesDeserializeSnapshots,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/snapshots/{snapshotName}":
    {
      deserializer: _$deleteDeserializeSnapshots,
      expectedStatuses: ["200", "202", "204", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/snapshots/{snapshotName}":
    {
      deserializer: _updateDeserializeSnapshots,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/snapshots/{snapshotName}":
    {
      deserializer: _createDeserializeSnapshots,
      expectedStatuses: ["201", "202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/listQuotaReport":
    {
      deserializer: _listQuotaReportDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/revertRelocation":
    {
      deserializer: _revertRelocationDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/finalizeRelocation":
    {
      deserializer: _finalizeRelocationDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/relocate":
    {
      deserializer: _relocateDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/poolChange":
    {
      deserializer: _poolChangeDeserializeVolumes,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/performReplicationTransfer":
    {
      deserializer: _performReplicationTransferDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/finalizeExternalReplication":
    {
      deserializer: _finalizeExternalReplicationDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/authorizeExternalReplication":
    {
      deserializer: _authorizeExternalReplicationDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/peerExternalCluster":
    {
      deserializer: _peerExternalClusterDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/reinitializeReplication":
    {
      deserializer: _reInitializeReplicationDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/authorizeReplication":
    {
      deserializer: _authorizeReplicationDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/deleteReplication":
    {
      deserializer: _deleteReplicationDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/resyncReplication":
    {
      deserializer: _resyncReplicationDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/reestablishReplication":
    {
      deserializer: _reestablishReplicationDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/breakReplication":
    {
      deserializer: _breakReplicationDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/getGroupIdListForLdapUser":
    {
      deserializer: _listGetGroupIdListForLdapUserDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/breakFileLocks":
    {
      deserializer: _breakFileLocksDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/splitCloneFromParent":
    {
      deserializer: _splitCloneFromParentDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/resetCifsPassword":
    {
      deserializer: _resetCifsPasswordDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/revert":
    {
      deserializer: _revertDeserializeVolumes,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/populateAvailabilityZone":
    {
      deserializer: _populateAvailabilityZoneDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}":
    {
      deserializer: _$deleteDeserializeVolumes,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}":
    {
      deserializer: _updateDeserializeVolumes,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}":
    {
      deserializer: _createOrUpdateDeserializeVolumes,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupVaults/{backupVaultName}/backups/{backupName}":
    {
      deserializer: _$deleteDeserializeBackups,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupVaults/{backupVaultName}/backups/{backupName}":
    {
      deserializer: _updateDeserializeBackups,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupVaults/{backupVaultName}/backups/{backupName}":
    {
      deserializer: _createDeserializeBackups,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/volumeGroups/{volumeGroupName}":
    {
      deserializer: _$deleteDeserializeVolumeGroups,
      expectedStatuses: ["200", "202", "204", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/volumeGroups/{volumeGroupName}":
    {
      deserializer: _createDeserializeVolumeGroups,
      expectedStatuses: ["201", "200", "202"],
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
