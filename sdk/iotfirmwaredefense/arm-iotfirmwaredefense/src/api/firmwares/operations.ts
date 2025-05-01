// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTFirmwareDefenseContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  Firmware,
  firmwareSerializer,
  firmwareDeserializer,
  FirmwareUpdateDefinition,
  firmwareUpdateDefinitionSerializer,
  _FirmwareListResult,
  _firmwareListResultDeserializer,
} from "../../models/models.js";
import {
  FirmwaresListByWorkspaceOptionalParams,
  FirmwaresDeleteOptionalParams,
  FirmwaresUpdateOptionalParams,
  FirmwaresCreateOptionalParams,
  FirmwaresGetOptionalParams,
} from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByWorkspaceSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: FirmwaresListByWorkspaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTFirmwareDefense/workspaces/{workspaceName}/firmwares{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
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

export async function _listByWorkspaceDeserialize(
  result: PathUncheckedResponse,
): Promise<_FirmwareListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _firmwareListResultDeserializer(result.body);
}

/** Lists all of firmwares inside a workspace. */
export function listByWorkspace(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: FirmwaresListByWorkspaceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Firmware> {
  return buildPagedAsyncIterator(
    context,
    () => _listByWorkspaceSend(context, resourceGroupName, workspaceName, options),
    _listByWorkspaceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  firmwareId: string,
  options: FirmwaresDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTFirmwareDefense/workspaces/{workspaceName}/firmwares/{firmwareId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      firmwareId: firmwareId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** The operation to delete a firmware. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  firmwareId: string,
  options: FirmwaresDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, workspaceName, firmwareId, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  firmwareId: string,
  properties: FirmwareUpdateDefinition,
  options: FirmwaresUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTFirmwareDefense/workspaces/{workspaceName}/firmwares/{firmwareId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      firmwareId: firmwareId,
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
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: firmwareUpdateDefinitionSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Firmware> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return firmwareDeserializer(result.body);
}

/** The operation to update firmware. */
export async function update(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  firmwareId: string,
  properties: FirmwareUpdateDefinition,
  options: FirmwaresUpdateOptionalParams = { requestOptions: {} },
): Promise<Firmware> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    workspaceName,
    firmwareId,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  firmwareId: string,
  resource: Firmware,
  options: FirmwaresCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTFirmwareDefense/workspaces/{workspaceName}/firmwares/{firmwareId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      firmwareId: firmwareId,
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
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: firmwareSerializer(resource),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<Firmware> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return firmwareDeserializer(result.body);
}

/** The operation to create a firmware. */
export async function create(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  firmwareId: string,
  resource: Firmware,
  options: FirmwaresCreateOptionalParams = { requestOptions: {} },
): Promise<Firmware> {
  const result = await _createSend(
    context,
    resourceGroupName,
    workspaceName,
    firmwareId,
    resource,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  firmwareId: string,
  options: FirmwaresGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.IoTFirmwareDefense/workspaces/{workspaceName}/firmwares/{firmwareId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      firmwareId: firmwareId,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Firmware> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return firmwareDeserializer(result.body);
}

/** Get firmware. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  firmwareId: string,
  options: FirmwaresGetOptionalParams = { requestOptions: {} },
): Promise<Firmware> {
  const result = await _getSend(context, resourceGroupName, workspaceName, firmwareId, options);
  return _getDeserialize(result);
}
