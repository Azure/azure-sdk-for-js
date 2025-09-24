// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureQuotaExtensionAPI } from "./azureQuotaExtensionAPI.js";
import { _updateDeserialize, _createOrUpdateDeserialize } from "./api/quota/operations.js";
import {
  _updateDeserialize as _updateDeserializeGroupQuotaLocationSettings,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeGroupQuotaLocationSettings,
} from "./api/groupQuotaLocationSettings/operations.js";
import { _updateDeserialize as _updateDeserializeGroupQuotaSubscriptionAllocationRequest } from "./api/groupQuotaSubscriptionAllocationRequest/operations.js";
import {
  _$deleteDeserialize,
  _updateDeserialize as _updateDeserializeGroupQuotaSubscriptions,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeGroupQuotaSubscriptions,
} from "./api/groupQuotaSubscriptions/operations.js";
import { _updateDeserialize as _updateDeserializeGroupQuotaLimitsRequest } from "./api/groupQuotaLimitsRequest/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeGroupQuotas,
  _updateDeserialize as _updateDeserializeGroupQuotas,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeGroupQuotas,
} from "./api/groupQuotas/operations.js";
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
  client: AzureQuotaExtensionAPI,
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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  deserializer: Function;
  expectedStatuses: string[];
}

const deserializeMap: Record<string, DeserializationHelper> = {
  "PATCH /{scope}/providers/Microsoft.Quota/quotas/{resourceName}": {
    deserializer: _updateDeserialize,
    expectedStatuses: ["200", "202"],
  },
  "PUT /{scope}/providers/Microsoft.Quota/quotas/{resourceName}": {
    deserializer: _createOrUpdateDeserialize,
    expectedStatuses: ["200", "202"],
  },
  "PATCH /providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/resourceProviders/{resourceProviderName}/locationSettings/{location}":
    {
      deserializer: _updateDeserializeGroupQuotaLocationSettings,
      expectedStatuses: ["200", "202"],
    },
  "PUT /providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/resourceProviders/{resourceProviderName}/locationSettings/{location}":
    {
      deserializer: _createOrUpdateDeserializeGroupQuotaLocationSettings,
      expectedStatuses: ["200", "201", "202"],
    },
  "PATCH /providers/Microsoft.Management/managementGroups/{managementGroupId}/subscriptions/{subscriptionId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/resourceProviders/{resourceProviderName}/quotaAllocations/{location}":
    {
      deserializer: _updateDeserializeGroupQuotaSubscriptionAllocationRequest,
      expectedStatuses: ["200", "202"],
    },
  "DELETE /providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/subscriptions/{subscriptionId}":
    {
      deserializer: _$deleteDeserialize,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/subscriptions/{subscriptionId}":
    {
      deserializer: _updateDeserializeGroupQuotaSubscriptions,
      expectedStatuses: ["200", "202"],
    },
  "PUT /providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/subscriptions/{subscriptionId}":
    {
      deserializer: _createOrUpdateDeserializeGroupQuotaSubscriptions,
      expectedStatuses: ["200", "201", "202"],
    },
  "PATCH /providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/resourceProviders/{resourceProviderName}/groupQuotaLimits/{location}":
    {
      deserializer: _updateDeserializeGroupQuotaLimitsRequest,
      expectedStatuses: ["200", "202"],
    },
  "DELETE /providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}":
    {
      deserializer: _$deleteDeserializeGroupQuotas,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}":
    {
      deserializer: _updateDeserializeGroupQuotas,
      expectedStatuses: ["200", "202"],
    },
  "PUT /providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}":
    {
      deserializer: _createOrUpdateDeserializeGroupQuotas,
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
