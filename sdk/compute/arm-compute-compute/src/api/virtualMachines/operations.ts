// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext as Client } from "../index.js";
import type {
  OkResponse,
  StorageProfile,
  AttachDetachDataDisksRequest,
  RetrieveBootDiagnosticsDataResult,
  RunCommandInput,
  RunCommandResult,
  VirtualMachine,
  VirtualMachineInstanceView,
  VirtualMachineUpdate,
  _VirtualMachineListResult,
  VirtualMachineAssessPatchesResult,
  VirtualMachineCaptureParameters,
  VirtualMachineCaptureResult,
  VirtualMachineInstallPatchesParameters,
  VirtualMachineInstallPatchesResult,
  _VirtualMachineSizeListResult,
  VirtualMachineSize,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  okResponseDeserializer,
  virtualMachineReimageParametersSerializer,
  storageProfileDeserializer,
  attachDetachDataDisksRequestSerializer,
  retrieveBootDiagnosticsDataResultDeserializer,
  runCommandInputSerializer,
  runCommandResultDeserializer,
  virtualMachineSerializer,
  virtualMachineDeserializer,
  virtualMachineInstanceViewDeserializer,
  virtualMachineUpdateSerializer,
  _virtualMachineListResultDeserializer,
  virtualMachineAssessPatchesResultDeserializer,
  virtualMachineCaptureParametersSerializer,
  virtualMachineCaptureResultDeserializer,
  virtualMachineInstallPatchesParametersSerializer,
  virtualMachineInstallPatchesResultDeserializer,
  _virtualMachineSizeListResultDeserializer,
  migrateVMToVirtualMachineScaleSetInputSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VirtualMachinesMigrateToVMScaleSetOptionalParams,
  VirtualMachinesRunCommandOptionalParams,
  VirtualMachinesListAvailableSizesOptionalParams,
  VirtualMachinesStartOptionalParams,
  VirtualMachinesSimulateEvictionOptionalParams,
  VirtualMachinesRetrieveBootDiagnosticsDataOptionalParams,
  VirtualMachinesRestartOptionalParams,
  VirtualMachinesReimageOptionalParams,
  VirtualMachinesRedeployOptionalParams,
  VirtualMachinesReapplyOptionalParams,
  VirtualMachinesPowerOffOptionalParams,
  VirtualMachinesPerformMaintenanceOptionalParams,
  VirtualMachinesInstanceViewOptionalParams,
  VirtualMachinesInstallPatchesOptionalParams,
  VirtualMachinesGeneralizeOptionalParams,
  VirtualMachinesDeallocateOptionalParams,
  VirtualMachinesConvertToManagedDisksOptionalParams,
  VirtualMachinesCaptureOptionalParams,
  VirtualMachinesAttachDetachDataDisksOptionalParams,
  VirtualMachinesAssessPatchesOptionalParams,
  VirtualMachinesListAllOptionalParams,
  VirtualMachinesListOptionalParams,
  VirtualMachinesDeleteOptionalParams,
  VirtualMachinesUpdateOptionalParams,
  VirtualMachinesCreateOrUpdateOptionalParams,
  VirtualMachinesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _migrateToVMScaleSetSend(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesMigrateToVMScaleSetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/migrateToVirtualMachineScaleSet{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: !options["parameters"]
      ? options["parameters"]
      : migrateVMToVirtualMachineScaleSetInputSerializer(options["parameters"]),
  });
}

export async function _migrateToVMScaleSetDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Migrate a virtual machine from availability set to Flexible Virtual Machine Scale Set. */
export function migrateToVMScaleSet(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesMigrateToVMScaleSetOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _migrateToVMScaleSetDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _migrateToVMScaleSetSend(context, resourceGroupName, vmName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _runCommandSend(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  parameters: RunCommandInput,
  options: VirtualMachinesRunCommandOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/runCommand{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: runCommandInputSerializer(parameters),
  });
}

export async function _runCommandDeserialize(
  result: PathUncheckedResponse,
): Promise<RunCommandResult> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return runCommandResultDeserializer(result.body);
}

