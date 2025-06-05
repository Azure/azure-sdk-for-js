// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _GiMinorVersionListResult,
  _giMinorVersionListResultDeserializer,
  GiMinorVersion,
  giMinorVersionDeserializer,
} from "../../models/models.js";
import {
  GiMinorVersionsGetOptionalParams,
  GiMinorVersionsListByParentOptionalParams,
} from "./options.js";
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

export function _getSend(
  context: Client,
  location: string,
  giversionname: string,
  giMinorVersionName: string,
  options: GiMinorVersionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/locations/{location}/giVersions/{giversionname}/giMinorVersions/{giMinorVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      giversionname: giversionname,
      giMinorVersionName: giMinorVersionName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<GiMinorVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return giMinorVersionDeserializer(result.body);
}

/** Get a GiMinorVersion */
export async function get(
  context: Client,
  location: string,
  giversionname: string,
  giMinorVersionName: string,
  options: GiMinorVersionsGetOptionalParams = { requestOptions: {} },
): Promise<GiMinorVersion> {
  const result = await _getSend(context, location, giversionname, giMinorVersionName, options);
  return _getDeserialize(result);
}

export function _listByParentSend(
  context: Client,
  location: string,
  giversionname: string,
  options: GiMinorVersionsListByParentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/locations/{location}/giVersions/{giversionname}/giMinorVersions{?api%2Dversion,shapeFamily,zone}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      giversionname: giversionname,
      "api%2Dversion": context.apiVersion,
      shapeFamily: options?.shapeFamily,
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

export async function _listByParentDeserialize(
  result: PathUncheckedResponse,
): Promise<_GiMinorVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _giMinorVersionListResultDeserializer(result.body);
}

/** List GiMinorVersion resources by GiVersion */
export function listByParent(
  context: Client,
  location: string,
  giversionname: string,
  options: GiMinorVersionsListByParentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GiMinorVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listByParentSend(context, location, giversionname, options),
    _listByParentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
