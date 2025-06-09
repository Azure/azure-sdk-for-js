// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPI } from "./azureSiteRecoveryManagementServiceAPI.js";
import { _$deleteDeserialize, _createDeserialize } from "./api/replicationExtension/operations.js";
import {
  _plannedFailoverDeserialize,
  _$deleteDeserialize as _$deleteDeserializeProtectedItem,
  _updateDeserialize,
  _createDeserialize as _createDeserializeProtectedItem,
} from "./api/protectedItem/operations.js";
import { _$deleteDeserialize as _$deleteDeserializePrivateEndpointConnectionProxies } from "./api/privateEndpointConnectionProxies/operations.js";
import { _$deleteDeserialize as _$deleteDeserializePrivateEndpointConnections } from "./api/privateEndpointConnections/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializePolicy,
  _createDeserialize as _createDeserializePolicy,
} from "./api/policy/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeFabricAgent,
  _createDeserialize as _createDeserializeFabricAgent,
} from "./api/fabricAgent/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeFabric,
  _updateDeserialize as _updateDeserializeFabric,
  _createDeserialize as _createDeserializeFabric,
} from "./api/fabric/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeVault,
  _updateDeserialize as _updateDeserializeVault,
  _createDeserialize as _createDeserializeVault,
} from "./api/vault/operations.js";
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
  client: AzureSiteRecoveryManagementServiceAPI,
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
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/replicationExtensions/{replicationExtensionName}":
    {
      deserializer: _$deleteDeserialize,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/replicationExtensions/{replicationExtensionName}":
    { deserializer: _createDeserialize, expectedStatuses: ["200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/protectedItems/{protectedItemName}/plannedFailover":
    {
      deserializer: _plannedFailoverDeserialize,
      expectedStatuses: ["202", "200"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/protectedItems/{protectedItemName}":
    {
      deserializer: _$deleteDeserializeProtectedItem,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/protectedItems/{protectedItemName}":
    { deserializer: _updateDeserialize, expectedStatuses: ["200", "202"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/protectedItems/{protectedItemName}":
    {
      deserializer: _createDeserializeProtectedItem,
      expectedStatuses: ["200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/privateEndpointConnectionProxies/{privateEndpointConnectionProxyName}":
    {
      deserializer: _$deleteDeserializePrivateEndpointConnectionProxies,
      expectedStatuses: ["202", "204", "200"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/privateEndpointConnections/{privateEndpointConnectionName}":
    {
      deserializer: _$deleteDeserializePrivateEndpointConnections,
      expectedStatuses: ["202", "204", "200"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/replicationPolicies/{policyName}":
    {
      deserializer: _$deleteDeserializePolicy,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/replicationPolicies/{policyName}":
    {
      deserializer: _createDeserializePolicy,
      expectedStatuses: ["200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationFabrics/{fabricName}/fabricAgents/{fabricAgentName}":
    {
      deserializer: _$deleteDeserializeFabricAgent,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationFabrics/{fabricName}/fabricAgents/{fabricAgentName}":
    {
      deserializer: _createDeserializeFabricAgent,
      expectedStatuses: ["200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationFabrics/{fabricName}":
    {
      deserializer: _$deleteDeserializeFabric,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationFabrics/{fabricName}":
    {
      deserializer: _updateDeserializeFabric,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationFabrics/{fabricName}":
    {
      deserializer: _createDeserializeFabric,
      expectedStatuses: ["200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}":
    {
      deserializer: _$deleteDeserializeVault,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}":
    { deserializer: _updateDeserializeVault, expectedStatuses: ["200", "202"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}":
    { deserializer: _createDeserializeVault, expectedStatuses: ["200", "201"] },
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
