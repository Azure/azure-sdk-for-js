// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext as Client } from "../index.js";
import type { DbSystemShape, _DbSystemShapeListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  dbSystemShapeDeserializer,
  _dbSystemShapeListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DbSystemShapesListByLocationOptionalParams,
  DbSystemShapesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByLocationSend(
  context: Client,
  location: string,
  options: DbSystemShapesListByLocationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/locations/{location}/dbSystemShapes{?api%2Dversion,zone,shapeAttribute}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion,
      zone: options?.zone,
      shapeAttribute: options?.shapeAttribute,
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
): Promise<_DbSystemShapeListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _dbSystemShapeListResultDeserializer(result.body);
}

/** List DbSystemShape resources by SubscriptionLocationResource */
export function listByLocation(
  context: Client,
  location: string,
  options: DbSystemShapesListByLocationOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DbSystemShape> {
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
  dbsystemshapename: string,
  options: DbSystemShapesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/locations/{location}/dbSystemShapes/{dbsystemshapename}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      dbsystemshapename: dbsystemshapename,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DbSystemShape> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return dbSystemShapeDeserializer(result.body);
}

/** Get a DbSystemShape */
export async function get(
  context: Client,
  location: string,
  dbsystemshapename: string,
  options: DbSystemShapesGetOptionalParams = { requestOptions: {} },
): Promise<DbSystemShape> {
  const result = await _getSend(context, location, dbsystemshapename, options);
  return _getDeserialize(result);
}
