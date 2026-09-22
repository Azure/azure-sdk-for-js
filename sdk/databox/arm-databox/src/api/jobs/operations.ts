// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxManagementContext as Client } from "../index.js";
import {
  apiErrorDeserializer,
  JobResource,
  jobResourceSerializer,
  jobResourceDeserializer,
  JobResourceUpdateParameter,
  jobResourceUpdateParameterSerializer,
  _JobResourceList,
  _jobResourceListDeserializer,
  ShipmentPickUpRequest,
  shipmentPickUpRequestSerializer,
  ShipmentPickUpResponse,
  shipmentPickUpResponseDeserializer,
  CancellationReason,
  cancellationReasonSerializer,
  _UnencryptedCredentialsList,
  _unencryptedCredentialsListDeserializer,
  UnencryptedCredentials,
  MarkDevicesShippedRequest,
  markDevicesShippedRequestSerializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  JobsMarkDevicesShippedOptionalParams,
  JobsListCredentialsOptionalParams,
  JobsCancelOptionalParams,
  JobsBookShipmentPickUpOptionalParams,
  JobsListOptionalParams,
  JobsListByResourceGroupOptionalParams,
  JobsDeleteOptionalParams,
  JobsUpdateOptionalParams,
  JobsCreateOptionalParams,
  JobsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _markDevicesShippedSend(
  context: Client,
  jobName: string,
  resourceGroupName: string,
  markDevicesShippedRequest: MarkDevicesShippedRequest,
  options: JobsMarkDevicesShippedOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBox/jobs/{jobName}/markDevicesShipped{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: markDevicesShippedRequestSerializer(markDevicesShippedRequest),
  });
}

export async function _markDevicesShippedDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Request to mark devices for a given job as shipped */
export async function markDevicesShipped(
  context: Client,
  jobName: string,
  resourceGroupName: string,
  markDevicesShippedRequest: MarkDevicesShippedRequest,
  options: JobsMarkDevicesShippedOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _markDevicesShippedSend(
    context,
    jobName,
    resourceGroupName,
    markDevicesShippedRequest,
    options,
  );
  return _markDevicesShippedDeserialize(result);
}

export function _listCredentialsSend(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  options: JobsListCredentialsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBox/jobs/{jobName}/listCredentials{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
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

export async function _listCredentialsDeserialize(
  result: PathUncheckedResponse,
): Promise<_UnencryptedCredentialsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);

    throw error;
  }

  return _unencryptedCredentialsListDeserializer(result.body);
}

/** This method gets the unencrypted secrets related to the job. */
export function listCredentials(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  options: JobsListCredentialsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<UnencryptedCredentials> {
  return buildPagedAsyncIterator(
    context,
    () => _listCredentialsSend(context, resourceGroupName, jobName, options),
    _listCredentialsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-07-01" },
  );
}

export function _cancelSend(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  cancellationReason: CancellationReason,
  options: JobsCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBox/jobs/{jobName}/cancel{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: cancellationReasonSerializer(cancellationReason),
  });
}

export async function _cancelDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** CancelJob. */
export async function cancel(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  cancellationReason: CancellationReason,
  options: JobsCancelOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _cancelSend(
    context,
    resourceGroupName,
    jobName,
    cancellationReason,
    options,
  );
  return _cancelDeserialize(result);
}

export function _bookShipmentPickUpSend(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  shipmentPickUpRequest: ShipmentPickUpRequest,
  options: JobsBookShipmentPickUpOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBox/jobs/{jobName}/bookShipmentPickUp{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: shipmentPickUpRequestSerializer(shipmentPickUpRequest),
  });
}

export async function _bookShipmentPickUpDeserialize(
  result: PathUncheckedResponse,
): Promise<ShipmentPickUpResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);

    throw error;
  }

  return shipmentPickUpResponseDeserializer(result.body);
}

/** Book shipment pick up. */
export async function bookShipmentPickUp(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  shipmentPickUpRequest: ShipmentPickUpRequest,
  options: JobsBookShipmentPickUpOptionalParams = { requestOptions: {} },
): Promise<ShipmentPickUpResponse> {
  const result = await _bookShipmentPickUpSend(
    context,
    resourceGroupName,
    jobName,
    shipmentPickUpRequest,
    options,
  );
  return _bookShipmentPickUpDeserialize(result);
}

export function _listSend(
  context: Client,
  options: JobsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DataBox/jobs{?api%2Dversion,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
      "%24skipToken": options?.skipToken,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_JobResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);

    throw error;
  }

  return _jobResourceListDeserializer(result.body);
}

/** Lists all the jobs available under the subscription. */
export function list(
  context: Client,
  options: JobsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<JobResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-07-01" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: JobsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBox/jobs{?api%2Dversion,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
      "%24skipToken": options?.skipToken,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_JobResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);

    throw error;
  }

  return _jobResourceListDeserializer(result.body);
}

/** Lists all the jobs available under the given resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: JobsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<JobResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-07-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  options: JobsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBox/jobs/{jobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
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
    error.details = apiErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a job. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  options: JobsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, jobName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  jobResourceUpdateParameter: JobResourceUpdateParameter,
  options: JobsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBox/jobs/{jobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: jobResourceUpdateParameterSerializer(jobResourceUpdateParameter),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<JobResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);

    throw error;
  }

  return jobResourceDeserializer(result.body);
}

/** Updates the properties of an existing job. */
export function update(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  jobResourceUpdateParameter: JobResourceUpdateParameter,
  options: JobsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<JobResource>, JobResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, jobName, jobResourceUpdateParameter, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-01",
  }) as PollerLike<OperationState<JobResource>, JobResource>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  jobResource: JobResource,
  options: JobsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBox/jobs/{jobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: jobResourceSerializer(jobResource),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<JobResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);

    throw error;
  }

  return jobResourceDeserializer(result.body);
}

/** Creates a new job with the specified parameters. Existing job cannot be updated with this API and should instead be updated with the Update job API. */
export function create(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  jobResource: JobResource,
  options: JobsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<JobResource>, JobResource> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, jobName, jobResource, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-01",
  }) as PollerLike<OperationState<JobResource>, JobResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  options: JobsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBox/jobs/{jobName}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<JobResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorDeserializer(result.body);

    throw error;
  }

  return jobResourceDeserializer(result.body);
}

/** Gets information about the specified job. */
export async function get(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  options: JobsGetOptionalParams = { requestOptions: {} },
): Promise<JobResource> {
  const result = await _getSend(context, resourceGroupName, jobName, options);
  return _getDeserialize(result);
}
