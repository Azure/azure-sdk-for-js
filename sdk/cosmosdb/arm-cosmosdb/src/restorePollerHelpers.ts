// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementClient } from "./cosmosDBManagementClient.js";
import { _$deleteDeserialize, _createDeserialize } from "./api/fleetspaceAccount/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeFleetspace,
  _updateDeserialize,
  _createDeserialize as _createDeserializeFleetspace,
} from "./api/fleetspace/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeFleetAnalytics } from "./api/fleetAnalytics/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeFleet } from "./api/fleet/operations.js";
import {
  _deleteMongoMIRoleAssignmentDeserialize,
  _createUpdateMongoMIRoleAssignmentDeserialize,
  _deleteMongoMIRoleDefinitionDeserialize,
  _createUpdateMongoMIRoleDefinitionDeserialize,
} from "./api/mongoMIResources/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeThroughputPoolAccount,
  _createDeserialize as _createDeserializeThroughputPoolAccount,
} from "./api/throughputPoolAccount/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeThroughputPool,
  _updateDeserialize as _updateDeserializeThroughputPool,
  _createOrUpdateDeserialize,
} from "./api/throughputPool/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeService,
  _createDeserialize as _createDeserializeService,
} from "./api/service/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeCassandraDataCenters,
  _updateDeserialize as _updateDeserializeCassandraDataCenters,
  _createUpdateDeserialize,
} from "./api/cassandraDataCenters/operations.js";
import {
  _startDeserialize,
  _deallocateDeserialize,
  _invokeCommandAsyncDeserialize,
  _invokeCommandDeserialize,
  _$deleteDeserialize as _$deleteDeserializeCassandraClusters,
  _updateDeserialize as _updateDeserializeCassandraClusters,
  _createUpdateDeserialize as _createUpdateDeserializeCassandraClusters,
} from "./api/cassandraClusters/operations.js";
import { _enableDisableDeserialize } from "./api/chaosFault/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializePrivateEndpointConnections,
  _createOrUpdateDeserialize as _createOrUpdateDeserializePrivateEndpointConnections,
} from "./api/privateEndpointConnections/operations.js";
import {
  _startDeserialize as _startDeserializeNotebookWorkspaces,
  _regenerateAuthTokenDeserialize,
  _$deleteDeserialize as _$deleteDeserializeNotebookWorkspaces,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeNotebookWorkspaces,
} from "./api/notebookWorkspaces/operations.js";
import { _reconcileDeserialize } from "./api/networkSecurityPerimeterConfigurations/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeGarnetClusters,
  _updateDeserialize as _updateDeserializeGarnetClusters,
  _createUpdateDeserialize as _createUpdateDeserializeGarnetClusters,
} from "./api/garnetClusters/operations.js";
import {
  _deleteGremlinRoleAssignmentDeserialize,
  _createUpdateGremlinRoleAssignmentDeserialize,
  _deleteGremlinRoleDefinitionDeserialize,
  _createUpdateGremlinRoleDefinitionDeserialize,
  _retrieveContinuousBackupInformationDeserialize,
  _deleteGremlinGraphDeserialize,
  _createUpdateGremlinGraphDeserialize,
  _deleteGremlinDatabaseDeserialize,
  _createUpdateGremlinDatabaseDeserialize,
  _migrateGremlinGraphToManualThroughputDeserialize,
  _migrateGremlinGraphToAutoscaleDeserialize,
  _updateGremlinGraphThroughputDeserialize,
  _migrateGremlinDatabaseToManualThroughputDeserialize,
  _migrateGremlinDatabaseToAutoscaleDeserialize,
  _updateGremlinDatabaseThroughputDeserialize,
} from "./api/gremlinResources/operations.js";
import {
  _deleteCassandraRoleAssignmentDeserialize,
  _createUpdateCassandraRoleAssignmentDeserialize,
  _deleteCassandraRoleDefinitionDeserialize,
  _createUpdateCassandraRoleDefinitionDeserialize,
  _deleteCassandraViewDeserialize,
  _createUpdateCassandraViewDeserialize,
  _deleteCassandraTableDeserialize,
  _createUpdateCassandraTableDeserialize,
  _deleteCassandraKeyspaceDeserialize,
  _createUpdateCassandraKeyspaceDeserialize,
  _migrateCassandraViewToManualThroughputDeserialize,
  _migrateCassandraViewToAutoscaleDeserialize,
  _updateCassandraViewThroughputDeserialize,
  _migrateCassandraTableToManualThroughputDeserialize,
  _migrateCassandraTableToAutoscaleDeserialize,
  _updateCassandraTableThroughputDeserialize,
  _migrateCassandraKeyspaceToManualThroughputDeserialize,
  _migrateCassandraKeyspaceToAutoscaleDeserialize,
  _updateCassandraKeyspaceThroughputDeserialize,
} from "./api/cassandraResources/operations.js";
import {
  _deleteTableRoleAssignmentDeserialize,
  _createUpdateTableRoleAssignmentDeserialize,
  _deleteTableRoleDefinitionDeserialize,
  _createUpdateTableRoleDefinitionDeserialize,
  _retrieveContinuousBackupInformationDeserialize as _retrieveContinuousBackupInformationDeserializeTableResources,
  _deleteTableDeserialize,
  _createUpdateTableDeserialize,
  _migrateTableToManualThroughputDeserialize,
  _migrateTableToAutoscaleDeserialize,
  _updateTableThroughputDeserialize,
} from "./api/tableResources/operations.js";
import {
  _deleteMongoUserDefinitionDeserialize,
  _createUpdateMongoUserDefinitionDeserialize,
  _deleteMongoRoleDefinitionDeserialize,
  _createUpdateMongoRoleDefinitionDeserialize,
  _retrieveContinuousBackupInformationDeserialize as _retrieveContinuousBackupInformationDeserializeMongoDBResources,
  _listMongoDBCollectionPartitionMergeDeserialize,
  _deleteMongoDBCollectionDeserialize,
  _createUpdateMongoDBCollectionDeserialize,
  _mongoDBDatabasePartitionMergeDeserialize,
  _deleteMongoDBDatabaseDeserialize,
  _createUpdateMongoDBDatabaseDeserialize,
  _migrateMongoDBCollectionToManualThroughputDeserialize,
  _migrateMongoDBCollectionToAutoscaleDeserialize,
  _mongoDBContainerRedistributeThroughputDeserialize,
  _mongoDBContainerRetrieveThroughputDistributionDeserialize,
  _updateMongoDBCollectionThroughputDeserialize,
  _mongoDBDatabaseRedistributeThroughputDeserialize,
  _mongoDBDatabaseRetrieveThroughputDistributionDeserialize,
  _migrateMongoDBDatabaseToManualThroughputDeserialize,
  _migrateMongoDBDatabaseToAutoscaleDeserialize,
  _updateMongoDBDatabaseThroughputDeserialize,
} from "./api/mongoDBResources/operations.js";
import {
  _deleteSqlRoleAssignmentDeserialize,
  _createUpdateSqlRoleAssignmentDeserialize,
  _deleteSqlRoleDefinitionDeserialize,
  _createUpdateSqlRoleDefinitionDeserialize,
  _deleteSqlTriggerDeserialize,
  _createUpdateSqlTriggerDeserialize,
  _deleteSqlUserDefinedFunctionDeserialize,
  _createUpdateSqlUserDefinedFunctionDeserialize,
  _deleteSqlStoredProcedureDeserialize,
  _createUpdateSqlStoredProcedureDeserialize,
  _retrieveContinuousBackupInformationDeserialize as _retrieveContinuousBackupInformationDeserializeSqlResources,
  _listSqlContainerPartitionMergeDeserialize,
  _deleteSqlContainerDeserialize,
  _createUpdateSqlContainerDeserialize,
  _createUpdateClientEncryptionKeyDeserialize,
  _sqlContainerRedistributeThroughputDeserialize,
  _sqlContainerRetrieveThroughputDistributionDeserialize,
  _migrateSqlContainerToManualThroughputDeserialize,
  _migrateSqlContainerToAutoscaleDeserialize,
  _updateSqlContainerThroughputDeserialize,
  _sqlDatabaseRedistributeThroughputDeserialize,
  _sqlDatabaseRetrieveThroughputDistributionDeserialize,
  _migrateSqlDatabaseToManualThroughputDeserialize,
  _migrateSqlDatabaseToAutoscaleDeserialize,
  _updateSqlDatabaseThroughputDeserialize,
  _sqlDatabasePartitionMergeDeserialize,
  _deleteSqlDatabaseDeserialize,
  _createUpdateSqlDatabaseDeserialize,
} from "./api/sqlResources/operations.js";
import {
  _deleteGraphResourceDeserialize,
  _createUpdateGraphDeserialize,
} from "./api/graphResources/operations.js";
import {
  _regenerateKeyDeserialize,
  _onlineRegionDeserialize,
  _offlineRegionDeserialize,
  _failoverPriorityChangeDeserialize,
  _$deleteDeserialize as _$deleteDeserializeDatabaseAccounts,
  _updateDeserialize as _updateDeserializeDatabaseAccounts,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeDatabaseAccounts,
} from "./api/databaseAccounts/operations.js";
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
  client: CosmosDBManagementClient,
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
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/fleets/{fleetName}/fleetspaces/{fleetspaceName}/fleetspaceAccounts/{fleetspaceAccountName}":
    { deserializer: _$deleteDeserialize, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/fleets/{fleetName}/fleetspaces/{fleetspaceName}/fleetspaceAccounts/{fleetspaceAccountName}":
    { deserializer: _createDeserialize, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/fleets/{fleetName}/fleetspaces/{fleetspaceName}":
    { deserializer: _$deleteDeserializeFleetspace, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/fleets/{fleetName}/fleetspaces/{fleetspaceName}":
    { deserializer: _updateDeserialize, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/fleets/{fleetName}/fleetspaces/{fleetspaceName}":
    { deserializer: _createDeserializeFleetspace, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/fleets/{fleetName}/fleetAnalytics/{fleetAnalyticsName}":
    { deserializer: _$deleteDeserializeFleetAnalytics, expectedStatuses: ["202", "204", "200"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/fleets/{fleetName}":
    { deserializer: _$deleteDeserializeFleet, expectedStatuses: ["202", "204", "200"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongoMIRoleAssignments/{roleAssignmentId}":
    {
      deserializer: _deleteMongoMIRoleAssignmentDeserialize,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongoMIRoleAssignments/{roleAssignmentId}":
    {
      deserializer: _createUpdateMongoMIRoleAssignmentDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongoMIRoleDefinitions/{roleDefinitionId}":
    {
      deserializer: _deleteMongoMIRoleDefinitionDeserialize,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongoMIRoleDefinitions/{roleDefinitionId}":
    {
      deserializer: _createUpdateMongoMIRoleDefinitionDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/throughputPools/{throughputPoolName}/throughputPoolAccounts/{throughputPoolAccountName}":
    {
      deserializer: _$deleteDeserializeThroughputPoolAccount,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/throughputPools/{throughputPoolName}/throughputPoolAccounts/{throughputPoolAccountName}":
    {
      deserializer: _createDeserializeThroughputPoolAccount,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/throughputPools/{throughputPoolName}":
    { deserializer: _$deleteDeserializeThroughputPool, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/throughputPools/{throughputPoolName}":
    { deserializer: _updateDeserializeThroughputPool, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/throughputPools/{throughputPoolName}":
    { deserializer: _createOrUpdateDeserialize, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/services/{serviceName}":
    { deserializer: _$deleteDeserializeService, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/services/{serviceName}":
    { deserializer: _createDeserializeService, expectedStatuses: ["200", "202", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}/dataCenters/{dataCenterName}":
    {
      deserializer: _$deleteDeserializeCassandraDataCenters,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}/dataCenters/{dataCenterName}":
    {
      deserializer: _updateDeserializeCassandraDataCenters,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}/dataCenters/{dataCenterName}":
    { deserializer: _createUpdateDeserialize, expectedStatuses: ["200", "201", "202"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}/start":
    { deserializer: _startDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}/deallocate":
    { deserializer: _deallocateDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}/invokeCommandAsync":
    { deserializer: _invokeCommandAsyncDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}/invokeCommand":
    { deserializer: _invokeCommandDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}":
    { deserializer: _$deleteDeserializeCassandraClusters, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}":
    { deserializer: _updateDeserializeCassandraClusters, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}":
    {
      deserializer: _createUpdateDeserializeCassandraClusters,
      expectedStatuses: ["200", "201", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/chaosFaults/{chaosFault}":
    { deserializer: _enableDisableDeserialize, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/privateEndpointConnections/{privateEndpointConnectionName}":
    {
      deserializer: _$deleteDeserializePrivateEndpointConnections,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/privateEndpointConnections/{privateEndpointConnectionName}":
    {
      deserializer: _createOrUpdateDeserializePrivateEndpointConnections,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/notebookWorkspaces/{notebookWorkspaceName}/start":
    { deserializer: _startDeserializeNotebookWorkspaces, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/notebookWorkspaces/{notebookWorkspaceName}/regenerateAuthToken":
    { deserializer: _regenerateAuthTokenDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/notebookWorkspaces/{notebookWorkspaceName}":
    {
      deserializer: _$deleteDeserializeNotebookWorkspaces,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/notebookWorkspaces/{notebookWorkspaceName}":
    {
      deserializer: _createOrUpdateDeserializeNotebookWorkspaces,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/networkSecurityPerimeterConfigurations/{networkSecurityPerimeterConfigurationName}/reconcile":
    { deserializer: _reconcileDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/garnetClusters/{clusterName}":
    { deserializer: _$deleteDeserializeGarnetClusters, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/garnetClusters/{clusterName}":
    { deserializer: _updateDeserializeGarnetClusters, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/garnetClusters/{clusterName}":
    {
      deserializer: _createUpdateDeserializeGarnetClusters,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinRoleAssignments/{roleAssignmentId}":
    {
      deserializer: _deleteGremlinRoleAssignmentDeserialize,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinRoleAssignments/{roleAssignmentId}":
    {
      deserializer: _createUpdateGremlinRoleAssignmentDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinRoleDefinitions/{roleDefinitionId}":
    {
      deserializer: _deleteGremlinRoleDefinitionDeserialize,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinRoleDefinitions/{roleDefinitionId}":
    {
      deserializer: _createUpdateGremlinRoleDefinitionDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/graphs/{graphName}/retrieveContinuousBackupInformation":
    {
      deserializer: _retrieveContinuousBackupInformationDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/graphs/{graphName}":
    { deserializer: _deleteGremlinGraphDeserialize, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/graphs/{graphName}":
    { deserializer: _createUpdateGremlinGraphDeserialize, expectedStatuses: ["200", "202", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}":
    { deserializer: _deleteGremlinDatabaseDeserialize, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}":
    {
      deserializer: _createUpdateGremlinDatabaseDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/graphs/{graphName}/throughputSettings/default/migrateToManualThroughput":
    {
      deserializer: _migrateGremlinGraphToManualThroughputDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/graphs/{graphName}/throughputSettings/default/migrateToAutoscale":
    {
      deserializer: _migrateGremlinGraphToAutoscaleDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/graphs/{graphName}/throughputSettings/default":
    {
      deserializer: _updateGremlinGraphThroughputDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/throughputSettings/default/migrateToManualThroughput":
    {
      deserializer: _migrateGremlinDatabaseToManualThroughputDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/throughputSettings/default/migrateToAutoscale":
    {
      deserializer: _migrateGremlinDatabaseToAutoscaleDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/throughputSettings/default":
    {
      deserializer: _updateGremlinDatabaseThroughputDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraRoleAssignments/{roleAssignmentId}":
    {
      deserializer: _deleteCassandraRoleAssignmentDeserialize,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraRoleAssignments/{roleAssignmentId}":
    {
      deserializer: _createUpdateCassandraRoleAssignmentDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraRoleDefinitions/{roleDefinitionId}":
    {
      deserializer: _deleteCassandraRoleDefinitionDeserialize,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraRoleDefinitions/{roleDefinitionId}":
    {
      deserializer: _createUpdateCassandraRoleDefinitionDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/views/{viewName}":
    { deserializer: _deleteCassandraViewDeserialize, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/views/{viewName}":
    {
      deserializer: _createUpdateCassandraViewDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/tables/{tableName}":
    { deserializer: _deleteCassandraTableDeserialize, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/tables/{tableName}":
    {
      deserializer: _createUpdateCassandraTableDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}":
    { deserializer: _deleteCassandraKeyspaceDeserialize, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}":
    {
      deserializer: _createUpdateCassandraKeyspaceDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/views/{viewName}/throughputSettings/default/migrateToManualThroughput":
    {
      deserializer: _migrateCassandraViewToManualThroughputDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/views/{viewName}/throughputSettings/default/migrateToAutoscale":
    {
      deserializer: _migrateCassandraViewToAutoscaleDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/views/{viewName}/throughputSettings/default":
    {
      deserializer: _updateCassandraViewThroughputDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/tables/{tableName}/throughputSettings/default/migrateToManualThroughput":
    {
      deserializer: _migrateCassandraTableToManualThroughputDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/tables/{tableName}/throughputSettings/default/migrateToAutoscale":
    {
      deserializer: _migrateCassandraTableToAutoscaleDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/tables/{tableName}/throughputSettings/default":
    {
      deserializer: _updateCassandraTableThroughputDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/throughputSettings/default/migrateToManualThroughput":
    {
      deserializer: _migrateCassandraKeyspaceToManualThroughputDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/throughputSettings/default/migrateToAutoscale":
    {
      deserializer: _migrateCassandraKeyspaceToAutoscaleDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/throughputSettings/default":
    {
      deserializer: _updateCassandraKeyspaceThroughputDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tableRoleAssignments/{roleAssignmentId}":
    {
      deserializer: _deleteTableRoleAssignmentDeserialize,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tableRoleAssignments/{roleAssignmentId}":
    {
      deserializer: _createUpdateTableRoleAssignmentDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tableRoleDefinitions/{roleDefinitionId}":
    {
      deserializer: _deleteTableRoleDefinitionDeserialize,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tableRoleDefinitions/{roleDefinitionId}":
    {
      deserializer: _createUpdateTableRoleDefinitionDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tables/{tableName}/retrieveContinuousBackupInformation":
    {
      deserializer: _retrieveContinuousBackupInformationDeserializeTableResources,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tables/{tableName}":
    { deserializer: _deleteTableDeserialize, expectedStatuses: ["204", "202", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tables/{tableName}":
    { deserializer: _createUpdateTableDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tables/{tableName}/throughputSettings/default/migrateToManualThroughput":
    {
      deserializer: _migrateTableToManualThroughputDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tables/{tableName}/throughputSettings/default/migrateToAutoscale":
    { deserializer: _migrateTableToAutoscaleDeserialize, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tables/{tableName}/throughputSettings/default":
    { deserializer: _updateTableThroughputDeserialize, expectedStatuses: ["200", "202", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbUserDefinitions/{mongoUserDefinitionId}":
    {
      deserializer: _deleteMongoUserDefinitionDeserialize,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbUserDefinitions/{mongoUserDefinitionId}":
    {
      deserializer: _createUpdateMongoUserDefinitionDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbRoleDefinitions/{mongoRoleDefinitionId}":
    {
      deserializer: _deleteMongoRoleDefinitionDeserialize,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbRoleDefinitions/{mongoRoleDefinitionId}":
    {
      deserializer: _createUpdateMongoRoleDefinitionDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections/{collectionName}/retrieveContinuousBackupInformation":
    {
      deserializer: _retrieveContinuousBackupInformationDeserializeMongoDBResources,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections/{collectionName}/partitionMerge":
    {
      deserializer: _listMongoDBCollectionPartitionMergeDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections/{collectionName}":
    { deserializer: _deleteMongoDBCollectionDeserialize, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections/{collectionName}":
    {
      deserializer: _createUpdateMongoDBCollectionDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/partitionMerge":
    {
      deserializer: _mongoDBDatabasePartitionMergeDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}":
    { deserializer: _deleteMongoDBDatabaseDeserialize, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}":
    {
      deserializer: _createUpdateMongoDBDatabaseDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections/{collectionName}/throughputSettings/default/migrateToManualThroughput":
    {
      deserializer: _migrateMongoDBCollectionToManualThroughputDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections/{collectionName}/throughputSettings/default/migrateToAutoscale":
    {
      deserializer: _migrateMongoDBCollectionToAutoscaleDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections/{collectionName}/throughputSettings/default/redistributeThroughput":
    {
      deserializer: _mongoDBContainerRedistributeThroughputDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections/{collectionName}/throughputSettings/default/retrieveThroughputDistribution":
    {
      deserializer: _mongoDBContainerRetrieveThroughputDistributionDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections/{collectionName}/throughputSettings/default":
    {
      deserializer: _updateMongoDBCollectionThroughputDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/throughputSettings/default/redistributeThroughput":
    {
      deserializer: _mongoDBDatabaseRedistributeThroughputDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/throughputSettings/default/retrieveThroughputDistribution":
    {
      deserializer: _mongoDBDatabaseRetrieveThroughputDistributionDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/throughputSettings/default/migrateToManualThroughput":
    {
      deserializer: _migrateMongoDBDatabaseToManualThroughputDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/throughputSettings/default/migrateToAutoscale":
    {
      deserializer: _migrateMongoDBDatabaseToAutoscaleDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/throughputSettings/default":
    {
      deserializer: _updateMongoDBDatabaseThroughputDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlRoleAssignments/{roleAssignmentId}":
    { deserializer: _deleteSqlRoleAssignmentDeserialize, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlRoleAssignments/{roleAssignmentId}":
    {
      deserializer: _createUpdateSqlRoleAssignmentDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlRoleDefinitions/{roleDefinitionId}":
    { deserializer: _deleteSqlRoleDefinitionDeserialize, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlRoleDefinitions/{roleDefinitionId}":
    {
      deserializer: _createUpdateSqlRoleDefinitionDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/triggers/{triggerName}":
    { deserializer: _deleteSqlTriggerDeserialize, expectedStatuses: ["204", "202", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/triggers/{triggerName}":
    { deserializer: _createUpdateSqlTriggerDeserialize, expectedStatuses: ["200", "202", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/userDefinedFunctions/{userDefinedFunctionName}":
    {
      deserializer: _deleteSqlUserDefinedFunctionDeserialize,
      expectedStatuses: ["204", "202", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/userDefinedFunctions/{userDefinedFunctionName}":
    {
      deserializer: _createUpdateSqlUserDefinedFunctionDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/storedProcedures/{storedProcedureName}":
    { deserializer: _deleteSqlStoredProcedureDeserialize, expectedStatuses: ["204", "202", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/storedProcedures/{storedProcedureName}":
    {
      deserializer: _createUpdateSqlStoredProcedureDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/retrieveContinuousBackupInformation":
    {
      deserializer: _retrieveContinuousBackupInformationDeserializeSqlResources,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/partitionMerge":
    {
      deserializer: _listSqlContainerPartitionMergeDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}":
    { deserializer: _deleteSqlContainerDeserialize, expectedStatuses: ["204", "202", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}":
    { deserializer: _createUpdateSqlContainerDeserialize, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/clientEncryptionKeys/{clientEncryptionKeyName}":
    {
      deserializer: _createUpdateClientEncryptionKeyDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/throughputSettings/default/redistributeThroughput":
    {
      deserializer: _sqlContainerRedistributeThroughputDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/throughputSettings/default/retrieveThroughputDistribution":
    {
      deserializer: _sqlContainerRetrieveThroughputDistributionDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/throughputSettings/default/migrateToManualThroughput":
    {
      deserializer: _migrateSqlContainerToManualThroughputDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/throughputSettings/default/migrateToAutoscale":
    {
      deserializer: _migrateSqlContainerToAutoscaleDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/throughputSettings/default":
    {
      deserializer: _updateSqlContainerThroughputDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/throughputSettings/default/redistributeThroughput":
    {
      deserializer: _sqlDatabaseRedistributeThroughputDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/throughputSettings/default/retrieveThroughputDistribution":
    {
      deserializer: _sqlDatabaseRetrieveThroughputDistributionDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/throughputSettings/default/migrateToManualThroughput":
    {
      deserializer: _migrateSqlDatabaseToManualThroughputDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/throughputSettings/default/migrateToAutoscale":
    {
      deserializer: _migrateSqlDatabaseToAutoscaleDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/throughputSettings/default":
    {
      deserializer: _updateSqlDatabaseThroughputDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/partitionMerge":
    {
      deserializer: _sqlDatabasePartitionMergeDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}":
    { deserializer: _deleteSqlDatabaseDeserialize, expectedStatuses: ["204", "202", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}":
    { deserializer: _createUpdateSqlDatabaseDeserialize, expectedStatuses: ["200", "202", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/graphs/{graphName}":
    { deserializer: _deleteGraphResourceDeserialize, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/graphs/{graphName}":
    { deserializer: _createUpdateGraphDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/regenerateKey":
    { deserializer: _regenerateKeyDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/onlineRegion":
    { deserializer: _onlineRegionDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/offlineRegion":
    { deserializer: _offlineRegionDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/failoverPriorityChange":
    {
      deserializer: _failoverPriorityChangeDeserialize,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}":
    { deserializer: _$deleteDeserializeDatabaseAccounts, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}":
    { deserializer: _updateDeserializeDatabaseAccounts, expectedStatuses: ["200", "201", "202"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}":
    {
      deserializer: _createOrUpdateDeserializeDatabaseAccounts,
      expectedStatuses: ["200", "201", "202"],
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
