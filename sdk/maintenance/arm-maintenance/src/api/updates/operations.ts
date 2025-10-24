// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MaintenanceManagementContext as Client } from "../index.js";
import type { _ListUpdatesResult, Update } from "../../models/models.js";
import {
  maintenanceErrorDeserializer,
  _listUpdatesResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { UpdatesListOptionalParams, UpdatesListParentOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  providerName: string,
  resourceType: string,
  resourceName: string,
  options: UpdatesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{providerName}/{resourceType}/{resourceName}/providers/Microsoft.Maintenance/updates{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      providerName: providerName,
      resourceType: resourceType,
      resourceName: resourceName,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_ListUpdatesResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = maintenanceErrorDeserializer(result.body);
    throw error;
  }

  return _listUpdatesResultDeserializer(result.body);
}

/** Get updates to resources. */
export function list(
  context: Client,
  resourceGroupName: string,
  providerName: string,
  resourceType: string,
  resourceName: string,
  options: UpdatesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Update> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, providerName, resourceType, resourceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listParentSend(
  context: Client,
  resourceGroupName: string,
  providerName: string,
  resourceParentType: string,
  resourceParentName: string,
  resourceType: string,
  resourceName: string,
  options: UpdatesListParentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{providerName}/{resourceParentType}/{resourceParentName}/{resourceType}/{resourceName}/providers/Microsoft.Maintenance/updates{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      providerName: providerName,
      resourceParentType: resourceParentType,
      resourceParentName: resourceParentName,
      resourceType: resourceType,
      resourceName: resourceName,
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

export async function _listParentDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListUpdatesResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = maintenanceErrorDeserializer(result.body);
    throw error;
  }

  return _listUpdatesResultDeserializer(result.body);
}

/** Get updates to resources. */
export function listParent(
  context: Client,
  resourceGroupName: string,
  providerName: string,
  resourceParentType: string,
  resourceParentName: string,
  resourceType: string,
  resourceName: string,
  options: UpdatesListParentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Update> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listParentSend(
        context,
        resourceGroupName,
        providerName,
        resourceParentType,
        resourceParentName,
        resourceType,
        resourceName,
        options,
      ),
    _listParentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
