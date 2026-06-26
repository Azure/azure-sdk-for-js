// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  RestorableDroppedManagedDatabase,
  restorableDroppedManagedDatabaseDeserializer,
  _RestorableDroppedManagedDatabaseListResult,
  _restorableDroppedManagedDatabaseListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  RestorableDroppedManagedDatabasesListByInstanceOptionalParams,
  RestorableDroppedManagedDatabasesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByInstanceSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: RestorableDroppedManagedDatabasesListByInstanceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/restorableDroppedDatabases{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
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

export async function _listByInstanceDeserialize(
  result: PathUncheckedResponse,
): Promise<_RestorableDroppedManagedDatabaseListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _restorableDroppedManagedDatabaseListResultDeserializer(result.body);
}

/** Gets a list of restorable dropped managed databases. */
export function listByInstance(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: RestorableDroppedManagedDatabasesListByInstanceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RestorableDroppedManagedDatabase> {
  return buildPagedAsyncIterator(
    context,
    () => _listByInstanceSend(context, resourceGroupName, managedInstanceName, options),
    _listByInstanceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-01-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  restorableDroppedDatabaseId: string,
  options: RestorableDroppedManagedDatabasesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/restorableDroppedDatabases/{restorableDroppedDatabaseId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      restorableDroppedDatabaseId: restorableDroppedDatabaseId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<RestorableDroppedManagedDatabase> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return restorableDroppedManagedDatabaseDeserializer(result.body);
}

/** Gets a restorable dropped managed database. */
export async function get(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  restorableDroppedDatabaseId: string,
  options: RestorableDroppedManagedDatabasesGetOptionalParams = { requestOptions: {} },
): Promise<RestorableDroppedManagedDatabase> {
  const result = await _getSend(
    context,
    resourceGroupName,
    managedInstanceName,
    restorableDroppedDatabaseId,
    options,
  );
  return _getDeserialize(result);
}
