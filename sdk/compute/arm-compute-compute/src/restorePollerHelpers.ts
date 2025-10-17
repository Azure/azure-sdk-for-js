// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementClient } from "./computeManagementClient.js";
import {
  _exportThrottledRequestsDeserialize,
  _exportRequestRateByIntervalDeserialize,
} from "./api/logAnalyticsOperationGroup/operations.js";
import {
  _$deleteDeserialize,
  _updateDeserialize,
  _createOrUpdateDeserialize,
} from "./api/virtualMachineScaleSetVMRunCommands/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeVirtualMachineRunCommands,
  _updateDeserialize as _updateDeserializeVirtualMachineRunCommands,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVirtualMachineRunCommands,
} from "./api/virtualMachineRunCommands/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeCapacityReservations,
  _updateDeserialize as _updateDeserializeCapacityReservations,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeCapacityReservations,
} from "./api/capacityReservations/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeRestorePoints,
  _createDeserialize,
} from "./api/restorePoints/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeRestorePointCollections } from "./api/restorePointCollections/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeImages,
  _updateDeserialize as _updateDeserializeImages,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeImages,
} from "./api/images/operations.js";
import {
  _restartDeserialize,
  _redeployDeserialize,
  _$deleteDeserialize as _$deleteDeserializeDedicatedHosts,
  _updateDeserialize as _updateDeserializeDedicatedHosts,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeDedicatedHosts,
} from "./api/dedicatedHosts/operations.js";
import { _convertToVirtualMachineScaleSetDeserialize } from "./api/availabilitySets/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeVirtualMachineExtensions,
  _updateDeserialize as _updateDeserializeVirtualMachineExtensions,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVirtualMachineExtensions,
} from "./api/virtualMachineExtensions/operations.js";
import {
  _migrateToVMScaleSetDeserialize,
  _runCommandDeserialize,
  _startDeserialize,
  _restartDeserialize as _restartDeserializeVirtualMachines,
  _reimageDeserialize,
  _redeployDeserialize as _redeployDeserializeVirtualMachines,
  _reapplyDeserialize,
  _powerOffDeserialize,
  _performMaintenanceDeserialize,
  _installPatchesDeserialize,
  _deallocateDeserialize,
  _convertToManagedDisksDeserialize,
  _captureDeserialize,
  _attachDetachDataDisksDeserialize,
  _assessPatchesDeserialize,
  _$deleteDeserialize as _$deleteDeserializeVirtualMachines,
  _updateDeserialize as _updateDeserializeVirtualMachines,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVirtualMachines,
} from "./api/virtualMachines/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeVirtualMachineScaleSetVMExtensions,
  _updateDeserialize as _updateDeserializeVirtualMachineScaleSetVMExtensions,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVirtualMachineScaleSetVMExtensions,
} from "./api/virtualMachineScaleSetVMExtensions/operations.js";
import {
  _runCommandDeserialize as _runCommandDeserializeVirtualMachineScaleSetVMS,
  _startDeserialize as _startDeserializeVirtualMachineScaleSetVMS,
  _restartDeserialize as _restartDeserializeVirtualMachineScaleSetVMS,
  _redeployDeserialize as _redeployDeserializeVirtualMachineScaleSetVMS,
  _powerOffDeserialize as _powerOffDeserializeVirtualMachineScaleSetVMS,
  _performMaintenanceDeserialize as _performMaintenanceDeserializeVirtualMachineScaleSetVMS,
  _attachDetachDataDisksDeserialize as _attachDetachDataDisksDeserializeVirtualMachineScaleSetVMS,
  _reimageAllDeserialize,
  _reimageDeserialize as _reimageDeserializeVirtualMachineScaleSetVMS,
  _deallocateDeserialize as _deallocateDeserializeVirtualMachineScaleSetVMS,
  _approveRollingUpgradeDeserialize,
  _$deleteDeserialize as _$deleteDeserializeVirtualMachineScaleSetVMS,
  _updateDeserialize as _updateDeserializeVirtualMachineScaleSetVMS,
} from "./api/virtualMachineScaleSetVMS/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeVirtualMachineScaleSetExtensions,
  _updateDeserialize as _updateDeserializeVirtualMachineScaleSetExtensions,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVirtualMachineScaleSetExtensions,
} from "./api/virtualMachineScaleSetExtensions/operations.js";
import {
  _scaleOutDeserialize,
  _cancelDeserialize,
  _startOSUpgradeDeserialize,
  _startExtensionUpgradeDeserialize,
  _startDeserialize as _startDeserializeVirtualMachineScaleSets,
  _setOrchestrationServiceStateDeserialize,
  _restartDeserialize as _restartDeserializeVirtualMachineScaleSets,
  _reimageAllDeserialize as _reimageAllDeserializeVirtualMachineScaleSets,
  _reimageDeserialize as _reimageDeserializeVirtualMachineScaleSets,
  _redeployDeserialize as _redeployDeserializeVirtualMachineScaleSets,
  _reapplyDeserialize as _reapplyDeserializeVirtualMachineScaleSets,
  _powerOffDeserialize as _powerOffDeserializeVirtualMachineScaleSets,
  _performMaintenanceDeserialize as _performMaintenanceDeserializeVirtualMachineScaleSets,
  _updateInstancesDeserialize,
  _deleteInstancesDeserialize,
  _deallocateDeserialize as _deallocateDeserializeVirtualMachineScaleSets,
  _approveRollingUpgradeDeserialize as _approveRollingUpgradeDeserializeVirtualMachineScaleSets,
  _$deleteDeserialize as _$deleteDeserializeVirtualMachineScaleSets,
  _updateDeserialize as _updateDeserializeVirtualMachineScaleSets,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVirtualMachineScaleSets,
} from "./api/virtualMachineScaleSets/operations.js";
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
  client: ComputeManagementClient,
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
  "POST /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/logAnalytics/apiAccess/getThrottledRequests":
    {
      deserializer: _exportThrottledRequestsDeserialize,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/logAnalytics/apiAccess/getRequestRateByInterval":
    {
      deserializer: _exportRequestRateByIntervalDeserialize,
      expectedStatuses: ["202", "200"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/runCommands/{runCommandName}":
    {
      deserializer: _$deleteDeserialize,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/runCommands/{runCommandName}":
    { deserializer: _updateDeserialize, expectedStatuses: ["200", "202"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/runCommands/{runCommandName}":
    {
      deserializer: _createOrUpdateDeserialize,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/runCommands/{runCommandName}":
    {
      deserializer: _$deleteDeserializeVirtualMachineRunCommands,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/runCommands/{runCommandName}":
    {
      deserializer: _updateDeserializeVirtualMachineRunCommands,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/runCommands/{runCommandName}":
    {
      deserializer: _createOrUpdateDeserializeVirtualMachineRunCommands,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/{capacityReservationGroupName}/capacityReservations/{capacityReservationName}":
    {
      deserializer: _$deleteDeserializeCapacityReservations,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/{capacityReservationGroupName}/capacityReservations/{capacityReservationName}":
    {
      deserializer: _updateDeserializeCapacityReservations,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/{capacityReservationGroupName}/capacityReservations/{capacityReservationName}":
    {
      deserializer: _createOrUpdateDeserializeCapacityReservations,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{restorePointName}":
    {
      deserializer: _$deleteDeserializeRestorePoints,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{restorePointName}":
    {
      deserializer: _createDeserialize,
      expectedStatuses: ["201", "200", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}":
    {
      deserializer: _$deleteDeserializeRestorePointCollections,
      expectedStatuses: ["200", "202", "204"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/images/{imageName}":
    {
      deserializer: _$deleteDeserializeImages,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/images/{imageName}":
    {
      deserializer: _updateDeserializeImages,
      expectedStatuses: ["200", "201", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/images/{imageName}":
    {
      deserializer: _createOrUpdateDeserializeImages,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}/hosts/{hostName}/restart":
    { deserializer: _restartDeserialize, expectedStatuses: ["200", "202"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}/hosts/{hostName}/redeploy":
    { deserializer: _redeployDeserialize, expectedStatuses: ["202", "200"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}/hosts/{hostName}":
    {
      deserializer: _$deleteDeserializeDedicatedHosts,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}/hosts/{hostName}":
    {
      deserializer: _updateDeserializeDedicatedHosts,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}/hosts/{hostName}":
    {
      deserializer: _createOrUpdateDeserializeDedicatedHosts,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}/convertToVirtualMachineScaleSet":
    {
      deserializer: _convertToVirtualMachineScaleSetDeserialize,
      expectedStatuses: ["202", "200"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/extensions/{vmExtensionName}":
    {
      deserializer: _$deleteDeserializeVirtualMachineExtensions,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/extensions/{vmExtensionName}":
    {
      deserializer: _updateDeserializeVirtualMachineExtensions,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/extensions/{vmExtensionName}":
    {
      deserializer: _createOrUpdateDeserializeVirtualMachineExtensions,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/migrateToVirtualMachineScaleSet":
    {
      deserializer: _migrateToVMScaleSetDeserialize,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/runCommand":
    { deserializer: _runCommandDeserialize, expectedStatuses: ["202", "200"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/start":
    { deserializer: _startDeserialize, expectedStatuses: ["202", "200"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/restart":
    {
      deserializer: _restartDeserializeVirtualMachines,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/reimage":
    { deserializer: _reimageDeserialize, expectedStatuses: ["202", "200"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/redeploy":
    {
      deserializer: _redeployDeserializeVirtualMachines,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/reapply":
    { deserializer: _reapplyDeserialize, expectedStatuses: ["202", "200"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/powerOff":
    { deserializer: _powerOffDeserialize, expectedStatuses: ["202", "200"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/performMaintenance":
    {
      deserializer: _performMaintenanceDeserialize,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/installPatches":
    {
      deserializer: _installPatchesDeserialize,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/deallocate":
    { deserializer: _deallocateDeserialize, expectedStatuses: ["202", "200"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/convertToManagedDisks":
    {
      deserializer: _convertToManagedDisksDeserialize,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/capture":
    { deserializer: _captureDeserialize, expectedStatuses: ["202", "200"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/attachDetachDataDisks":
    {
      deserializer: _attachDetachDataDisksDeserialize,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/assessPatches":
    {
      deserializer: _assessPatchesDeserialize,
      expectedStatuses: ["202", "200"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}":
    {
      deserializer: _$deleteDeserializeVirtualMachines,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}":
    {
      deserializer: _updateDeserializeVirtualMachines,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}":
    {
      deserializer: _createOrUpdateDeserializeVirtualMachines,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/extensions/{vmExtensionName}":
    {
      deserializer: _$deleteDeserializeVirtualMachineScaleSetVMExtensions,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/extensions/{vmExtensionName}":
    {
      deserializer: _updateDeserializeVirtualMachineScaleSetVMExtensions,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/extensions/{vmExtensionName}":
    {
      deserializer: _createOrUpdateDeserializeVirtualMachineScaleSetVMExtensions,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/runCommand":
    {
      deserializer: _runCommandDeserializeVirtualMachineScaleSetVMS,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/start":
    {
      deserializer: _startDeserializeVirtualMachineScaleSetVMS,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/restart":
    {
      deserializer: _restartDeserializeVirtualMachineScaleSetVMS,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/redeploy":
    {
      deserializer: _redeployDeserializeVirtualMachineScaleSetVMS,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/powerOff":
    {
      deserializer: _powerOffDeserializeVirtualMachineScaleSetVMS,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/performMaintenance":
    {
      deserializer: _performMaintenanceDeserializeVirtualMachineScaleSetVMS,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/attachDetachDataDisks":
    {
      deserializer: _attachDetachDataDisksDeserializeVirtualMachineScaleSetVMS,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/reimageall":
    { deserializer: _reimageAllDeserialize, expectedStatuses: ["202", "200"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/reimage":
    {
      deserializer: _reimageDeserializeVirtualMachineScaleSetVMS,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/deallocate":
    {
      deserializer: _deallocateDeserializeVirtualMachineScaleSetVMS,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/approveRollingUpgrade":
    {
      deserializer: _approveRollingUpgradeDeserialize,
      expectedStatuses: ["202", "200"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}":
    {
      deserializer: _$deleteDeserializeVirtualMachineScaleSetVMS,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}":
    {
      deserializer: _updateDeserializeVirtualMachineScaleSetVMS,
      expectedStatuses: ["200", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/extensions/{vmssExtensionName}":
    {
      deserializer: _$deleteDeserializeVirtualMachineScaleSetExtensions,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/extensions/{vmssExtensionName}":
    {
      deserializer: _updateDeserializeVirtualMachineScaleSetExtensions,
      expectedStatuses: ["200", "201", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/extensions/{vmssExtensionName}":
    {
      deserializer: _createOrUpdateDeserializeVirtualMachineScaleSetExtensions,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/scaleOut":
    { deserializer: _scaleOutDeserialize, expectedStatuses: ["202", "200"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/rollingUpgrades/cancel":
    { deserializer: _cancelDeserialize, expectedStatuses: ["202", "200"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/osRollingUpgrade":
    {
      deserializer: _startOSUpgradeDeserialize,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/extensionRollingUpgrade":
    {
      deserializer: _startExtensionUpgradeDeserialize,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/start":
    {
      deserializer: _startDeserializeVirtualMachineScaleSets,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/setOrchestrationServiceState":
    {
      deserializer: _setOrchestrationServiceStateDeserialize,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/restart":
    {
      deserializer: _restartDeserializeVirtualMachineScaleSets,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/reimageall":
    {
      deserializer: _reimageAllDeserializeVirtualMachineScaleSets,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/reimage":
    {
      deserializer: _reimageDeserializeVirtualMachineScaleSets,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/redeploy":
    {
      deserializer: _redeployDeserializeVirtualMachineScaleSets,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/reapply":
    {
      deserializer: _reapplyDeserializeVirtualMachineScaleSets,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/poweroff":
    {
      deserializer: _powerOffDeserializeVirtualMachineScaleSets,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/performMaintenance":
    {
      deserializer: _performMaintenanceDeserializeVirtualMachineScaleSets,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/manualupgrade":
    {
      deserializer: _updateInstancesDeserialize,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/delete":
    {
      deserializer: _deleteInstancesDeserialize,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/deallocate":
    {
      deserializer: _deallocateDeserializeVirtualMachineScaleSets,
      expectedStatuses: ["202", "200"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/approveRollingUpgrade":
    {
      deserializer: _approveRollingUpgradeDeserializeVirtualMachineScaleSets,
      expectedStatuses: ["202", "200"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}":
    {
      deserializer: _$deleteDeserializeVirtualMachineScaleSets,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}":
    {
      deserializer: _updateDeserializeVirtualMachineScaleSets,
      expectedStatuses: ["200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}":
    {
      deserializer: _createOrUpdateDeserializeVirtualMachineScaleSets,
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
