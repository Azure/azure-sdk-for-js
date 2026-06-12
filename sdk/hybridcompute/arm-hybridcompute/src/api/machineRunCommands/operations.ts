// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HybridComputeManagementContext as Client } from "../index.js";
import type { MachineRunCommand, _MachineRunCommandsListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  machineRunCommandSerializer,
  machineRunCommandDeserializer,
  _machineRunCommandsListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  MachineRunCommandsListOptionalParams,
  MachineRunCommandsDeleteOptionalParams,
  MachineRunCommandsCreateOrUpdateOptionalParams,
  MachineRunCommandsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  machineName: string,
  options: MachineRunCommandsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/runCommands{?api%2Dversion,%24expand}",
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
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_MachineRunCommandsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _machineRunCommandsListResultDeserializer(result.body);
}

/** The operation to get all the run commands of a non-Azure machine. */
export function list(
  context: Client,
  resourceGroupName: string,
  machineName: string,
  options: MachineRunCommandsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MachineRunCommand> {
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
  runCommandName: string,
  options: MachineRunCommandsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/runCommands/{runCommandName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      machineName: machineName,
      runCommandName: runCommandName,
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

/** The operation to delete a run command. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  machineName: string,
  runCommandName: string,
  options: MachineRunCommandsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, machineName, runCommandName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-16-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  machineName: string,
  runCommandName: string,
  runCommandProperties: MachineRunCommand,
  options: MachineRunCommandsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/runCommands/{runCommandName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      machineName: machineName,
      runCommandName: runCommandName,
      "api%2Dversion": context.apiVersion ?? "2025-09-16-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: machineRunCommandSerializer(runCommandProperties),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<MachineRunCommand> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return machineRunCommandDeserializer(result.body);
}

/** The operation to create or update a run command. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  machineName: string,
  runCommandName: string,
  runCommandProperties: MachineRunCommand,
  options: MachineRunCommandsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MachineRunCommand>, MachineRunCommand> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        machineName,
        runCommandName,
        runCommandProperties,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-09-16-preview",
  }) as PollerLike<OperationState<MachineRunCommand>, MachineRunCommand>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  machineName: string,
  runCommandName: string,
  options: MachineRunCommandsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/runCommands/{runCommandName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      machineName: machineName,
      runCommandName: runCommandName,
      "api%2Dversion": context.apiVersion ?? "2025-09-16-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<MachineRunCommand> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return machineRunCommandDeserializer(result.body);
}

/** The operation to get a run command. */
export async function get(
  context: Client,
  resourceGroupName: string,
  machineName: string,
  runCommandName: string,
  options: MachineRunCommandsGetOptionalParams = { requestOptions: {} },
): Promise<MachineRunCommand> {
  const result = await _getSend(context, resourceGroupName, machineName, runCommandName, options);
  return _getDeserialize(result);
}