/** Run command on the VM. */
export function runCommand(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  parameters: RunCommandInput,
  options: VirtualMachinesRunCommandOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RunCommandResult>, RunCommandResult> {
  return getLongRunningPoller(context, _runCommandDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _runCommandSend(context, resourceGroupName, vmName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<RunCommandResult>, RunCommandResult>;
}

export function _listAvailableSizesSend(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesListAvailableSizesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/vmSizes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listAvailableSizesDeserialize(
  result: PathUncheckedResponse,
): Promise<_VirtualMachineSizeListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _virtualMachineSizeListResultDeserializer(result.body);
}

/** Lists all available virtual machine sizes to which the specified virtual machine can be resized. */
export function listAvailableSizes(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesListAvailableSizesOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<VirtualMachineSize> {
  return buildPagedAsyncIterator(
    context,
    () => _listAvailableSizesSend(context, resourceGroupName, vmName, options),
    _listAvailableSizesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _startSend(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/start{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _startDeserialize(result: PathUncheckedResponse): Promise<OkResponse> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return okResponseDeserializer(result.body);
}

/** The operation to start a virtual machine. */
export function start(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OkResponse>, OkResponse> {
  return getLongRunningPoller(context, _startDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _startSend(context, resourceGroupName, vmName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OkResponse>, OkResponse>;
}

export function _simulateEvictionSend(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesSimulateEvictionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/simulateEviction{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      "api%2Dversion": context.apiVersion,
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

/** The operation to simulate the eviction of spot virtual machine. */
export async function simulateEviction(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesSimulateEvictionOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _simulateEvictionSend(context, resourceGroupName, vmName, options);
  return _simulateEvictionDeserialize(result);
}

export function _retrieveBootDiagnosticsDataSend(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesRetrieveBootDiagnosticsDataOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/retrieveBootDiagnosticsData{?api%2Dversion,sasUriExpirationTimeInMinutes}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      "api%2Dversion": context.apiVersion,
      sasUriExpirationTimeInMinutes: options?.sasUriExpirationTimeInMinutes,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
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

/** The operation to retrieve SAS URIs for a virtual machine's boot diagnostic logs. */
export async function retrieveBootDiagnosticsData(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesRetrieveBootDiagnosticsDataOptionalParams = {
    requestOptions: {},
  },
): Promise<RetrieveBootDiagnosticsDataResult> {
  const result = await _retrieveBootDiagnosticsDataSend(
    context,
    resourceGroupName,
    vmName,
    options,
  );
  return _retrieveBootDiagnosticsDataDeserialize(result);
}

export function _restartSend(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesRestartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/restart{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _restartDeserialize(result: PathUncheckedResponse): Promise<OkResponse> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return okResponseDeserializer(result.body);
}

/** The operation to restart a virtual machine. */
export function restart(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesRestartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OkResponse>, OkResponse> {
  return getLongRunningPoller(context, _restartDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _restartSend(context, resourceGroupName, vmName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OkResponse>, OkResponse>;
}

export function _reimageSend(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesReimageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/reimage{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: !options["parameters"]
      ? options["parameters"]
      : virtualMachineReimageParametersSerializer(options["parameters"]),
  });
}

export async function _reimageDeserialize(result: PathUncheckedResponse): Promise<OkResponse> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return okResponseDeserializer(result.body);
}

/** Reimages (upgrade the operating system) a virtual machine which don't have a ephemeral OS disk, for virtual machines who have a ephemeral OS disk the virtual machine is reset to initial state. NOTE: The retaining of old OS disk depends on the value of deleteOption of OS disk. If deleteOption is detach, the old OS disk will be preserved after reimage. If deleteOption is delete, the old OS disk will be deleted after reimage. The deleteOption of the OS disk should be updated accordingly before performing the reimage. */
export function reimage(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesReimageOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OkResponse>, OkResponse> {
  return getLongRunningPoller(context, _reimageDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _reimageSend(context, resourceGroupName, vmName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OkResponse>, OkResponse>;
}

export function _redeploySend(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesRedeployOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/redeploy{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _redeployDeserialize(result: PathUncheckedResponse): Promise<OkResponse> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return okResponseDeserializer(result.body);
}

/** Shuts down the virtual machine, moves it to a new node, and powers it back on. */
export function redeploy(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesRedeployOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OkResponse>, OkResponse> {
  return getLongRunningPoller(context, _redeployDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _redeploySend(context, resourceGroupName, vmName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OkResponse>, OkResponse>;
}

export function _reapplySend(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesReapplyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/reapply{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _reapplyDeserialize(result: PathUncheckedResponse): Promise<OkResponse> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return okResponseDeserializer(result.body);
}

/** The operation to reapply a virtual machine's state. */
export function reapply(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesReapplyOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OkResponse>, OkResponse> {
  return getLongRunningPoller(context, _reapplyDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _reapplySend(context, resourceGroupName, vmName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OkResponse>, OkResponse>;
}

export function _powerOffSend(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesPowerOffOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/powerOff{?api%2Dversion,skipShutdown}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      "api%2Dversion": context.apiVersion,
      skipShutdown: options?.skipShutdown,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _powerOffDeserialize(result: PathUncheckedResponse): Promise<OkResponse> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return okResponseDeserializer(result.body);
}

/** The operation to power off (stop) a virtual machine. The virtual machine can be restarted with the same provisioned resources. You are still charged for this virtual machine. */
export function powerOff(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesPowerOffOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OkResponse>, OkResponse> {
  return getLongRunningPoller(context, _powerOffDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _powerOffSend(context, resourceGroupName, vmName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OkResponse>, OkResponse>;
}

export function _performMaintenanceSend(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesPerformMaintenanceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/performMaintenance{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _performMaintenanceDeserialize(
  result: PathUncheckedResponse,
): Promise<OkResponse> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return okResponseDeserializer(result.body);
}

/** The operation to perform maintenance on a virtual machine. */
export function performMaintenance(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesPerformMaintenanceOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<OkResponse>, OkResponse> {
  return getLongRunningPoller(context, _performMaintenanceDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _performMaintenanceSend(context, resourceGroupName, vmName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OkResponse>, OkResponse>;
}

export function _instanceViewSend(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesInstanceViewOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/instanceView{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _instanceViewDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualMachineInstanceView> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return virtualMachineInstanceViewDeserializer(result.body);
}

/** Retrieves information about the run-time state of a virtual machine. */
export async function instanceView(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesInstanceViewOptionalParams = { requestOptions: {} },
): Promise<VirtualMachineInstanceView> {
  const result = await _instanceViewSend(context, resourceGroupName, vmName, options);
  return _instanceViewDeserialize(result);
}

export function _installPatchesSend(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  installPatchesInput: VirtualMachineInstallPatchesParameters,
  options: VirtualMachinesInstallPatchesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/installPatches{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: virtualMachineInstallPatchesParametersSerializer(installPatchesInput),
  });
}

export async function _installPatchesDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualMachineInstallPatchesResult> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return virtualMachineInstallPatchesResultDeserializer(result.body);
}

/** Installs patches on the VM. */
export function installPatches(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  installPatchesInput: VirtualMachineInstallPatchesParameters,
  options: VirtualMachinesInstallPatchesOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<VirtualMachineInstallPatchesResult>,
  VirtualMachineInstallPatchesResult
> {
  return getLongRunningPoller(context, _installPatchesDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _installPatchesSend(context, resourceGroupName, vmName, installPatchesInput, options),
    resourceLocationConfig: "location",
  }) as PollerLike<
    OperationState<VirtualMachineInstallPatchesResult>,
    VirtualMachineInstallPatchesResult
  >;
}

export function _generalizeSend(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesGeneralizeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/generalize{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _generalizeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Sets the OS state of the virtual machine to generalized. It is recommended to sysprep the virtual machine before performing this operation. For Windows, please refer to [Create a managed image of a generalized VM in Azure](https://docs.microsoft.com/azure/virtual-machines/windows/capture-image-resource). For Linux, please refer to [How to create an image of a virtual machine or VHD](https://docs.microsoft.com/azure/virtual-machines/linux/capture-image). */
export async function generalize(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesGeneralizeOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _generalizeSend(context, resourceGroupName, vmName, options);
  return _generalizeDeserialize(result);
}

export function _deallocateSend(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesDeallocateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/deallocate{?api%2Dversion,hibernate}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      "api%2Dversion": context.apiVersion,
      hibernate: options?.hibernate,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _deallocateDeserialize(result: PathUncheckedResponse): Promise<OkResponse> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return okResponseDeserializer(result.body);
}

/** Shuts down the virtual machine and releases the compute resources. You are not billed for the compute resources that this virtual machine uses. */
export function deallocate(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesDeallocateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OkResponse>, OkResponse> {
  return getLongRunningPoller(context, _deallocateDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _deallocateSend(context, resourceGroupName, vmName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OkResponse>, OkResponse>;
}

export function _convertToManagedDisksSend(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesConvertToManagedDisksOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/convertToManagedDisks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _convertToManagedDisksDeserialize(
  result: PathUncheckedResponse,
): Promise<OkResponse> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return okResponseDeserializer(result.body);
}

/** Converts virtual machine disks from blob-based to managed disks. Virtual machine must be stop-deallocated before invoking this operation. */
export function convertToManagedDisks(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesConvertToManagedDisksOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<OkResponse>, OkResponse> {
  return getLongRunningPoller(context, _convertToManagedDisksDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _convertToManagedDisksSend(context, resourceGroupName, vmName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OkResponse>, OkResponse>;
}

export function _captureSend(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  parameters: VirtualMachineCaptureParameters,
  options: VirtualMachinesCaptureOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/capture{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: virtualMachineCaptureParametersSerializer(parameters),
  });
}

export async function _captureDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualMachineCaptureResult> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return virtualMachineCaptureResultDeserializer(result.body);
}

/** Captures the VM by copying virtual hard disks of the VM and outputs a template that can be used to create similar VMs. */
export function capture(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  parameters: VirtualMachineCaptureParameters,
  options: VirtualMachinesCaptureOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VirtualMachineCaptureResult>, VirtualMachineCaptureResult> {
  return getLongRunningPoller(context, _captureDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _captureSend(context, resourceGroupName, vmName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<VirtualMachineCaptureResult>, VirtualMachineCaptureResult>;
}

export function _attachDetachDataDisksSend(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  parameters: AttachDetachDataDisksRequest,
  options: VirtualMachinesAttachDetachDataDisksOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/attachDetachDataDisks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: attachDetachDataDisksRequestSerializer(parameters),
  });
}

export async function _attachDetachDataDisksDeserialize(
  result: PathUncheckedResponse,
): Promise<StorageProfile> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return storageProfileDeserializer(result.body);
}

/** Attach and detach data disks to/from the virtual machine. */
export function attachDetachDataDisks(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  parameters: AttachDetachDataDisksRequest,
  options: VirtualMachinesAttachDetachDataDisksOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<StorageProfile>, StorageProfile> {
  return getLongRunningPoller(context, _attachDetachDataDisksDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _attachDetachDataDisksSend(context, resourceGroupName, vmName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<StorageProfile>, StorageProfile>;
}

export function _assessPatchesSend(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesAssessPatchesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/assessPatches{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _assessPatchesDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualMachineAssessPatchesResult> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return virtualMachineAssessPatchesResultDeserializer(result.body);
}

/** Assess patches on the VM. */
export function assessPatches(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesAssessPatchesOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<VirtualMachineAssessPatchesResult>,
  VirtualMachineAssessPatchesResult
> {
  return getLongRunningPoller(context, _assessPatchesDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _assessPatchesSend(context, resourceGroupName, vmName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<
    OperationState<VirtualMachineAssessPatchesResult>,
    VirtualMachineAssessPatchesResult
  >;
}

export function _listAllSend(
  context: Client,
  options: VirtualMachinesListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/virtualMachines{?api%2Dversion,statusOnly,%24filter,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
      statusOnly: options?.statusOnly,
      "%24filter": options?.filter,
      "%24expand": options?.expand,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listAllDeserialize(
  result: PathUncheckedResponse,
): Promise<_VirtualMachineListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _virtualMachineListResultDeserializer(result.body);
}

/** Lists all of the virtual machines in the specified subscription. Use the nextLink property in the response to get the next page of virtual machines. */
export function listAll(
  context: Client,
  options: VirtualMachinesListAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VirtualMachine> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllSend(context, options),
    _listAllDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  options: VirtualMachinesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines{?api%2Dversion,%24filter,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion,
      "%24filter": options?.filter,
      "%24expand": options?.expand,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_VirtualMachineListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _virtualMachineListResultDeserializer(result.body);
}

/** Lists all of the virtual machines in the specified resource group. Use the nextLink property in the response to get the next page of virtual machines. */
export function list(
  context: Client,
  resourceGroupName: string,
  options: VirtualMachinesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VirtualMachine> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}{?api%2Dversion,forceDeletion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      "api%2Dversion": context.apiVersion,
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

/** The operation to delete a virtual machine. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, vmName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  parameters: VirtualMachineUpdate,
  options: VirtualMachinesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "If-Match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "If-None-Match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: virtualMachineUpdateSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** The operation to update a virtual machine. */
export function update(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  parameters: VirtualMachineUpdate,
  options: VirtualMachinesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _updateSend(context, resourceGroupName, vmName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  parameters: VirtualMachine,
  options: VirtualMachinesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "If-Match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "If-None-Match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: virtualMachineSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  parameters: VirtualMachine,
  options: VirtualMachinesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, vmName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      "api%2Dversion": context.apiVersion,
      "%24expand": options?.expand,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<VirtualMachine> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return virtualMachineDeserializer(result.body);
}

/** Retrieves information about the model view or the instance view of a virtual machine. */
export async function get(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachinesGetOptionalParams = { requestOptions: {} },
): Promise<VirtualMachine> {
  const result = await _getSend(context, resourceGroupName, vmName, options);
  return _getDeserialize(result);
}
