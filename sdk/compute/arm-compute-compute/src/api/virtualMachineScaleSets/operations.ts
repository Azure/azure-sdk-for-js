// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext as Client } from "../index.js";
import type {
  VirtualMachineScaleSet,
  VirtualMachineScaleSetUpdate,
  _VirtualMachineScaleSetListResult,
  _VirtualMachineScaleSetListWithLinkResult,
  VMScaleSetConvertToSinglePlacementGroupInput,
  OkResponse,
  VirtualMachineScaleSetVMInstanceRequiredIDs,
  RecoveryWalkResponse,
  VirtualMachineScaleSetInstanceView,
  _VirtualMachineScaleSetListOSUpgradeHistory,
  UpgradeOperationHistoricalStatusInfo,
  OrchestrationServiceStateInput,
  _VirtualMachineScaleSetListSkusResult,
  VirtualMachineScaleSetSku,
  VMScaleSetScaleOutInput,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  virtualMachineScaleSetSerializer,
  virtualMachineScaleSetDeserializer,
  virtualMachineScaleSetUpdateSerializer,
  _virtualMachineScaleSetListResultDeserializer,
  _virtualMachineScaleSetListWithLinkResultDeserializer,
  virtualMachineScaleSetVMInstanceIDsSerializer,
  vmScaleSetConvertToSinglePlacementGroupInputSerializer,
  okResponseDeserializer,
  virtualMachineScaleSetVMInstanceRequiredIDsSerializer,
  recoveryWalkResponseDeserializer,
  virtualMachineScaleSetInstanceViewDeserializer,
  _virtualMachineScaleSetListOSUpgradeHistoryDeserializer,
  virtualMachineScaleSetReimageParametersSerializer,
  orchestrationServiceStateInputSerializer,
  _virtualMachineScaleSetListSkusResultDeserializer,
  vmScaleSetScaleOutInputSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VirtualMachineScaleSetsScaleOutOptionalParams,
  VirtualMachineScaleSetsCancelOptionalParams,
  VirtualMachineScaleSetsStartOSUpgradeOptionalParams,
  VirtualMachineScaleSetsStartExtensionUpgradeOptionalParams,
  VirtualMachineScaleSetsStartOptionalParams,
  VirtualMachineScaleSetsListSkusOptionalParams,
  VirtualMachineScaleSetsSetOrchestrationServiceStateOptionalParams,
  VirtualMachineScaleSetsRestartOptionalParams,
  VirtualMachineScaleSetsReimageAllOptionalParams,
  VirtualMachineScaleSetsReimageOptionalParams,
  VirtualMachineScaleSetsRedeployOptionalParams,
  VirtualMachineScaleSetsReapplyOptionalParams,
  VirtualMachineScaleSetsPowerOffOptionalParams,
  VirtualMachineScaleSetsPerformMaintenanceOptionalParams,
  VirtualMachineScaleSetsGetOSUpgradeHistoryOptionalParams,
  VirtualMachineScaleSetsUpdateInstancesOptionalParams,
  VirtualMachineScaleSetsGetInstanceViewOptionalParams,
  VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkOptionalParams,
  VirtualMachineScaleSetsDeleteInstancesOptionalParams,
  VirtualMachineScaleSetsDeallocateOptionalParams,
  VirtualMachineScaleSetsConvertToSinglePlacementGroupOptionalParams,
  VirtualMachineScaleSetsApproveRollingUpgradeOptionalParams,
  VirtualMachineScaleSetsListAllOptionalParams,
  VirtualMachineScaleSetsListOptionalParams,
  VirtualMachineScaleSetsDeleteOptionalParams,
  VirtualMachineScaleSetsUpdateOptionalParams,
  VirtualMachineScaleSetsCreateOrUpdateOptionalParams,
  VirtualMachineScaleSetsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _scaleOutSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  parameters: VMScaleSetScaleOutInput,
  options: VirtualMachineScaleSetsScaleOutOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/scaleOut{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: vmScaleSetScaleOutInputSerializer(parameters),
  });
}

export async function _scaleOutDeserialize(result: PathUncheckedResponse): Promise<OkResponse> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return okResponseDeserializer(result.body);
}

