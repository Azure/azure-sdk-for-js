// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "./oracleDatabaseManagementClient.js";
import {
  _$deleteDeserialize,
  _updateDeserialize,
  _createDeserialize,
} from "./api/exascaleDbStorageVaults/operations.js";
import { _actionDeserialize } from "./api/exascaleDbNodes/operations.js";
import {
  _removeVmsDeserialize,
  _$deleteDeserialize as _$deleteDeserializeExadbVmClusters,
  _updateDeserialize as _updateDeserializeExadbVmClusters,
  _createOrUpdateDeserialize,
} from "./api/exadbVmClusters/operations.js";
import {
  _updateDeserialize as _updateDeserializeAutonomousDatabaseBackups,
  _$deleteDeserialize as _$deleteDeserializeAutonomousDatabaseBackups,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeAutonomousDatabaseBackups,
} from "./api/autonomousDatabaseBackups/operations.js";
import {
  _changeDisasterRecoveryConfigurationDeserialize,
  _shrinkDeserialize,
  _restoreDeserialize,
  _failoverDeserialize,
  _switchoverDeserialize,
  _updateDeserialize as _updateDeserializeAutonomousDatabases,
  _$deleteDeserialize as _$deleteDeserializeAutonomousDatabases,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeAutonomousDatabases,
} from "./api/autonomousDatabases/operations.js";
import { _actionDeserialize as _actionDeserializeDbNodes } from "./api/dbNodes/operations.js";
import {
  _addAzureSubscriptionsDeserialize,
  _listActivationLinksDeserialize,
  _listSaasSubscriptionDetailsDeserialize,
  _listCloudAccountDetailsDeserialize,
  _$deleteDeserialize as _$deleteDeserializeOracleSubscriptions,
  _updateDeserialize as _updateDeserializeOracleSubscriptions,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeOracleSubscriptions,
} from "./api/oracleSubscriptions/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeVirtualNetworkAddresses,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVirtualNetworkAddresses,
} from "./api/virtualNetworkAddresses/operations.js";
import {
  _removeVmsDeserialize as _removeVmsDeserializeCloudVmClusters,
  _addVmsDeserialize,
  _$deleteDeserialize as _$deleteDeserializeCloudVmClusters,
  _updateDeserialize as _updateDeserializeCloudVmClusters,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeCloudVmClusters,
} from "./api/cloudVmClusters/operations.js";
import {
  _addStorageCapacityDeserialize,
  _$deleteDeserialize as _$deleteDeserializeCloudExadataInfrastructures,
  _updateDeserialize as _updateDeserializeCloudExadataInfrastructures,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeCloudExadataInfrastructures,
} from "./api/cloudExadataInfrastructures/operations.js";
import { getLongRunningPoller } from "./static-helpers/pollingHelpers.js";
import { OperationOptions, PathUncheckedResponse } from "@azure-rest/core-client";
import { AbortSignalLike } from "@azure/abort-controller";
import {
  PollerLike,
  OperationState,
  deserializeState,
  ResourceLocationConfig,
} from "@azure/core-lro";

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
  client: OracleDatabaseManagementClient,
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
  deserializer: Function;
  expectedStatuses: string[];
}

