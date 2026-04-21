// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type {
  StorageProfile,
  AttachDetachDataDisksRequest,
  RetrieveBootDiagnosticsDataResult,
  RunCommandInput,
  RunCommandResult,
  VirtualMachineScaleSetVM,
  VirtualMachineScaleSetVMInstanceView,
  _VirtualMachineScaleSetVMListResult,
} from "../../models/compute/models.js";
import {
  virtualMachineScaleSetVMReimageParametersSerializer,
  storageProfileDeserializer,
  attachDetachDataDisksRequestSerializer,
  retrieveBootDiagnosticsDataResultDeserializer,
  runCommandInputSerializer,
  runCommandResultDeserializer,
  virtualMachineScaleSetVMSerializer,
  virtualMachineScaleSetVMDeserializer,
  virtualMachineScaleSetVMInstanceViewDeserializer,
  _virtualMachineScaleSetVMListResultDeserializer,
} from "../../models/compute/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VirtualMachineScaleSetVMsRunCommandOptionalParams,
  VirtualMachineScaleSetVMsStartOptionalParams,
  VirtualMachineScaleSetVMsRetrieveBootDiagnosticsDataOptionalParams,
  VirtualMachineScaleSetVMsRestartOptionalParams,
  VirtualMachineScaleSetVMsRedeployOptionalParams,
  VirtualMachineScaleSetVMsPowerOffOptionalParams,
  VirtualMachineScaleSetVMsPerformMaintenanceOptionalParams,
  VirtualMachineScaleSetVMsAttachDetachDataDisksOptionalParams,
  VirtualMachineScaleSetVMsSimulateEvictionOptionalParams,
  VirtualMachineScaleSetVMsReimageAllOptionalParams,
  VirtualMachineScaleSetVMsReimageOptionalParams,
  VirtualMachineScaleSetVMsGetInstanceViewOptionalParams,
  VirtualMachineScaleSetVMsDeallocateOptionalParams,
  VirtualMachineScaleSetVMsApproveRollingUpgradeOptionalParams,
  VirtualMachineScaleSetVMsListOptionalParams,
  VirtualMachineScaleSetVMsDeleteOptionalParams,
  VirtualMachineScaleSetVMsUpdateOptionalParams,
  VirtualMachineScaleSetVMsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _runCommandSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  parameters: RunCommandInput,
  options: VirtualMachineScaleSetVMsRunCommandOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/runCommand{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      instanceId: instanceId,
      "api%2Dversion": "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: runCommandInputSerializer(parameters),
  });
}

export async function _runCommandDeserialize(
  result: PathUncheckedResponse,
): Promise<RunCommandResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return runCommandResultDeserializer(result.body);
}

