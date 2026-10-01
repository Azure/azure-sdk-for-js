// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerInstanceManagementContext as Client } from "../index.js";
import type {
  Logs,
  ContainerExecRequest,
  ContainerExecResponse,
  ContainerAttachResponse,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  logsDeserializer,
  containerExecRequestSerializer,
  containerExecResponseDeserializer,
  containerAttachResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ContainersAttachOptionalParams,
  ContainersExecuteCommandOptionalParams,
  ContainersListLogsOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _attachSend(
  context: Client,
  resourceGroupName: string,
  containerGroupName: string,
  containerName: string,
  options: ContainersAttachOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups/{containerGroupName}/containers/{containerName}/attach{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerGroupName: containerGroupName,
      containerName: containerName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01-preview",
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

export async function _attachDeserialize(
  result: PathUncheckedResponse,
): Promise<ContainerAttachResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return containerAttachResponseDeserializer(result.body);
}

/** Attach to the output stream of a specific container instance in a specified resource group and container group. */
export async function attach(
  context: Client,
  resourceGroupName: string,
  containerGroupName: string,
  containerName: string,
  options: ContainersAttachOptionalParams = { requestOptions: {} },
): Promise<ContainerAttachResponse> {
  const result = await _attachSend(
    context,
    resourceGroupName,
    containerGroupName,
    containerName,
    options,
  );
  return _attachDeserialize(result);
}

export function _executeCommandSend(
  context: Client,
  resourceGroupName: string,
  containerGroupName: string,
  containerName: string,
  containerExecRequest: ContainerExecRequest,
  options: ContainersExecuteCommandOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups/{containerGroupName}/containers/{containerName}/exec{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerGroupName: containerGroupName,
      containerName: containerName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: containerExecRequestSerializer(containerExecRequest),
  });
}

export async function _executeCommandDeserialize(
  result: PathUncheckedResponse,
): Promise<ContainerExecResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return containerExecResponseDeserializer(result.body);
}

/** Executes a command for a specific container instance in a specified resource group and container group. */
export async function executeCommand(
  context: Client,
  resourceGroupName: string,
  containerGroupName: string,
  containerName: string,
  containerExecRequest: ContainerExecRequest,
  options: ContainersExecuteCommandOptionalParams = { requestOptions: {} },
): Promise<ContainerExecResponse> {
  const result = await _executeCommandSend(
    context,
    resourceGroupName,
    containerGroupName,
    containerName,
    containerExecRequest,
    options,
  );
  return _executeCommandDeserialize(result);
}

export function _listLogsSend(
  context: Client,
  resourceGroupName: string,
  containerGroupName: string,
  containerName: string,
  options: ContainersListLogsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/containerGroups/{containerGroupName}/containers/{containerName}/logs{?api%2Dversion,tail,timestamps}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerGroupName: containerGroupName,
      containerName: containerName,
      "api%2Dversion": context.apiVersion ?? "2026-06-01-preview",
      tail: options?.tail,
      timestamps: options?.timestamps,
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

export async function _listLogsDeserialize(result: PathUncheckedResponse): Promise<Logs> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return logsDeserializer(result.body);
}

/** Get the logs for a specified container instance in a specified resource group and container group. */
export async function listLogs(
  context: Client,
  resourceGroupName: string,
  containerGroupName: string,
  containerName: string,
  options: ContainersListLogsOptionalParams = { requestOptions: {} },
): Promise<Logs> {
  const result = await _listLogsSend(
    context,
    resourceGroupName,
    containerGroupName,
    containerName,
    options,
  );
  return _listLogsDeserialize(result);
}
