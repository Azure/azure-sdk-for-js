// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureResilienceManagementClient } from "./azureResilienceManagementClient.js";
import { _$deleteDeserialize, _createOrUpdateDeserialize } from "./api/enrollments/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeUsagePlans,
  _updateDeserialize,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeUsagePlans,
} from "./api/usagePlans/operations.js";
import {
  _markAsCompleteDeserialize,
  _resumeDeserialize,
  _addNotesDeserialize,
  _reprotectDeserialize,
  _failOverDeserialize,
} from "./api/drillRuns/operations.js";
import {
  _resyncReadinessCheckDeserialize,
  _addOrUpdateResourcesDeserialize,
  _endDeserialize,
  _startDeserialize,
  _validateForExecutionDeserialize,
  _$deleteDeserialize as _$deleteDeserializeDrills,
  _updateDeserialize as _updateDeserializeDrills,
  _createDeserialize,
} from "./api/drills/operations.js";
import {
  _retryDeserialize,
  _resumeDeserialize as _resumeDeserializeRecoveryJobs,
  _cancelDeserialize,
} from "./api/recoveryJobs/operations.js";
import {
  _testFailoverCleanupDeserialize,
  _testFailoverDeserialize,
  _reprotectDeserialize as _reprotectDeserializeRecoveryPlanActions,
  _failoverCommitDeserialize,
  _failoverDeserialize,
  _checkReadinessDeserialize,
  _validateForReprotectDeserialize,
  _validateForTestFailoverCleanupDeserialize,
  _validateForTestFailoverDeserialize,
  _validateForFailoverCommitDeserialize,
  _validateForFailoverDeserialize,
  _validateForOperationDeserialize,
  _updateResourcesDeserialize,
  _finalizeDeserialize,
} from "./api/recoveryPlanActions/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeRecoveryPlans,
  _updateDeserialize as _updateDeserializeRecoveryPlans,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeRecoveryPlans,
} from "./api/recoveryPlans/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeGoalTemplates,
  _updateDeserialize as _updateDeserializeGoalTemplates,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeGoalTemplates,
} from "./api/goalTemplates/operations.js";
import {
  _recommendCapacityDeserialize,
  _$deleteDeserialize as _$deleteDeserializeGoalAssignments,
  _refreshGoalResourcesDeserialize,
  _updateGoalResourcesDeserialize,
  _updateDeserialize as _updateDeserializeGoalAssignments,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeGoalAssignments,
} from "./api/goalAssignments/operations.js";
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
  client: AzureResilienceManagementClient,
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
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureResilienceManagement/usagePlans/{usagePlanName}/enrollments/{enrollmentName}":
    { deserializer: _$deleteDeserialize, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureResilienceManagement/usagePlans/{usagePlanName}/enrollments/{enrollmentName}":
    { deserializer: _createOrUpdateDeserialize, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureResilienceManagement/usagePlans/{usagePlanName}":
    { deserializer: _$deleteDeserializeUsagePlans, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureResilienceManagement/usagePlans/{usagePlanName}":
    { deserializer: _updateDeserialize, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureResilienceManagement/usagePlans/{usagePlanName}":
    { deserializer: _createOrUpdateDeserializeUsagePlans, expectedStatuses: ["200", "201", "202"] },
  "POST /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills/{drillName}/drillRuns/{drillRunName}/markAsComplete":
    { deserializer: _markAsCompleteDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills/{drillName}/drillRuns/{drillRunName}/resume":
    { deserializer: _resumeDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills/{drillName}/drillRuns/{drillRunName}/addNotes":
    { deserializer: _addNotesDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills/{drillName}/drillRuns/{drillRunName}/reprotect":
    { deserializer: _reprotectDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills/{drillName}/drillRuns/{drillRunName}/failOver":
    { deserializer: _failOverDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills/{drillName}/resyncReadinessCheck":
    {
      deserializer: _resyncReadinessCheckDeserialize,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "POST /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills/{drillName}/addOrUpdateResources":
    {
      deserializer: _addOrUpdateResourcesDeserialize,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "POST /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills/{drillName}/end":
    { deserializer: _endDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills/{drillName}/start":
    { deserializer: _startDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills/{drillName}/validateForExecution":
    { deserializer: _validateForExecutionDeserialize, expectedStatuses: ["200", "202", "201"] },
  "DELETE /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills/{drillName}":
    { deserializer: _$deleteDeserializeDrills, expectedStatuses: ["202", "204", "200"] },
  "PATCH /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills/{drillName}":
    { deserializer: _updateDeserializeDrills, expectedStatuses: ["200", "202", "201"] },
  "PUT /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills/{drillName}":
    { deserializer: _createDeserialize, expectedStatuses: ["200", "201", "202"] },
  "POST /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/recoveryJobs/{recoveryJobName}/retry":
    { deserializer: _retryDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/recoveryJobs/{recoveryJobName}/resume":
    { deserializer: _resumeDeserializeRecoveryJobs, expectedStatuses: ["202", "200", "201"] },
  "POST /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/recoveryJobs/{recoveryJobName}/cancel":
    { deserializer: _cancelDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/testFailoverCleanup":
    { deserializer: _testFailoverCleanupDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/testFailover":
    { deserializer: _testFailoverDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/reprotect":
    {
      deserializer: _reprotectDeserializeRecoveryPlanActions,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/failoverCommit":
    { deserializer: _failoverCommitDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/failover":
    { deserializer: _failoverDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/checkReadiness":
    { deserializer: _checkReadinessDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/validateForReprotect":
    { deserializer: _validateForReprotectDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/validateForTestFailoverCleanup":
    {
      deserializer: _validateForTestFailoverCleanupDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/validateForTestFailover":
    { deserializer: _validateForTestFailoverDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/validateForFailoverCommit":
    {
      deserializer: _validateForFailoverCommitDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/validateForFailover":
    { deserializer: _validateForFailoverDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/validateForOperation":
    { deserializer: _validateForOperationDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/updateResources":
    { deserializer: _updateResourcesDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/finalize":
    { deserializer: _finalizeDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}":
    { deserializer: _$deleteDeserializeRecoveryPlans, expectedStatuses: ["202", "204", "200"] },
  "PATCH /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}":
    { deserializer: _updateDeserializeRecoveryPlans, expectedStatuses: ["200", "202", "201"] },
  "PUT /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}":
    {
      deserializer: _createOrUpdateDeserializeRecoveryPlans,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/goalTemplates/{goalTemplateName}":
    { deserializer: _$deleteDeserializeGoalTemplates, expectedStatuses: ["202", "204", "200"] },
  "PATCH /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/goalTemplates/{goalTemplateName}":
    { deserializer: _updateDeserializeGoalTemplates, expectedStatuses: ["200", "202", "201"] },
  "PUT /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/goalTemplates/{goalTemplateName}":
    {
      deserializer: _createOrUpdateDeserializeGoalTemplates,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/goalAssignments/{goalAssignmentName}/recommendCapacity":
    { deserializer: _recommendCapacityDeserialize, expectedStatuses: ["200", "202", "201"] },
  "DELETE /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/goalAssignments/{goalAssignmentName}":
    { deserializer: _$deleteDeserializeGoalAssignments, expectedStatuses: ["202", "204", "200"] },
  "POST /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/goalAssignments/{goalAssignmentName}/refreshGoalResources":
    { deserializer: _refreshGoalResourcesDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/goalAssignments/{goalAssignmentName}/updateGoalResources":
    { deserializer: _updateGoalResourcesDeserialize, expectedStatuses: ["200", "202", "201"] },
  "PATCH /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/goalAssignments/{goalAssignmentName}":
    { deserializer: _updateDeserializeGoalAssignments, expectedStatuses: ["200", "202", "201"] },
  "PUT /providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/goalAssignments/{goalAssignmentName}":
    {
      deserializer: _createOrUpdateDeserializeGoalAssignments,
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