const deserializeMap: Record<string, DeserializationHelper> = {
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/exascaleDbStorageVaults/{exascaleDbStorageVaultName}":
    {
      deserializer: _$deleteDeserialize,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/exascaleDbStorageVaults/{exascaleDbStorageVaultName}":
    { deserializer: _updateDeserialize, expectedStatuses: ["200", "202"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/exascaleDbStorageVaults/{exascaleDbStorageVaultName}":
    { deserializer: _createDeserialize, expectedStatuses: ["200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/exadbVmClusters/{exadbVmClusterName}/dbNodes/{exascaleDbNodeName}/action":
    { deserializer: _actionDeserialize, expectedStatuses: ["202", "200"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/exadbVmClusters/{exadbVmClusterName}/removeVms":
    { deserializer: _removeVmsDeserialize, expectedStatuses: ["202", "200"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/exadbVmClusters/{exadbVmClusterName}":
    {
      deserializer: _$deleteDeserializeExadbVmClusters,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/exadbVmClusters/{exadbVmClusterName}":
    {
      deserializer: _updateDeserializeExadbVmClusters,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/exadbVmClusters/{exadbVmClusterName}":
    {
      deserializer: _createOrUpdateDeserialize,
      expectedStatuses: ["200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/autonomousDatabases/{autonomousdatabasename}/autonomousDatabaseBackups/{adbbackupid}":
    {
      deserializer: _updateDeserializeAutonomousDatabaseBackups,
      expectedStatuses: ["200", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/autonomousDatabases/{autonomousdatabasename}/autonomousDatabaseBackups/{adbbackupid}":
    {
      deserializer: _$deleteDeserializeAutonomousDatabaseBackups,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/autonomousDatabases/{autonomousdatabasename}/autonomousDatabaseBackups/{adbbackupid}":
    {
      deserializer: _createOrUpdateDeserializeAutonomousDatabaseBackups,
      expectedStatuses: ["200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/autonomousDatabases/{autonomousdatabasename}/changeDisasterRecoveryConfiguration":
    {
      deserializer: _changeDisasterRecoveryConfigurationDeserialize,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/autonomousDatabases/{autonomousdatabasename}/shrink":
    { deserializer: _shrinkDeserialize, expectedStatuses: ["202", "200"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/autonomousDatabases/{autonomousdatabasename}/restore":
    { deserializer: _restoreDeserialize, expectedStatuses: ["202", "200"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/autonomousDatabases/{autonomousdatabasename}/failover":
    { deserializer: _failoverDeserialize, expectedStatuses: ["202", "200"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/autonomousDatabases/{autonomousdatabasename}/switchover":
    { deserializer: _switchoverDeserialize, expectedStatuses: ["202", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/autonomousDatabases/{autonomousdatabasename}":
    {
      deserializer: _updateDeserializeAutonomousDatabases,
      expectedStatuses: ["200", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/autonomousDatabases/{autonomousdatabasename}":
    {
      deserializer: _$deleteDeserializeAutonomousDatabases,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/autonomousDatabases/{autonomousdatabasename}":
    {
      deserializer: _createOrUpdateDeserializeAutonomousDatabases,
      expectedStatuses: ["200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudVmClusters/{cloudvmclustername}/dbNodes/{dbnodeocid}/action":
    {
      deserializer: _actionDeserializeDbNodes,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/providers/Oracle.Database/oracleSubscriptions/default/addAzureSubscriptions":
    {
      deserializer: _addAzureSubscriptionsDeserialize,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/providers/Oracle.Database/oracleSubscriptions/default/listActivationLinks":
    {
      deserializer: _listActivationLinksDeserialize,
      expectedStatuses: ["200", "202"],
    },
  "POST /subscriptions/{subscriptionId}/providers/Oracle.Database/oracleSubscriptions/default/listSaasSubscriptionDetails":
    {
      deserializer: _listSaasSubscriptionDetailsDeserialize,
      expectedStatuses: ["200", "202"],
    },
  "POST /subscriptions/{subscriptionId}/providers/Oracle.Database/oracleSubscriptions/default/listCloudAccountDetails":
    {
      deserializer: _listCloudAccountDetailsDeserialize,
      expectedStatuses: ["200", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/providers/Oracle.Database/oracleSubscriptions/default": {
    deserializer: _$deleteDeserializeOracleSubscriptions,
    expectedStatuses: ["202", "204", "200"],
  },
  "PATCH /subscriptions/{subscriptionId}/providers/Oracle.Database/oracleSubscriptions/default": {
    deserializer: _updateDeserializeOracleSubscriptions,
    expectedStatuses: ["200", "202"],
  },
  "PUT /subscriptions/{subscriptionId}/providers/Oracle.Database/oracleSubscriptions/default": {
    deserializer: _createOrUpdateDeserializeOracleSubscriptions,
    expectedStatuses: ["200", "201"],
  },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudVmClusters/{cloudvmclustername}/virtualNetworkAddresses/{virtualnetworkaddressname}":
    {
      deserializer: _$deleteDeserializeVirtualNetworkAddresses,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudVmClusters/{cloudvmclustername}/virtualNetworkAddresses/{virtualnetworkaddressname}":
    {
      deserializer: _createOrUpdateDeserializeVirtualNetworkAddresses,
      expectedStatuses: ["200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudVmClusters/{cloudvmclustername}/removeVms":
    {
      deserializer: _removeVmsDeserializeCloudVmClusters,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudVmClusters/{cloudvmclustername}/addVms":
    { deserializer: _addVmsDeserialize, expectedStatuses: ["202", "200"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudVmClusters/{cloudvmclustername}":
    {
      deserializer: _$deleteDeserializeCloudVmClusters,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudVmClusters/{cloudvmclustername}":
    {
      deserializer: _updateDeserializeCloudVmClusters,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudVmClusters/{cloudvmclustername}":
    {
      deserializer: _createOrUpdateDeserializeCloudVmClusters,
      expectedStatuses: ["200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudExadataInfrastructures/{cloudexadatainfrastructurename}/addStorageCapacity":
    {
      deserializer: _addStorageCapacityDeserialize,
      expectedStatuses: ["202", "200"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudExadataInfrastructures/{cloudexadatainfrastructurename}":
    {
      deserializer: _$deleteDeserializeCloudExadataInfrastructures,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudExadataInfrastructures/{cloudexadatainfrastructurename}":
    {
      deserializer: _updateDeserializeCloudExadataInfrastructures,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudExadataInfrastructures/{cloudexadatainfrastructurename}":
    {
      deserializer: _createOrUpdateDeserializeCloudExadataInfrastructures,
      expectedStatuses: ["200", "201"],
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
