// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  edgeDeviceUnionSerializer,
  edgeDeviceUnionDeserializer,
  EdgeDeviceUnion,
  _EdgeDeviceListResult,
  _edgeDeviceListResultDeserializer,
  ValidateRequest,
  validateRequestSerializer,
  ValidateResponse,
  validateResponseDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  EdgeDevicesValidateOptionalParams,
  EdgeDevicesListOptionalParams,
  EdgeDevicesDeleteOptionalParams,
  EdgeDevicesCreateOrUpdateOptionalParams,
  EdgeDevicesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _validateSend(
  context: Client,
  resourceUri: string,
  edgeDeviceName: string,
  validateRequest: ValidateRequest,
  options: EdgeDevicesValidateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.AzureStackHCI/edgeDevices/{edgeDeviceName}/validate{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      edgeDeviceName: edgeDeviceName,
      "api%2Dversion": context.apiVersion,
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
      body: validateRequestSerializer(validateRequest),
    });
}

export async function _validateDeserialize(
  result: PathUncheckedResponse,
): Promise<ValidateResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return validateResponseDeserializer(result.body);
}

/** A long-running resource action. */
export function validate(
  context: Client,
  resourceUri: string,
  edgeDeviceName: string,
  validateRequest: ValidateRequest,
  options: EdgeDevicesValidateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ValidateResponse>, ValidateResponse> {
  return getLongRunningPoller(context, _validateDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _validateSend(context, resourceUri, edgeDeviceName, validateRequest, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ValidateResponse>, ValidateResponse>;
}

export function _listSend(
  context: Client,
  resourceUri: string,
  options: EdgeDevicesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.AzureStackHCI/edgeDevices{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      "api%2Dversion": context.apiVersion,
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
): Promise<_EdgeDeviceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _edgeDeviceListResultDeserializer(result.body);
}

/** List EdgeDevice resources by parent */
export function list(
  context: Client,
  resourceUri: string,
  options: EdgeDevicesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EdgeDeviceUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceUri, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceUri: string,
  edgeDeviceName: string,
  options: EdgeDevicesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.AzureStackHCI/edgeDevices/{edgeDeviceName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      edgeDeviceName: edgeDeviceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a EdgeDevice */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceUri: string,
  edgeDeviceName: string,
  options: EdgeDevicesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceUri, edgeDeviceName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceUri: string,
  edgeDeviceName: string,
  resource: EdgeDeviceUnion,
  options: EdgeDevicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.AzureStackHCI/edgeDevices/{edgeDeviceName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      edgeDeviceName: edgeDeviceName,
      "api%2Dversion": context.apiVersion,
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
      body: edgeDeviceUnionSerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<EdgeDeviceUnion> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return edgeDeviceUnionDeserializer(result.body);
}

/** Create a EdgeDevice */
export function createOrUpdate(
  context: Client,
  resourceUri: string,
  edgeDeviceName: string,
  resource: EdgeDeviceUnion,
  options: EdgeDevicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EdgeDeviceUnion>, EdgeDeviceUnion> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceUri, edgeDeviceName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<EdgeDeviceUnion>, EdgeDeviceUnion>;
}

export function _getSend(
  context: Client,
  resourceUri: string,
  edgeDeviceName: string,
  options: EdgeDevicesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.AzureStackHCI/edgeDevices/{edgeDeviceName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      edgeDeviceName: edgeDeviceName,
      "api%2Dversion": context.apiVersion,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<EdgeDeviceUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return edgeDeviceUnionDeserializer(result.body);
}

/** Get a EdgeDevice */
export async function get(
  context: Client,
  resourceUri: string,
  edgeDeviceName: string,
  options: EdgeDevicesGetOptionalParams = { requestOptions: {} },
): Promise<EdgeDeviceUnion> {
  const result = await _getSend(context, resourceUri, edgeDeviceName, options);
  return _getDeserialize(result);
}
