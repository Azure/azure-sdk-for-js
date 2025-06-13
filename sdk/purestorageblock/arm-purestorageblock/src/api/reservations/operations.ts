// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  Reservation,
  reservationSerializer,
  reservationDeserializer,
  ReservationUpdate,
  reservationUpdateSerializer,
  _ReservationListResult,
  _reservationListResultDeserializer,
  LimitDetails,
  limitDetailsDeserializer,
  ReservationBillingStatus,
  reservationBillingStatusDeserializer,
  ReservationBillingUsageReport,
  reservationBillingUsageReportDeserializer,
} from "../../models/models.js";
import {
  ReservationsGetBillingReportOptionalParams,
  ReservationsGetBillingStatusOptionalParams,
  ReservationsGetResourceLimitsOptionalParams,
  ReservationsListBySubscriptionOptionalParams,
  ReservationsListByResourceGroupOptionalParams,
  ReservationsDeleteOptionalParams,
  ReservationsUpdateOptionalParams,
  ReservationsCreateOptionalParams,
  ReservationsGetOptionalParams,
} from "./options.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
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
import { PollerLike, OperationState } from "@azure/core-lro";

export function _getBillingReportSend(
  context: Client,
  resourceGroupName: string,
  reservationName: string,
  options: ReservationsGetBillingReportOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/reservations/{reservationName}/getBillingReport{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      reservationName: reservationName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getBillingReportDeserialize(
  result: PathUncheckedResponse,
): Promise<ReservationBillingUsageReport> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return reservationBillingUsageReportDeserializer(result.body);
}

/** Provides a summarized report along with actions for resources billed via given reservation */
export async function getBillingReport(
  context: Client,
  resourceGroupName: string,
  reservationName: string,
  options: ReservationsGetBillingReportOptionalParams = { requestOptions: {} },
): Promise<ReservationBillingUsageReport> {
  const result = await _getBillingReportSend(context, resourceGroupName, reservationName, options);
  return _getBillingReportDeserialize(result);
}

export function _getBillingStatusSend(
  context: Client,
  resourceGroupName: string,
  reservationName: string,
  options: ReservationsGetBillingStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/reservations/{reservationName}/getBillingStatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      reservationName: reservationName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getBillingStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<ReservationBillingStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return reservationBillingStatusDeserializer(result.body);
}

/** Provides various statistics about resources billed via given reservation. */
export async function getBillingStatus(
  context: Client,
  resourceGroupName: string,
  reservationName: string,
  options: ReservationsGetBillingStatusOptionalParams = { requestOptions: {} },
): Promise<ReservationBillingStatus> {
  const result = await _getBillingStatusSend(context, resourceGroupName, reservationName, options);
  return _getBillingStatusDeserialize(result);
}

export function _getResourceLimitsSend(
  context: Client,
  resourceGroupName: string,
  reservationName: string,
  options: ReservationsGetResourceLimitsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/reservations/{reservationName}/getResourceLimits{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      reservationName: reservationName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getResourceLimitsDeserialize(
  result: PathUncheckedResponse,
): Promise<LimitDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return limitDetailsDeserializer(result.body);
}

/** Limits constraining certain resource properties. */
export async function getResourceLimits(
  context: Client,
  resourceGroupName: string,
  reservationName: string,
  options: ReservationsGetResourceLimitsOptionalParams = { requestOptions: {} },
): Promise<LimitDetails> {
  const result = await _getResourceLimitsSend(context, resourceGroupName, reservationName, options);
  return _getResourceLimitsDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: ReservationsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/PureStorage.Block/reservations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_ReservationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _reservationListResultDeserializer(result.body);
}

/** List reservations by Azure subscription ID */
export function listBySubscription(
  context: Client,
  options: ReservationsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<Reservation> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ReservationsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/reservations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_ReservationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _reservationListResultDeserializer(result.body);
}

/** List reservations by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ReservationsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<Reservation> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  reservationName: string,
  options: ReservationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/reservations/{reservationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      reservationName: reservationName,
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
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a reservation */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  reservationName: string,
  options: ReservationsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, reservationName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  reservationName: string,
  properties: ReservationUpdate,
  options: ReservationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/reservations/{reservationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      reservationName: reservationName,
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
    body: reservationUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Reservation> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return reservationDeserializer(result.body);
}

/** Update a reservation */
export function update(
  context: Client,
  resourceGroupName: string,
  reservationName: string,
  properties: ReservationUpdate,
  options: ReservationsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Reservation>, Reservation> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, reservationName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<Reservation>, Reservation>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  reservationName: string,
  resource: Reservation,
  options: ReservationsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/reservations/{reservationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      reservationName: reservationName,
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
    body: reservationSerializer(resource),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<Reservation> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return reservationDeserializer(result.body);
}

/** Create a reservation */
export function create(
  context: Client,
  resourceGroupName: string,
  reservationName: string,
  resource: Reservation,
  options: ReservationsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Reservation>, Reservation> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, reservationName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<Reservation>, Reservation>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  reservationName: string,
  options: ReservationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PureStorage.Block/reservations/{reservationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      reservationName: reservationName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Reservation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return reservationDeserializer(result.body);
}

/** Get a reservation */
export async function get(
  context: Client,
  resourceGroupName: string,
  reservationName: string,
  options: ReservationsGetOptionalParams = { requestOptions: {} },
): Promise<Reservation> {
  const result = await _getSend(context, resourceGroupName, reservationName, options);
  return _getDeserialize(result);
}
