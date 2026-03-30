// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext as Client } from "../index.js";
import type { HorizonDbPool, _HorizonDbPoolListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  horizonDbPoolDeserializer,
  _horizonDbPoolListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  HorizonDbPoolsListOptionalParams,
  HorizonDbPoolsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: HorizonDbPoolsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/pools{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-01-20-preview",
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
): Promise<_HorizonDbPoolListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _horizonDbPoolListResultDeserializer(result.body);
}

/** Lists all HorizonDb pools in a cluster. */
export function list(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: HorizonDbPoolsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<HorizonDbPool> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, clusterName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-20-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  options: HorizonDbPoolsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/pools/{poolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      poolName: poolName,
      "api%2Dversion": context.apiVersion ?? "2026-01-20-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<HorizonDbPool> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return horizonDbPoolDeserializer(result.body);
}

/** Gets information about a HorizonDb pool. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  options: HorizonDbPoolsGetOptionalParams = { requestOptions: {} },
): Promise<HorizonDbPool> {
  const result = await _getSend(context, resourceGroupName, clusterName, poolName, options);
  return _getDeserialize(result);
}
