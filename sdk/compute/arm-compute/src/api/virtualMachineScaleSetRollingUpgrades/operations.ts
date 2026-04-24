// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type { RollingUpgradeStatusInfo } from "../../models/compute/models.js";
import { rollingUpgradeStatusInfoDeserializer } from "../../models/compute/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VirtualMachineScaleSetRollingUpgradesGetLatestOptionalParams,
  VirtualMachineScaleSetRollingUpgradesCancelOptionalParams,
  VirtualMachineScaleSetRollingUpgradesStartOSUpgradeOptionalParams,
  VirtualMachineScaleSetRollingUpgradesStartExtensionUpgradeOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getLatestSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetRollingUpgradesGetLatestOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/rollingUpgrades/latest{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
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

export async function _getLatestDeserialize(
  result: PathUncheckedResponse,
): Promise<RollingUpgradeStatusInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return rollingUpgradeStatusInfoDeserializer(result.body);
}

/** Gets the status of the latest virtual machine scale set rolling upgrade. */
export async function getLatest(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetRollingUpgradesGetLatestOptionalParams = { requestOptions: {} },
): Promise<RollingUpgradeStatusInfo> {
  const result = await _getLatestSend(context, resourceGroupName, vmScaleSetName, options);
  return _getLatestDeserialize(result);
}

export function _cancelSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetRollingUpgradesCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/rollingUpgrades/cancel{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      "api%2Dversion": "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _cancelDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Cancels the current virtual machine scale set rolling upgrade. */
export function cancel(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetRollingUpgradesCancelOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _cancelDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _cancelSend(context, resourceGroupName, vmScaleSetName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-11-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _startOSUpgradeSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetRollingUpgradesStartOSUpgradeOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/osRollingUpgrade{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      "api%2Dversion": "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _startOSUpgradeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Starts a rolling upgrade to move all virtual machine scale set instances to the latest available Platform Image OS version. Instances which are already running the latest available OS version are not affected. */
export function startOSUpgrade(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetRollingUpgradesStartOSUpgradeOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _startOSUpgradeDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _startOSUpgradeSend(context, resourceGroupName, vmScaleSetName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-11-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _startExtensionUpgradeSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetRollingUpgradesStartExtensionUpgradeOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/extensionRollingUpgrade{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      "api%2Dversion": "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _startExtensionUpgradeDeserialize(
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

/** Starts a rolling upgrade to move all extensions for all virtual machine scale set instances to the latest available extension version. Instances which are already running the latest extension versions are not affected. */
export function startExtensionUpgrade(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: VirtualMachineScaleSetRollingUpgradesStartExtensionUpgradeOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _startExtensionUpgradeDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _startExtensionUpgradeSend(context, resourceGroupName, vmScaleSetName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-11-01",
  }) as PollerLike<OperationState<void>, void>;
}
