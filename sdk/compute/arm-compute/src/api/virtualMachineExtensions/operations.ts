// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type {
  VirtualMachineExtension,
  VirtualMachineExtensionUpdate,
  VirtualMachineExtensionsListResult,
} from "../../models/compute/models.js";
import {
  virtualMachineExtensionSerializer,
  virtualMachineExtensionDeserializer,
  virtualMachineExtensionUpdateSerializer,
  virtualMachineExtensionsListResultDeserializer,
} from "../../models/compute/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VirtualMachineExtensionsListOptionalParams,
  VirtualMachineExtensionsDeleteOptionalParams,
  VirtualMachineExtensionsUpdateOptionalParams,
  VirtualMachineExtensionsCreateOrUpdateOptionalParams,
  VirtualMachineExtensionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachineExtensionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/extensions{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualMachineExtensionsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualMachineExtensionsListResultDeserializer(result.body);
}

/** The operation to get all extensions of a Virtual Machine. */
export async function list(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: VirtualMachineExtensionsListOptionalParams = { requestOptions: {} },
): Promise<VirtualMachineExtensionsListResult> {
  const result = await _listSend(context, resourceGroupName, vmName, options);
  return _listDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  vmExtensionName: string,
  options: VirtualMachineExtensionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/extensions/{vmExtensionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      vmExtensionName: vmExtensionName,
      "api%2Dversion": "2025-11-01",
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

/** The operation to delete the extension. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  vmExtensionName: string,
  options: VirtualMachineExtensionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, vmName, vmExtensionName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-11-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  vmExtensionName: string,
  extensionParameters: VirtualMachineExtensionUpdate,
  options: VirtualMachineExtensionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/extensions/{vmExtensionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      vmExtensionName: vmExtensionName,
      "api%2Dversion": "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: virtualMachineExtensionUpdateSerializer(extensionParameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualMachineExtension> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualMachineExtensionDeserializer(result.body);
}

/** The operation to update the extension. */
export function update(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  vmExtensionName: string,
  extensionParameters: VirtualMachineExtensionUpdate,
  options: VirtualMachineExtensionsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VirtualMachineExtension>, VirtualMachineExtension> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        vmName,
        vmExtensionName,
        extensionParameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-11-01",
  }) as PollerLike<OperationState<VirtualMachineExtension>, VirtualMachineExtension>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  vmExtensionName: string,
  extensionParameters: VirtualMachineExtension,
  options: VirtualMachineExtensionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/extensions/{vmExtensionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      vmExtensionName: vmExtensionName,
      "api%2Dversion": "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: virtualMachineExtensionSerializer(extensionParameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualMachineExtension> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualMachineExtensionDeserializer(result.body);
}

/** The operation to create or update the extension. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  vmExtensionName: string,
  extensionParameters: VirtualMachineExtension,
  options: VirtualMachineExtensionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VirtualMachineExtension>, VirtualMachineExtension> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        vmName,
        vmExtensionName,
        extensionParameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-11-01",
  }) as PollerLike<OperationState<VirtualMachineExtension>, VirtualMachineExtension>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  vmExtensionName: string,
  options: VirtualMachineExtensionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/extensions/{vmExtensionName}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      vmExtensionName: vmExtensionName,
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
): Promise<VirtualMachineExtension> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualMachineExtensionDeserializer(result.body);
}

/** The operation to get the extension. */
export async function get(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  vmExtensionName: string,
  options: VirtualMachineExtensionsGetOptionalParams = { requestOptions: {} },
): Promise<VirtualMachineExtension> {
  const result = await _getSend(context, resourceGroupName, vmName, vmExtensionName, options);
  return _getDeserialize(result);
}
