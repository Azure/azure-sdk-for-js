// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementClient } from "./apiManagementClient.js";
import { _$deleteDeserialize } from "./api/user/operations.js";
import {
  _validateDeserialize,
  _saveDeserialize,
  _deployDeserialize,
} from "./api/tenantConfiguration/operations.js";
import { _createOrUpdateDeserialize } from "./api/globalSchema/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializePrivateEndpointConnection,
  _createOrUpdateDeserialize as _createOrUpdateDeserializePrivateEndpointConnection,
} from "./api/privateEndpointConnection/operations.js";
import {
  _updateDeserialize,
  _createOrUpdateDeserialize as _createOrUpdateDeserializePortalRevision,
} from "./api/portalRevision/operations.js";
import { _createOrUpdateDeserialize as _createOrUpdateDeserializePolicyFragment } from "./api/policyFragment/operations.js";
import {
  _refreshSecretDeserialize,
  _updateDeserialize as _updateDeserializeNamedValue,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeNamedValue,
} from "./api/namedValue/operations.js";
import {
  _refreshSecretDeserialize as _refreshSecretDeserializeApiGatewayHostnameBinding,
  _$deleteDeserialize as _$deleteDeserializeApiGatewayHostnameBinding,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeApiGatewayHostnameBinding,
} from "./api/apiGatewayHostnameBinding/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeApiGatewayConfigConnection,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeApiGatewayConfigConnection,
} from "./api/apiGatewayConfigConnection/operations.js";
import { _purgeDeserialize } from "./api/deletedServices/operations.js";
import { _createOrUpdateDeserialize as _createOrUpdateDeserializeApiSchema } from "./api/apiSchema/operations.js";
import { _byServiceDeserialize } from "./api/policyRestrictionValidations/operations.js";
import {
  _refreshHostnamesDeserialize,
  _applyNetworkConfigurationUpdatesDeserialize,
  _migrateToStv2Deserialize,
  _backupDeserialize,
  _restoreDeserialize,
  _$deleteDeserialize as _$deleteDeserializeApiManagementService,
  _updateDeserialize as _updateDeserializeApiManagementService,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeApiManagementService,
} from "./api/apiManagementService/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeApi,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeApi,
} from "./api/api/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeApiGateway,
  _updateDeserialize as _updateDeserializeApiGateway,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeApiGateway,
} from "./api/apiGateway/operations.js";
import { _createOrUpdateDeserialize as _createOrUpdateDeserializeWorkspaceGlobalSchema } from "./api/workspaceGlobalSchema/operations.js";
import { _createOrUpdateDeserialize as _createOrUpdateDeserializeWorkspacePolicyFragment } from "./api/workspacePolicyFragment/operations.js";
import {
  _refreshSecretDeserialize as _refreshSecretDeserializeWorkspaceNamedValue,
  _updateDeserialize as _updateDeserializeWorkspaceNamedValue,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeWorkspaceNamedValue,
} from "./api/workspaceNamedValue/operations.js";
import { _createOrUpdateDeserialize as _createOrUpdateDeserializeWorkspaceApiSchema } from "./api/workspaceApiSchema/operations.js";
import { _performConnectivityCheckAsyncDeserialize } from "./api/apiManagementServiceResources/operations.js";
import { _createOrUpdateDeserialize as _createOrUpdateDeserializeWorkspaceApi } from "./api/workspaceApi/operations.js";
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
  client: ApiManagementClient,
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
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/users/{userId}":
    { deserializer: _$deleteDeserialize, expectedStatuses: ["202", "204", "200"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/tenant/{configurationName}/validate":
    { deserializer: _validateDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/tenant/{configurationName}/save":
    { deserializer: _saveDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/tenant/{configurationName}/deploy":
    { deserializer: _deployDeserialize, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/schemas/{schemaId}":
    { deserializer: _createOrUpdateDeserialize, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/privateEndpointConnections/{privateEndpointConnectionName}":
    {
      deserializer: _$deleteDeserializePrivateEndpointConnection,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/privateEndpointConnections/{privateEndpointConnectionName}":
    {
      deserializer: _createOrUpdateDeserializePrivateEndpointConnection,
      expectedStatuses: ["200", "202", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/portalRevisions/{portalRevisionId}":
    { deserializer: _updateDeserialize, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/portalRevisions/{portalRevisionId}":
    {
      deserializer: _createOrUpdateDeserializePortalRevision,
      expectedStatuses: ["201", "200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/policyFragments/{id}":
    {
      deserializer: _createOrUpdateDeserializePolicyFragment,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/namedValues/{namedValueId}/refreshSecret":
    { deserializer: _refreshSecretDeserialize, expectedStatuses: ["200", "202", "201"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/namedValues/{namedValueId}":
    { deserializer: _updateDeserializeNamedValue, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/namedValues/{namedValueId}":
    { deserializer: _createOrUpdateDeserializeNamedValue, expectedStatuses: ["200", "201", "202"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/gateways/{gatewayName}/hostnameBindings/{hostnameBindingName}/refreshSecret":
    {
      deserializer: _refreshSecretDeserializeApiGatewayHostnameBinding,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/gateways/{gatewayName}/hostnameBindings/{hostnameBindingName}":
    {
      deserializer: _$deleteDeserializeApiGatewayHostnameBinding,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/gateways/{gatewayName}/hostnameBindings/{hostnameBindingName}":
    {
      deserializer: _createOrUpdateDeserializeApiGatewayHostnameBinding,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/gateways/{gatewayName}/configConnections/{configConnectionName}":
    {
      deserializer: _$deleteDeserializeApiGatewayConfigConnection,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/gateways/{gatewayName}/configConnections/{configConnectionName}":
    {
      deserializer: _createOrUpdateDeserializeApiGatewayConfigConnection,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/providers/Microsoft.ApiManagement/locations/{location}/deletedservices/{serviceName}":
    { deserializer: _purgeDeserialize, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/schemas/{schemaId}":
    { deserializer: _createOrUpdateDeserializeApiSchema, expectedStatuses: ["200", "201", "202"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/validatePolicies":
    { deserializer: _byServiceDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/refreshHostnames":
    { deserializer: _refreshHostnamesDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/applynetworkconfigurationupdates":
    {
      deserializer: _applyNetworkConfigurationUpdatesDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/migrateToStv2":
    { deserializer: _migrateToStv2Deserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/backup":
    { deserializer: _backupDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/restore":
    { deserializer: _restoreDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}":
    {
      deserializer: _$deleteDeserializeApiManagementService,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}":
    {
      deserializer: _updateDeserializeApiManagementService,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}":
    {
      deserializer: _createOrUpdateDeserializeApiManagementService,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}":
    { deserializer: _$deleteDeserializeApi, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}":
    { deserializer: _createOrUpdateDeserializeApi, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/gateways/{gatewayName}":
    { deserializer: _$deleteDeserializeApiGateway, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/gateways/{gatewayName}":
    { deserializer: _updateDeserializeApiGateway, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/gateways/{gatewayName}":
    { deserializer: _createOrUpdateDeserializeApiGateway, expectedStatuses: ["200", "201", "202"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/workspaces/{workspaceId}/schemas/{schemaId}":
    {
      deserializer: _createOrUpdateDeserializeWorkspaceGlobalSchema,
      expectedStatuses: ["200", "201", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/workspaces/{workspaceId}/policyFragments/{id}":
    {
      deserializer: _createOrUpdateDeserializeWorkspacePolicyFragment,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/workspaces/{workspaceId}/namedValues/{namedValueId}/refreshSecret":
    {
      deserializer: _refreshSecretDeserializeWorkspaceNamedValue,
      expectedStatuses: ["200", "202", "201"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/workspaces/{workspaceId}/namedValues/{namedValueId}":
    {
      deserializer: _updateDeserializeWorkspaceNamedValue,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/workspaces/{workspaceId}/namedValues/{namedValueId}":
    {
      deserializer: _createOrUpdateDeserializeWorkspaceNamedValue,
      expectedStatuses: ["200", "201", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/workspaces/{workspaceId}/apis/{apiId}/schemas/{schemaId}":
    {
      deserializer: _createOrUpdateDeserializeWorkspaceApiSchema,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/connectivityCheck":
    {
      deserializer: _performConnectivityCheckAsyncDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/workspaces/{workspaceId}/apis/{apiId}":
    {
      deserializer: _createOrUpdateDeserializeWorkspaceApi,
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
