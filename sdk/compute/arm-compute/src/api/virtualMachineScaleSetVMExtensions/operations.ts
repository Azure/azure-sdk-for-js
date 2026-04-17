// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type {
  VirtualMachineScaleSetVMExtension,
  VirtualMachineScaleSetVMExtensionUpdate,
  VirtualMachineScaleSetVMExtensionsListResult,
} from "../../models/compute/models.js";
import {
  virtualMachineScaleSetVMExtensionSerializer,
  virtualMachineScaleSetVMExtensionDeserializer,
  virtualMachineScaleSetVMExtensionUpdateSerializer,
  virtualMachineScaleSetVMExtensionsListResultDeserializer,
} from "../../models/compute/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VirtualMachineScaleSetVMExtensionsListOptionalParams,
  VirtualMachineScaleSetVMExtensionsDeleteOptionalParams,
  VirtualMachineScaleSetVMExtensionsUpdateOptionalParams,
  VirtualMachineScaleSetVMExtensionsCreateOrUpdateOptionalParams,
  VirtualMachineScaleSetVMExtensionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  options: VirtualMachineScaleSetVMExtensionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/extensions{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      instanceId: instanceId,
      "api%2Dversion": "2025-04-01",
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
): Promise<VirtualMachineScaleSetVMExtensionsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualMachineScaleSetVMExtensionsListResultDeserializer(result.body);
}

/** The operation to get all extensions of an instance in Virtual Machine Scaleset. */
export async function list(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  options: VirtualMachineScaleSetVMExtensionsListOptionalParams = { requestOptions: {} },
): Promise<VirtualMachineScaleSetVMExtensionsListResult> {
  const result = await _listSend(context, resourceGroupName, vmScaleSetName, instanceId, options);
  return _listDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  vmExtensionName: string,
  options: VirtualMachineScaleSetVMExtensionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/extensions/{vmExtensionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      instanceId: instanceId,
      vmExtensionName: vmExtensionName,
      "api%2Dversion": "2025-04-01",
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

/** The operation to delete the VMSS VM extension. */
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
  vmExtensionName: string,
  options: VirtualMachineScaleSetVMExtensionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        vmScaleSetName,
        instanceId,
        vmExtensionName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-04-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  vmExtensionName: string,
  extensionParameters: VirtualMachineScaleSetVMExtensionUpdate,
  options: VirtualMachineScaleSetVMExtensionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/extensions/{vmExtensionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      instanceId: instanceId,
      vmExtensionName: vmExtensionName,
      "api%2Dversion": "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: virtualMachineScaleSetVMExtensionUpdateSerializer(extensionParameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualMachineScaleSetVMExtension> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualMachineScaleSetVMExtensionDeserializer(result.body);
}

/** The operation to update the VMSS VM extension. */
export function update(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  vmExtensionName: string,
  extensionParameters: VirtualMachineScaleSetVMExtensionUpdate,
  options: VirtualMachineScaleSetVMExtensionsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<VirtualMachineScaleSetVMExtension>,
  VirtualMachineScaleSetVMExtension
> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        vmScaleSetName,
        instanceId,
        vmExtensionName,
        extensionParameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-04-01",
  }) as PollerLike<
    OperationState<VirtualMachineScaleSetVMExtension>,
    VirtualMachineScaleSetVMExtension
  >;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  vmExtensionName: string,
  extensionParameters: VirtualMachineScaleSetVMExtension,
  options: VirtualMachineScaleSetVMExtensionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/extensions/{vmExtensionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      instanceId: instanceId,
      vmExtensionName: vmExtensionName,
      "api%2Dversion": "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: virtualMachineScaleSetVMExtensionSerializer(extensionParameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualMachineScaleSetVMExtension> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualMachineScaleSetVMExtensionDeserializer(result.body);
}

/** The operation to create or update the VMSS VM extension. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  vmExtensionName: string,
  extensionParameters: VirtualMachineScaleSetVMExtension,
  options: VirtualMachineScaleSetVMExtensionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<VirtualMachineScaleSetVMExtension>,
  VirtualMachineScaleSetVMExtension
> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        vmScaleSetName,
        instanceId,
        vmExtensionName,
        extensionParameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-04-01",
  }) as PollerLike<
    OperationState<VirtualMachineScaleSetVMExtension>,
    VirtualMachineScaleSetVMExtension
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  vmExtensionName: string,
  options: VirtualMachineScaleSetVMExtensionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/extensions/{vmExtensionName}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      instanceId: instanceId,
      vmExtensionName: vmExtensionName,
      "api%2Dversion": "2025-04-01",
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
): Promise<VirtualMachineScaleSetVMExtension> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualMachineScaleSetVMExtensionDeserializer(result.body);
}

/** The operation to get the VMSS VM extension. */
export async function get(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  vmExtensionName: string,
  options: VirtualMachineScaleSetVMExtensionsGetOptionalParams = { requestOptions: {} },
): Promise<VirtualMachineScaleSetVMExtension> {
  const result = await _getSend(
    context,
    resourceGroupName,
    vmScaleSetName,
    instanceId,
    vmExtensionName,
    options,
  );
  return _getDeserialize(result);
}
