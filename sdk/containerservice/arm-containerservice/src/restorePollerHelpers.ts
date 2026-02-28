// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceClient } from "./containerServiceClient.js";
import {
  _$deleteDeserialize,
  _createOrUpdateDeserialize,
} from "./api/meshMemberships/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeJwtAuthenticators,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeJwtAuthenticators,
} from "./api/jwtAuthenticators/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeIdentityBindings,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeIdentityBindings,
} from "./api/identityBindings/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeLoadBalancers } from "./api/loadBalancers/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeTrustedAccessRoleBindings,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeTrustedAccessRoleBindings,
} from "./api/trustedAccessRoleBindings/operations.js";
import { _$deleteDeserialize as _$deleteDeserializePrivateEndpointConnections } from "./api/privateEndpointConnections/operations.js";
import { _createOrUpdateDeserialize as _createOrUpdateDeserializeMachines } from "./api/machines/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeManagedNamespaces,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeManagedNamespaces,
} from "./api/managedNamespaces/operations.js";
import {
  _rebalanceLoadBalancersDeserialize,
  _runCommandDeserialize,
  _startDeserialize,
  _stopDeserialize,
  _rotateServiceAccountSigningKeysDeserialize,
  _abortLatestOperationDeserialize,
  _rotateClusterCertificatesDeserialize,
  _resetAADProfileDeserialize,
  _resetServicePrincipalProfileDeserialize,
  _$deleteDeserialize as _$deleteDeserializeManagedClusters,
  _updateTagsDeserialize,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeManagedClusters,
} from "./api/managedClusters/operations.js";
import {
  _upgradeNodeImageVersionDeserialize,
  _deleteMachinesDeserialize,
  _completeUpgradeDeserialize,
  _abortLatestOperationDeserialize as _abortLatestOperationDeserializeAgentPools,
  _$deleteDeserialize as _$deleteDeserializeAgentPools,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeAgentPools,
} from "./api/agentPools/operations.js";
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
  client: ContainerServiceClient,
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
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/meshMemberships/{meshMembershipName}":
    { deserializer: _$deleteDeserialize, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/meshMemberships/{meshMembershipName}":
    { deserializer: _createOrUpdateDeserialize, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/jwtAuthenticators/{jwtAuthenticatorName}":
    { deserializer: _$deleteDeserializeJwtAuthenticators, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/jwtAuthenticators/{jwtAuthenticatorName}":
    {
      deserializer: _createOrUpdateDeserializeJwtAuthenticators,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/identityBindings/{identityBindingName}":
    { deserializer: _$deleteDeserializeIdentityBindings, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/identityBindings/{identityBindingName}":
    {
      deserializer: _createOrUpdateDeserializeIdentityBindings,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/loadBalancers/{loadBalancerName}":
    { deserializer: _$deleteDeserializeLoadBalancers, expectedStatuses: ["202", "204", "200"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/trustedAccessRoleBindings/{trustedAccessRoleBindingName}":
    {
      deserializer: _$deleteDeserializeTrustedAccessRoleBindings,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/trustedAccessRoleBindings/{trustedAccessRoleBindingName}":
    {
      deserializer: _createOrUpdateDeserializeTrustedAccessRoleBindings,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}":
    {
      deserializer: _$deleteDeserializePrivateEndpointConnections,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}/machines/{machineName}":
    { deserializer: _createOrUpdateDeserializeMachines, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/managedNamespaces/{managedNamespaceName}":
    { deserializer: _$deleteDeserializeManagedNamespaces, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/managedNamespaces/{managedNamespaceName}":
    {
      deserializer: _createOrUpdateDeserializeManagedNamespaces,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/rebalanceLoadBalancers":
    { deserializer: _rebalanceLoadBalancersDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/runCommand":
    { deserializer: _runCommandDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/start":
    { deserializer: _startDeserialize, expectedStatuses: ["202", "204", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/stop":
    { deserializer: _stopDeserialize, expectedStatuses: ["202", "204", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/rotateServiceAccountSigningKeys":
    {
      deserializer: _rotateServiceAccountSigningKeysDeserialize,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/abort":
    {
      deserializer: _abortLatestOperationDeserialize,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/rotateClusterCertificates":
    {
      deserializer: _rotateClusterCertificatesDeserialize,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/resetAADProfile":
    { deserializer: _resetAADProfileDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/resetServicePrincipalProfile":
    {
      deserializer: _resetServicePrincipalProfileDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}":
    { deserializer: _$deleteDeserializeManagedClusters, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}":
    { deserializer: _updateTagsDeserialize, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}":
    {
      deserializer: _createOrUpdateDeserializeManagedClusters,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}/upgradeNodeImageVersion":
    { deserializer: _upgradeNodeImageVersionDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}/deleteMachines":
    { deserializer: _deleteMachinesDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}/completeUpgrade":
    { deserializer: _completeUpgradeDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}/abort":
    {
      deserializer: _abortLatestOperationDeserializeAgentPools,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}":
    { deserializer: _$deleteDeserializeAgentPools, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}":
    { deserializer: _createOrUpdateDeserializeAgentPools, expectedStatuses: ["200", "201", "202"] },
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
