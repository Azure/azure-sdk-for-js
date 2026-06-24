// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloud } from "./networkCloud.js";
import {
  _$deleteDeserialize,
  _updateDeserialize,
  _createOrUpdateDeserialize,
} from "./api/metricsConfigurations/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeConsoles,
  _updateDeserialize as _updateDeserializeConsoles,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeConsoles,
} from "./api/consoles/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeKubernetesClusterFeatures,
  _updateDeserialize as _updateDeserializeKubernetesClusterFeatures,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeKubernetesClusterFeatures,
} from "./api/kubernetesClusterFeatures/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeAgentPools,
  _updateDeserialize as _updateDeserializeAgentPools,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeAgentPools,
} from "./api/agentPools/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeBmcKeySets,
  _updateDeserialize as _updateDeserializeBmcKeySets,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeBmcKeySets,
} from "./api/bmcKeySets/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeBareMetalMachineKeySets,
  _updateDeserialize as _updateDeserializeBareMetalMachineKeySets,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeBareMetalMachineKeySets,
} from "./api/bareMetalMachineKeySets/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeVolumes,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVolumes,
} from "./api/volumes/operations.js";
import {
  _startDeserialize,
  _restartDeserialize,
  _reimageDeserialize,
  _powerOffDeserialize,
  _assignRelayDeserialize,
  _$deleteDeserialize as _$deleteDeserializeVirtualMachines,
  _updateDeserialize as _updateDeserializeVirtualMachines,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVirtualMachines,
} from "./api/virtualMachines/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeTrunkedNetworks,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeTrunkedNetworks,
} from "./api/trunkedNetworks/operations.js";
import {
  _runReadCommandsDeserialize,
  _enableRemoteVendorManagementDeserialize,
  _disableRemoteVendorManagementDeserialize,
  _$deleteDeserialize as _$deleteDeserializeStorageAppliances,
  _updateDeserialize as _updateDeserializeStorageAppliances,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeStorageAppliances,
} from "./api/storageAppliances/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeRacks,
  _updateDeserialize as _updateDeserializeRacks,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeRacks,
} from "./api/racks/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeL3Networks,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeL3Networks,
} from "./api/l3Networks/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeL2Networks,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeL2Networks,
} from "./api/l2Networks/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeKubernetesVersions,
  _updateDeserialize as _updateDeserializeKubernetesVersions,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeKubernetesVersions,
} from "./api/kubernetesVersions/operations.js";
import {
  _restartNodeDeserialize,
  _$deleteDeserialize as _$deleteDeserializeKubernetesClusters,
  _updateDeserialize as _updateDeserializeKubernetesClusters,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeKubernetesClusters,
} from "./api/kubernetesClusters/operations.js";
import {
  _updateVersionDeserialize,
  _scanRuntimeDeserialize,
  _rotateCredentialDeserialize,
  _inspectDeserialize,
  _deployDeserialize,
  _continueUpdateVersionDeserialize,
  _$deleteDeserialize as _$deleteDeserializeClusters,
  _updateDeserialize as _updateDeserializeClusters,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeClusters,
} from "./api/clusters/operations.js";
import {
  _updateRelayPrivateEndpointConnectionDeserialize,
  _$deleteDeserialize as _$deleteDeserializeClusterManagers,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeClusterManagers,
} from "./api/clusterManagers/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeCloudServicesNetworks,
  _updateDeserialize as _updateDeserializeCloudServicesNetworks,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeCloudServicesNetworks,
} from "./api/cloudServicesNetworks/operations.js";
import {
  _uncordonDeserialize,
  _startDeserialize as _startDeserializeBareMetalMachines,
  _runReadCommandsDeserialize as _runReadCommandsDeserializeBareMetalMachines,
  _runDataExtractsRestrictedDeserialize,
  _runDataExtractsDeserialize,
  _runCommandDeserialize,
  _restartDeserialize as _restartDeserializeBareMetalMachines,
  _replaceDeserialize,
  _reimageDeserialize as _reimageDeserializeBareMetalMachines,
  _powerOffDeserialize as _powerOffDeserializeBareMetalMachines,
  _cordonDeserialize,
  _$deleteDeserialize as _$deleteDeserializeBareMetalMachines,
  _updateDeserialize as _updateDeserializeBareMetalMachines,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeBareMetalMachines,
} from "./api/bareMetalMachines/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeAccessBridges,
  _updateDeserialize as _updateDeserializeAccessBridges,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeAccessBridges,
} from "./api/accessBridges/operations.js";
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
  client: NetworkCloud,
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
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/metricsConfigurations/{metricsConfigurationName}":
    { deserializer: _$deleteDeserialize, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/metricsConfigurations/{metricsConfigurationName}":
    { deserializer: _updateDeserialize, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/metricsConfigurations/{metricsConfigurationName}":
    { deserializer: _createOrUpdateDeserialize, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}/consoles/{consoleName}":
    { deserializer: _$deleteDeserializeConsoles, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}/consoles/{consoleName}":
    { deserializer: _updateDeserializeConsoles, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}/consoles/{consoleName}":
    { deserializer: _createOrUpdateDeserializeConsoles, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}/features/{featureName}":
    {
      deserializer: _$deleteDeserializeKubernetesClusterFeatures,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}/features/{featureName}":
    {
      deserializer: _updateDeserializeKubernetesClusterFeatures,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}/features/{featureName}":
    {
      deserializer: _createOrUpdateDeserializeKubernetesClusterFeatures,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}/agentPools/{agentPoolName}":
    { deserializer: _$deleteDeserializeAgentPools, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}/agentPools/{agentPoolName}":
    { deserializer: _updateDeserializeAgentPools, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}/agentPools/{agentPoolName}":
    { deserializer: _createOrUpdateDeserializeAgentPools, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/bmcKeySets/{bmcKeySetName}":
    { deserializer: _$deleteDeserializeBmcKeySets, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/bmcKeySets/{bmcKeySetName}":
    { deserializer: _updateDeserializeBmcKeySets, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/bmcKeySets/{bmcKeySetName}":
    { deserializer: _createOrUpdateDeserializeBmcKeySets, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/bareMetalMachineKeySets/{bareMetalMachineKeySetName}":
    {
      deserializer: _$deleteDeserializeBareMetalMachineKeySets,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/bareMetalMachineKeySets/{bareMetalMachineKeySetName}":
    {
      deserializer: _updateDeserializeBareMetalMachineKeySets,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/bareMetalMachineKeySets/{bareMetalMachineKeySetName}":
    {
      deserializer: _createOrUpdateDeserializeBareMetalMachineKeySets,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/volumes/{volumeName}":
    { deserializer: _$deleteDeserializeVolumes, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/volumes/{volumeName}":
    { deserializer: _createOrUpdateDeserializeVolumes, expectedStatuses: ["200", "201", "202"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}/start":
    { deserializer: _startDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}/restart":
    { deserializer: _restartDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}/reimage":
    { deserializer: _reimageDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}/powerOff":
    { deserializer: _powerOffDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}/assignRelay":
    { deserializer: _assignRelayDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}":
    { deserializer: _$deleteDeserializeVirtualMachines, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}":
    { deserializer: _updateDeserializeVirtualMachines, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}":
    {
      deserializer: _createOrUpdateDeserializeVirtualMachines,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/trunkedNetworks/{trunkedNetworkName}":
    { deserializer: _$deleteDeserializeTrunkedNetworks, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/trunkedNetworks/{trunkedNetworkName}":
    {
      deserializer: _createOrUpdateDeserializeTrunkedNetworks,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/storageAppliances/{storageApplianceName}/runReadCommands":
    { deserializer: _runReadCommandsDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/storageAppliances/{storageApplianceName}/enableRemoteVendorManagement":
    {
      deserializer: _enableRemoteVendorManagementDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/storageAppliances/{storageApplianceName}/disableRemoteVendorManagement":
    {
      deserializer: _disableRemoteVendorManagementDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/storageAppliances/{storageApplianceName}":
    { deserializer: _$deleteDeserializeStorageAppliances, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/storageAppliances/{storageApplianceName}":
    { deserializer: _updateDeserializeStorageAppliances, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/storageAppliances/{storageApplianceName}":
    {
      deserializer: _createOrUpdateDeserializeStorageAppliances,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/racks/{rackName}":
    { deserializer: _$deleteDeserializeRacks, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/racks/{rackName}":
    { deserializer: _updateDeserializeRacks, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/racks/{rackName}":
    { deserializer: _createOrUpdateDeserializeRacks, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/l3Networks/{l3NetworkName}":
    { deserializer: _$deleteDeserializeL3Networks, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/l3Networks/{l3NetworkName}":
    { deserializer: _createOrUpdateDeserializeL3Networks, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/l2Networks/{l2NetworkName}":
    { deserializer: _$deleteDeserializeL2Networks, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/l2Networks/{l2NetworkName}":
    { deserializer: _createOrUpdateDeserializeL2Networks, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesVersions/{kubernetesVersionName}":
    {
      deserializer: _$deleteDeserializeKubernetesVersions,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesVersions/{kubernetesVersionName}":
    { deserializer: _updateDeserializeKubernetesVersions, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesVersions/{kubernetesVersionName}":
    {
      deserializer: _createOrUpdateDeserializeKubernetesVersions,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}/restartNode":
    { deserializer: _restartNodeDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}":
    {
      deserializer: _$deleteDeserializeKubernetesClusters,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}":
    { deserializer: _updateDeserializeKubernetesClusters, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}":
    {
      deserializer: _createOrUpdateDeserializeKubernetesClusters,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/updateVersion":
    { deserializer: _updateVersionDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/scanRuntime":
    { deserializer: _scanRuntimeDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/rotateCredential":
    { deserializer: _rotateCredentialDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/inspect":
    { deserializer: _inspectDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/deploy":
    { deserializer: _deployDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/continueUpdateVersion":
    { deserializer: _continueUpdateVersionDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}":
    { deserializer: _$deleteDeserializeClusters, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}":
    { deserializer: _updateDeserializeClusters, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}":
    { deserializer: _createOrUpdateDeserializeClusters, expectedStatuses: ["200", "201", "202"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusterManagers/{clusterManagerName}/updateRelayPrivateEndpointConnection":
    {
      deserializer: _updateRelayPrivateEndpointConnectionDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusterManagers/{clusterManagerName}":
    { deserializer: _$deleteDeserializeClusterManagers, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusterManagers/{clusterManagerName}":
    {
      deserializer: _createOrUpdateDeserializeClusterManagers,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/cloudServicesNetworks/{cloudServicesNetworkName}":
    {
      deserializer: _$deleteDeserializeCloudServicesNetworks,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/cloudServicesNetworks/{cloudServicesNetworkName}":
    {
      deserializer: _updateDeserializeCloudServicesNetworks,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/cloudServicesNetworks/{cloudServicesNetworkName}":
    {
      deserializer: _createOrUpdateDeserializeCloudServicesNetworks,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}/uncordon":
    { deserializer: _uncordonDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}/start":
    { deserializer: _startDeserializeBareMetalMachines, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}/runReadCommands":
    {
      deserializer: _runReadCommandsDeserializeBareMetalMachines,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}/runDataExtractsRestricted":
    {
      deserializer: _runDataExtractsRestrictedDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}/runDataExtracts":
    { deserializer: _runDataExtractsDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}/runCommand":
    { deserializer: _runCommandDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}/restart":
    { deserializer: _restartDeserializeBareMetalMachines, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}/replace":
    { deserializer: _replaceDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}/reimage":
    { deserializer: _reimageDeserializeBareMetalMachines, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}/powerOff":
    {
      deserializer: _powerOffDeserializeBareMetalMachines,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}/cordon":
    { deserializer: _cordonDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}":
    { deserializer: _$deleteDeserializeBareMetalMachines, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}":
    { deserializer: _updateDeserializeBareMetalMachines, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}":
    {
      deserializer: _createOrUpdateDeserializeBareMetalMachines,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/accessBridges/{accessBridgeName}":
    { deserializer: _$deleteDeserializeAccessBridges, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/accessBridges/{accessBridgeName}":
    { deserializer: _updateDeserializeAccessBridges, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/accessBridges/{accessBridgeName}":
    {
      deserializer: _createOrUpdateDeserializeAccessBridges,
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
