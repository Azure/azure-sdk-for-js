// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureQuotaExtensionAPIContext as Client } from "../index.js";
import type { CurrentUsagesBase, _UsagesLimits } from "../../models/models.js";
import {
  exceptionResponseDeserializer,
  currentUsagesBaseDeserializer,
  _usagesLimitsDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { UsagesListOptionalParams, UsagesGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  scope: string,
  options: UsagesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Quota/usages{?api%2Dversion}",
    {
      scope: scope,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_UsagesLimits> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = exceptionResponseDeserializer(result.body);
    throw error;
  }

  return _usagesLimitsDeserializer(result.body);
}

/** Get a list of current usage for all resources for the scope specified. */
export function list(
  context: Client,
  scope: string,
  options: UsagesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CurrentUsagesBase> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, scope, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  resourceName: string,
  scope: string,
  options: UsagesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Quota/usages/{resourceName}{?api%2Dversion}",
    {
      scope: scope,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<CurrentUsagesBase> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = exceptionResponseDeserializer(result.body);
    throw error;
  }

  return currentUsagesBaseDeserializer(result.body);
}

/** Get the current usage of a resource. */
export async function get(
  context: Client,
  resourceName: string,
  scope: string,
  options: UsagesGetOptionalParams = { requestOptions: {} },
): Promise<CurrentUsagesBase> {
  const result = await _getSend(context, resourceName, scope, options);
  return _getDeserialize(result);
}
