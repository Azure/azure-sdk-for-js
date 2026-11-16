// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbClient } from "./horizonDbClient.js";
import { _updateDeserialize } from "./api/logCaptureConfigurations/operations.js";
import {
  _applyNowDeserialize,
  _rescheduleDeserialize,
} from "./api/maintenanceEvents/operations.js";
import {
  _$deleteDeserialize,
  _updateDeserialize as _updateDeserializeChangeDataCaptureConfigurations,
  _createOrReplaceDeserialize,
} from "./api/changeDataCaptureConfigurations/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeIdentityAssignments,
  _createOrReplaceDeserialize as _createOrReplaceDeserializeIdentityAssignments,
} from "./api/identityAssignments/operations.js";
import {
  _activateIdentityDeserialize,
  _$deleteDeserialize as _$deleteDeserializeChangeDataCaptureDestinations,
  _updateDeserialize as _updateDeserializeChangeDataCaptureDestinations,
  _createOrReplaceDeserialize as _createOrReplaceDeserializeChangeDataCaptureDestinations,
} from "./api/changeDataCaptureDestinations/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeChangeDataCaptureCapabilities,
  _updateDeserialize as _updateDeserializeChangeDataCaptureCapabilities,
  _createOrReplaceDeserialize as _createOrReplaceDeserializeChangeDataCaptureCapabilities,
} from "./api/changeDataCaptureCapabilities/operations.js";
import {
  _updateDeserialize as _updateDeserializeMicrosoftEntraAuthentications,
  _createOrReplaceDeserialize as _createOrReplaceDeserializeMicrosoftEntraAuthentications,
} from "./api/microsoftEntraAuthentications/operations.js";
import {
  _updateDeserialize as _updateDeserializePasswordAuthentications,
  _createOrReplaceDeserialize as _createOrReplaceDeserializePasswordAuthentications,
} from "./api/passwordAuthentications/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeMicrosoftEntraAdministrators,
  _createOrReplaceDeserialize as _createOrReplaceDeserializeMicrosoftEntraAdministrators,
} from "./api/microsoftEntraAdministrators/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeParameterGroups,
  _updateDeserialize as _updateDeserializeParameterGroups,
  _createOrReplaceDeserialize as _createOrReplaceDeserializeParameterGroups,
} from "./api/parameterGroups/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializePrivateEndpointConnections,
  _approveOrRejectDeserialize,
} from "./api/privateEndpointConnections/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeFirewallRules,
  _createOrReplaceDeserialize as _createOrReplaceDeserializeFirewallRules,
} from "./api/firewallRules/operations.js";
import {
  _restartDeserialize,
  _stopDeserialize,
  _startDeserialize,
  _$deleteDeserialize as _$deleteDeserializePools,
  _updateDeserialize as _updateDeserializePools,
  _createOrReplaceDeserialize as _createOrReplaceDeserializePools,
} from "./api/pools/operations.js";
import {
  _failoverDeserialize,
  _$deleteDeserialize as _$deleteDeserializeClusters,
  _updateDeserialize as _updateDeserializeClusters,
  _createOrReplaceDeserialize as _createOrReplaceDeserializeClusters,
} from "./api/clusters/operations.js";
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
  client: HorizonDbClient,
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
    ResourceLocationConfig | undefined;
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
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/logCaptureConfigurations/{logCaptureConfigurationName}":
    { deserializer: _updateDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/pools/{poolName}/maintenanceEvents/{maintenanceEventId}/applyNow":
    { deserializer: _applyNowDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/pools/{poolName}/maintenanceEvents/{maintenanceEventId}/reschedule":
    { deserializer: _rescheduleDeserialize, expectedStatuses: ["200", "202", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/changeDataCaptureConfigurations/{configurationName}":
    { deserializer: _$deleteDeserialize, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/changeDataCaptureConfigurations/{configurationName}":
    {
      deserializer: _updateDeserializeChangeDataCaptureConfigurations,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/changeDataCaptureConfigurations/{configurationName}":
    { deserializer: _createOrReplaceDeserialize, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/changeDataCaptureDestinations/{destinationName}/identityAssignments/{assignmentName}":
    {
      deserializer: _$deleteDeserializeIdentityAssignments,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/changeDataCaptureDestinations/{destinationName}/identityAssignments/{assignmentName}":
    {
      deserializer: _createOrReplaceDeserializeIdentityAssignments,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/changeDataCaptureDestinations/{destinationName}/activateIdentity":
    { deserializer: _activateIdentityDeserialize, expectedStatuses: ["200", "202", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/changeDataCaptureDestinations/{destinationName}":
    {
      deserializer: _$deleteDeserializeChangeDataCaptureDestinations,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/changeDataCaptureDestinations/{destinationName}":
    {
      deserializer: _updateDeserializeChangeDataCaptureDestinations,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/changeDataCaptureDestinations/{destinationName}":
    {
      deserializer: _createOrReplaceDeserializeChangeDataCaptureDestinations,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/changeDataCapture/default":
    {
      deserializer: _$deleteDeserializeChangeDataCaptureCapabilities,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/changeDataCapture/default":
    {
      deserializer: _updateDeserializeChangeDataCaptureCapabilities,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/changeDataCapture/default":
    {
      deserializer: _createOrReplaceDeserializeChangeDataCaptureCapabilities,
      expectedStatuses: ["200", "201", "202"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/authentications/microsoftEntra":
    {
      deserializer: _updateDeserializeMicrosoftEntraAuthentications,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/authentications/microsoftEntra":
    {
      deserializer: _createOrReplaceDeserializeMicrosoftEntraAuthentications,
      expectedStatuses: ["200", "201", "202"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/authentications/passwordMethod":
    {
      deserializer: _updateDeserializePasswordAuthentications,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/authentications/passwordMethod":
    {
      deserializer: _createOrReplaceDeserializePasswordAuthentications,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/microsoftEntraAdministrators/{objectId}":
    {
      deserializer: _$deleteDeserializeMicrosoftEntraAdministrators,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/microsoftEntraAdministrators/{objectId}":
    {
      deserializer: _createOrReplaceDeserializeMicrosoftEntraAdministrators,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/parameterGroups/{parameterGroupName}":
    { deserializer: _$deleteDeserializeParameterGroups, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/parameterGroups/{parameterGroupName}":
    { deserializer: _updateDeserializeParameterGroups, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/parameterGroups/{parameterGroupName}":
    {
      deserializer: _createOrReplaceDeserializeParameterGroups,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/privateEndpointConnections/{privateEndpointConnectionName}":
    {
      deserializer: _$deleteDeserializePrivateEndpointConnections,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/privateEndpointConnections/{privateEndpointConnectionName}":
    { deserializer: _approveOrRejectDeserialize, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/pools/{poolName}/firewallRules/{firewallRuleName}":
    { deserializer: _$deleteDeserializeFirewallRules, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/pools/{poolName}/firewallRules/{firewallRuleName}":
    {
      deserializer: _createOrReplaceDeserializeFirewallRules,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/pools/{poolName}/restart":
    { deserializer: _restartDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/pools/{poolName}/stop":
    { deserializer: _stopDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/pools/{poolName}/start":
    { deserializer: _startDeserialize, expectedStatuses: ["200", "202", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/pools/{poolName}":
    { deserializer: _$deleteDeserializePools, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/pools/{poolName}":
    { deserializer: _updateDeserializePools, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/pools/{poolName}":
    { deserializer: _createOrReplaceDeserializePools, expectedStatuses: ["200", "201", "202"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/failover":
    { deserializer: _failoverDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}":
    { deserializer: _$deleteDeserializeClusters, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}":
    { deserializer: _updateDeserializeClusters, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}":
    { deserializer: _createOrReplaceDeserializeClusters, expectedStatuses: ["200", "201", "202"] },
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
