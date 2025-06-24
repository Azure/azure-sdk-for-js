// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  GiVersion,
  giVersionDeserializer,
  _GiVersionListResult,
  _giVersionListResultDeserializer,
} from "../../models/models.js";
import { GiVersionsListByLocationOptionalParams, GiVersionsGetOptionalParams } from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByLocationSend(
  context: Client,
  location: string,
  options: GiVersionsListByLocationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/locations/{location}/giVersions{?api%2Dversion,shape,zone}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion,
      shape: options?.shape,
      zone: options?.zone,
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

export async function _listByLocationDeserialize(
  result: PathUncheckedResponse,
): Promise<_GiVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _giVersionListResultDeserializer(result.body);
}

/** List GiVersion resources by SubscriptionLocationResource */
export function listByLocation(
  context: Client,
  location: string,
  options: GiVersionsListByLocationOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GiVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listByLocationSend(context, location, options),
    _listByLocationDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  location: string,
  giversionname: string,
  options: GiVersionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/locations/{location}/giVersions/{giversionname}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      giversionname: giversionname,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<GiVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return giVersionDeserializer(result.body);
}

/** Get a GiVersion */
export async function get(
  context: Client,
  location: string,
  giversionname: string,
  options: GiVersionsGetOptionalParams = { requestOptions: {} },
): Promise<GiVersion> {
  const result = await _getSend(context, location, giversionname, options);
  return _getDeserialize(result);
}
