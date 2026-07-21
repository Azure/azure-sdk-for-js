// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureResilienceManagementContext as Client } from "../index.js";
import type {
  UnifiedResilienceItem,
  _UnifiedResilienceItemListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  unifiedResilienceItemDeserializer,
  _unifiedResilienceItemListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  UnifiedResilienceItemsListOptionalParams,
  UnifiedResilienceItemsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  serviceGroupName: string,
  options: UnifiedResilienceItemsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/unifiedResilienceItems{?api%2Dversion,%24skipToken,%24top}",
    {
      serviceGroupName: serviceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
      "%24skipToken": options?.skipToken,
      "%24top": options?.top,
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
): Promise<_UnifiedResilienceItemListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _unifiedResilienceItemListResultDeserializer(result.body);
}

/** List UnifiedResilienceItem resources by tenant */
export function list(
  context: Client,
  serviceGroupName: string,
  options: UnifiedResilienceItemsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<UnifiedResilienceItem> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, serviceGroupName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-04-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  serviceGroupName: string,
  unifiedResilienceItemName: string,
  options: UnifiedResilienceItemsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/unifiedResilienceItems/{unifiedResilienceItemName}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      unifiedResilienceItemName: unifiedResilienceItemName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<UnifiedResilienceItem> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return unifiedResilienceItemDeserializer(result.body);
}

/** Get a UnifiedResilienceItem */
export async function get(
  context: Client,
  serviceGroupName: string,
  unifiedResilienceItemName: string,
  options: UnifiedResilienceItemsGetOptionalParams = { requestOptions: {} },
): Promise<UnifiedResilienceItem> {
  const result = await _getSend(context, serviceGroupName, unifiedResilienceItemName, options);
  return _getDeserialize(result);
}
