// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementClient } from "./cognitiveServicesManagementClient.js";
import {
  _$deleteDeserialize,
  _createOrUpdateDeserialize,
} from "./api/agentDeployments/operations.js";
import { _provisionManagedNetworkDeserialize } from "./api/managedNetworkProvisions/operations.js";
import { _postDeserialize } from "./api/outboundRules/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeManagedNetworkSettings,
  _patchDeserialize,
  _putDeserialize,
} from "./api/managedNetworkSettings/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeOutboundRule,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeOutboundRule,
} from "./api/outboundRule/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeAccountCapabilityHosts,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeAccountCapabilityHosts,
} from "./api/accountCapabilityHosts/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeRaiExternalSafetyProvider } from "./api/raiExternalSafetyProvider/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeAgentApplications,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeAgentApplications,
} from "./api/agentApplications/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeProjectCapabilityHosts,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeProjectCapabilityHosts,
} from "./api/projectCapabilityHosts/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeProjects,
  _updateDeserialize,
  _createDeserialize,
} from "./api/projects/operations.js";
import { _reconcileDeserialize } from "./api/networkSecurityPerimeterConfigurations/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeRaiToolLabels } from "./api/raiToolLabels/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeRaiTopics } from "./api/raiTopics/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeRaiBlocklists } from "./api/raiBlocklists/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeRaiBlocklistItems } from "./api/raiBlocklistItems/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeSubscriptionRaiPolicy } from "./api/subscriptionRaiPolicy/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeRaiPolicies } from "./api/raiPolicies/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeEncryptionScopes } from "./api/encryptionScopes/operations.js";
import {
  _deleteAssociationDeserialize,
  _createOrUpdateAssociationDeserialize,
  _deletePlanDeserialize,
  _updatePlanDeserialize,
  _createOrUpdatePlanDeserialize,
  _$deleteDeserialize as _$deleteDeserializeCommitmentPlans,
} from "./api/commitmentPlans/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeDeployments,
  _updateDeserialize as _updateDeserializeDeployments,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeDeployments,
} from "./api/deployments/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializePrivateEndpointConnections,
  _createOrUpdateDeserialize as _createOrUpdateDeserializePrivateEndpointConnections,
} from "./api/privateEndpointConnections/operations.js";
import { _purgeDeserialize } from "./api/deletedAccounts/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeAccounts,
  _updateDeserialize as _updateDeserializeAccounts,
  _createDeserialize as _createDeserializeAccounts,
} from "./api/accounts/operations.js";
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
  client: CognitiveServicesManagementClient,
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
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}/applications/{appName}/agentDeployments/{deploymentName}":
    { deserializer: _$deleteDeserialize, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}/applications/{appName}/agentDeployments/{deploymentName}":
    { deserializer: _createOrUpdateDeserialize, expectedStatuses: ["200", "201", "202"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/managedNetworks/{managedNetworkName}/provision":
    { deserializer: _provisionManagedNetworkDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/managedNetworks/{managedNetworkName}/batchOutboundRules":
    { deserializer: _postDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/managedNetworks/{managedNetworkName}":
    {
      deserializer: _$deleteDeserializeManagedNetworkSettings,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/managedNetworks/{managedNetworkName}":
    { deserializer: _patchDeserialize, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/managedNetworks/{managedNetworkName}":
    { deserializer: _putDeserialize, expectedStatuses: ["200", "202", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/managedNetworks/{managedNetworkName}/outboundRules/{ruleName}":
    { deserializer: _$deleteDeserializeOutboundRule, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/managedNetworks/{managedNetworkName}/outboundRules/{ruleName}":
    {
      deserializer: _createOrUpdateDeserializeOutboundRule,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/capabilityHosts/{capabilityHostName}":
    {
      deserializer: _$deleteDeserializeAccountCapabilityHosts,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/capabilityHosts/{capabilityHostName}":
    {
      deserializer: _createOrUpdateDeserializeAccountCapabilityHosts,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/raiExternalSafetyProviders/{safetyProviderName}":
    {
      deserializer: _$deleteDeserializeRaiExternalSafetyProvider,
      expectedStatuses: ["202", "204", "200"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}/applications/{name}":
    { deserializer: _$deleteDeserializeAgentApplications, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}/applications/{name}":
    {
      deserializer: _createOrUpdateDeserializeAgentApplications,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}/capabilityHosts/{capabilityHostName}":
    {
      deserializer: _$deleteDeserializeProjectCapabilityHosts,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}/capabilityHosts/{capabilityHostName}":
    {
      deserializer: _createOrUpdateDeserializeProjectCapabilityHosts,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}":
    { deserializer: _$deleteDeserializeProjects, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}":
    { deserializer: _updateDeserialize, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}":
    { deserializer: _createDeserialize, expectedStatuses: ["200", "201", "202"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/networkSecurityPerimeterConfigurations/{nspConfigurationName}/reconcile":
    { deserializer: _reconcileDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raiToolLabels/{raiToolConnectionName}":
    { deserializer: _$deleteDeserializeRaiToolLabels, expectedStatuses: ["202", "204", "200"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raitopics/{raiTopicName}":
    { deserializer: _$deleteDeserializeRaiTopics, expectedStatuses: ["202", "204", "200"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raiBlocklists/{raiBlocklistName}":
    { deserializer: _$deleteDeserializeRaiBlocklists, expectedStatuses: ["202", "204", "200"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raiBlocklists/{raiBlocklistName}/raiBlocklistItems/{raiBlocklistItemName}":
    { deserializer: _$deleteDeserializeRaiBlocklistItems, expectedStatuses: ["202", "204", "200"] },
  "DELETE /subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/raiPolicy/{raiPolicyName}":
    {
      deserializer: _$deleteDeserializeSubscriptionRaiPolicy,
      expectedStatuses: ["202", "204", "200"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raiPolicies/{raiPolicyName}":
    { deserializer: _$deleteDeserializeRaiPolicies, expectedStatuses: ["202", "204", "200"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/encryptionScopes/{encryptionScopeName}":
    { deserializer: _$deleteDeserializeEncryptionScopes, expectedStatuses: ["202", "204", "200"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/commitmentPlans/{commitmentPlanName}/accountAssociations/{commitmentPlanAssociationName}":
    { deserializer: _deleteAssociationDeserialize, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/commitmentPlans/{commitmentPlanName}/accountAssociations/{commitmentPlanAssociationName}":
    {
      deserializer: _createOrUpdateAssociationDeserialize,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/commitmentPlans/{commitmentPlanName}":
    { deserializer: _deletePlanDeserialize, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/commitmentPlans/{commitmentPlanName}":
    { deserializer: _updatePlanDeserialize, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/commitmentPlans/{commitmentPlanName}":
    { deserializer: _createOrUpdatePlanDeserialize, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/commitmentPlans/{commitmentPlanName}":
    { deserializer: _$deleteDeserializeCommitmentPlans, expectedStatuses: ["200", "202", "204"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/deployments/{deploymentName}":
    { deserializer: _$deleteDeserializeDeployments, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/deployments/{deploymentName}":
    { deserializer: _updateDeserializeDeployments, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/deployments/{deploymentName}":
    {
      deserializer: _createOrUpdateDeserializeDeployments,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/privateEndpointConnections/{privateEndpointConnectionName}":
    {
      deserializer: _$deleteDeserializePrivateEndpointConnections,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/privateEndpointConnections/{privateEndpointConnectionName}":
    {
      deserializer: _createOrUpdateDeserializePrivateEndpointConnections,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/locations/{location}/resourceGroups/{resourceGroupName}/deletedAccounts/{accountName}":
    { deserializer: _purgeDeserialize, expectedStatuses: ["200", "202", "204"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}":
    { deserializer: _$deleteDeserializeAccounts, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}":
    { deserializer: _updateDeserializeAccounts, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}":
    { deserializer: _createDeserializeAccounts, expectedStatuses: ["200", "201", "202"] },
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
