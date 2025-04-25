// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StandbyPoolManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  StandbyContainerGroupPoolRuntimeViewResource,
  standbyContainerGroupPoolRuntimeViewResourceDeserializer,
  _StandbyContainerGroupPoolRuntimeViewResourceListResult,
  _standbyContainerGroupPoolRuntimeViewResourceListResultDeserializer,
} from "../../models/models.js";
import {
  StandbyContainerGroupPoolRuntimeViewsListByStandbyPoolOptionalParams,
  StandbyContainerGroupPoolRuntimeViewsGetOptionalParams,
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

export function _listByStandbyPoolSend(
  context: Client,
  resourceGroupName: string,
  standbyContainerGroupPoolName: string,
  options: StandbyContainerGroupPoolRuntimeViewsListByStandbyPoolOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StandbyPool/standbyContainerGroupPools/{standbyContainerGroupPoolName}/runtimeViews{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      standbyContainerGroupPoolName: standbyContainerGroupPoolName,
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

export async function _listByStandbyPoolDeserialize(
  result: PathUncheckedResponse,
): Promise<_StandbyContainerGroupPoolRuntimeViewResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _standbyContainerGroupPoolRuntimeViewResourceListResultDeserializer(result.body);
}

/** List StandbyContainerGroupPoolRuntimeViewResource resources by StandbyContainerGroupPoolResource */
export function listByStandbyPool(
  context: Client,
  resourceGroupName: string,
  standbyContainerGroupPoolName: string,
  options: StandbyContainerGroupPoolRuntimeViewsListByStandbyPoolOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<StandbyContainerGroupPoolRuntimeViewResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByStandbyPoolSend(context, resourceGroupName, standbyContainerGroupPoolName, options),
    _listByStandbyPoolDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  standbyContainerGroupPoolName: string,
  runtimeView: string,
  options: StandbyContainerGroupPoolRuntimeViewsGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StandbyPool/standbyContainerGroupPools/{standbyContainerGroupPoolName}/runtimeViews/{runtimeView}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      standbyContainerGroupPoolName: standbyContainerGroupPoolName,
      runtimeView: runtimeView,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<StandbyContainerGroupPoolRuntimeViewResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return standbyContainerGroupPoolRuntimeViewResourceDeserializer(result.body);
}

/** Get a StandbyContainerGroupPoolRuntimeViewResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  standbyContainerGroupPoolName: string,
  runtimeView: string,
  options: StandbyContainerGroupPoolRuntimeViewsGetOptionalParams = {
    requestOptions: {},
  },
): Promise<StandbyContainerGroupPoolRuntimeViewResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    standbyContainerGroupPoolName,
    runtimeView,
    options,
  );
  return _getDeserialize(result);
}
