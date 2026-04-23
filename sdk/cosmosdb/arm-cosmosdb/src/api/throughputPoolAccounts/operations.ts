// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext as Client } from "../index.js";
import type {
  ThroughputPoolAccountResource,
  _ThroughputPoolAccountsListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _throughputPoolAccountsListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ThroughputPoolAccountsListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  throughputPoolName: string,
  options: ThroughputPoolAccountsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/throughputPools/{throughputPoolName}/throughputPoolAccounts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      throughputPoolName: throughputPoolName,
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
): Promise<_ThroughputPoolAccountsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _throughputPoolAccountsListResultDeserializer(result.body);
}

/** Lists all the Azure Cosmos DB accounts available under the subscription. */
export function list(
  context: Client,
  resourceGroupName: string,
  throughputPoolName: string,
  options: ThroughputPoolAccountsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ThroughputPoolAccountResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, throughputPoolName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}
