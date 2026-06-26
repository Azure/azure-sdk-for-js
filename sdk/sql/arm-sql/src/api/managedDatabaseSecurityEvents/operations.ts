// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _SecurityEventCollection,
  _securityEventCollectionDeserializer,
  SecurityEvent,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { ManagedDatabaseSecurityEventsListByDatabaseOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByDatabaseSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  options: ManagedDatabaseSecurityEventsListByDatabaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/securityEvents{?api%2Dversion,%24filter,%24skip,%24top,%24skiptoken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
      "%24filter": options?.filter,
      "%24skip": options?.skip,
      "%24top": options?.top,
      "%24skiptoken": options?.skiptoken,
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

export async function _listByDatabaseDeserialize(
  result: PathUncheckedResponse,
): Promise<_SecurityEventCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _securityEventCollectionDeserializer(result.body);
}

/** Gets a list of security events. */
export function listByDatabase(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  options: ManagedDatabaseSecurityEventsListByDatabaseOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecurityEvent> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByDatabaseSend(context, resourceGroupName, managedInstanceName, databaseName, options),
    _listByDatabaseDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-01-01" },
  );
}
