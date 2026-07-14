// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterClient } from "./devCenterClient.js";
import { _cancelDeserialize } from "./api/devCenterCatalogImageDefinitionBuild/operations.js";
import { _buildImageDeserialize } from "./api/devCenterCatalogImageDefinitions/operations.js";
import {
  _connectDeserialize,
  _syncDeserialize,
  _$deleteDeserialize,
  _patchDeserialize,
  _createOrUpdateDeserialize,
} from "./api/projectCatalogs/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeEncryptionSets,
  _updateDeserialize,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeEncryptionSets,
} from "./api/encryptionSets/operations.js";
import {
  _runHealthChecksDeserialize,
  _$deleteDeserialize as _$deleteDeserializeNetworkConnections,
  _updateDeserialize as _updateDeserializeNetworkConnections,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeNetworkConnections,
} from "./api/networkConnections/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeSchedules,
  _updateDeserialize as _updateDeserializeSchedules,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeSchedules,
} from "./api/schedules/operations.js";
import {
  _runHealthChecksDeserialize as _runHealthChecksDeserializePools,
  _$deleteDeserialize as _$deleteDeserializePools,
  _updateDeserialize as _updateDeserializePools,
  _createOrUpdateDeserialize as _createOrUpdateDeserializePools,
} from "./api/pools/operations.js";
import { _cancelDeserialize as _cancelDeserializeProjectCatalogImageDefinitionBuild } from "./api/projectCatalogImageDefinitionBuild/operations.js";
import { _buildImageDeserialize as _buildImageDeserializeProjectCatalogImageDefinitions } from "./api/projectCatalogImageDefinitions/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeDevBoxDefinitions,
  _updateDeserialize as _updateDeserializeDevBoxDefinitions,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeDevBoxDefinitions,
} from "./api/devBoxDefinitions/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeGalleries,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeGalleries,
} from "./api/galleries/operations.js";
import {
  _connectDeserialize as _connectDeserializeCatalogs,
  _syncDeserialize as _syncDeserializeCatalogs,
  _$deleteDeserialize as _$deleteDeserializeCatalogs,
  _updateDeserialize as _updateDeserializeCatalogs,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeCatalogs,
} from "./api/catalogs/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeAttachedNetworks,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeAttachedNetworks,
} from "./api/attachedNetworks/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeProjects,
  _updateDeserialize as _updateDeserializeProjects,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeProjects,
} from "./api/projects/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeProjectPolicies,
  _updateDeserialize as _updateDeserializeProjectPolicies,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeProjectPolicies,
} from "./api/projectPolicies/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeDevCenters,
  _updateDeserialize as _updateDeserializeDevCenters,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeDevCenters,
} from "./api/devCenters/operations.js";
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
  client: DevCenterClient,
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
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}/imageDefinitions/{imageDefinitionName}/builds/{buildName}/cancel":
    { deserializer: _cancelDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}/imageDefinitions/{imageDefinitionName}/buildImage":
    { deserializer: _buildImageDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/catalogs/{catalogName}/connect":
    { deserializer: _connectDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/catalogs/{catalogName}/sync":
    { deserializer: _syncDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/catalogs/{catalogName}":
    { deserializer: _$deleteDeserialize, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/catalogs/{catalogName}":
    { deserializer: _patchDeserialize, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/catalogs/{catalogName}":
    { deserializer: _createOrUpdateDeserialize, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/encryptionSets/{encryptionSetName}":
    { deserializer: _$deleteDeserializeEncryptionSets, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/encryptionSets/{encryptionSetName}":
    { deserializer: _updateDeserialize, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/encryptionSets/{encryptionSetName}":
    {
      deserializer: _createOrUpdateDeserializeEncryptionSets,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/networkConnections/{networkConnectionName}/runHealthChecks":
    { deserializer: _runHealthChecksDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/networkConnections/{networkConnectionName}":
    {
      deserializer: _$deleteDeserializeNetworkConnections,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/networkConnections/{networkConnectionName}":
    { deserializer: _updateDeserializeNetworkConnections, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/networkConnections/{networkConnectionName}":
    {
      deserializer: _createOrUpdateDeserializeNetworkConnections,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/pools/{poolName}/schedules/{scheduleName}":
    { deserializer: _$deleteDeserializeSchedules, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/pools/{poolName}/schedules/{scheduleName}":
    { deserializer: _updateDeserializeSchedules, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/pools/{poolName}/schedules/{scheduleName}":
    { deserializer: _createOrUpdateDeserializeSchedules, expectedStatuses: ["200", "201", "202"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/pools/{poolName}/runHealthChecks":
    { deserializer: _runHealthChecksDeserializePools, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/pools/{poolName}":
    { deserializer: _$deleteDeserializePools, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/pools/{poolName}":
    { deserializer: _updateDeserializePools, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/pools/{poolName}":
    { deserializer: _createOrUpdateDeserializePools, expectedStatuses: ["200", "201", "202"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/catalogs/{catalogName}/imageDefinitions/{imageDefinitionName}/builds/{buildName}/cancel":
    {
      deserializer: _cancelDeserializeProjectCatalogImageDefinitionBuild,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/catalogs/{catalogName}/imageDefinitions/{imageDefinitionName}/buildImage":
    {
      deserializer: _buildImageDeserializeProjectCatalogImageDefinitions,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/devboxdefinitions/{devBoxDefinitionName}":
    { deserializer: _$deleteDeserializeDevBoxDefinitions, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/devboxdefinitions/{devBoxDefinitionName}":
    { deserializer: _updateDeserializeDevBoxDefinitions, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/devboxdefinitions/{devBoxDefinitionName}":
    {
      deserializer: _createOrUpdateDeserializeDevBoxDefinitions,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/galleries/{galleryName}":
    { deserializer: _$deleteDeserializeGalleries, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/galleries/{galleryName}":
    { deserializer: _createOrUpdateDeserializeGalleries, expectedStatuses: ["200", "201", "202"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}/connect":
    { deserializer: _connectDeserializeCatalogs, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}/sync":
    { deserializer: _syncDeserializeCatalogs, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}":
    { deserializer: _$deleteDeserializeCatalogs, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}":
    { deserializer: _updateDeserializeCatalogs, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}":
    { deserializer: _createOrUpdateDeserializeCatalogs, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/attachednetworks/{attachedNetworkConnectionName}":
    { deserializer: _$deleteDeserializeAttachedNetworks, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/attachednetworks/{attachedNetworkConnectionName}":
    {
      deserializer: _createOrUpdateDeserializeAttachedNetworks,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}":
    { deserializer: _$deleteDeserializeProjects, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}":
    { deserializer: _updateDeserializeProjects, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}":
    { deserializer: _createOrUpdateDeserializeProjects, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/projectPolicies/{projectPolicyName}":
    { deserializer: _$deleteDeserializeProjectPolicies, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/projectPolicies/{projectPolicyName}":
    { deserializer: _updateDeserializeProjectPolicies, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/projectPolicies/{projectPolicyName}":
    {
      deserializer: _createOrUpdateDeserializeProjectPolicies,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}":
    { deserializer: _$deleteDeserializeDevCenters, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}":
    { deserializer: _updateDeserializeDevCenters, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}":
    { deserializer: _createOrUpdateDeserializeDevCenters, expectedStatuses: ["200", "201", "202"] },
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
