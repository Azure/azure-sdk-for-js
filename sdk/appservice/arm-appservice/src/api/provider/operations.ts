// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext as Client } from "../index.js";
import type {
  _CsmOperationCollection,
  CsmOperationDescription,
  _ApplicationStackCollection,
  ApplicationStackResource,
  _FunctionAppStackCollection,
  FunctionAppStack,
  _WebAppStackCollection,
  WebAppStack,
} from "../../models/models.js";
import {
  defaultErrorResponseDeserializer,
  _csmOperationCollectionDeserializer,
  _applicationStackCollectionDeserializer,
  _functionAppStackCollectionDeserializer,
  _webAppStackCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ProviderListAvailableStacksOnPremOptionalParams,
  ProviderListWebAppStacksOptionalParams,
  ProviderListWebAppStacksForLocationOptionalParams,
  ProviderListFunctionAppStacksForLocationOptionalParams,
  ProviderListFunctionAppStacksOptionalParams,
  ProviderListAvailableStacksOptionalParams,
  ProviderListOperationsOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listAvailableStacksOnPremSend(
  context: Client,
  options: ProviderListAvailableStacksOnPremOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/availableStacks{?api%2Dversion,osTypeSelected}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      osTypeSelected: options?.osTypeSelected,
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

export async function _listAvailableStacksOnPremDeserialize(
  result: PathUncheckedResponse,
): Promise<_ApplicationStackCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _applicationStackCollectionDeserializer(result.body);
}

/** Description for Get available application frameworks and their versions */
export function listAvailableStacksOnPrem(
  context: Client,
  options: ProviderListAvailableStacksOnPremOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ApplicationStackResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listAvailableStacksOnPremSend(context, options),
    _listAvailableStacksOnPremDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listWebAppStacksSend(
  context: Client,
  options: ProviderListWebAppStacksOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Web/webAppStacks{?api%2Dversion,stackOsType}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      stackOsType: options?.stackOsType,
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

export async function _listWebAppStacksDeserialize(
  result: PathUncheckedResponse,
): Promise<_WebAppStackCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _webAppStackCollectionDeserializer(result.body);
}

/** Description for Get available Web app frameworks and their versions */
export function listWebAppStacks(
  context: Client,
  options: ProviderListWebAppStacksOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WebAppStack> {
  return buildPagedAsyncIterator(
    context,
    () => _listWebAppStacksSend(context, options),
    _listWebAppStacksDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listWebAppStacksForLocationSend(
  context: Client,
  location: string,
  options: ProviderListWebAppStacksForLocationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Web/locations/{location}/webAppStacks{?api%2Dversion,stackOsType}",
    {
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      stackOsType: options?.stackOsType,
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

export async function _listWebAppStacksForLocationDeserialize(
  result: PathUncheckedResponse,
): Promise<_WebAppStackCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _webAppStackCollectionDeserializer(result.body);
}

/** Description for Get available Web app frameworks and their versions for location */
export function listWebAppStacksForLocation(
  context: Client,
  location: string,
  options: ProviderListWebAppStacksForLocationOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WebAppStack> {
  return buildPagedAsyncIterator(
    context,
    () => _listWebAppStacksForLocationSend(context, location, options),
    _listWebAppStacksForLocationDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listFunctionAppStacksForLocationSend(
  context: Client,
  location: string,
  options: ProviderListFunctionAppStacksForLocationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Web/locations/{location}/functionAppStacks{?api%2Dversion,stackOsType}",
    {
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      stackOsType: options?.stackOsType,
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

export async function _listFunctionAppStacksForLocationDeserialize(
  result: PathUncheckedResponse,
): Promise<_FunctionAppStackCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _functionAppStackCollectionDeserializer(result.body);
}

/** Description for Get available Function app frameworks and their versions for location */
export function listFunctionAppStacksForLocation(
  context: Client,
  location: string,
  options: ProviderListFunctionAppStacksForLocationOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FunctionAppStack> {
  return buildPagedAsyncIterator(
    context,
    () => _listFunctionAppStacksForLocationSend(context, location, options),
    _listFunctionAppStacksForLocationDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listFunctionAppStacksSend(
  context: Client,
  options: ProviderListFunctionAppStacksOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Web/functionAppStacks{?api%2Dversion,stackOsType}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      stackOsType: options?.stackOsType,
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

export async function _listFunctionAppStacksDeserialize(
  result: PathUncheckedResponse,
): Promise<_FunctionAppStackCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _functionAppStackCollectionDeserializer(result.body);
}

/** Description for Get available Function app frameworks and their versions */
export function listFunctionAppStacks(
  context: Client,
  options: ProviderListFunctionAppStacksOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FunctionAppStack> {
  return buildPagedAsyncIterator(
    context,
    () => _listFunctionAppStacksSend(context, options),
    _listFunctionAppStacksDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listAvailableStacksSend(
  context: Client,
  options: ProviderListAvailableStacksOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Web/availableStacks{?api%2Dversion,osTypeSelected}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      osTypeSelected: options?.osTypeSelected,
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

export async function _listAvailableStacksDeserialize(
  result: PathUncheckedResponse,
): Promise<_ApplicationStackCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _applicationStackCollectionDeserializer(result.body);
}

/** Description for Get available application frameworks and their versions */
export function listAvailableStacks(
  context: Client,
  options: ProviderListAvailableStacksOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ApplicationStackResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listAvailableStacksSend(context, options),
    _listAvailableStacksDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listOperationsSend(
  context: Client,
  options: ProviderListOperationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Web/operations{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listOperationsDeserialize(
  result: PathUncheckedResponse,
): Promise<_CsmOperationCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _csmOperationCollectionDeserializer(result.body);
}

/** Description for Gets all available operations for the Microsoft.Web resource provider. Also exposes resource metric definitions */
export function listOperations(
  context: Client,
  options: ProviderListOperationsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CsmOperationDescription> {
  return buildPagedAsyncIterator(
    context,
    () => _listOperationsSend(context, options),
    _listOperationsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}
