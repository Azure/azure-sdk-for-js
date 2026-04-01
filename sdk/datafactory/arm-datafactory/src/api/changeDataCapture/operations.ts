// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext as Client } from "../index.js";
import type {
  ChangeDataCaptureResource,
  _ChangeDataCaptureListResponse,
  ChangeDataCaptureStatusResponse,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  changeDataCaptureResourceSerializer,
  changeDataCaptureResourceDeserializer,
  _changeDataCaptureListResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ChangeDataCaptureStatusOptionalParams,
  ChangeDataCaptureStopOptionalParams,
  ChangeDataCaptureStartOptionalParams,
  ChangeDataCaptureListByFactoryOptionalParams,
  ChangeDataCaptureDeleteOptionalParams,
  ChangeDataCaptureCreateOrUpdateOptionalParams,
  ChangeDataCaptureGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _statusSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  changeDataCaptureName: string,
  options: ChangeDataCaptureStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/adfcdcs/{changeDataCaptureName}/status{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      changeDataCaptureName: changeDataCaptureName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
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

export async function _statusDeserialize(
  result: PathUncheckedResponse,
): Promise<ChangeDataCaptureStatusResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return { body: result.body };
}

/** Gets the current status for the change data capture resource. */
export async function status(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  changeDataCaptureName: string,
  options: ChangeDataCaptureStatusOptionalParams = { requestOptions: {} },
): Promise<ChangeDataCaptureStatusResponse> {
  const result = await _statusSend(
    context,
    resourceGroupName,
    factoryName,
    changeDataCaptureName,
    options,
  );
  return _statusDeserialize(result);
}

export function _stopSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  changeDataCaptureName: string,
  options: ChangeDataCaptureStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/adfcdcs/{changeDataCaptureName}/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      changeDataCaptureName: changeDataCaptureName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _stopDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Stops a change data capture. */
export async function stop(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  changeDataCaptureName: string,
  options: ChangeDataCaptureStopOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _stopSend(
    context,
    resourceGroupName,
    factoryName,
    changeDataCaptureName,
    options,
  );
  return _stopDeserialize(result);
}

export function _startSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  changeDataCaptureName: string,
  options: ChangeDataCaptureStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/adfcdcs/{changeDataCaptureName}/start{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      changeDataCaptureName: changeDataCaptureName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _startDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Starts a change data capture. */
export async function start(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  changeDataCaptureName: string,
  options: ChangeDataCaptureStartOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _startSend(
    context,
    resourceGroupName,
    factoryName,
    changeDataCaptureName,
    options,
  );
  return _startDeserialize(result);
}

export function _listByFactorySend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  options: ChangeDataCaptureListByFactoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/adfcdcs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
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

export async function _listByFactoryDeserialize(
  result: PathUncheckedResponse,
): Promise<_ChangeDataCaptureListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _changeDataCaptureListResponseDeserializer(result.body);
}

/** Lists all resources of type change data capture. */
export function listByFactory(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  options: ChangeDataCaptureListByFactoryOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ChangeDataCaptureResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByFactorySend(context, resourceGroupName, factoryName, options),
    _listByFactoryDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2018-06-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  changeDataCaptureName: string,
  options: ChangeDataCaptureDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/adfcdcs/{changeDataCaptureName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      changeDataCaptureName: changeDataCaptureName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a change data capture. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  changeDataCaptureName: string,
  options: ChangeDataCaptureDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    factoryName,
    changeDataCaptureName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  changeDataCaptureName: string,
  changeDataCapture: ChangeDataCaptureResource,
  options: ChangeDataCaptureCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/adfcdcs/{changeDataCaptureName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      changeDataCaptureName: changeDataCaptureName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: changeDataCaptureResourceSerializer(changeDataCapture),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ChangeDataCaptureResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return changeDataCaptureResourceDeserializer(result.body);
}

/** Creates or updates a change data capture resource. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  changeDataCaptureName: string,
  changeDataCapture: ChangeDataCaptureResource,
  options: ChangeDataCaptureCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ChangeDataCaptureResource> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    factoryName,
    changeDataCaptureName,
    changeDataCapture,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  changeDataCaptureName: string,
  options: ChangeDataCaptureGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/adfcdcs/{changeDataCaptureName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      changeDataCaptureName: changeDataCaptureName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ChangeDataCaptureResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return changeDataCaptureResourceDeserializer(result.body);
}

/** Gets a change data capture. */
export async function get(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  changeDataCaptureName: string,
  options: ChangeDataCaptureGetOptionalParams = { requestOptions: {} },
): Promise<ChangeDataCaptureResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    factoryName,
    changeDataCaptureName,
    options,
  );
  return _getDeserialize(result);
}
