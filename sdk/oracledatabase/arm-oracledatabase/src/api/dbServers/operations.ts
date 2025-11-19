// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext as Client } from "../index.js";
import type { DbServer, _DbServerListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  dbServerDeserializer,
  _dbServerListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { DbServersListByParentOptionalParams, DbServersGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByParentSend(
  context: Client,
  resourceGroupName: string,
  cloudexadatainfrastructurename: string,
  options: DbServersListByParentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudExadataInfrastructures/{cloudexadatainfrastructurename}/dbServers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudexadatainfrastructurename: cloudexadatainfrastructurename,
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

export async function _listByParentDeserialize(
  result: PathUncheckedResponse,
): Promise<_DbServerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _dbServerListResultDeserializer(result.body);
}

/** List DbServer resources by CloudExadataInfrastructure */
export function listByParent(
  context: Client,
  resourceGroupName: string,
  cloudexadatainfrastructurename: string,
  options: DbServersListByParentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DbServer> {
  return buildPagedAsyncIterator(
    context,
    () => _listByParentSend(context, resourceGroupName, cloudexadatainfrastructurename, options),
    _listByParentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  cloudexadatainfrastructurename: string,
  dbserverocid: string,
  options: DbServersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudExadataInfrastructures/{cloudexadatainfrastructurename}/dbServers/{dbserverocid}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudexadatainfrastructurename: cloudexadatainfrastructurename,
      dbserverocid: dbserverocid,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DbServer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return dbServerDeserializer(result.body);
}

/** Get a DbServer */
export async function get(
  context: Client,
  resourceGroupName: string,
  cloudexadatainfrastructurename: string,
  dbserverocid: string,
  options: DbServersGetOptionalParams = { requestOptions: {} },
): Promise<DbServer> {
  const result = await _getSend(
    context,
    resourceGroupName,
    cloudexadatainfrastructurename,
    dbserverocid,
    options,
  );
  return _getDeserialize(result);
}
