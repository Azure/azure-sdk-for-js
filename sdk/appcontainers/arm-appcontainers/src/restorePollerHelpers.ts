// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "./containerAppsAPIClient.js";
import { _$deleteDeserialize } from "./api/httpRouteConfig/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeManagedEnvironmentPrivateEndpointConnections,
  _createOrUpdateDeserialize,
} from "./api/managedEnvironmentPrivateEndpointConnections/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeConnectedEnvironmentsCertificates,
  _updateDeserialize,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeConnectedEnvironmentsCertificates,
} from "./api/connectedEnvironmentsCertificates/operations.js";
import {
  _stopExecutionDeserialize,
  _suspendDeserialize,
  _resumeDeserialize,
  _stopMultipleExecutionsDeserialize,
  _startDeserialize,
  _$deleteDeserialize as _$deleteDeserializeJobs,
  _updateDeserialize as _updateDeserializeJobs,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeJobs,
} from "./api/jobs/operations.js";
import { _createOrUpdateDeserialize as _createOrUpdateDeserializeManagedCertificates } from "./api/managedCertificates/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeConnectedEnvironmentsStorages,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeConnectedEnvironmentsStorages,
} from "./api/connectedEnvironmentsStorages/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeConnectedEnvironmentsDaprComponents,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeConnectedEnvironmentsDaprComponents,
} from "./api/connectedEnvironmentsDaprComponents/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeManagedEnvironments,
  _updateDeserialize as _updateDeserializeManagedEnvironments,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeManagedEnvironments,
} from "./api/managedEnvironments/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeConnectedEnvironments,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeConnectedEnvironments,
} from "./api/connectedEnvironments/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeBuilds,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeBuilds,
} from "./api/builds/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeBuilders,
  _updateDeserialize as _updateDeserializeBuilders,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeBuilders,
} from "./api/builders/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeJavaComponents,
  _updateDeserialize as _updateDeserializeJavaComponents,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeJavaComponents,
} from "./api/javaComponents/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeDotNetComponents,
  _updateDeserialize as _updateDeserializeDotNetComponents,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeDotNetComponents,
} from "./api/dotNetComponents/operations.js";
import {
  _applyDeserialize,
  _skipConfigureDeserialize,
  _$deleteDeserialize as _$deleteDeserializeContainerAppsPatches,
} from "./api/containerAppsPatches/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeContainerAppsBuilds } from "./api/containerAppsBuilds/operations.js";
import {
  _stopDeserialize,
  _startDeserialize as _startDeserializeContainerApps,
  _$deleteDeserialize as _$deleteDeserializeContainerApps,
  _updateDeserialize as _updateDeserializeContainerApps,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeContainerApps,
} from "./api/containerApps/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeContainerAppsSourceControls,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeContainerAppsSourceControls,
} from "./api/containerAppsSourceControls/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeContainerAppsSessionPools,
  _updateDeserialize as _updateDeserializeContainerAppsSessionPools,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeContainerAppsSessionPools,
} from "./api/containerAppsSessionPools/operations.js";
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
  client: ContainerAppsAPIClient,
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
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/httpRouteConfigs/{httpRouteName}":
    { deserializer: _$deleteDeserialize, expectedStatuses: ["202", "204", "200"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/privateEndpointConnections/{privateEndpointConnectionName}":
    {
      deserializer: _$deleteDeserializeManagedEnvironmentPrivateEndpointConnections,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/privateEndpointConnections/{privateEndpointConnectionName}":
    { deserializer: _createOrUpdateDeserialize, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/certificates/{certificateName}":
    {
      deserializer: _$deleteDeserializeConnectedEnvironmentsCertificates,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/certificates/{certificateName}":
    { deserializer: _updateDeserialize, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/certificates/{certificateName}":
    {
      deserializer: _createOrUpdateDeserializeConnectedEnvironmentsCertificates,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}/executions/{jobExecutionName}/stop":
    { deserializer: _stopExecutionDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}/suspend":
    { deserializer: _suspendDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}/resume":
    { deserializer: _resumeDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}/stop":
    { deserializer: _stopMultipleExecutionsDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}/start":
    { deserializer: _startDeserialize, expectedStatuses: ["200", "202", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}":
    { deserializer: _$deleteDeserializeJobs, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}":
    { deserializer: _updateDeserializeJobs, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}":
    { deserializer: _createOrUpdateDeserializeJobs, expectedStatuses: ["200", "201", "202"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/managedCertificates/{managedCertificateName}":
    {
      deserializer: _createOrUpdateDeserializeManagedCertificates,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/storages/{storageName}":
    {
      deserializer: _$deleteDeserializeConnectedEnvironmentsStorages,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/storages/{storageName}":
    {
      deserializer: _createOrUpdateDeserializeConnectedEnvironmentsStorages,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/daprComponents/{componentName}":
    {
      deserializer: _$deleteDeserializeConnectedEnvironmentsDaprComponents,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/daprComponents/{componentName}":
    {
      deserializer: _createOrUpdateDeserializeConnectedEnvironmentsDaprComponents,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}":
    {
      deserializer: _$deleteDeserializeManagedEnvironments,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}":
    {
      deserializer: _updateDeserializeManagedEnvironments,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}":
    {
      deserializer: _createOrUpdateDeserializeManagedEnvironments,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}":
    {
      deserializer: _$deleteDeserializeConnectedEnvironments,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}":
    {
      deserializer: _createOrUpdateDeserializeConnectedEnvironments,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/builders/{builderName}/builds/{buildName}":
    { deserializer: _$deleteDeserializeBuilds, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/builders/{builderName}/builds/{buildName}":
    { deserializer: _createOrUpdateDeserializeBuilds, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/builders/{builderName}":
    { deserializer: _$deleteDeserializeBuilders, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/builders/{builderName}":
    { deserializer: _updateDeserializeBuilders, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/builders/{builderName}":
    { deserializer: _createOrUpdateDeserializeBuilders, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/javaComponents/{name}":
    { deserializer: _$deleteDeserializeJavaComponents, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/javaComponents/{name}":
    { deserializer: _updateDeserializeJavaComponents, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/javaComponents/{name}":
    {
      deserializer: _createOrUpdateDeserializeJavaComponents,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/dotNetComponents/{name}":
    { deserializer: _$deleteDeserializeDotNetComponents, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/dotNetComponents/{name}":
    { deserializer: _updateDeserializeDotNetComponents, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/dotNetComponents/{name}":
    {
      deserializer: _createOrUpdateDeserializeDotNetComponents,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/patches/{patchName}/apply":
    { deserializer: _applyDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/patches/{patchName}/skipConfig":
    { deserializer: _skipConfigureDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/patches/{patchName}":
    {
      deserializer: _$deleteDeserializeContainerAppsPatches,
      expectedStatuses: ["202", "204", "200"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/builds/{buildName}":
    {
      deserializer: _$deleteDeserializeContainerAppsBuilds,
      expectedStatuses: ["202", "204", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/stop":
    { deserializer: _stopDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/start":
    { deserializer: _startDeserializeContainerApps, expectedStatuses: ["200", "202", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}":
    { deserializer: _$deleteDeserializeContainerApps, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}":
    { deserializer: _updateDeserializeContainerApps, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}":
    {
      deserializer: _createOrUpdateDeserializeContainerApps,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/sourcecontrols/{sourceControlName}":
    {
      deserializer: _$deleteDeserializeContainerAppsSourceControls,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/sourcecontrols/{sourceControlName}":
    {
      deserializer: _createOrUpdateDeserializeContainerAppsSourceControls,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/sessionPools/{sessionPoolName}":
    {
      deserializer: _$deleteDeserializeContainerAppsSessionPools,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/sessionPools/{sessionPoolName}":
    {
      deserializer: _updateDeserializeContainerAppsSessionPools,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/sessionPools/{sessionPoolName}":
    {
      deserializer: _createOrUpdateDeserializeContainerAppsSessionPools,
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
