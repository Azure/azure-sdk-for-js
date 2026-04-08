// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext as Client } from "../index.js";
import type {
  ManagedDatabaseMoveOperationResult,
  _ManagedDatabaseMoveOperationListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  managedDatabaseMoveOperationResultDeserializer,
  _managedDatabaseMoveOperationListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ManagedDatabaseMoveOperationsListByLocationOptionalParams,
  ManagedDatabaseMoveOperationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByLocationSend(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  options: ManagedDatabaseMoveOperationsListByLocationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/managedDatabaseMoveOperationResults{?api%2Dversion,onlyLatestPerDatabase,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      locationName: locationName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
      onlyLatestPerDatabase: options?.onlyLatestPerDatabase,
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

export async function _listByLocationDeserialize(
  result: PathUncheckedResponse,
): Promise<_ManagedDatabaseMoveOperationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _managedDatabaseMoveOperationListResultDeserializer(result.body);
}

/** Lists managed database move operations. */
export function listByLocation(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  options: ManagedDatabaseMoveOperationsListByLocationOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ManagedDatabaseMoveOperationResult> {
  return buildPagedAsyncIterator(
    context,
    () => _listByLocationSend(context, resourceGroupName, locationName, options),
    _listByLocationDeserialize,
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
  locationName: string,
  operationId: string,
  options: ManagedDatabaseMoveOperationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/managedDatabaseMoveOperationResults/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      locationName: locationName,
      operationId: operationId,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedDatabaseMoveOperationResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedDatabaseMoveOperationResultDeserializer(result.body);
}

/** Gets a managed database move operation. */
export async function get(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  operationId: string,
  options: ManagedDatabaseMoveOperationsGetOptionalParams = { requestOptions: {} },
): Promise<ManagedDatabaseMoveOperationResult> {
  const result = await _getSend(context, resourceGroupName, locationName, operationId, options);
  return _getDeserialize(result);
}
