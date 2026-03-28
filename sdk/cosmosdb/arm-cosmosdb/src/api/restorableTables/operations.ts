// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext as Client } from "../index.js";
import type { _RestorableTablesListResult, RestorableTableGetResult } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  _restorableTablesListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { RestorableTablesListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  location: string,
  instanceId: string,
  options: RestorableTablesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/locations/{location}/restorableDatabaseAccounts/{instanceId}/restorableTables{?api%2Dversion,startTime,endTime}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      instanceId: instanceId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
      startTime: options?.startTime,
      endTime: options?.endTime,
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
): Promise<_RestorableTablesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _restorableTablesListResultDeserializer(result.body);
}

/** Show the event feed of all mutations done on all the Azure Cosmos DB Tables. This helps in scenario where table was accidentally deleted. This API requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission */
export function list(
  context: Client,
  location: string,
  instanceId: string,
  options: RestorableTablesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RestorableTableGetResult> {
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
