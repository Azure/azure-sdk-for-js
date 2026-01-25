// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIClient } from "./azureStackHCIClient.js";
import { _$deleteDeserialize } from "./api/updateSummaries/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeEdgeMachineJobs,
  _createOrUpdateDeserialize,
} from "./api/edgeMachineJobs/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeEdgeMachines,
  _updateDeserialize,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeEdgeMachines,
} from "./api/edgeMachines/operations.js";
import {
  _postDeserialize,
  _$deleteDeserialize as _$deleteDeserializeUpdates,
} from "./api/updates/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeUpdateRuns } from "./api/updateRuns/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeSecuritySettings,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeSecuritySettings,
} from "./api/securitySettings/operations.js";
import {
  _upgradeDeserialize,
  _$deleteDeserialize as _$deleteDeserializeExtensions,
  _updateDeserialize as _updateDeserializeExtensions,
  _createDeserialize,
} from "./api/extensions/operations.js";
import {
  _validateDeserialize,
  _$deleteDeserialize as _$deleteDeserializeEdgeDevices,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeEdgeDevices,
} from "./api/edgeDevices/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeEdgeDeviceJobs,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeEdgeDeviceJobs,
} from "./api/edgeDeviceJobs/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeDeploymentSettings,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeDeploymentSettings,
} from "./api/deploymentSettings/operations.js";
import {
  _configureRemoteSupportDeserialize,
  _triggerLogCollectionDeserialize,
  _changeRingDeserialize,
  _extendSoftwareAssuranceBenefitDeserialize,
  _createIdentityDeserialize,
  _uploadCertificateDeserialize,
  _updateSecretsLocationsDeserialize,
  _$deleteDeserialize as _$deleteDeserializeClusters,
} from "./api/clusters/operations.js";
import {
  _initializeDisableProcessDeserialize,
  _reconcileDeserialize,
  _createIdentityDeserialize as _createIdentityDeserializeArcSettings,
  _$deleteDeserialize as _$deleteDeserializeArcSettings,
} from "./api/arcSettings/operations.js";
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
  client: AzureStackHCIClient,
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
  deserializer: (result: PathUncheckedResponse) => Promise<any>;
  expectedStatuses: string[];
}

const deserializeMap: Record<string, DeserializationHelper> = {
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/updateSummaries/default":
    { deserializer: _$deleteDeserialize, expectedStatuses: ["200", "202", "204", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/edgeMachines/{edgeMachineName}/jobs/{jobsName}":
    {
      deserializer: _$deleteDeserializeEdgeMachineJobs,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/edgeMachines/{edgeMachineName}/jobs/{jobsName}":
    { deserializer: _createOrUpdateDeserialize, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/edgeMachines/{edgeMachineName}":
    {
      deserializer: _$deleteDeserializeEdgeMachines,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/edgeMachines/{edgeMachineName}":
    { deserializer: _updateDeserialize, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/edgeMachines/{edgeMachineName}":
    {
      deserializer: _createOrUpdateDeserializeEdgeMachines,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/updates/{updateName}/apply":
    { deserializer: _postDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/updates/{updateName}":
    { deserializer: _$deleteDeserializeUpdates, expectedStatuses: ["200", "202", "204", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/updates/{updateName}/updateRuns/{updateRunName}":
    { deserializer: _$deleteDeserializeUpdateRuns, expectedStatuses: ["200", "202", "204", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/securitySettings/{securitySettingsName}":
    {
      deserializer: _$deleteDeserializeSecuritySettings,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/securitySettings/{securitySettingsName}":
    {
      deserializer: _createOrUpdateDeserializeSecuritySettings,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}/extensions/{extensionName}/upgrade":
    { deserializer: _upgradeDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}/extensions/{extensionName}":
    { deserializer: _$deleteDeserializeExtensions, expectedStatuses: ["200", "202", "204", "201"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}/extensions/{extensionName}":
    { deserializer: _updateDeserializeExtensions, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}/extensions/{extensionName}":
    { deserializer: _createDeserialize, expectedStatuses: ["200", "201", "202"] },
  "POST /{resourceUri}/providers/Microsoft.AzureStackHCI/edgeDevices/{edgeDeviceName}/validate": {
    deserializer: _validateDeserialize,
    expectedStatuses: ["202", "200", "201"],
  },
  "DELETE /{resourceUri}/providers/Microsoft.AzureStackHCI/edgeDevices/{edgeDeviceName}": {
    deserializer: _$deleteDeserializeEdgeDevices,
    expectedStatuses: ["202", "204", "200", "201"],
  },
  "PUT /{resourceUri}/providers/Microsoft.AzureStackHCI/edgeDevices/{edgeDeviceName}": {
    deserializer: _createOrUpdateDeserializeEdgeDevices,
    expectedStatuses: ["200", "201", "202"],
  },
  "DELETE /{resourceUri}/providers/Microsoft.AzureStackHCI/edgeDevices/{edgeDeviceName}/jobs/{jobsName}":
    {
      deserializer: _$deleteDeserializeEdgeDeviceJobs,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PUT /{resourceUri}/providers/Microsoft.AzureStackHCI/edgeDevices/{edgeDeviceName}/jobs/{jobsName}":
    {
      deserializer: _createOrUpdateDeserializeEdgeDeviceJobs,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/deploymentSettings/{deploymentSettingsName}":
    {
      deserializer: _$deleteDeserializeDeploymentSettings,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/deploymentSettings/{deploymentSettingsName}":
    {
      deserializer: _createOrUpdateDeserializeDeploymentSettings,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/configureRemoteSupport":
    { deserializer: _configureRemoteSupportDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/triggerLogCollection":
    { deserializer: _triggerLogCollectionDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/changeRing":
    { deserializer: _changeRingDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/extendSoftwareAssuranceBenefit":
    {
      deserializer: _extendSoftwareAssuranceBenefitDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/createClusterIdentity":
    { deserializer: _createIdentityDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/uploadCertificate":
    { deserializer: _uploadCertificateDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/updateSecretsLocations":
    { deserializer: _updateSecretsLocationsDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}":
    { deserializer: _$deleteDeserializeClusters, expectedStatuses: ["200", "202", "204", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}/initializeDisableProcess":
    { deserializer: _initializeDisableProcessDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}/reconcile":
    { deserializer: _reconcileDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}/createArcIdentity":
    {
      deserializer: _createIdentityDeserializeArcSettings,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}":
    {
      deserializer: _$deleteDeserializeArcSettings,
      expectedStatuses: ["200", "202", "204", "201"],
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
