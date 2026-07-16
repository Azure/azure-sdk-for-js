// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageCacheManagementClient } from "./storageCacheManagementClient.js";
import {
  _invalidateDeserialize,
  _resumeDeserialize,
  _suspendDeserialize,
  _flushDeserialize,
} from "./api/storageTargetOperations/operations.js";
import {
  _$deleteDeserialize,
  _updateDeserialize,
  _createOrUpdateDeserialize,
} from "./api/expansionJobs/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeAutoImportJobs,
  _updateDeserialize as _updateDeserializeAutoImportJobs,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeAutoImportJobs,
} from "./api/autoImportJobs/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeImportJobs,
  _updateDeserialize as _updateDeserializeImportJobs,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeImportJobs,
} from "./api/importJobs/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeAutoExportJobs,
  _updateDeserialize as _updateDeserializeAutoExportJobs,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeAutoExportJobs,
} from "./api/autoExportJobs/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeAmlFilesystems,
  _updateDeserialize as _updateDeserializeAmlFilesystems,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeAmlFilesystems,
} from "./api/amlFilesystems/operations.js";
import {
  _restoreDefaultsDeserialize,
  _dnsRefreshDeserialize,
  _$deleteDeserialize as _$deleteDeserializeStorageTargets,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeStorageTargets,
} from "./api/storageTargets/operations.js";
import {
  _spaceAllocationDeserialize,
  _upgradeFirmwareDeserialize,
  _resumePrimingJobDeserialize,
  _pausePrimingJobDeserialize,
  _stopPrimingJobDeserialize,
  _startPrimingJobDeserialize,
  _stopDeserialize,
  _startDeserialize,
  _flushDeserialize as _flushDeserializeCaches,
  _debugInfoDeserialize,
  _$deleteDeserialize as _$deleteDeserializeCaches,
  _updateDeserialize as _updateDeserializeCaches,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeCaches,
} from "./api/caches/operations.js";
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
  client: StorageCacheManagementClient,
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
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/storageTargets/{storageTargetName}/invalidate":
    { deserializer: _invalidateDeserialize, expectedStatuses: ["202", "200", "204", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/storageTargets/{storageTargetName}/resume":
    { deserializer: _resumeDeserialize, expectedStatuses: ["202", "200", "204", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/storageTargets/{storageTargetName}/suspend":
    { deserializer: _suspendDeserialize, expectedStatuses: ["202", "200", "204", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/storageTargets/{storageTargetName}/flush":
    { deserializer: _flushDeserialize, expectedStatuses: ["202", "200", "204", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/expansionJobs/{expansionJobName}":
    { deserializer: _$deleteDeserialize, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/expansionJobs/{expansionJobName}":
    { deserializer: _updateDeserialize, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/expansionJobs/{expansionJobName}":
    { deserializer: _createOrUpdateDeserialize, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/autoImportJobs/{autoImportJobName}":
    { deserializer: _$deleteDeserializeAutoImportJobs, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/autoImportJobs/{autoImportJobName}":
    { deserializer: _updateDeserializeAutoImportJobs, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/autoImportJobs/{autoImportJobName}":
    {
      deserializer: _createOrUpdateDeserializeAutoImportJobs,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/importJobs/{importJobName}":
    { deserializer: _$deleteDeserializeImportJobs, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/importJobs/{importJobName}":
    { deserializer: _updateDeserializeImportJobs, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/importJobs/{importJobName}":
    { deserializer: _createOrUpdateDeserializeImportJobs, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/autoExportJobs/{autoExportJobName}":
    { deserializer: _$deleteDeserializeAutoExportJobs, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/autoExportJobs/{autoExportJobName}":
    { deserializer: _updateDeserializeAutoExportJobs, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/autoExportJobs/{autoExportJobName}":
    {
      deserializer: _createOrUpdateDeserializeAutoExportJobs,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}":
    { deserializer: _$deleteDeserializeAmlFilesystems, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}":
    { deserializer: _updateDeserializeAmlFilesystems, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}":
    {
      deserializer: _createOrUpdateDeserializeAmlFilesystems,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/storageTargets/{storageTargetName}/restoreDefaults":
    { deserializer: _restoreDefaultsDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/storageTargets/{storageTargetName}/dnsRefresh":
    { deserializer: _dnsRefreshDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/storageTargets/{storageTargetName}":
    { deserializer: _$deleteDeserializeStorageTargets, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/storageTargets/{storageTargetName}":
    {
      deserializer: _createOrUpdateDeserializeStorageTargets,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/spaceAllocation":
    { deserializer: _spaceAllocationDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/upgrade":
    { deserializer: _upgradeFirmwareDeserialize, expectedStatuses: ["202", "201", "204", "200"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/resumePrimingJob":
    { deserializer: _resumePrimingJobDeserialize, expectedStatuses: ["202", "204", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/pausePrimingJob":
    { deserializer: _pausePrimingJobDeserialize, expectedStatuses: ["202", "204", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/stopPrimingJob":
    { deserializer: _stopPrimingJobDeserialize, expectedStatuses: ["202", "204", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/startPrimingJob":
    { deserializer: _startPrimingJobDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/stop":
    { deserializer: _stopDeserialize, expectedStatuses: ["202", "200", "204", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/start":
    { deserializer: _startDeserialize, expectedStatuses: ["202", "200", "204", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/flush":
    { deserializer: _flushDeserializeCaches, expectedStatuses: ["202", "200", "204", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/debugInfo":
    { deserializer: _debugInfoDeserialize, expectedStatuses: ["202", "200", "204", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}":
    { deserializer: _$deleteDeserializeCaches, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}":
    { deserializer: _updateDeserializeCaches, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}":
    { deserializer: _createOrUpdateDeserializeCaches, expectedStatuses: ["200", "201", "202"] },
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
