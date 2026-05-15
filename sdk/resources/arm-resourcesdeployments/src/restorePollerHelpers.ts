// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeploymentsClient } from "./deploymentsClient.js";
import {
  _whatIfDeserialize,
  _validateDeserialize,
  _$deleteDeserialize,
  _createOrUpdateDeserialize,
  _whatIfAtSubscriptionScopeDeserialize,
  _validateAtSubscriptionScopeDeserialize,
  _deleteAtSubscriptionScopeDeserialize,
  _createOrUpdateAtSubscriptionScopeDeserialize,
  _whatIfAtManagementGroupScopeDeserialize,
  _validateAtManagementGroupScopeDeserialize,
  _deleteAtManagementGroupScopeDeserialize,
  _createOrUpdateAtManagementGroupScopeDeserialize,
  _whatIfAtTenantScopeDeserialize,
  _validateAtTenantScopeDeserialize,
  _deleteAtTenantScopeDeserialize,
  _createOrUpdateAtTenantScopeDeserialize,
  _validateAtScopeDeserialize,
  _deleteAtScopeDeserialize,
  _createOrUpdateAtScopeDeserialize,
} from "./api/deployments/operations.js";
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
  client: DeploymentsClient,
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
  "POST /subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Resources/deployments/{deploymentName}/whatIf":
    { deserializer: _whatIfDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Resources/deployments/{deploymentName}/validate":
    { deserializer: _validateDeserialize, expectedStatuses: ["202", "200", "400", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Resources/deployments/{deploymentName}":
    { deserializer: _$deleteDeserialize, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Resources/deployments/{deploymentName}":
    { deserializer: _createOrUpdateDeserialize, expectedStatuses: ["200", "201", "202"] },
  "POST /subscriptions/{subscriptionId}/providers/Microsoft.Resources/deployments/{deploymentName}/whatIf":
    {
      deserializer: _whatIfAtSubscriptionScopeDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/providers/Microsoft.Resources/deployments/{deploymentName}/validate":
    {
      deserializer: _validateAtSubscriptionScopeDeserialize,
      expectedStatuses: ["202", "200", "400", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/providers/Microsoft.Resources/deployments/{deploymentName}":
    {
      deserializer: _deleteAtSubscriptionScopeDeserialize,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/providers/Microsoft.Resources/deployments/{deploymentName}":
    {
      deserializer: _createOrUpdateAtSubscriptionScopeDeserialize,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /providers/Microsoft.Management/managementGroups/{groupId}/providers/Microsoft.Resources/deployments/{deploymentName}/whatIf":
    {
      deserializer: _whatIfAtManagementGroupScopeDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /providers/Microsoft.Management/managementGroups/{groupId}/providers/Microsoft.Resources/deployments/{deploymentName}/validate":
    {
      deserializer: _validateAtManagementGroupScopeDeserialize,
      expectedStatuses: ["202", "200", "400", "201"],
    },
  "DELETE /providers/Microsoft.Management/managementGroups/{groupId}/providers/Microsoft.Resources/deployments/{deploymentName}":
    {
      deserializer: _deleteAtManagementGroupScopeDeserialize,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /providers/Microsoft.Management/managementGroups/{groupId}/providers/Microsoft.Resources/deployments/{deploymentName}":
    {
      deserializer: _createOrUpdateAtManagementGroupScopeDeserialize,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /providers/Microsoft.Resources/deployments/{deploymentName}/whatIf": {
    deserializer: _whatIfAtTenantScopeDeserialize,
    expectedStatuses: ["202", "200", "201"],
  },
  "POST /providers/Microsoft.Resources/deployments/{deploymentName}/validate": {
    deserializer: _validateAtTenantScopeDeserialize,
    expectedStatuses: ["202", "200", "400", "201"],
  },
  "DELETE /providers/Microsoft.Resources/deployments/{deploymentName}": {
    deserializer: _deleteAtTenantScopeDeserialize,
    expectedStatuses: ["202", "204", "200"],
  },
  "PUT /providers/Microsoft.Resources/deployments/{deploymentName}": {
    deserializer: _createOrUpdateAtTenantScopeDeserialize,
    expectedStatuses: ["200", "201", "202"],
  },
  "POST /{scope}/providers/Microsoft.Resources/deployments/{deploymentName}/validate": {
    deserializer: _validateAtScopeDeserialize,
    expectedStatuses: ["202", "200", "400", "201"],
  },
  "DELETE /{scope}/providers/Microsoft.Resources/deployments/{deploymentName}": {
    deserializer: _deleteAtScopeDeserialize,
    expectedStatuses: ["202", "204", "200"],
  },
  "PUT /{scope}/providers/Microsoft.Resources/deployments/{deploymentName}": {
    deserializer: _createOrUpdateAtScopeDeserialize,
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
