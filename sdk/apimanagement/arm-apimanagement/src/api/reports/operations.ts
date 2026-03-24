// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type {
  _ReportCollection,
  ReportRecordContract,
  _RequestReportCollection,
  RequestReportRecordContract,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _reportCollectionDeserializer,
  _requestReportCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ReportsListByRequestOptionalParams,
  ReportsListByTimeOptionalParams,
  ReportsListBySubscriptionOptionalParams,
  ReportsListByGeoOptionalParams,
  ReportsListByProductOptionalParams,
  ReportsListByOperationOptionalParams,
  ReportsListByUserOptionalParams,
  ReportsListByApiOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByRequestSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  filter: string,
  options: ReportsListByRequestOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/reports/byRequest{?api%2Dversion,%24filter,%24top,%24skip}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
      "%24filter": filter,
      "%24top": options?.top,
      "%24skip": options?.skip,
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

export async function _listByRequestDeserialize(
  result: PathUncheckedResponse,
): Promise<_RequestReportCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _requestReportCollectionDeserializer(result.body);
}

/** Lists report records by Request. */
export function listByRequest(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  filter: string,
  options: ReportsListByRequestOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RequestReportRecordContract> {
  return buildPagedAsyncIterator(
    context,
    () => _listByRequestSend(context, resourceGroupName, serviceName, filter, options),
    _listByRequestDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}

export function _listByTimeSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  filter: string,
  interval: string,
  options: ReportsListByTimeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/reports/byTime{?api%2Dversion,%24filter,%24top,%24skip,%24orderby,interval}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
      "%24filter": filter,
      "%24top": options?.top,
      "%24skip": options?.skip,
      "%24orderby": options?.orderby,
      interval: interval,
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

export async function _listByTimeDeserialize(
  result: PathUncheckedResponse,
): Promise<_ReportCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _reportCollectionDeserializer(result.body);
}

/** Lists report records by Time. */
export function listByTime(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  filter: string,
  interval: string,
  options: ReportsListByTimeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ReportRecordContract> {
  return buildPagedAsyncIterator(
    context,
    () => _listByTimeSend(context, resourceGroupName, serviceName, filter, interval, options),
    _listByTimeDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}

export function _listBySubscriptionSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  filter: string,
  options: ReportsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/reports/bySubscription{?api%2Dversion,%24filter,%24top,%24skip,%24orderby}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
      "%24filter": filter,
      "%24top": options?.top,
      "%24skip": options?.skip,
      "%24orderby": options?.orderby,
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_ReportCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _reportCollectionDeserializer(result.body);
}

/** Lists report records by subscription. */
export function listBySubscription(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  filter: string,
  options: ReportsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ReportRecordContract> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, resourceGroupName, serviceName, filter, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}

export function _listByGeoSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  filter: string,
  options: ReportsListByGeoOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/reports/byGeo{?api%2Dversion,%24filter,%24top,%24skip}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
      "%24filter": filter,
      "%24top": options?.top,
      "%24skip": options?.skip,
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

export async function _listByGeoDeserialize(
  result: PathUncheckedResponse,
): Promise<_ReportCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _reportCollectionDeserializer(result.body);
}

/** Lists report records by geography. */
export function listByGeo(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  filter: string,
  options: ReportsListByGeoOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ReportRecordContract> {
  return buildPagedAsyncIterator(
    context,
    () => _listByGeoSend(context, resourceGroupName, serviceName, filter, options),
    _listByGeoDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}

export function _listByProductSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  filter: string,
  options: ReportsListByProductOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/reports/byProduct{?api%2Dversion,%24filter,%24top,%24skip,%24orderby}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
      "%24filter": filter,
      "%24top": options?.top,
      "%24skip": options?.skip,
      "%24orderby": options?.orderby,
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

export async function _listByProductDeserialize(
  result: PathUncheckedResponse,
): Promise<_ReportCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _reportCollectionDeserializer(result.body);
}

/** Lists report records by Product. */
export function listByProduct(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  filter: string,
  options: ReportsListByProductOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ReportRecordContract> {
  return buildPagedAsyncIterator(
    context,
    () => _listByProductSend(context, resourceGroupName, serviceName, filter, options),
    _listByProductDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}

export function _listByOperationSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  filter: string,
  options: ReportsListByOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/reports/byOperation{?api%2Dversion,%24filter,%24top,%24skip,%24orderby}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
      "%24filter": filter,
      "%24top": options?.top,
      "%24skip": options?.skip,
      "%24orderby": options?.orderby,
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

export async function _listByOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<_ReportCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _reportCollectionDeserializer(result.body);
}

/** Lists report records by API Operations. */
export function listByOperation(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  filter: string,
  options: ReportsListByOperationOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ReportRecordContract> {
  return buildPagedAsyncIterator(
    context,
    () => _listByOperationSend(context, resourceGroupName, serviceName, filter, options),
    _listByOperationDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}

export function _listByUserSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  filter: string,
  options: ReportsListByUserOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/reports/byUser{?api%2Dversion,%24filter,%24top,%24skip,%24orderby}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
      "%24filter": filter,
      "%24top": options?.top,
      "%24skip": options?.skip,
      "%24orderby": options?.orderby,
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

export async function _listByUserDeserialize(
  result: PathUncheckedResponse,
): Promise<_ReportCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _reportCollectionDeserializer(result.body);
}

/** Lists report records by User. */
export function listByUser(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  filter: string,
  options: ReportsListByUserOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ReportRecordContract> {
  return buildPagedAsyncIterator(
    context,
    () => _listByUserSend(context, resourceGroupName, serviceName, filter, options),
    _listByUserDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}

export function _listByApiSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  filter: string,
  options: ReportsListByApiOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/reports/byApi{?api%2Dversion,%24filter,%24top,%24skip,%24orderby}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
      "%24filter": filter,
      "%24top": options?.top,
      "%24skip": options?.skip,
      "%24orderby": options?.orderby,
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

export async function _listByApiDeserialize(
  result: PathUncheckedResponse,
): Promise<_ReportCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _reportCollectionDeserializer(result.body);
}

/** Lists report records by API. */
export function listByApi(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  filter: string,
  options: ReportsListByApiOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ReportRecordContract> {
  return buildPagedAsyncIterator(
    context,
    () => _listByApiSend(context, resourceGroupName, serviceName, filter, options),
    _listByApiDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}
