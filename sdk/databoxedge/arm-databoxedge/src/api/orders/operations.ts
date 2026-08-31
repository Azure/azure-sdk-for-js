// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataBoxEdgeManagementContext as Client } from "../index.js";
import type { Order, _OrderList, DCAccessCode } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  orderSerializer,
  orderDeserializer,
  _orderListDeserializer,
  dcAccessCodeDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  OrdersListDCAccessCodeOptionalParams,
  OrdersListByDataBoxEdgeDeviceOptionalParams,
  OrdersDeleteOptionalParams,
  OrdersCreateOrUpdateOptionalParams,
  OrdersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listDCAccessCodeSend(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: OrdersListDCAccessCodeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/orders/default/listDCAccessCode{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
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

export async function _listDCAccessCodeDeserialize(
  result: PathUncheckedResponse,
): Promise<DCAccessCode> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return dcAccessCodeDeserializer(result.body);
}

/** Gets the DCAccess Code */
export async function listDCAccessCode(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: OrdersListDCAccessCodeOptionalParams = { requestOptions: {} },
): Promise<DCAccessCode> {
  const result = await _listDCAccessCodeSend(context, deviceName, resourceGroupName, options);
  return _listDCAccessCodeDeserialize(result);
}

export function _listByDataBoxEdgeDeviceSend(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: OrdersListByDataBoxEdgeDeviceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/orders{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
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

export async function _listByDataBoxEdgeDeviceDeserialize(
  result: PathUncheckedResponse,
): Promise<_OrderList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _orderListDeserializer(result.body);
}

/** Lists all the orders related to a Data Box Edge/Data Box Gateway device. */
export function listByDataBoxEdgeDevice(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: OrdersListByDataBoxEdgeDeviceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Order> {
  return buildPagedAsyncIterator(
    context,
    () => _listByDataBoxEdgeDeviceSend(context, deviceName, resourceGroupName, options),
    _listByDataBoxEdgeDeviceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2023-12-01" },
  );
}

export function _$deleteSend(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: OrdersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/orders/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
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
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes the order related to the device. */
export function $delete(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: OrdersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, deviceName, resourceGroupName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2023-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  order: Order,
  options: OrdersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/orders/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: orderSerializer(order),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Order> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return orderDeserializer(result.body);
}

/** Creates or updates an order. */
export function createOrUpdate(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  order: Order,
  options: OrdersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Order>, Order> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, deviceName, resourceGroupName, order, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2023-12-01",
  }) as PollerLike<OperationState<Order>, Order>;
}

export function _getSend(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: OrdersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/orders/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deviceName: deviceName,
      "api%2Dversion": context.apiVersion ?? "2023-12-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Order> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return orderDeserializer(result.body);
}

/** Gets a specific order by name. */
export async function get(
  context: Client,
  deviceName: string,
  resourceGroupName: string,
  options: OrdersGetOptionalParams = { requestOptions: {} },
): Promise<Order> {
  const result = await _getSend(context, deviceName, resourceGroupName, options);
  return _getDeserialize(result);
}
