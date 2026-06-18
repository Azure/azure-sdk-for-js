// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  _RestorableGremlinGraphsListResult,
  _restorableGremlinGraphsListResultDeserializer,
  RestorableGremlinGraphGetResult,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { RestorableGremlinGraphsListOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  location: string,
  instanceId: string,
  options: RestorableGremlinGraphsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/locations/{location}/restorableDatabaseAccounts/{instanceId}/restorableGraphs{?api%2Dversion,restorableGremlinDatabaseRid,startTime,endTime}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      instanceId: instanceId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
      restorableGremlinDatabaseRid: options?.restorableGremlinDatabaseRid,
      startTime: options?.startTime,
      endTime: options?.endTime,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_RestorableGremlinGraphsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _restorableGremlinGraphsListResultDeserializer(result.body);
}

/** Show the event feed of all mutations done on all the Azure Cosmos DB Gremlin graphs under a specific database. This helps in scenario where container was accidentally deleted. This API requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission */
export function list(
  context: Client,
  location: string,
  instanceId: string,
  options: RestorableGremlinGraphsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RestorableGremlinGraphGetResult> {
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
