// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementClient } from "./azureMachineLearningServicesManagementClient.js";
import {
  _$deleteDeserialize,
  _createOrUpdateDeserialize,
} from "./api/managedNetworkSettingsRule/operations.js";
import {
  _cancelDeserialize,
  _$deleteDeserialize as _$deleteDeserializeJobs,
} from "./api/jobs/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeRegistryModelVersions,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeRegistryModelVersions,
} from "./api/registryModelVersions/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeRegistryModelContainers,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeRegistryModelContainers,
} from "./api/registryModelContainers/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeRegistryEnvironmentVersions,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeRegistryEnvironmentVersions,
} from "./api/registryEnvironmentVersions/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeRegistryEnvironmentContainers,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeRegistryEnvironmentContainers,
} from "./api/registryEnvironmentContainers/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeRegistryDataVersions,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeRegistryDataVersions,
} from "./api/registryDataVersions/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeRegistryDataContainers,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeRegistryDataContainers,
} from "./api/registryDataContainers/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeRegistryComponentVersions,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeRegistryComponentVersions,
} from "./api/registryComponentVersions/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeRegistryComponentContainers,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeRegistryComponentContainers,
} from "./api/registryComponentContainers/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeRegistryCodeVersions,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeRegistryCodeVersions,
} from "./api/registryCodeVersions/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeRegistryCodeContainers,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeRegistryCodeContainers,
} from "./api/registryCodeContainers/operations.js";
import { _provisionManagedNetworkDeserialize } from "./api/managedNetworkProvisions/operations.js";
import {
  _restartDeserialize,
  _stopDeserialize,
  _startDeserialize,
  _$deleteDeserialize as _$deleteDeserializeCompute,
  _updateDeserialize,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeCompute,
} from "./api/compute/operations.js";
import {
  _regenerateKeysDeserialize,
  _$deleteDeserialize as _$deleteDeserializeServerlessEndpoints,
  _updateDeserialize as _updateDeserializeServerlessEndpoints,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeServerlessEndpoints,
} from "./api/serverlessEndpoints/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeSchedules,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeSchedules,
} from "./api/schedules/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeOnlineDeployments,
  _updateDeserialize as _updateDeserializeOnlineDeployments,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeOnlineDeployments,
} from "./api/onlineDeployments/operations.js";
import {
  _regenerateKeysDeserialize as _regenerateKeysDeserializeOnlineEndpoints,
  _$deleteDeserialize as _$deleteDeserializeOnlineEndpoints,
  _updateDeserialize as _updateDeserializeOnlineEndpoints,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeOnlineEndpoints,
} from "./api/onlineEndpoints/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeMarketplaceSubscriptions,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeMarketplaceSubscriptions,
} from "./api/marketplaceSubscriptions/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeFeaturestoreEntityVersions,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeFeaturestoreEntityVersions,
} from "./api/featurestoreEntityVersions/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeFeaturestoreEntityContainers,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeFeaturestoreEntityContainers,
} from "./api/featurestoreEntityContainers/operations.js";
import {
  _backfillDeserialize,
  _$deleteDeserialize as _$deleteDeserializeFeaturesetVersions,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeFeaturesetVersions,
} from "./api/featuresetVersions/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeFeaturesetContainers,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeFeaturesetContainers,
} from "./api/featuresetContainers/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeCapabilityHosts,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeCapabilityHosts,
} from "./api/capabilityHosts/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeBatchDeployments,
  _updateDeserialize as _updateDeserializeBatchDeployments,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeBatchDeployments,
} from "./api/batchDeployments/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeBatchEndpoints,
  _updateDeserialize as _updateDeserializeBatchEndpoints,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeBatchEndpoints,
} from "./api/batchEndpoints/operations.js";
import { _publishDeserialize } from "./api/modelVersions/operations.js";
import { _publishDeserialize as _publishDeserializeEnvironmentVersions } from "./api/environmentVersions/operations.js";
import { _publishDeserialize as _publishDeserializeDataVersions } from "./api/dataVersions/operations.js";
import { _publishDeserialize as _publishDeserializeComponentVersions } from "./api/componentVersions/operations.js";
import { _publishDeserialize as _publishDeserializeCodeVersions } from "./api/codeVersions/operations.js";
import {
  _removeRegionsDeserialize,
  _$deleteDeserialize as _$deleteDeserializeRegistries,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeRegistries,
} from "./api/registries/operations.js";
import {
  _resyncKeysDeserialize,
  _prepareNotebookDeserialize,
  _diagnoseDeserialize,
  _$deleteDeserialize as _$deleteDeserializeWorkspaces,
  _updateDeserialize as _updateDeserializeWorkspaces,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeWorkspaces,
} from "./api/workspaces/operations.js";
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
  client: AzureMachineLearningServicesManagementClient,
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
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/outboundRules/{ruleName}":
    { deserializer: _$deleteDeserialize, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/outboundRules/{ruleName}":
    { deserializer: _createOrUpdateDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/jobs/{id}/cancel":
    { deserializer: _cancelDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/jobs/{id}":
    { deserializer: _$deleteDeserializeJobs, expectedStatuses: ["200", "202", "204"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/models/{modelName}/versions/{version}":
    {
      deserializer: _$deleteDeserializeRegistryModelVersions,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/models/{modelName}/versions/{version}":
    {
      deserializer: _createOrUpdateDeserializeRegistryModelVersions,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/models/{modelName}":
    {
      deserializer: _$deleteDeserializeRegistryModelContainers,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/models/{modelName}":
    {
      deserializer: _createOrUpdateDeserializeRegistryModelContainers,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/environments/{environmentName}/versions/{version}":
    {
      deserializer: _$deleteDeserializeRegistryEnvironmentVersions,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/environments/{environmentName}/versions/{version}":
    {
      deserializer: _createOrUpdateDeserializeRegistryEnvironmentVersions,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/environments/{environmentName}":
    {
      deserializer: _$deleteDeserializeRegistryEnvironmentContainers,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/environments/{environmentName}":
    {
      deserializer: _createOrUpdateDeserializeRegistryEnvironmentContainers,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/data/{name}/versions/{version}":
    {
      deserializer: _$deleteDeserializeRegistryDataVersions,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/data/{name}/versions/{version}":
    {
      deserializer: _createOrUpdateDeserializeRegistryDataVersions,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/data/{name}":
    {
      deserializer: _$deleteDeserializeRegistryDataContainers,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/data/{name}":
    {
      deserializer: _createOrUpdateDeserializeRegistryDataContainers,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/components/{componentName}/versions/{version}":
    {
      deserializer: _$deleteDeserializeRegistryComponentVersions,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/components/{componentName}/versions/{version}":
    {
      deserializer: _createOrUpdateDeserializeRegistryComponentVersions,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/components/{componentName}":
    {
      deserializer: _$deleteDeserializeRegistryComponentContainers,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/components/{componentName}":
    {
      deserializer: _createOrUpdateDeserializeRegistryComponentContainers,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/codes/{codeName}/versions/{version}":
    {
      deserializer: _$deleteDeserializeRegistryCodeVersions,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/codes/{codeName}/versions/{version}":
    {
      deserializer: _createOrUpdateDeserializeRegistryCodeVersions,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/codes/{codeName}":
    {
      deserializer: _$deleteDeserializeRegistryCodeContainers,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/codes/{codeName}":
    {
      deserializer: _createOrUpdateDeserializeRegistryCodeContainers,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/provisionManagedNetwork":
    { deserializer: _provisionManagedNetworkDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}/restart":
    { deserializer: _restartDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}/stop":
    { deserializer: _stopDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}/start":
    { deserializer: _startDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}":
    { deserializer: _$deleteDeserializeCompute, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}":
    { deserializer: _updateDeserialize, expectedStatuses: ["200", "201", "202"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}":
    { deserializer: _createOrUpdateDeserializeCompute, expectedStatuses: ["200", "201", "202"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/serverlessEndpoints/{name}/regenerateKeys":
    { deserializer: _regenerateKeysDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/serverlessEndpoints/{name}":
    {
      deserializer: _$deleteDeserializeServerlessEndpoints,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/serverlessEndpoints/{name}":
    {
      deserializer: _updateDeserializeServerlessEndpoints,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/serverlessEndpoints/{name}":
    {
      deserializer: _createOrUpdateDeserializeServerlessEndpoints,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/schedules/{name}":
    { deserializer: _$deleteDeserializeSchedules, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/schedules/{name}":
    { deserializer: _createOrUpdateDeserializeSchedules, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}/deployments/{deploymentName}":
    { deserializer: _$deleteDeserializeOnlineDeployments, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}/deployments/{deploymentName}":
    { deserializer: _updateDeserializeOnlineDeployments, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}/deployments/{deploymentName}":
    {
      deserializer: _createOrUpdateDeserializeOnlineDeployments,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}/regenerateKeys":
    {
      deserializer: _regenerateKeysDeserializeOnlineEndpoints,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}":
    { deserializer: _$deleteDeserializeOnlineEndpoints, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}":
    { deserializer: _updateDeserializeOnlineEndpoints, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}":
    {
      deserializer: _createOrUpdateDeserializeOnlineEndpoints,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/marketplaceSubscriptions/{name}":
    {
      deserializer: _$deleteDeserializeMarketplaceSubscriptions,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/marketplaceSubscriptions/{name}":
    {
      deserializer: _createOrUpdateDeserializeMarketplaceSubscriptions,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featurestoreEntities/{name}/versions/{version}":
    {
      deserializer: _$deleteDeserializeFeaturestoreEntityVersions,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featurestoreEntities/{name}/versions/{version}":
    {
      deserializer: _createOrUpdateDeserializeFeaturestoreEntityVersions,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featurestoreEntities/{name}":
    {
      deserializer: _$deleteDeserializeFeaturestoreEntityContainers,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featurestoreEntities/{name}":
    {
      deserializer: _createOrUpdateDeserializeFeaturestoreEntityContainers,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featuresets/{name}/versions/{version}/backfill":
    { deserializer: _backfillDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featuresets/{name}/versions/{version}":
    {
      deserializer: _$deleteDeserializeFeaturesetVersions,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featuresets/{name}/versions/{version}":
    {
      deserializer: _createOrUpdateDeserializeFeaturesetVersions,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featuresets/{name}":
    {
      deserializer: _$deleteDeserializeFeaturesetContainers,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featuresets/{name}":
    {
      deserializer: _createOrUpdateDeserializeFeaturesetContainers,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/capabilityHosts/{name}":
    { deserializer: _$deleteDeserializeCapabilityHosts, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/capabilityHosts/{name}":
    {
      deserializer: _createOrUpdateDeserializeCapabilityHosts,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/batchEndpoints/{endpointName}/deployments/{deploymentName}":
    { deserializer: _$deleteDeserializeBatchDeployments, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/batchEndpoints/{endpointName}/deployments/{deploymentName}":
    { deserializer: _updateDeserializeBatchDeployments, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/batchEndpoints/{endpointName}/deployments/{deploymentName}":
    {
      deserializer: _createOrUpdateDeserializeBatchDeployments,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/batchEndpoints/{endpointName}":
    { deserializer: _$deleteDeserializeBatchEndpoints, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/batchEndpoints/{endpointName}":
    { deserializer: _updateDeserializeBatchEndpoints, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/batchEndpoints/{endpointName}":
    {
      deserializer: _createOrUpdateDeserializeBatchEndpoints,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/models/{name}/versions/{version}/publish":
    { deserializer: _publishDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/environments/{name}/versions/{version}/publish":
    {
      deserializer: _publishDeserializeEnvironmentVersions,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/data/{name}/versions/{version}/publish":
    { deserializer: _publishDeserializeDataVersions, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/components/{name}/versions/{version}/publish":
    { deserializer: _publishDeserializeComponentVersions, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/codes/{name}/versions/{version}/publish":
    { deserializer: _publishDeserializeCodeVersions, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/removeRegions":
    { deserializer: _removeRegionsDeserialize, expectedStatuses: ["200", "202", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}":
    { deserializer: _$deleteDeserializeRegistries, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}":
    { deserializer: _createOrUpdateDeserializeRegistries, expectedStatuses: ["200", "201", "202"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/resyncKeys":
    { deserializer: _resyncKeysDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/prepareNotebook":
    { deserializer: _prepareNotebookDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/diagnose":
    { deserializer: _diagnoseDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}":
    { deserializer: _$deleteDeserializeWorkspaces, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}":
    { deserializer: _updateDeserializeWorkspaces, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}":
    { deserializer: _createOrUpdateDeserializeWorkspaces, expectedStatuses: ["200", "202", "201"] },
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
