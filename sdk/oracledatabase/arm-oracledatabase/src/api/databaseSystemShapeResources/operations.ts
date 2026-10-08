// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext as Client } from "../index.js";
import type { DatabaseSystemShape, _DatabaseSystemShapeListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  databaseSystemShapeDeserializer,
  _databaseSystemShapeListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DatabaseSystemShapeResourcesListByLocationOptionalParams,
  DatabaseSystemShapeResourcesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByLocationSend(
  context: Client,
  location: string,
  options: DatabaseSystemShapeResourcesListByLocationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/locations/{location}/databaseSystemShapes{?api%2Dversion,shapeAttribute,zone,availabilityDomain,databaseShapeFamily,databaseEdition}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
      shapeAttribute: options?.shapeAttribute,
      zone: options?.zone,
      availabilityDomain: options?.availabilityDomain,
      databaseShapeFamily: options?.databaseShapeFamily,
      databaseEdition: options?.databaseEdition,
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

export async function _listByLocationDeserialize(
  result: PathUncheckedResponse,
): Promise<_DatabaseSystemShapeListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _databaseSystemShapeListResultDeserializer(result.body);
}

/** List DatabaseSystemShape resources by SubscriptionLocationResource */
export function listByLocation(
  context: Client,
  location: string,
  options: DatabaseSystemShapeResourcesListByLocationOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DatabaseSystemShape> {
  return buildPagedAsyncIterator(
    context,
    () => _listByLocationSend(context, location, options),
    _listByLocationDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-06-01" },
  );
}

export function _getSend(
  context: Client,
  location: string,
  databasesystemshapename: string,
  options: DatabaseSystemShapeResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/locations/{location}/databaseSystemShapes/{databasesystemshapename}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      databasesystemshapename: databasesystemshapename,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DatabaseSystemShape> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return databaseSystemShapeDeserializer(result.body);
}

/** Get a DatabaseSystemShape */
export async function get(
  context: Client,
  location: string,
  databasesystemshapename: string,
  options: DatabaseSystemShapeResourcesGetOptionalParams = { requestOptions: {} },
): Promise<DatabaseSystemShape> {
  const result = await _getSend(context, location, databasesystemshapename, options);
  return _getDeserialize(result);
}
