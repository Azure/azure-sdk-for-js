// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type {
  RestorableDroppedDatabase,
  _RestorableDroppedDatabaseListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  restorableDroppedDatabaseDeserializer,
  _restorableDroppedDatabaseListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RestorableDroppedDatabasesListByServerOptionalParams,
  RestorableDroppedDatabasesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByServerSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: RestorableDroppedDatabasesListByServerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/restorableDroppedDatabases{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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
): Promise<_RestorableDroppedDatabaseListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _restorableDroppedDatabaseListResultDeserializer(result.body);
}

/** Gets a list of restorable dropped databases. */
export function listByServer(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: RestorableDroppedDatabasesListByServerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RestorableDroppedDatabase> {
  return buildPagedAsyncIterator(
    context,
    () => _listByServerSend(context, resourceGroupName, serverName, options),
    _listByServerDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  restorableDroppedDatabaseId: string,
  options: RestorableDroppedDatabasesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/restorableDroppedDatabases/{restorableDroppedDatabaseId}{?api%2Dversion,%24expand,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      restorableDroppedDatabaseId: restorableDroppedDatabaseId,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
      "%24expand": options?.expand,
      "%24filter": options?.filter,
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
): Promise<RestorableDroppedDatabase> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return restorableDroppedDatabaseDeserializer(result.body);
}

/** Gets a restorable dropped database. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  restorableDroppedDatabaseId: string,
  options: RestorableDroppedDatabasesGetOptionalParams = { requestOptions: {} },
): Promise<RestorableDroppedDatabase> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serverName,
    restorableDroppedDatabaseId,
    options,
  );
  return _getDeserialize(result);
}
