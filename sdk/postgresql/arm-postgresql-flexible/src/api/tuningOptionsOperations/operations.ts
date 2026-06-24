// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  TuningOptions,
  tuningOptionsDeserializer,
  TuningOptionParameterEnum,
  _TuningOptionsList,
  _tuningOptionsListDeserializer,
  _ObjectRecommendationList,
  _objectRecommendationListDeserializer,
  ObjectRecommendation,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  TuningOptionsOperationsListRecommendationsOptionalParams,
  TuningOptionsOperationsListByServerOptionalParams,
  TuningOptionsOperationsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listRecommendationsSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  tuningOption: TuningOptionParameterEnum,
  options: TuningOptionsOperationsListRecommendationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/tuningOptions/{tuningOption}/recommendations{?api%2Dversion,recommendationType}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      tuningOption: tuningOption,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
      recommendationType: options?.recommendationType,
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

export async function _listRecommendationsDeserialize(
  result: PathUncheckedResponse,
): Promise<_ObjectRecommendationList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

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
  options: TuningOptionsOperationsListRecommendationsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ObjectRecommendation> {
  return buildPagedAsyncIterator(
    context,
    () => _listRecommendationsSend(context, resourceGroupName, serverName, tuningOption, options),
    _listRecommendationsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-04-01-preview",
    },
  );
}

export function _listByServerSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: TuningOptionsOperationsListByServerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/tuningOptions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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

export async function _listByServerDeserialize(
  result: PathUncheckedResponse,
): Promise<_TuningOptionsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _tuningOptionsListDeserializer(result.body);
}

/** Lists the tuning options of a server. */
export function listByServer(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: TuningOptionsOperationsListByServerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TuningOptions> {
  return buildPagedAsyncIterator(
    context,
    () => _listByServerSend(context, resourceGroupName, serverName, options),
    _listByServerDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-04-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  tuningOption: TuningOptionParameterEnum,
  options: TuningOptionsOperationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/tuningOptions/{tuningOption}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      tuningOption: tuningOption,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<TuningOptions> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

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
  options: TuningOptionsOperationsGetOptionalParams = { requestOptions: {} },
): Promise<TuningOptions> {
  const result = await _getSend(context, resourceGroupName, serverName, tuningOption, options);
  return _getDeserialize(result);
}
