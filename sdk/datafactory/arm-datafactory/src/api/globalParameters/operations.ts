// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext as Client } from "../index.js";
import type { GlobalParameterResource, _GlobalParameterListResponse } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  globalParameterResourceSerializer,
  globalParameterResourceDeserializer,
  _globalParameterListResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  GlobalParametersListByFactoryOptionalParams,
  GlobalParametersDeleteOptionalParams,
  GlobalParametersCreateOrUpdateOptionalParams,
  GlobalParametersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByFactorySend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  options: GlobalParametersListByFactoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/globalParameters{?api%2Dversion}",
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
): Promise<_GlobalParameterListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _globalParameterListResponseDeserializer(result.body);
}

/** Lists Global parameters */
export function listByFactory(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  options: GlobalParametersListByFactoryOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GlobalParameterResource> {
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
  globalParameterName: string,
  options: GlobalParametersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/globalParameters/{globalParameterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      globalParameterName: globalParameterName,
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

/** Deletes a Global parameter */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  globalParameterName: string,
  options: GlobalParametersDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    factoryName,
    globalParameterName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  globalParameterName: string,
  defaultParam: GlobalParameterResource,
  options: GlobalParametersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/globalParameters/{globalParameterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      globalParameterName: globalParameterName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: globalParameterResourceSerializer(defaultParam),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<GlobalParameterResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return globalParameterResourceDeserializer(result.body);
}

/** Creates or updates a Global parameter */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  globalParameterName: string,
  defaultParam: GlobalParameterResource,
  options: GlobalParametersCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<GlobalParameterResource> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    factoryName,
    globalParameterName,
    defaultParam,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  globalParameterName: string,
  options: GlobalParametersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/globalParameters/{globalParameterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      globalParameterName: globalParameterName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<GlobalParameterResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return globalParameterResourceDeserializer(result.body);
}

/** Gets a Global parameter */
export async function get(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  globalParameterName: string,
  options: GlobalParametersGetOptionalParams = { requestOptions: {} },
): Promise<GlobalParameterResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    factoryName,
    globalParameterName,
    options,
  );
  return _getDeserialize(result);
}