/** Scales out one or more virtual machines in a VM scale set. */
export function scaleOut(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  parameters: VMScaleSetScaleOutInput,
  options: VirtualMachineScaleSetsScaleOutOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<OkResponse>, OkResponse> {
  return getLongRunningPoller(context, _scaleOutDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _scaleOutSend(context, resourceGroupName, vmScaleSetName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OkResponse>, OkResponse>;
}

export function _cancelSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/rollingUpgrades/cancel{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _cancelDeserialize(result: PathUncheckedResponse): Promise<OkResponse> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return okResponseDeserializer(result.body);
}

/** Cancels the current virtual machine scale set rolling upgrade. */
export function cancel(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsCancelOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OkResponse>, OkResponse> {
  return getLongRunningPoller(context, _cancelDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _cancelSend(context, resourceGroupName, vmScaleSetName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OkResponse>, OkResponse>;
}

export function _startOSUpgradeSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsStartOSUpgradeOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/osRollingUpgrade{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _startOSUpgradeDeserialize(
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

/** Starts a rolling upgrade to move all virtual machine scale set instances to the latest available Platform Image OS version. Instances which are already running the latest available OS version are not affected. */
export function startOSUpgrade(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsStartOSUpgradeOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<OkResponse>, OkResponse> {
  return getLongRunningPoller(context, _startOSUpgradeDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _startOSUpgradeSend(context, resourceGroupName, vmScaleSetName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OkResponse>, OkResponse>;
}

export function _startExtensionUpgradeSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsStartExtensionUpgradeOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/extensionRollingUpgrade{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _startExtensionUpgradeDeserialize(
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

/** Starts a rolling upgrade to move all extensions for all virtual machine scale set instances to the latest available extension version. Instances which are already running the latest extension versions are not affected. */
export function startExtensionUpgrade(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsStartExtensionUpgradeOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<OkResponse>, OkResponse> {
  return getLongRunningPoller(context, _startExtensionUpgradeDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _startExtensionUpgradeSend(context, resourceGroupName, vmScaleSetName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OkResponse>, OkResponse>;
}

export function _startSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/start{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: !options["vmInstanceIDs"]
      ? options["vmInstanceIDs"]
      : virtualMachineScaleSetVMInstanceIDsSerializer(options["vmInstanceIDs"]),
  });
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

/** Starts one or more virtual machines in a VM scale set. */
export function start(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OkResponse>, OkResponse> {
  return getLongRunningPoller(context, _startDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _startSend(context, resourceGroupName, vmScaleSetName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OkResponse>, OkResponse>;
}

export function _listSkusSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsListSkusOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/skus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
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

export async function _listSkusDeserialize(
  result: PathUncheckedResponse,
): Promise<_VirtualMachineScaleSetListSkusResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _virtualMachineScaleSetListSkusResultDeserializer(result.body);
}

/** Gets a list of SKUs available for your VM scale set, including the minimum and maximum VM instances allowed for each SKU. */
export function listSkus(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsListSkusOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<VirtualMachineScaleSetSku> {
  return buildPagedAsyncIterator(
    context,
    () => _listSkusSend(context, resourceGroupName, vmScaleSetName, options),
    _listSkusDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _setOrchestrationServiceStateSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  parameters: OrchestrationServiceStateInput,
  options: VirtualMachineScaleSetsSetOrchestrationServiceStateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/setOrchestrationServiceState{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: orchestrationServiceStateInputSerializer(parameters),
  });
}

export async function _setOrchestrationServiceStateDeserialize(
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

/** Changes ServiceState property for a given service */
export function setOrchestrationServiceState(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  parameters: OrchestrationServiceStateInput,
  options: VirtualMachineScaleSetsSetOrchestrationServiceStateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<OkResponse>, OkResponse> {
  return getLongRunningPoller(context, _setOrchestrationServiceStateDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _setOrchestrationServiceStateSend(
        context,
        resourceGroupName,
        vmScaleSetName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OkResponse>, OkResponse>;
}

export function _restartSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsRestartOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/restart{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: !options["vmInstanceIDs"]
      ? options["vmInstanceIDs"]
      : virtualMachineScaleSetVMInstanceIDsSerializer(options["vmInstanceIDs"]),
  });
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

/** Restarts one or more virtual machines in a VM scale set. */
export function restart(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsRestartOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<OkResponse>, OkResponse> {
  return getLongRunningPoller(context, _restartDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _restartSend(context, resourceGroupName, vmScaleSetName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OkResponse>, OkResponse>;
}

export function _reimageAllSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsReimageAllOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/reimageall{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: !options["vmInstanceIDs"]
      ? options["vmInstanceIDs"]
      : virtualMachineScaleSetVMInstanceIDsSerializer(options["vmInstanceIDs"]),
  });
}

export async function _reimageAllDeserialize(result: PathUncheckedResponse): Promise<OkResponse> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return okResponseDeserializer(result.body);
}

/** Reimages all the disks ( including data disks ) in the virtual machines in a VM scale set. This operation is only supported for managed disks. */
export function reimageAll(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsReimageAllOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<OkResponse>, OkResponse> {
  return getLongRunningPoller(context, _reimageAllDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _reimageAllSend(context, resourceGroupName, vmScaleSetName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OkResponse>, OkResponse>;
}

export function _reimageSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsReimageOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/reimage{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: !options["vmScaleSetReimageInput"]
      ? options["vmScaleSetReimageInput"]
      : virtualMachineScaleSetReimageParametersSerializer(options["vmScaleSetReimageInput"]),
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

/** Reimages (upgrade the operating system) one or more virtual machines in a VM scale set which don't have a ephemeral OS disk, for virtual machines who have a ephemeral OS disk the virtual machine is reset to initial state. */
export function reimage(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsReimageOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<OkResponse>, OkResponse> {
  return getLongRunningPoller(context, _reimageDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _reimageSend(context, resourceGroupName, vmScaleSetName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OkResponse>, OkResponse>;
}

export function _redeploySend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsRedeployOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/redeploy{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: !options["vmInstanceIDs"]
      ? options["vmInstanceIDs"]
      : virtualMachineScaleSetVMInstanceIDsSerializer(options["vmInstanceIDs"]),
  });
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

/** Shuts down all the virtual machines in the virtual machine scale set, moves them to a new node, and powers them back on. */
export function redeploy(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsRedeployOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<OkResponse>, OkResponse> {
  return getLongRunningPoller(context, _redeployDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _redeploySend(context, resourceGroupName, vmScaleSetName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OkResponse>, OkResponse>;
}

export function _reapplySend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsReapplyOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/reapply{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
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

/** Reapplies the Virtual Machine Scale Set Virtual Machine Profile to the Virtual Machine Instances */
export function reapply(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsReapplyOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<OkResponse>, OkResponse> {
  return getLongRunningPoller(context, _reapplyDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _reapplySend(context, resourceGroupName, vmScaleSetName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OkResponse>, OkResponse>;
}

export function _powerOffSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsPowerOffOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/poweroff{?api%2Dversion,skipShutdown}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      "api%2Dversion": context.apiVersion,
      skipShutdown: options?.skipShutdown,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: !options["vmInstanceIDs"]
      ? options["vmInstanceIDs"]
      : virtualMachineScaleSetVMInstanceIDsSerializer(options["vmInstanceIDs"]),
  });
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

/** Power off (stop) one or more virtual machines in a VM scale set. Note that resources are still attached and you are getting charged for the resources. Instead, use deallocate to release resources and avoid charges. */
export function powerOff(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsPowerOffOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<OkResponse>, OkResponse> {
  return getLongRunningPoller(context, _powerOffDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _powerOffSend(context, resourceGroupName, vmScaleSetName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OkResponse>, OkResponse>;
}

export function _performMaintenanceSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsPerformMaintenanceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/performMaintenance{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: !options["vmInstanceIDs"]
      ? options["vmInstanceIDs"]
      : virtualMachineScaleSetVMInstanceIDsSerializer(options["vmInstanceIDs"]),
  });
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

/** Perform maintenance on one or more virtual machines in a VM scale set. Operation on instances which are not eligible for perform maintenance will be failed. Please refer to best practices for more details: https://docs.microsoft.com/azure/virtual-machine-scale-sets/virtual-machine-scale-sets-maintenance-notifications */
export function performMaintenance(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsPerformMaintenanceOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<OkResponse>, OkResponse> {
  return getLongRunningPoller(context, _performMaintenanceDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _performMaintenanceSend(context, resourceGroupName, vmScaleSetName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OkResponse>, OkResponse>;
}

export function _getOSUpgradeHistorySend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsGetOSUpgradeHistoryOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/osUpgradeHistory{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
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

export async function _getOSUpgradeHistoryDeserialize(
  result: PathUncheckedResponse,
): Promise<_VirtualMachineScaleSetListOSUpgradeHistory> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _virtualMachineScaleSetListOSUpgradeHistoryDeserializer(result.body);
}

/** Gets list of OS upgrades on a VM scale set instance. */
export function getOSUpgradeHistory(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsGetOSUpgradeHistoryOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<UpgradeOperationHistoricalStatusInfo> {
  return buildPagedAsyncIterator(
    context,
    () => _getOSUpgradeHistorySend(context, resourceGroupName, vmScaleSetName, options),
    _getOSUpgradeHistoryDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _updateInstancesSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  vmInstanceIDs: VirtualMachineScaleSetVMInstanceRequiredIDs,
  options: VirtualMachineScaleSetsUpdateInstancesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/manualupgrade{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: virtualMachineScaleSetVMInstanceRequiredIDsSerializer(vmInstanceIDs),
  });
}

export async function _updateInstancesDeserialize(
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

/** Upgrades one or more virtual machines to the latest SKU set in the VM scale set model. */
export function updateInstances(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  vmInstanceIDs: VirtualMachineScaleSetVMInstanceRequiredIDs,
  options: VirtualMachineScaleSetsUpdateInstancesOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<OkResponse>, OkResponse> {
  return getLongRunningPoller(context, _updateInstancesDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateInstancesSend(context, resourceGroupName, vmScaleSetName, vmInstanceIDs, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OkResponse>, OkResponse>;
}

export function _getInstanceViewSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsGetInstanceViewOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/instanceView{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
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

export async function _getInstanceViewDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualMachineScaleSetInstanceView> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return virtualMachineScaleSetInstanceViewDeserializer(result.body);
}

/** Gets the status of a VM scale set instance. */
export async function getInstanceView(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsGetInstanceViewOptionalParams = {
    requestOptions: {},
  },
): Promise<VirtualMachineScaleSetInstanceView> {
  const result = await _getInstanceViewSend(context, resourceGroupName, vmScaleSetName, options);
  return _getInstanceViewDeserialize(result);
}

export function _forceRecoveryServiceFabricPlatformUpdateDomainWalkSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  platformUpdateDomain: number,
  options: VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/forceRecoveryServiceFabricPlatformUpdateDomainWalk{?api%2Dversion,platformUpdateDomain,zone,placementGroupId}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      "api%2Dversion": context.apiVersion,
      platformUpdateDomain: platformUpdateDomain,
      zone: options?.zone,
      placementGroupId: options?.placementGroupId,
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

export async function _forceRecoveryServiceFabricPlatformUpdateDomainWalkDeserialize(
  result: PathUncheckedResponse,
): Promise<RecoveryWalkResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return recoveryWalkResponseDeserializer(result.body);
}

/** Manual platform update domain walk to update virtual machines in a service fabric virtual machine scale set. */
export async function forceRecoveryServiceFabricPlatformUpdateDomainWalk(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  platformUpdateDomain: number,
  options: VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkOptionalParams = {
    requestOptions: {},
  },
): Promise<RecoveryWalkResponse> {
  const result = await _forceRecoveryServiceFabricPlatformUpdateDomainWalkSend(
    context,
    resourceGroupName,
    vmScaleSetName,
    platformUpdateDomain,
    options,
  );
  return _forceRecoveryServiceFabricPlatformUpdateDomainWalkDeserialize(result);
}

export function _deleteInstancesSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  vmInstanceIDs: VirtualMachineScaleSetVMInstanceRequiredIDs,
  options: VirtualMachineScaleSetsDeleteInstancesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/delete{?api%2Dversion,forceDeletion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      "api%2Dversion": context.apiVersion,
      forceDeletion: options?.forceDeletion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: virtualMachineScaleSetVMInstanceRequiredIDsSerializer(vmInstanceIDs),
  });
}

export async function _deleteInstancesDeserialize(
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

/** Deletes virtual machines in a VM scale set. */
export function deleteInstances(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  vmInstanceIDs: VirtualMachineScaleSetVMInstanceRequiredIDs,
  options: VirtualMachineScaleSetsDeleteInstancesOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<OkResponse>, OkResponse> {
  return getLongRunningPoller(context, _deleteInstancesDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteInstancesSend(context, resourceGroupName, vmScaleSetName, vmInstanceIDs, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OkResponse>, OkResponse>;
}

export function _deallocateSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsDeallocateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/deallocate{?api%2Dversion,hibernate}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      "api%2Dversion": context.apiVersion,
      hibernate: options?.hibernate,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: !options["vmInstanceIDs"]
      ? options["vmInstanceIDs"]
      : virtualMachineScaleSetVMInstanceIDsSerializer(options["vmInstanceIDs"]),
  });
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

/** Deallocates specific virtual machines in a VM scale set. Shuts down the virtual machines and releases the compute resources. You are not billed for the compute resources that this virtual machine scale set deallocates. */
export function deallocate(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsDeallocateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<OkResponse>, OkResponse> {
  return getLongRunningPoller(context, _deallocateDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _deallocateSend(context, resourceGroupName, vmScaleSetName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OkResponse>, OkResponse>;
}

export function _convertToSinglePlacementGroupSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  parameters: VMScaleSetConvertToSinglePlacementGroupInput,
  options: VirtualMachineScaleSetsConvertToSinglePlacementGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/convertToSinglePlacementGroup{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: vmScaleSetConvertToSinglePlacementGroupInputSerializer(parameters),
  });
}

export async function _convertToSinglePlacementGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Converts SinglePlacementGroup property to false for a existing virtual machine scale set. */
export async function convertToSinglePlacementGroup(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  parameters: VMScaleSetConvertToSinglePlacementGroupInput,
  options: VirtualMachineScaleSetsConvertToSinglePlacementGroupOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _convertToSinglePlacementGroupSend(
    context,
    resourceGroupName,
    vmScaleSetName,
    parameters,
    options,
  );
  return _convertToSinglePlacementGroupDeserialize(result);
}

export function _approveRollingUpgradeSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsApproveRollingUpgradeOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/approveRollingUpgrade{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: !options["vmInstanceIDs"]
      ? options["vmInstanceIDs"]
      : virtualMachineScaleSetVMInstanceIDsSerializer(options["vmInstanceIDs"]),
  });
}

export async function _approveRollingUpgradeDeserialize(
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

/** Approve upgrade on deferred rolling upgrades for OS disks in the virtual machines in a VM scale set. */
export function approveRollingUpgrade(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsApproveRollingUpgradeOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _approveRollingUpgradeDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _approveRollingUpgradeSend(context, resourceGroupName, vmScaleSetName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listAllSend(
  context: Client,
  options: VirtualMachineScaleSetsListAllOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/virtualMachineScaleSets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listAllDeserialize(
  result: PathUncheckedResponse,
): Promise<_VirtualMachineScaleSetListWithLinkResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _virtualMachineScaleSetListWithLinkResultDeserializer(result.body);
}

/** Gets a list of all VM Scale Sets in the subscription, regardless of the associated resource group. Use nextLink property in the response to get the next page of VM Scale Sets. Do this till nextLink is null to fetch all the VM Scale Sets. */
export function listAll(
  context: Client,
  options: VirtualMachineScaleSetsListAllOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<VirtualMachineScaleSet> {
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
  options: VirtualMachineScaleSetsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_VirtualMachineScaleSetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _virtualMachineScaleSetListResultDeserializer(result.body);
}

/** Gets a list of all VM scale sets under a resource group. */
export function list(
  context: Client,
  resourceGroupName: string,
  options: VirtualMachineScaleSetsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VirtualMachineScaleSet> {
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
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}{?api%2Dversion,forceDeletion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
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

/** Deletes a VM scale set. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, vmScaleSetName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  parameters: VirtualMachineScaleSetUpdate,
  options: VirtualMachineScaleSetsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
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
    body: virtualMachineScaleSetUpdateSerializer(parameters),
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

/** Update a VM scale set. */
export function update(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  parameters: VirtualMachineScaleSetUpdate,
  options: VirtualMachineScaleSetsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, vmScaleSetName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  parameters: VirtualMachineScaleSet,
  options: VirtualMachineScaleSetsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
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
    body: virtualMachineScaleSetSerializer(parameters),
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

/** Create or update a VM scale set. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  parameters: VirtualMachineScaleSet,
  options: VirtualMachineScaleSetsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, vmScaleSetName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualMachineScaleSet> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return virtualMachineScaleSetDeserializer(result.body);
}

/** Display information about a virtual machine scale set. */
export async function get(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetsGetOptionalParams = { requestOptions: {} },
): Promise<VirtualMachineScaleSet> {
  const result = await _getSend(context, resourceGroupName, vmScaleSetName, options);
  return _getDeserialize(result);
}
