// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  Machine,
  machineSerializer,
  machineDeserializer,
  MachineUpdate,
  machineUpdateSerializer,
  _MachineListResult,
  _machineListResultDeserializer,
  MachineAssessPatchesResult,
  machineAssessPatchesResultDeserializer,
  MachineInstallPatchesParameters,
  machineInstallPatchesParametersSerializer,
  MachineInstallPatchesResult,
  machineInstallPatchesResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  MachinesInstallPatchesOptionalParams,
  MachinesAssessPatchesOptionalParams,
  MachinesListBySubscriptionOptionalParams,
  MachinesListByResourceGroupOptionalParams,
  MachinesDeleteOptionalParams,
  MachinesUpdateOptionalParams,
  MachinesCreateOrUpdateOptionalParams,
  MachinesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _installPatchesSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  installPatchesInput: MachineInstallPatchesParameters,
  options: MachinesInstallPatchesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{name}/installPatches{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-09-16-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: machineInstallPatchesParametersSerializer(installPatchesInput),
    });
}

export async function _installPatchesDeserialize(
  result: PathUncheckedResponse,
): Promise<MachineInstallPatchesResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return machineInstallPatchesResultDeserializer(result.body);
}

/** The operation to install patches on a hybrid machine identity in Azure. */
export function installPatches(
  context: Client,
  resourceGroupName: string,
  name: string,
  installPatchesInput: MachineInstallPatchesParameters,
  options: MachinesInstallPatchesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MachineInstallPatchesResult>, MachineInstallPatchesResult> {
  return getLongRunningPoller(context, _installPatchesDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _installPatchesSend(context, resourceGroupName, name, installPatchesInput, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-16-preview",
  }) as PollerLike<OperationState<MachineInstallPatchesResult>, MachineInstallPatchesResult>;
}

export function _assessPatchesSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: MachinesAssessPatchesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{name}/assessPatches{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-09-16-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _assessPatchesDeserialize(
  result: PathUncheckedResponse,
): Promise<MachineAssessPatchesResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return machineAssessPatchesResultDeserializer(result.body);
}

/** The operation to assess patches on a hybrid machine identity in Azure. */
export function assessPatches(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: MachinesAssessPatchesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MachineAssessPatchesResult>, MachineAssessPatchesResult> {
  return getLongRunningPoller(context, _assessPatchesDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _assessPatchesSend(context, resourceGroupName, name, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-16-preview",
  }) as PollerLike<OperationState<MachineAssessPatchesResult>, MachineAssessPatchesResult>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: MachinesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.HybridCompute/machines{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-09-16-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_MachineListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _machineListResultDeserializer(result.body);
}

/** Lists all the hybrid machines in the specified subscription. Use the nextLink property in the response to get the next page of hybrid machines. */
export function listBySubscription(
  context: Client,
  options: MachinesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Machine> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-09-16-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: MachinesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-09-16-preview",
      "%24expand": options?.expand,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_MachineListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _machineListResultDeserializer(result.body);
}

/** Lists all the hybrid machines in the specified resource group. Use the nextLink property in the response to get the next page of hybrid machines. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: MachinesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Machine> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-09-16-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  machineName: string,
  options: MachinesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      machineName: machineName,
      "api%2Dversion": context.apiVersion ?? "2025-09-16-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** The operation to delete a hybrid machine. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  machineName: string,
  options: MachinesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, machineName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-16-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  machineName: string,
  parameters: MachineUpdate,
  options: MachinesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      machineName: machineName,
      "api%2Dversion": context.apiVersion ?? "2025-09-16-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: machineUpdateSerializer(parameters),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Machine> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return machineDeserializer(result.body);
}

/** The operation to update a hybrid machine. */
export async function update(
  context: Client,
  resourceGroupName: string,
  machineName: string,
  parameters: MachineUpdate,
  options: MachinesUpdateOptionalParams = { requestOptions: {} },
): Promise<Machine> {
  const result = await _updateSend(context, resourceGroupName, machineName, parameters, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  machineName: string,
  parameters: Machine,
  options: MachinesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      machineName: machineName,
      "api%2Dversion": context.apiVersion ?? "2025-09-16-preview",
      "%24expand": options?.expand,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: machineSerializer(parameters),
    });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Machine> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return machineDeserializer(result.body);
}

/** The operation to create or update a hybrid machine. Please note some properties can be set only during machine creation. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  machineName: string,
  parameters: Machine,
  options: MachinesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Machine> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    machineName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  machineName: string,
  options: MachinesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      machineName: machineName,
      "api%2Dversion": context.apiVersion ?? "2025-09-16-preview",
      "%24expand": options?.expand,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Machine> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return machineDeserializer(result.body);
}

/** Retrieves information about the model view or the instance view of a hybrid machine. */
export async function get(
  context: Client,
  resourceGroupName: string,
  machineName: string,
  options: MachinesGetOptionalParams = { requestOptions: {} },
): Promise<Machine> {
  const result = await _getSend(context, resourceGroupName, machineName, options);
  return _getDeserialize(result);
}
