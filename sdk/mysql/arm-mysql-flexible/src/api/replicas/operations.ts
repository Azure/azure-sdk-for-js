// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext as Client } from "../index.js";
import type { Server, _ServerListResult } from "../../models/models.js";
import { errorResponseDeserializer, _serverListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ReplicasListByServerOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByServerSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ReplicasListByServerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/replicas{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
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

export async function _listByServerDeserialize(
  result: PathUncheckedResponse,
): Promise<_ServerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _serverListResultDeserializer(result.body);
}

/** List all the replicas for a given server. */
export function listByServer(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ReplicasListByServerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Server> {
  return buildPagedAsyncIterator(
    context,
    () => _listByServerSend(context, resourceGroupName, serverName, options),
    _listByServerDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
