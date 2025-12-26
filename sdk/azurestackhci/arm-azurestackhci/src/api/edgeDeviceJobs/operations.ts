// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIContext as Client } from "../index.js";
import type { EdgeDeviceJobUnion, _EdgeDeviceJobListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  edgeDeviceJobUnionSerializer,
  edgeDeviceJobUnionDeserializer,
  _edgeDeviceJobListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  EdgeDeviceJobsListByEdgeDeviceOptionalParams,
  EdgeDeviceJobsDeleteOptionalParams,
  EdgeDeviceJobsCreateOrUpdateOptionalParams,
  EdgeDeviceJobsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByEdgeDeviceSend(
  context: Client,
  resourceUri: string,
  edgeDeviceName: string,
  options: EdgeDeviceJobsListByEdgeDeviceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.AzureStackHCI/edgeDevices/{edgeDeviceName}/jobs{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      edgeDeviceName: edgeDeviceName,
      "api%2Dversion": context.apiVersion,
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

export async function _listByEdgeDeviceDeserialize(
  result: PathUncheckedResponse,
): Promise<_EdgeDeviceJobListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _edgeDeviceJobListResultDeserializer(result.body);
}

/** List EdgeDeviceJob resources by EdgeDevice */
export function listByEdgeDevice(
  context: Client,
  resourceUri: string,
  edgeDeviceName: string,
  options: EdgeDeviceJobsListByEdgeDeviceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EdgeDeviceJobUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listByEdgeDeviceSend(context, resourceUri, edgeDeviceName, options),
    _listByEdgeDeviceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceUri: string,
  edgeDeviceName: string,
  jobsName: string,
  options: EdgeDeviceJobsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.AzureStackHCI/edgeDevices/{edgeDeviceName}/jobs/{jobsName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      edgeDeviceName: edgeDeviceName,
      jobsName: jobsName,
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

/** Delete a EdgeDeviceJob */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceUri: string,
  edgeDeviceName: string,
  jobsName: string,
  options: EdgeDeviceJobsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceUri, edgeDeviceName, jobsName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceUri: string,
  edgeDeviceName: string,
  jobsName: string,
  resource: EdgeDeviceJobUnion,
  options: EdgeDeviceJobsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.AzureStackHCI/edgeDevices/{edgeDeviceName}/jobs/{jobsName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      edgeDeviceName: edgeDeviceName,
      jobsName: jobsName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: edgeDeviceJobUnionSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<EdgeDeviceJobUnion> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return edgeDeviceJobUnionDeserializer(result.body);
}

/** Create a EdgeDeviceJob */
export function createOrUpdate(
  context: Client,
  resourceUri: string,
  edgeDeviceName: string,
  jobsName: string,
  resource: EdgeDeviceJobUnion,
  options: EdgeDeviceJobsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EdgeDeviceJobUnion>, EdgeDeviceJobUnion> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceUri, edgeDeviceName, jobsName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<EdgeDeviceJobUnion>, EdgeDeviceJobUnion>;
}

export function _getSend(
  context: Client,
  resourceUri: string,
  edgeDeviceName: string,
  jobsName: string,
  options: EdgeDeviceJobsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.AzureStackHCI/edgeDevices/{edgeDeviceName}/jobs/{jobsName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      edgeDeviceName: edgeDeviceName,
      jobsName: jobsName,
      "api%2Dversion": context.apiVersion,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<EdgeDeviceJobUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return edgeDeviceJobUnionDeserializer(result.body);
}

/** Get a EdgeDeviceJob */
export async function get(
  context: Client,
  resourceUri: string,
  edgeDeviceName: string,
  jobsName: string,
  options: EdgeDeviceJobsGetOptionalParams = { requestOptions: {} },
): Promise<EdgeDeviceJobUnion> {
  const result = await _getSend(context, resourceUri, edgeDeviceName, jobsName, options);
  return _getDeserialize(result);
}
