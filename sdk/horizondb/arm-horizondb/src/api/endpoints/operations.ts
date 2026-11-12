// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext as Client } from "../index.js";
import type { Endpoint, _EndpointListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  endpointDeserializer,
  _endpointListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { EndpointsListOptionalParams, EndpointsGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: EndpointsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/endpoints{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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
): Promise<_EndpointListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _endpointListResultDeserializer(result.body);
}

/** Lists the service-generated Endpoints in a cluster. The collection contains the Cluster-scoped Endpoint named cluster and one Pool-scoped Endpoint for each pool. */
export function list(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: EndpointsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Endpoint> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, clusterName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-10-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  endpointName: string,
  options: EndpointsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/endpoints/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Endpoint> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return endpointDeserializer(result.body);
}

/** Gets information about a service-generated HorizonDB Cluster- or Pool-scoped Endpoint. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  endpointName: string,
  options: EndpointsGetOptionalParams = { requestOptions: {} },
): Promise<Endpoint> {
  const result = await _getSend(context, resourceGroupName, clusterName, endpointName, options);
  return _getDeserialize(result);
}
