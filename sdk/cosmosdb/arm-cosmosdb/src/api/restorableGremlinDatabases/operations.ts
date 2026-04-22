// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext as Client } from "../index.js";
import type {
  _RestorableGremlinDatabasesListResult,
  RestorableGremlinDatabaseGetResult,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  _restorableGremlinDatabasesListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { RestorableGremlinDatabasesListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  location: string,
  instanceId: string,
  options: RestorableGremlinDatabasesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/locations/{location}/restorableDatabaseAccounts/{instanceId}/restorableGremlinDatabases{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      instanceId: instanceId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_RestorableGremlinDatabasesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _restorableGremlinDatabasesListResultDeserializer(result.body);
}

/** Show the event feed of all mutations done on all the Azure Cosmos DB Gremlin databases under the restorable account. This helps in scenario where database was accidentally deleted to get the deletion time. This API requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission */
export function list(
  context: Client,
  location: string,
  instanceId: string,
  options: RestorableGremlinDatabasesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RestorableGremlinDatabaseGetResult> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, location, instanceId, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}
