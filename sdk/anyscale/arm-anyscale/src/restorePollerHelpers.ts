// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PlatformClient } from "./platformClient.js";
import { _$deleteDeserialize, _createOrUpdateDeserialize } from "./api/workspaces/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeServices,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeServices,
} from "./api/services/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeProjects,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeProjects,
} from "./api/projects/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeJobs,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeJobs,
} from "./api/jobs/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeContainerImages,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeContainerImages,
} from "./api/containerImages/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeComputeConfigs,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeComputeConfigs,
} from "./api/computeConfigs/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeCloudResources,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeCloudResources,
} from "./api/cloudResources/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeClouds,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeClouds,
} from "./api/clouds/operations.js";
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
  client: PlatformClient,
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
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/projects/{projectName}/workspaces/{workspaceName}":
    { deserializer: _$deleteDeserialize, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/projects/{projectName}/workspaces/{workspaceName}":
    { deserializer: _createOrUpdateDeserialize, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/projects/{projectName}/services/{serviceName}":
    { deserializer: _$deleteDeserializeServices, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/projects/{projectName}/services/{serviceName}":
    { deserializer: _createOrUpdateDeserializeServices, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/projects/{projectName}":
    { deserializer: _$deleteDeserializeProjects, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/projects/{projectName}":
    { deserializer: _createOrUpdateDeserializeProjects, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/projects/{projectName}/jobs/{jobName}":
    { deserializer: _$deleteDeserializeJobs, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/projects/{projectName}/jobs/{jobName}":
    { deserializer: _createOrUpdateDeserializeJobs, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/containerImages/{containerImageName}":
    { deserializer: _$deleteDeserializeContainerImages, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/containerImages/{containerImageName}":
    {
      deserializer: _createOrUpdateDeserializeContainerImages,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/computeConfigs/{computeConfigName}":
    { deserializer: _$deleteDeserializeComputeConfigs, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/computeConfigs/{computeConfigName}":
    {
      deserializer: _createOrUpdateDeserializeComputeConfigs,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/cloudResources/{cloudResourceName}":
    { deserializer: _$deleteDeserializeCloudResources, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/cloudResources/{cloudResourceName}":
    {
      deserializer: _createOrUpdateDeserializeCloudResources,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}":
    { deserializer: _$deleteDeserializeClouds, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}":
    { deserializer: _createOrUpdateDeserializeClouds, expectedStatuses: ["200", "201", "202"] },
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
