// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementClient } from "./webSiteManagementClient.js";
import { _resubmitDeserialize } from "./api/workflowTriggerHistories/operations.js";
import { _runDeserialize } from "./api/workflowTriggers/operations.js";
import {
  _$deleteDeserialize,
  _createOrUpdateDeserialize,
} from "./api/kubeEnvironments/operations.js";
import { _createOrUpdateDeserialize as _createOrUpdateDeserializeAppServicePlans } from "./api/appServicePlans/operations.js";
import {
  _createOrUpdateSourceControlDeserialize,
  _createOrUpdateSourceControlSlotDeserialize,
  _installSiteExtensionSlotDeserialize,
  _installSiteExtensionDeserialize,
  _createInstanceFunctionSlotDeserialize,
  _createFunctionDeserialize,
  _createInstanceMSDeployOperationSlotDeserialize,
  _createMSDeployOperationSlotDeserialize,
  _createInstanceMSDeployOperationDeserialize,
  _createMSDeployOperationDeserialize,
  _getSlotSiteDeploymentStatusSlotDeserialize,
  _getProductionSiteDeploymentStatusDeserialize,
  _restoreSlotDeserialize,
  _restoreDeserialize,
  _startNetworkTraceDeserialize,
  _swapSlotWithProductionDeserialize,
  _restoreSnapshotDeserialize,
  _restoreFromDeletedAppDeserialize,
  _restoreFromBackupBlobDeserialize,
  _startWebSiteNetworkTraceOperationDeserialize,
  _migrateMySqlDeserialize,
  _migrateStorageDeserialize,
  _listPublishingCredentialsDeserialize,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeWebApps,
  _deletePrivateEndpointConnectionSlotDeserialize,
  _approveOrRejectPrivateEndpointConnectionSlotDeserialize,
  _deletePrivateEndpointConnectionDeserialize,
  _approveOrRejectPrivateEndpointConnectionDeserialize,
  _startNetworkTraceSlotDeserialize,
  _swapSlotSlotDeserialize,
  _restoreSnapshotSlotDeserialize,
  _restoreFromDeletedAppSlotDeserialize,
  _restoreFromBackupBlobSlotDeserialize,
  _startWebSiteNetworkTraceOperationSlotDeserialize,
  _listPublishingCredentialsSlotDeserialize,
  _createOrUpdateSlotDeserialize,
} from "./api/webApps/operations.js";
import {
  _validateBackendForBuildDeserialize,
  _linkBackendToBuildDeserialize,
  _validateBackendDeserialize,
  _linkBackendDeserialize,
  _validateCustomDomainCanBeAddedToStaticSiteDeserialize,
  _deleteStaticSiteCustomDomainDeserialize,
  _createOrUpdateStaticSiteCustomDomainDeserialize,
  _registerUserProvidedFunctionAppWithStaticSiteDeserialize,
  _registerUserProvidedFunctionAppWithStaticSiteBuildDeserialize,
  _createZipDeploymentForStaticSiteBuildDeserialize,
  _deleteStaticSiteBuildDeserialize,
  _createZipDeploymentForStaticSiteDeserialize,
  _detachStaticSiteDeserialize,
  _deleteStaticSiteDeserialize,
  _createOrUpdateStaticSiteDeserialize,
  _deletePrivateEndpointConnectionDeserialize as _deletePrivateEndpointConnectionDeserializeStaticSites,
  _approveOrRejectPrivateEndpointConnectionDeserialize as _approveOrRejectPrivateEndpointConnectionDeserializeStaticSites,
} from "./api/staticSites/operations.js";
import {
  _deletePrivateEndpointConnectionDeserialize as _deletePrivateEndpointConnectionDeserializeAppServiceEnvironments,
  _approveOrRejectPrivateEndpointConnectionDeserialize as _approveOrRejectPrivateEndpointConnectionDeserializeAppServiceEnvironments,
  _createOrUpdateMultiRolePoolDeserialize,
  _upgradeDeserialize,
  _$deleteDeserialize as _$deleteDeserializeAppServiceEnvironments,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeAppServiceEnvironments,
  _createOrUpdateWorkerPoolDeserialize,
} from "./api/appServiceEnvironments/operations.js";
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
  client: WebSiteManagementClient,
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
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/{workflowName}/triggers/{triggerName}/histories/{historyName}/resubmit":
    { deserializer: _resubmitDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/{workflowName}/triggers/{triggerName}/run":
    { deserializer: _runDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/kubeEnvironments/{name}":
    { deserializer: _$deleteDeserialize, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/kubeEnvironments/{name}":
    { deserializer: _createOrUpdateDeserialize, expectedStatuses: ["200", "201", "202"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}":
    {
      deserializer: _createOrUpdateDeserializeAppServicePlans,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/sourcecontrols/web":
    {
      deserializer: _createOrUpdateSourceControlDeserialize,
      expectedStatuses: ["200", "201", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/sourcecontrols/web":
    {
      deserializer: _createOrUpdateSourceControlSlotDeserialize,
      expectedStatuses: ["200", "201", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/siteextensions/{siteExtensionId}":
    { deserializer: _installSiteExtensionSlotDeserialize, expectedStatuses: ["200", "201", "202"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/siteextensions/{siteExtensionId}":
    { deserializer: _installSiteExtensionDeserialize, expectedStatuses: ["200", "201", "202"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/functions/{functionName}":
    {
      deserializer: _createInstanceFunctionSlotDeserialize,
      expectedStatuses: ["201", "200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/functions/{functionName}":
    { deserializer: _createFunctionDeserialize, expectedStatuses: ["201", "200", "202"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/instances/{instanceId}/extensions/MSDeploy":
    {
      deserializer: _createInstanceMSDeployOperationSlotDeserialize,
      expectedStatuses: ["201", "200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/extensions/MSDeploy":
    {
      deserializer: _createMSDeployOperationSlotDeserialize,
      expectedStatuses: ["201", "200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/instances/{instanceId}/extensions/MSDeploy":
    {
      deserializer: _createInstanceMSDeployOperationDeserialize,
      expectedStatuses: ["201", "200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/extensions/MSDeploy":
    { deserializer: _createMSDeployOperationDeserialize, expectedStatuses: ["201", "200", "202"] },
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/deploymentStatus/{deploymentStatusId}":
    { deserializer: _getSlotSiteDeploymentStatusSlotDeserialize, expectedStatuses: ["200", "202"] },
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/deploymentStatus/{deploymentStatusId}":
    {
      deserializer: _getProductionSiteDeploymentStatusDeserialize,
      expectedStatuses: ["200", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/backups/{backupId}/restore":
    { deserializer: _restoreSlotDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/backups/{backupId}/restore":
    { deserializer: _restoreDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/startNetworkTrace":
    { deserializer: _startNetworkTraceDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slotsswap":
    { deserializer: _swapSlotWithProductionDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/restoreSnapshot":
    { deserializer: _restoreSnapshotDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/restoreFromDeletedApp":
    { deserializer: _restoreFromDeletedAppDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/restoreFromBackupBlob":
    { deserializer: _restoreFromBackupBlobDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/networkTrace/startOperation":
    {
      deserializer: _startWebSiteNetworkTraceOperationDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/migratemysql":
    { deserializer: _migrateMySqlDeserialize, expectedStatuses: ["200", "201", "202"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/migrate":
    { deserializer: _migrateStorageDeserialize, expectedStatuses: ["200", "201", "202"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/publishingcredentials/list":
    {
      deserializer: _listPublishingCredentialsDeserialize,
      expectedStatuses: ["200", "201", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}":
    { deserializer: _createOrUpdateDeserializeWebApps, expectedStatuses: ["200", "202", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/privateEndpointConnections/{privateEndpointConnectionName}":
    {
      deserializer: _deletePrivateEndpointConnectionSlotDeserialize,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/privateEndpointConnections/{privateEndpointConnectionName}":
    {
      deserializer: _approveOrRejectPrivateEndpointConnectionSlotDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/privateEndpointConnections/{privateEndpointConnectionName}":
    {
      deserializer: _deletePrivateEndpointConnectionDeserialize,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/privateEndpointConnections/{privateEndpointConnectionName}":
    {
      deserializer: _approveOrRejectPrivateEndpointConnectionDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/startNetworkTrace":
    { deserializer: _startNetworkTraceSlotDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/slotsswap":
    { deserializer: _swapSlotSlotDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/restoreSnapshot":
    { deserializer: _restoreSnapshotSlotDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/restoreFromDeletedApp":
    {
      deserializer: _restoreFromDeletedAppSlotDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/restoreFromBackupBlob":
    {
      deserializer: _restoreFromBackupBlobSlotDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/networkTrace/startOperation":
    {
      deserializer: _startWebSiteNetworkTraceOperationSlotDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/publishingcredentials/list":
    {
      deserializer: _listPublishingCredentialsSlotDeserialize,
      expectedStatuses: ["200", "201", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}":
    { deserializer: _createOrUpdateSlotDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/linkedBackends/{linkedBackendName}/validate":
    {
      deserializer: _validateBackendForBuildDeserialize,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/linkedBackends/{linkedBackendName}":
    { deserializer: _linkBackendToBuildDeserialize, expectedStatuses: ["200", "201", "202"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/linkedBackends/{linkedBackendName}/validate":
    { deserializer: _validateBackendDeserialize, expectedStatuses: ["202", "204", "200", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/linkedBackends/{linkedBackendName}":
    { deserializer: _linkBackendDeserialize, expectedStatuses: ["200", "201", "202"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/customDomains/{domainName}/validate":
    {
      deserializer: _validateCustomDomainCanBeAddedToStaticSiteDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/customDomains/{domainName}":
    { deserializer: _deleteStaticSiteCustomDomainDeserialize, expectedStatuses: ["200", "202"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/customDomains/{domainName}":
    {
      deserializer: _createOrUpdateStaticSiteCustomDomainDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/userProvidedFunctionApps/{functionAppName}":
    {
      deserializer: _registerUserProvidedFunctionAppWithStaticSiteDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/userProvidedFunctionApps/{functionAppName}":
    {
      deserializer: _registerUserProvidedFunctionAppWithStaticSiteBuildDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/zipdeploy":
    {
      deserializer: _createZipDeploymentForStaticSiteBuildDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}":
    { deserializer: _deleteStaticSiteBuildDeserialize, expectedStatuses: ["200", "202", "204"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/zipdeploy":
    {
      deserializer: _createZipDeploymentForStaticSiteDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/detach":
    { deserializer: _detachStaticSiteDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}":
    { deserializer: _deleteStaticSiteDeserialize, expectedStatuses: ["200", "202"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}":
    { deserializer: _createOrUpdateStaticSiteDeserialize, expectedStatuses: ["200", "202", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/privateEndpointConnections/{privateEndpointConnectionName}":
    {
      deserializer: _deletePrivateEndpointConnectionDeserializeStaticSites,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/privateEndpointConnections/{privateEndpointConnectionName}":
    {
      deserializer: _approveOrRejectPrivateEndpointConnectionDeserializeStaticSites,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/privateEndpointConnections/{privateEndpointConnectionName}":
    {
      deserializer: _deletePrivateEndpointConnectionDeserializeAppServiceEnvironments,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/privateEndpointConnections/{privateEndpointConnectionName}":
    {
      deserializer: _approveOrRejectPrivateEndpointConnectionDeserializeAppServiceEnvironments,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/multiRolePools/default":
    {
      deserializer: _createOrUpdateMultiRolePoolDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/upgrade":
    { deserializer: _upgradeDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}":
    {
      deserializer: _$deleteDeserializeAppServiceEnvironments,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}":
    {
      deserializer: _createOrUpdateDeserializeAppServiceEnvironments,
      expectedStatuses: ["200", "201", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/workerPools/{workerPoolName}":
    { deserializer: _createOrUpdateWorkerPoolDeserialize, expectedStatuses: ["200", "202", "201"] },
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
