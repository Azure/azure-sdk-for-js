// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgreSQLManagementFlexibleServerContext as Client } from "../index.js";
import type {
  TuningOptions,
  TuningOptionParameterEnum,
  _TuningOptionsList,
  _ObjectRecommendationList,
  ObjectRecommendation,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  tuningOptionsDeserializer,
  _tuningOptionsListDeserializer,
  _objectRecommendationListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  TuningOptionsListRecommendationsOptionalParams,
  TuningOptionsListByServerOptionalParams,
  TuningOptionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listRecommendationsSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  tuningOption: TuningOptionParameterEnum,
  options: TuningOptionsListRecommendationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/tuningOptions/{tuningOption}/recommendations{?api%2Dversion,recommendationType}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      tuningOption: tuningOption,
      "api%2Dversion": context.apiVersion,
      recommendationType: options?.recommendationType,
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

export async function _listRecommendationsDeserialize(
  result: PathUncheckedResponse,
): Promise<_ObjectRecommendationList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _objectRecommendationListDeserializer(result.body);
}

/** Lists available object recommendations. */
export function listRecommendations(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  tuningOption: TuningOptionParameterEnum,
  options: TuningOptionsListRecommendationsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ObjectRecommendation> {
  return buildPagedAsyncIterator(
    context,
    () => _listRecommendationsSend(context, resourceGroupName, serverName, tuningOption, options),
    _listRecommendationsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByServerSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: TuningOptionsListByServerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/tuningOptions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
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

export async function _listByServerDeserialize(
  result: PathUncheckedResponse,
): Promise<_TuningOptionsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _tuningOptionsListDeserializer(result.body);
}

/** Lists the tuning options of a server. */
export function listByServer(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: TuningOptionsListByServerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TuningOptions> {
  return buildPagedAsyncIterator(
    context,
    () => _listByServerSend(context, resourceGroupName, serverName, options),
    _listByServerDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  tuningOption: TuningOptionParameterEnum,
  options: TuningOptionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/tuningOptions/{tuningOption}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      tuningOption: tuningOption,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<TuningOptions> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return tuningOptionsDeserializer(result.body);
}

/** Gets the tuning options of a server. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  tuningOption: TuningOptionParameterEnum,
  options: TuningOptionsGetOptionalParams = { requestOptions: {} },
): Promise<TuningOptions> {
  const result = await _getSend(context, resourceGroupName, serverName, tuningOption, options);
  return _getDeserialize(result);
}
