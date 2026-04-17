// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeClient } from "./computeClient.js";
import { _updateDeserialize } from "./api/gallerySharingProfile/operations.js";
import {
  _revokeAccessDeserialize,
  _grantAccessDeserialize,
} from "./api/diskRestorePoint/operations.js";
import {
  _exportThrottledRequestsDeserialize,
  _exportRequestRateByIntervalDeserialize,
} from "./api/logAnalytics/operations.js";
import {
  _runCommandDeserialize,
  _startDeserialize,
  _restartDeserialize,
  _redeployDeserialize,
  _powerOffDeserialize,
  _performMaintenanceDeserialize,
  _attachDetachDataDisksDeserialize,
  _reimageAllDeserialize,
  _reimageDeserialize,
  _deallocateDeserialize,
  _approveRollingUpgradeDeserialize,
  _$deleteDeserialize,
  _updateDeserialize as _updateDeserializeVirtualMachineScaleSetVMs,
} from "./api/virtualMachineScaleSetVMs/operations.js";
import {
  _cancelDeserialize,
  _startOSUpgradeDeserialize,
  _startExtensionUpgradeDeserialize,
} from "./api/virtualMachineScaleSetRollingUpgrades/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeGalleryInVMAccessControlProfileVersions,
  _updateDeserialize as _updateDeserializeGalleryInVMAccessControlProfileVersions,
  _createOrUpdateDeserialize,
} from "./api/galleryInVMAccessControlProfileVersions/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeGalleryInVMAccessControlProfiles,
  _updateDeserialize as _updateDeserializeGalleryInVMAccessControlProfiles,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeGalleryInVMAccessControlProfiles,
} from "./api/galleryInVMAccessControlProfiles/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeGalleryScriptVersions,
  _updateDeserialize as _updateDeserializeGalleryScriptVersions,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeGalleryScriptVersions,
} from "./api/galleryScriptVersions/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeGalleryScripts,
  _updateDeserialize as _updateDeserializeGalleryScripts,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeGalleryScripts,
} from "./api/galleryScripts/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeGalleryApplicationVersions,
  _updateDeserialize as _updateDeserializeGalleryApplicationVersions,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeGalleryApplicationVersions,
} from "./api/galleryApplicationVersions/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeGalleryApplications,
  _updateDeserialize as _updateDeserializeGalleryApplications,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeGalleryApplications,
} from "./api/galleryApplications/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeGalleryImageVersions,
  _updateDeserialize as _updateDeserializeGalleryImageVersions,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeGalleryImageVersions,
} from "./api/galleryImageVersions/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeGalleryImages,
  _updateDeserialize as _updateDeserializeGalleryImages,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeGalleryImages,
} from "./api/galleryImages/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeGalleries,
  _updateDeserialize as _updateDeserializeGalleries,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeGalleries,
} from "./api/galleries/operations.js";
import {
  _revokeAccessDeserialize as _revokeAccessDeserializeSnapshots,
  _grantAccessDeserialize as _grantAccessDeserializeSnapshots,
  _$deleteDeserialize as _$deleteDeserializeSnapshots,
  _updateDeserialize as _updateDeserializeSnapshots,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeSnapshots,
} from "./api/snapshots/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeDiskEncryptionSets,
  _updateDeserialize as _updateDeserializeDiskEncryptionSets,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeDiskEncryptionSets,
} from "./api/diskEncryptionSets/operations.js";
import {
  _deleteAPrivateEndpointConnectionDeserialize,
  _updateAPrivateEndpointConnectionDeserialize,
  _$deleteDeserialize as _$deleteDeserializeDiskAccesses,
  _updateDeserialize as _updateDeserializeDiskAccesses,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeDiskAccesses,
} from "./api/diskAccesses/operations.js";
import {
  _revokeAccessDeserialize as _revokeAccessDeserializeDisks,
  _grantAccessDeserialize as _grantAccessDeserializeDisks,
  _$deleteDeserialize as _$deleteDeserializeDisks,
  _updateDeserialize as _updateDeserializeDisks,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeDisks,
} from "./api/disks/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeVirtualMachineScaleSetVMRunCommands,
  _updateDeserialize as _updateDeserializeVirtualMachineScaleSetVMRunCommands,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVirtualMachineScaleSetVMRunCommands,
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
  _restartDeserialize as _restartDeserializeDedicatedHosts,
  _redeployDeserialize as _redeployDeserializeDedicatedHosts,
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
  _runCommandDeserialize as _runCommandDeserializeVirtualMachines,
  _startDeserialize as _startDeserializeVirtualMachines,
  _restartDeserialize as _restartDeserializeVirtualMachines,
  _reimageDeserialize as _reimageDeserializeVirtualMachines,
  _redeployDeserialize as _redeployDeserializeVirtualMachines,
  _reapplyDeserialize,
  _powerOffDeserialize as _powerOffDeserializeVirtualMachines,
  _performMaintenanceDeserialize as _performMaintenanceDeserializeVirtualMachines,
  _installPatchesDeserialize,
  _deallocateDeserialize as _deallocateDeserializeVirtualMachines,
  _convertToManagedDisksDeserialize,
  _captureDeserialize,
  _attachDetachDataDisksDeserialize as _attachDetachDataDisksDeserializeVirtualMachines,
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
  _$deleteDeserialize as _$deleteDeserializeVirtualMachineScaleSetExtensions,
  _updateDeserialize as _updateDeserializeVirtualMachineScaleSetExtensions,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVirtualMachineScaleSetExtensions,
} from "./api/virtualMachineScaleSetExtensions/operations.js";
import {
  _scaleOutDeserialize,
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
  client: ComputeClient,
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
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/share":
    { deserializer: _updateDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{vmRestorePointName}/diskRestorePoints/{diskRestorePointName}/endGetAccess":
    { deserializer: _revokeAccessDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{vmRestorePointName}/diskRestorePoints/{diskRestorePointName}/beginGetAccess":
    { deserializer: _grantAccessDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/logAnalytics/apiAccess/getThrottledRequests":
    { deserializer: _exportThrottledRequestsDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/logAnalytics/apiAccess/getRequestRateByInterval":
    {
      deserializer: _exportRequestRateByIntervalDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/runCommand":
    { deserializer: _runCommandDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/start":
    { deserializer: _startDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/restart":
    { deserializer: _restartDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/redeploy":
    { deserializer: _redeployDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/powerOff":
    { deserializer: _powerOffDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/performMaintenance":
    { deserializer: _performMaintenanceDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/attachDetachDataDisks":
    { deserializer: _attachDetachDataDisksDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/reimageall":
    { deserializer: _reimageAllDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/reimage":
    { deserializer: _reimageDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/deallocate":
    { deserializer: _deallocateDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/approveRollingUpgrade":
    { deserializer: _approveRollingUpgradeDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}":
    { deserializer: _$deleteDeserialize, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}":
    {
      deserializer: _updateDeserializeVirtualMachineScaleSetVMs,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/rollingUpgrades/cancel":
    { deserializer: _cancelDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/osRollingUpgrade":
    { deserializer: _startOSUpgradeDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/extensionRollingUpgrade":
    { deserializer: _startExtensionUpgradeDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/inVMAccessControlProfiles/{inVMAccessControlProfileName}/versions/{inVMAccessControlProfileVersionName}":
    {
      deserializer: _$deleteDeserializeGalleryInVMAccessControlProfileVersions,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/inVMAccessControlProfiles/{inVMAccessControlProfileName}/versions/{inVMAccessControlProfileVersionName}":
    {
      deserializer: _updateDeserializeGalleryInVMAccessControlProfileVersions,
      expectedStatuses: ["200", "201", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/inVMAccessControlProfiles/{inVMAccessControlProfileName}/versions/{inVMAccessControlProfileVersionName}":
    { deserializer: _createOrUpdateDeserialize, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/inVMAccessControlProfiles/{inVMAccessControlProfileName}":
    {
      deserializer: _$deleteDeserializeGalleryInVMAccessControlProfiles,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/inVMAccessControlProfiles/{inVMAccessControlProfileName}":
    {
      deserializer: _updateDeserializeGalleryInVMAccessControlProfiles,
      expectedStatuses: ["200", "201", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/inVMAccessControlProfiles/{inVMAccessControlProfileName}":
    {
      deserializer: _createOrUpdateDeserializeGalleryInVMAccessControlProfiles,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/scripts/{galleryScriptName}/versions/{galleryScriptVersionName}":
    {
      deserializer: _$deleteDeserializeGalleryScriptVersions,
      expectedStatuses: ["202", "204", "200"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/scripts/{galleryScriptName}/versions/{galleryScriptVersionName}":
    {
      deserializer: _updateDeserializeGalleryScriptVersions,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/scripts/{galleryScriptName}/versions/{galleryScriptVersionName}":
    {
      deserializer: _createOrUpdateDeserializeGalleryScriptVersions,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/scripts/{galleryScriptName}":
    { deserializer: _$deleteDeserializeGalleryScripts, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/scripts/{galleryScriptName}":
    { deserializer: _updateDeserializeGalleryScripts, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/scripts/{galleryScriptName}":
    {
      deserializer: _createOrUpdateDeserializeGalleryScripts,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}/versions/{galleryApplicationVersionName}":
    {
      deserializer: _$deleteDeserializeGalleryApplicationVersions,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}/versions/{galleryApplicationVersionName}":
    {
      deserializer: _updateDeserializeGalleryApplicationVersions,
      expectedStatuses: ["200", "201", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}/versions/{galleryApplicationVersionName}":
    {
      deserializer: _createOrUpdateDeserializeGalleryApplicationVersions,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}":
    {
      deserializer: _$deleteDeserializeGalleryApplications,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}":
    {
      deserializer: _updateDeserializeGalleryApplications,
      expectedStatuses: ["200", "201", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}":
    {
      deserializer: _createOrUpdateDeserializeGalleryApplications,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}/versions/{galleryImageVersionName}":
    {
      deserializer: _$deleteDeserializeGalleryImageVersions,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}/versions/{galleryImageVersionName}":
    {
      deserializer: _updateDeserializeGalleryImageVersions,
      expectedStatuses: ["200", "201", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}/versions/{galleryImageVersionName}":
    {
      deserializer: _createOrUpdateDeserializeGalleryImageVersions,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}":
    { deserializer: _$deleteDeserializeGalleryImages, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}":
    { deserializer: _updateDeserializeGalleryImages, expectedStatuses: ["200", "201", "202"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{galleryImageName}":
    {
      deserializer: _createOrUpdateDeserializeGalleryImages,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}":
    { deserializer: _$deleteDeserializeGalleries, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}":
    { deserializer: _updateDeserializeGalleries, expectedStatuses: ["200", "201", "202"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}":
    { deserializer: _createOrUpdateDeserializeGalleries, expectedStatuses: ["200", "201", "202"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}/endGetAccess":
    { deserializer: _revokeAccessDeserializeSnapshots, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}/beginGetAccess":
    { deserializer: _grantAccessDeserializeSnapshots, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}":
    { deserializer: _$deleteDeserializeSnapshots, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}":
    { deserializer: _updateDeserializeSnapshots, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}":
    { deserializer: _createOrUpdateDeserializeSnapshots, expectedStatuses: ["200", "202", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}":
    {
      deserializer: _$deleteDeserializeDiskEncryptionSets,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}":
    { deserializer: _updateDeserializeDiskEncryptionSets, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}":
    {
      deserializer: _createOrUpdateDeserializeDiskEncryptionSets,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}/privateEndpointConnections/{privateEndpointConnectionName}":
    {
      deserializer: _deleteAPrivateEndpointConnectionDeserialize,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}/privateEndpointConnections/{privateEndpointConnectionName}":
    {
      deserializer: _updateAPrivateEndpointConnectionDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}":
    { deserializer: _$deleteDeserializeDiskAccesses, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}":
    { deserializer: _updateDeserializeDiskAccesses, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}":
    {
      deserializer: _createOrUpdateDeserializeDiskAccesses,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/disks/{diskName}/endGetAccess":
    { deserializer: _revokeAccessDeserializeDisks, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/disks/{diskName}/beginGetAccess":
    { deserializer: _grantAccessDeserializeDisks, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/disks/{diskName}":
    { deserializer: _$deleteDeserializeDisks, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/disks/{diskName}":
    { deserializer: _updateDeserializeDisks, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/disks/{diskName}":
    { deserializer: _createOrUpdateDeserializeDisks, expectedStatuses: ["200", "202", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/runCommands/{runCommandName}":
    {
      deserializer: _$deleteDeserializeVirtualMachineScaleSetVMRunCommands,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/runCommands/{runCommandName}":
    {
      deserializer: _updateDeserializeVirtualMachineScaleSetVMRunCommands,
      expectedStatuses: ["200", "201", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/runCommands/{runCommandName}":
    {
      deserializer: _createOrUpdateDeserializeVirtualMachineScaleSetVMRunCommands,
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
      expectedStatuses: ["200", "201", "202"],
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
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/{capacityReservationGroupName}/capacityReservations/{capacityReservationName}":
    {
      deserializer: _createOrUpdateDeserializeCapacityReservations,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{restorePointName}":
    { deserializer: _$deleteDeserializeRestorePoints, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{restorePointName}":
    { deserializer: _createDeserialize, expectedStatuses: ["201", "200", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}":
    {
      deserializer: _$deleteDeserializeRestorePointCollections,
      expectedStatuses: ["200", "202", "204"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/images/{imageName}":
    { deserializer: _$deleteDeserializeImages, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/images/{imageName}":
    { deserializer: _updateDeserializeImages, expectedStatuses: ["200", "201", "202"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/images/{imageName}":
    { deserializer: _createOrUpdateDeserializeImages, expectedStatuses: ["200", "201", "202"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}/hosts/{hostName}/restart":
    { deserializer: _restartDeserializeDedicatedHosts, expectedStatuses: ["200", "201", "202"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}/hosts/{hostName}/redeploy":
    { deserializer: _redeployDeserializeDedicatedHosts, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}/hosts/{hostName}":
    { deserializer: _$deleteDeserializeDedicatedHosts, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}/hosts/{hostName}":
    { deserializer: _updateDeserializeDedicatedHosts, expectedStatuses: ["200", "201", "202"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}/hosts/{hostName}":
    {
      deserializer: _createOrUpdateDeserializeDedicatedHosts,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}/convertToVirtualMachineScaleSet":
    {
      deserializer: _convertToVirtualMachineScaleSetDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/extensions/{vmExtensionName}":
    {
      deserializer: _$deleteDeserializeVirtualMachineExtensions,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/extensions/{vmExtensionName}":
    {
      deserializer: _updateDeserializeVirtualMachineExtensions,
      expectedStatuses: ["200", "201", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/extensions/{vmExtensionName}":
    {
      deserializer: _createOrUpdateDeserializeVirtualMachineExtensions,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/migrateToVirtualMachineScaleSet":
    { deserializer: _migrateToVMScaleSetDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/runCommand":
    {
      deserializer: _runCommandDeserializeVirtualMachines,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/start":
    { deserializer: _startDeserializeVirtualMachines, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/restart":
    { deserializer: _restartDeserializeVirtualMachines, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/reimage":
    { deserializer: _reimageDeserializeVirtualMachines, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/redeploy":
    { deserializer: _redeployDeserializeVirtualMachines, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/reapply":
    { deserializer: _reapplyDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/powerOff":
    { deserializer: _powerOffDeserializeVirtualMachines, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/performMaintenance":
    {
      deserializer: _performMaintenanceDeserializeVirtualMachines,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/installPatches":
    { deserializer: _installPatchesDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/deallocate":
    {
      deserializer: _deallocateDeserializeVirtualMachines,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/convertToManagedDisks":
    { deserializer: _convertToManagedDisksDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/capture":
    { deserializer: _captureDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/attachDetachDataDisks":
    {
      deserializer: _attachDetachDataDisksDeserializeVirtualMachines,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/assessPatches":
    { deserializer: _assessPatchesDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}":
    { deserializer: _$deleteDeserializeVirtualMachines, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}":
    { deserializer: _updateDeserializeVirtualMachines, expectedStatuses: ["200", "201", "202"] },
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
      expectedStatuses: ["200", "201", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/extensions/{vmExtensionName}":
    {
      deserializer: _createOrUpdateDeserializeVirtualMachineScaleSetVMExtensions,
      expectedStatuses: ["200", "201", "202"],
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
    { deserializer: _scaleOutDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/start":
    {
      deserializer: _startDeserializeVirtualMachineScaleSets,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/setOrchestrationServiceState":
    {
      deserializer: _setOrchestrationServiceStateDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/restart":
    {
      deserializer: _restartDeserializeVirtualMachineScaleSets,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/reimageall":
    {
      deserializer: _reimageAllDeserializeVirtualMachineScaleSets,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/reimage":
    {
      deserializer: _reimageDeserializeVirtualMachineScaleSets,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/redeploy":
    {
      deserializer: _redeployDeserializeVirtualMachineScaleSets,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/reapply":
    {
      deserializer: _reapplyDeserializeVirtualMachineScaleSets,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/poweroff":
    {
      deserializer: _powerOffDeserializeVirtualMachineScaleSets,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/performMaintenance":
    {
      deserializer: _performMaintenanceDeserializeVirtualMachineScaleSets,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/manualupgrade":
    { deserializer: _updateInstancesDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/delete":
    { deserializer: _deleteInstancesDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/deallocate":
    {
      deserializer: _deallocateDeserializeVirtualMachineScaleSets,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/approveRollingUpgrade":
    {
      deserializer: _approveRollingUpgradeDeserializeVirtualMachineScaleSets,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}":
    {
      deserializer: _$deleteDeserializeVirtualMachineScaleSets,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}":
    {
      deserializer: _updateDeserializeVirtualMachineScaleSets,
      expectedStatuses: ["200", "201", "202"],
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

function getApiVersionFromUrl(urlStr: string): string | undefined {
  const url = new URL(urlStr);
  return url.searchParams.get("api-version") ?? undefined;
}
