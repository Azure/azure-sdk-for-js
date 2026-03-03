// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext as Client } from "../index.js";
import type { DeletedSite, _DeletedWebAppCollection } from "../../models/models.js";
import {
  defaultErrorResponseDeserializer,
  deletedSiteDeserializer,
  _deletedWebAppCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DeletedWebAppsListOptionalParams,
  DeletedWebAppsListByLocationOptionalParams,
  DeletedWebAppsGetDeletedWebAppByLocationOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: DeletedWebAppsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/deletedSites{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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
): Promise<_DeletedWebAppCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _deletedWebAppCollectionDeserializer(result.body);
}

/** Description for Get all deleted apps for a subscription. */
export function list(
  context: Client,
  options: DeletedWebAppsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeletedSite> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listByLocationSend(
  context: Client,
  location: string,
  options: DeletedWebAppsListByLocationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/locations/{location}/deletedSites{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listByLocationDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeletedWebAppCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _deletedWebAppCollectionDeserializer(result.body);
}

/** Description for Get all deleted apps for a subscription at location */
export function listByLocation(
  context: Client,
  location: string,
  options: DeletedWebAppsListByLocationOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeletedSite> {
  return buildPagedAsyncIterator(
    context,
    () => _listByLocationSend(context, location, options),
    _listByLocationDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getDeletedWebAppByLocationSend(
  context: Client,
  location: string,
  deletedSiteId: string,
  options: DeletedWebAppsGetDeletedWebAppByLocationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/locations/{location}/deletedSites/{deletedSiteId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      deletedSiteId: deletedSiteId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getDeletedWebAppByLocationDeserialize(
  result: PathUncheckedResponse,
): Promise<DeletedSite> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return deletedSiteDeserializer(result.body);
}

/** Description for Get deleted app for a subscription at location. */
export async function getDeletedWebAppByLocation(
  context: Client,
  location: string,
  deletedSiteId: string,
  options: DeletedWebAppsGetDeletedWebAppByLocationOptionalParams = { requestOptions: {} },
): Promise<DeletedSite> {
  const result = await _getDeletedWebAppByLocationSend(context, location, deletedSiteId, options);
  return _getDeletedWebAppByLocationDeserialize(result);
}
