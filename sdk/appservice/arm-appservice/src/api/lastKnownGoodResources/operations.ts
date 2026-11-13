// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext as Client } from "../index.js";
import type { _LastKnownGoodCollection, LastKnownGoodResource } from "../../models/models.js";
import {
  defaultErrorResponseDeserializer,
  _lastKnownGoodCollectionDeserializer,
  lastKnownGoodResourceDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  LastKnownGoodResourcesMarkLastKnownGoodOptionalParams,
  LastKnownGoodResourcesGetLastKnownGoodOptionalParams,
  LastKnownGoodResourcesListLastKnownGoodsOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _markLastKnownGoodSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: LastKnownGoodResourcesMarkLastKnownGoodOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/lastKnownGood/default/mark{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _markLastKnownGoodDeserialize(
  result: PathUncheckedResponse,
): Promise<LastKnownGoodResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return lastKnownGoodResourceDeserializer(result.body);
}

/** Marks the current Web App state as last known good. */
export async function markLastKnownGood(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: LastKnownGoodResourcesMarkLastKnownGoodOptionalParams = { requestOptions: {} },
): Promise<LastKnownGoodResource> {
  const result = await _markLastKnownGoodSend(context, resourceGroupName, name, options);
  return _markLastKnownGoodDeserialize(result);
}

export function _getLastKnownGoodSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: LastKnownGoodResourcesGetLastKnownGoodOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/lastKnownGood/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-08-01",
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

export async function _getLastKnownGoodDeserialize(
  result: PathUncheckedResponse,
): Promise<LastKnownGoodResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return lastKnownGoodResourceDeserializer(result.body);
}

/** Gets the last known good revision state for a Web App. */
export async function getLastKnownGood(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: LastKnownGoodResourcesGetLastKnownGoodOptionalParams = { requestOptions: {} },
): Promise<LastKnownGoodResource> {
  const result = await _getLastKnownGoodSend(context, resourceGroupName, name, options);
  return _getLastKnownGoodDeserialize(result);
}

export function _listLastKnownGoodsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: LastKnownGoodResourcesListLastKnownGoodsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/lastKnownGood{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-08-01",
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

export async function _listLastKnownGoodsDeserialize(
  result: PathUncheckedResponse,
): Promise<_LastKnownGoodCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _lastKnownGoodCollectionDeserializer(result.body);
}

/** Lists the last known good revision state for a Web App. */
export function listLastKnownGoods(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: LastKnownGoodResourcesListLastKnownGoodsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LastKnownGoodResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listLastKnownGoodsSend(context, resourceGroupName, name, options),
    _listLastKnownGoodsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-08-01" },
  );
}
