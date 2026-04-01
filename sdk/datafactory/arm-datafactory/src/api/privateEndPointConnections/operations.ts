// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext as Client } from "../index.js";
import type {
  PrivateEndpointConnectionResource,
  _PrivateEndpointConnectionListResponse,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  _privateEndpointConnectionListResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { PrivateEndPointConnectionsListByFactoryOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByFactorySend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  options: PrivateEndPointConnectionsListByFactoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/privateEndpointConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
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

export async function _listByFactoryDeserialize(
  result: PathUncheckedResponse,
): Promise<_PrivateEndpointConnectionListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _privateEndpointConnectionListResponseDeserializer(result.body);
}

/** Lists Private endpoint connections */
export function listByFactory(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  options: PrivateEndPointConnectionsListByFactoryOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrivateEndpointConnectionResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByFactorySend(context, resourceGroupName, factoryName, options),
    _listByFactoryDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2018-06-01" },
  );
}
