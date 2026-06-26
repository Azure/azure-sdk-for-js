// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  OperationStatusResult,
  operationStatusResultDeserializer,
  Console,
  consoleSerializer,
  consoleDeserializer,
  consolePatchParametersSerializer,
  _ConsoleList,
  _consoleListDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ConsolesListByVirtualMachineOptionalParams,
  ConsolesDeleteOptionalParams,
  ConsolesUpdateOptionalParams,
  ConsolesCreateOrUpdateOptionalParams,
  ConsolesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listByVirtualMachineSend(
  context: Client,
  resourceGroupName: string,
  virtualMachineName: string,
  options: ConsolesListByVirtualMachineOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}/consoles{?api%2Dversion,%24top,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualMachineName: virtualMachineName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
      "%24top": options?.top,
      "%24skipToken": options?.skipToken,
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

export async function _listByVirtualMachineDeserialize(
  result: PathUncheckedResponse,
): Promise<_ConsoleList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _consoleListDeserializer(result.body);
}

/** Get a list of consoles for the provided virtual machine. */
export function listByVirtualMachine(
  context: Client,
  resourceGroupName: string,
  virtualMachineName: string,
  options: ConsolesListByVirtualMachineOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Console> {
  return buildPagedAsyncIterator(
    context,
    () => _listByVirtualMachineSend(context, resourceGroupName, virtualMachineName, options),
    _listByVirtualMachineDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  virtualMachineName: string,
  consoleName: string,
  options: ConsolesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}/consoles/{consoleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualMachineName: virtualMachineName,
      consoleName: consoleName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _$deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Delete the provided virtual machine console. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  virtualMachineName: string,
  consoleName: string,
  options: ConsolesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, virtualMachineName, consoleName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  virtualMachineName: string,
  consoleName: string,
  options: ConsolesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}/consoles/{consoleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualMachineName: virtualMachineName,
      consoleName: consoleName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: !options?.consoleUpdateParameters
        ? options?.consoleUpdateParameters
        : consolePatchParametersSerializer(options?.consoleUpdateParameters),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Console> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return consoleDeserializer(result.body);
}

/** Patch the properties of the provided virtual machine console, or update the tags associated with the virtual machine console. Properties and tag updates can be done independently. */
export function update(
  context: Client,
  resourceGroupName: string,
  virtualMachineName: string,
  consoleName: string,
  options: ConsolesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Console>, Console> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, virtualMachineName, consoleName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<Console>, Console>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  virtualMachineName: string,
  consoleName: string,
  consoleParameters: Console,
  options: ConsolesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}/consoles/{consoleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualMachineName: virtualMachineName,
      consoleName: consoleName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: consoleSerializer(consoleParameters),
    });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Console> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return consoleDeserializer(result.body);
}

/** Create a new virtual machine console or update the properties of the existing virtual machine console. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  virtualMachineName: string,
  consoleName: string,
  consoleParameters: Console,
  options: ConsolesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Console>, Console> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        virtualMachineName,
        consoleName,
        consoleParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<Console>, Console>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  virtualMachineName: string,
  consoleName: string,
  options: ConsolesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}/consoles/{consoleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualMachineName: virtualMachineName,
      consoleName: consoleName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Console> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return consoleDeserializer(result.body);
}

/** Get properties of the provided virtual machine console. */
export async function get(
  context: Client,
  resourceGroupName: string,
  virtualMachineName: string,
  consoleName: string,
  options: ConsolesGetOptionalParams = { requestOptions: {} },
): Promise<Console> {
  const result = await _getSend(
    context,
    resourceGroupName,
    virtualMachineName,
    consoleName,
    options,
  );
  return _getDeserialize(result);
}