/** Run command on a virtual machine in a VM scale set. */
export function runCommand(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  parameters: RunCommandInput,
  options: VirtualMachineScaleSetVMsRunCommandOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RunCommandResult>, RunCommandResult> {
  return getLongRunningPoller(context, _runCommandDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _runCommandSend(context, resourceGroupName, vmScaleSetName, instanceId, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-11-01",
  }) as PollerLike<OperationState<RunCommandResult>, RunCommandResult>;
}

export function _startSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  options: VirtualMachineScaleSetVMsStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/start{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      instanceId: instanceId,
      "api%2Dversion": "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _startDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Starts a virtual machine in a VM scale set. */
export function start(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  options: VirtualMachineScaleSetVMsStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _startDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _startSend(context, resourceGroupName, vmScaleSetName, instanceId, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-11-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _retrieveBootDiagnosticsDataSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  options: VirtualMachineScaleSetVMsRetrieveBootDiagnosticsDataOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/retrieveBootDiagnosticsData{?api%2Dversion,sasUriExpirationTimeInMinutes}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      instanceId: instanceId,
      "api%2Dversion": "2025-11-01",
      sasUriExpirationTimeInMinutes: options?.sasUriExpirationTimeInMinutes,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _retrieveBootDiagnosticsDataDeserialize(
  result: PathUncheckedResponse,
): Promise<RetrieveBootDiagnosticsDataResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return retrieveBootDiagnosticsDataResultDeserializer(result.body);
}

/** The operation to retrieve SAS URIs of boot diagnostic logs for a virtual machine in a VM scale set. */
export async function retrieveBootDiagnosticsData(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  options: VirtualMachineScaleSetVMsRetrieveBootDiagnosticsDataOptionalParams = {
    requestOptions: {},
  },
): Promise<RetrieveBootDiagnosticsDataResult> {
  const result = await _retrieveBootDiagnosticsDataSend(
    context,
    resourceGroupName,
    vmScaleSetName,
    instanceId,
    options,
  );
  return _retrieveBootDiagnosticsDataDeserialize(result);
}

export function _restartSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  options: VirtualMachineScaleSetVMsRestartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/restart{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      instanceId: instanceId,
      "api%2Dversion": "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _restartDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Restarts a virtual machine in a VM scale set. */
export function restart(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  options: VirtualMachineScaleSetVMsRestartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _restartDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _restartSend(context, resourceGroupName, vmScaleSetName, instanceId, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-11-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _redeploySend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  options: VirtualMachineScaleSetVMsRedeployOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/redeploy{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      instanceId: instanceId,
      "api%2Dversion": "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _redeployDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Shuts down the virtual machine in the virtual machine scale set, moves it to a new node, and powers it back on. */
export function redeploy(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  options: VirtualMachineScaleSetVMsRedeployOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _redeployDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _redeploySend(context, resourceGroupName, vmScaleSetName, instanceId, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-11-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _powerOffSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  options: VirtualMachineScaleSetVMsPowerOffOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/powerOff{?api%2Dversion,skipShutdown}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      instanceId: instanceId,
      "api%2Dversion": "2025-11-01",
      skipShutdown: options?.skipShutdown,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _powerOffDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Power off (stop) a virtual machine in a VM scale set. Note that resources are still attached and you are getting charged for the resources. Instead, use deallocate to release resources and avoid charges. */
export function powerOff(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  options: VirtualMachineScaleSetVMsPowerOffOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _powerOffDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _powerOffSend(context, resourceGroupName, vmScaleSetName, instanceId, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-11-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _performMaintenanceSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  options: VirtualMachineScaleSetVMsPerformMaintenanceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/performMaintenance{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      instanceId: instanceId,
      "api%2Dversion": "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _performMaintenanceDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Performs maintenance on a virtual machine in a VM scale set. */
export function performMaintenance(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  options: VirtualMachineScaleSetVMsPerformMaintenanceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _performMaintenanceDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _performMaintenanceSend(context, resourceGroupName, vmScaleSetName, instanceId, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-11-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _attachDetachDataDisksSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  parameters: AttachDetachDataDisksRequest,
  options: VirtualMachineScaleSetVMsAttachDetachDataDisksOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/attachDetachDataDisks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      instanceId: instanceId,
      "api%2Dversion": "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: attachDetachDataDisksRequestSerializer(parameters),
  });
}

export async function _attachDetachDataDisksDeserialize(
  result: PathUncheckedResponse,
): Promise<StorageProfile> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return storageProfileDeserializer(result.body);
}

/** Attach and detach data disks to/from a virtual machine in a VM scale set. */
export function attachDetachDataDisks(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  parameters: AttachDetachDataDisksRequest,
  options: VirtualMachineScaleSetVMsAttachDetachDataDisksOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<StorageProfile>, StorageProfile> {
  return getLongRunningPoller(context, _attachDetachDataDisksDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _attachDetachDataDisksSend(
        context,
        resourceGroupName,
        vmScaleSetName,
        instanceId,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-11-01",
  }) as PollerLike<OperationState<StorageProfile>, StorageProfile>;
}

export function _simulateEvictionSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  options: VirtualMachineScaleSetVMsSimulateEvictionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/simulateEviction{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      instanceId: instanceId,
      "api%2Dversion": "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _simulateEvictionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** The operation to simulate the eviction of spot virtual machine in a VM scale set. */
export async function simulateEviction(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  options: VirtualMachineScaleSetVMsSimulateEvictionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _simulateEvictionSend(
    context,
    resourceGroupName,
    vmScaleSetName,
    instanceId,
    options,
  );
  return _simulateEvictionDeserialize(result);
}

export function _reimageAllSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  options: VirtualMachineScaleSetVMsReimageAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/reimageall{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      instanceId: instanceId,
      "api%2Dversion": "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _reimageAllDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Allows you to re-image all the disks ( including data disks ) in the a VM scale set instance. This operation is only supported for managed disks. */
export function reimageAll(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  options: VirtualMachineScaleSetVMsReimageAllOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _reimageAllDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _reimageAllSend(context, resourceGroupName, vmScaleSetName, instanceId, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-11-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _reimageSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  options: VirtualMachineScaleSetVMsReimageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/reimage{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      instanceId: instanceId,
      "api%2Dversion": "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: !options["vmScaleSetVMReimageInput"]
      ? options["vmScaleSetVMReimageInput"]
      : virtualMachineScaleSetVMReimageParametersSerializer(options["vmScaleSetVMReimageInput"]),
  });
}

export async function _reimageDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Reimages (upgrade the operating system) a specific virtual machine in a VM scale set. */
export function reimage(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  options: VirtualMachineScaleSetVMsReimageOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _reimageDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _reimageSend(context, resourceGroupName, vmScaleSetName, instanceId, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-11-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getInstanceViewSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  options: VirtualMachineScaleSetVMsGetInstanceViewOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/instanceView{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      instanceId: instanceId,
      "api%2Dversion": "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getInstanceViewDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualMachineScaleSetVMInstanceView> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualMachineScaleSetVMInstanceViewDeserializer(result.body);
}

/** Gets the status of a virtual machine from a VM scale set. */
export async function getInstanceView(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  options: VirtualMachineScaleSetVMsGetInstanceViewOptionalParams = { requestOptions: {} },
): Promise<VirtualMachineScaleSetVMInstanceView> {
  const result = await _getInstanceViewSend(
    context,
    resourceGroupName,
    vmScaleSetName,
    instanceId,
    options,
  );
  return _getInstanceViewDeserialize(result);
}

export function _deallocateSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  options: VirtualMachineScaleSetVMsDeallocateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/deallocate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      instanceId: instanceId,
      "api%2Dversion": "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _deallocateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deallocates a specific virtual machine in a VM scale set. Shuts down the virtual machine and releases the compute resources it uses. You are not billed for the compute resources of this virtual machine once it is deallocated. */
export function deallocate(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  options: VirtualMachineScaleSetVMsDeallocateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deallocateDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deallocateSend(context, resourceGroupName, vmScaleSetName, instanceId, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-11-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _approveRollingUpgradeSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  options: VirtualMachineScaleSetVMsApproveRollingUpgradeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/approveRollingUpgrade{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      instanceId: instanceId,
      "api%2Dversion": "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _approveRollingUpgradeDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Approve upgrade on deferred rolling upgrade for OS disk on a VM scale set instance. */
export function approveRollingUpgrade(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  options: VirtualMachineScaleSetVMsApproveRollingUpgradeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _approveRollingUpgradeDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _approveRollingUpgradeSend(context, resourceGroupName, vmScaleSetName, instanceId, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-11-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  virtualMachineScaleSetName: string,
  options: VirtualMachineScaleSetVMsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{virtualMachineScaleSetName}/virtualMachines{?api%2Dversion,%24filter,%24select,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualMachineScaleSetName: virtualMachineScaleSetName,
      "api%2Dversion": "2025-11-01",
      "%24filter": options?.filter,
      "%24select": options?.select,
      "%24expand": options?.expand,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_VirtualMachineScaleSetVMListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _virtualMachineScaleSetVMListResultDeserializer(result.body);
}

/** Gets a list of all virtual machines in a VM scale sets. */
export function list(
  context: Client,
  resourceGroupName: string,
  virtualMachineScaleSetName: string,
  options: VirtualMachineScaleSetVMsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VirtualMachineScaleSetVM> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, virtualMachineScaleSetName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-11-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  options: VirtualMachineScaleSetVMsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}{?api%2Dversion,forceDeletion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      instanceId: instanceId,
      "api%2Dversion": "2025-11-01",
      forceDeletion: options?.forceDeletion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a virtual machine from a VM scale set. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  options: VirtualMachineScaleSetVMsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, vmScaleSetName, instanceId, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-11-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  parameters: VirtualMachineScaleSetVM,
  options: VirtualMachineScaleSetVMsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      instanceId: instanceId,
      "api%2Dversion": "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: virtualMachineScaleSetVMSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualMachineScaleSetVM> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualMachineScaleSetVMDeserializer(result.body);
}

/** Updates a virtual machine of a VM scale set. */
export function update(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  parameters: VirtualMachineScaleSetVM,
  options: VirtualMachineScaleSetVMsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VirtualMachineScaleSetVM>, VirtualMachineScaleSetVM> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, vmScaleSetName, instanceId, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-11-01",
  }) as PollerLike<OperationState<VirtualMachineScaleSetVM>, VirtualMachineScaleSetVM>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  options: VirtualMachineScaleSetVMsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      instanceId: instanceId,
      "api%2Dversion": "2025-11-01",
      "%24expand": options?.expand,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualMachineScaleSetVM> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualMachineScaleSetVMDeserializer(result.body);
}

/** Gets a virtual machine from a VM scale set. */
export async function get(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  options: VirtualMachineScaleSetVMsGetOptionalParams = { requestOptions: {} },
): Promise<VirtualMachineScaleSetVM> {
  const result = await _getSend(context, resourceGroupName, vmScaleSetName, instanceId, options);
  return _getDeserialize(result);
}
