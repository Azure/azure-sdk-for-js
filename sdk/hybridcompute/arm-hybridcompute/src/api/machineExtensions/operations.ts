// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  MachineExtension,
  machineExtensionSerializer,
  machineExtensionDeserializer,
  MachineExtensionUpdate,
  machineExtensionUpdateSerializer,
  _MachineExtensionsListResult,
  _machineExtensionsListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  MachineExtensionsListOptionalParams,
  MachineExtensionsDeleteOptionalParams,
  MachineExtensionsUpdateOptionalParams,
  MachineExtensionsCreateOrUpdateOptionalParams,
  MachineExtensionsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  machineName: string,
  options: MachineExtensionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/extensions{?api%2Dversion,%24expand}",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_MachineExtensionsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _machineExtensionsListResultDeserializer(result.body);
}

/** The operation to get all extensions of a non-Azure machine */
export function list(
  context: Client,
  resourceGroupName: string,
  machineName: string,
  options: MachineExtensionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MachineExtension> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, machineName, options),
    _listDeserialize,
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
  extensionName: string,
  options: MachineExtensionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/extensions/{extensionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      machineName: machineName,
      extensionName: extensionName,
      "api%2Dversion": context.apiVersion ?? "2025-09-16-preview",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** The operation to delete the extension. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  machineName: string,
  extensionName: string,
  options: MachineExtensionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, machineName, extensionName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-16-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  machineName: string,
  extensionName: string,
  extensionParameters: MachineExtensionUpdate,
  options: MachineExtensionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/extensions/{extensionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      machineName: machineName,
      extensionName: extensionName,
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
      body: machineExtensionUpdateSerializer(extensionParameters),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<MachineExtension> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return machineExtensionDeserializer(result.body);
}

/** The operation to create or update the extension. */
export function update(
  context: Client,
  resourceGroupName: string,
  machineName: string,
  extensionName: string,
  extensionParameters: MachineExtensionUpdate,
  options: MachineExtensionsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MachineExtension>, MachineExtension> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        machineName,
        extensionName,
        extensionParameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-16-preview",
  }) as PollerLike<OperationState<MachineExtension>, MachineExtension>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  machineName: string,
  extensionName: string,
  extensionParameters: MachineExtension,
  options: MachineExtensionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/extensions/{extensionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      machineName: machineName,
      extensionName: extensionName,
      "api%2Dversion": context.apiVersion ?? "2025-09-16-preview",
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
      body: machineExtensionSerializer(extensionParameters),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<MachineExtension> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return machineExtensionDeserializer(result.body);
}

/** The operation to create or update the extension. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  machineName: string,
  extensionName: string,
  extensionParameters: MachineExtension,
  options: MachineExtensionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MachineExtension>, MachineExtension> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        machineName,
        extensionName,
        extensionParameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-16-preview",
  }) as PollerLike<OperationState<MachineExtension>, MachineExtension>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  machineName: string,
  extensionName: string,
  options: MachineExtensionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/extensions/{extensionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      machineName: machineName,
      extensionName: extensionName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<MachineExtension> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return machineExtensionDeserializer(result.body);
}

/** The operation to get the extension. */
export async function get(
  context: Client,
  resourceGroupName: string,
  machineName: string,
  extensionName: string,
  options: MachineExtensionsGetOptionalParams = { requestOptions: {} },
): Promise<MachineExtension> {
  const result = await _getSend(context, resourceGroupName, machineName, extensionName, options);
  return _getDeserialize(result);
}
