// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext as Client } from "../index.js";
import type { DbVersion, _DbVersionListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  dbVersionDeserializer,
  _dbVersionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DbVersionsListByLocationOptionalParams,
  DbVersionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByLocationSend(
  context: Client,
  location: string,
  options: DbVersionsListByLocationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/locations/{location}/dbSystemDbVersions{?api%2Dversion,dbSystemShape,dbSystemId,storageManagement,isUpgradeSupported,isDatabaseSoftwareImageSupported,shapeFamily}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion,
      dbSystemShape: options?.dbSystemShape,
      dbSystemId: options?.dbSystemId,
      storageManagement: options?.storageManagement,
      isUpgradeSupported: options?.isUpgradeSupported,
      isDatabaseSoftwareImageSupported: options?.isDatabaseSoftwareImageSupported,
      shapeFamily: options?.shapeFamily,
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
): Promise<_DbVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _dbVersionListResultDeserializer(result.body);
}

/** List DbVersion resources by SubscriptionLocationResource */
export function listByLocation(
  context: Client,
  location: string,
  options: DbVersionsListByLocationOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DbVersion> {
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
  dbversionsname: string,
  options: DbVersionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/locations/{location}/dbSystemDbVersions/{dbversionsname}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      dbversionsname: dbversionsname,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DbVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return dbVersionDeserializer(result.body);
}

/** Get a DbVersion */
export async function get(
  context: Client,
  location: string,
  dbversionsname: string,
  options: DbVersionsGetOptionalParams = { requestOptions: {} },
): Promise<DbVersion> {
  const result = await _getSend(context, location, dbversionsname, options);
  return _getDeserialize(result);
}
