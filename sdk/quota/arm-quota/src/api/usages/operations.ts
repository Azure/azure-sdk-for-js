// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureQuotaExtensionAPIContext as Client } from "../index.js";
import {
  exceptionResponseDeserializer,
  CurrentUsagesBase,
  currentUsagesBaseDeserializer,
  _UsagesLimits,
  _usagesLimitsDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { UsagesListOptionalParams, UsagesGetOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  scope: string,
  options: UsagesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Quota/usages{?api%2Dversion}",
    {
      scope: scope,
      "api%2Dversion": context.apiVersion ?? "2025-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_UsagesLimits> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = exceptionResponseDeserializer(result.body);
    }

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
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-09-01" },
  );
}

export function _getSend(
  context: Client,
  apiVersion: string,
  resourceName: string,
  scope: string,
  options: UsagesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Quota/usages/{resourceName}{?api%2Dversion}",
    {
      scope: scope,
      resourceName: resourceName,
      "api%2Dversion": apiVersion ?? "2025-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<CurrentUsagesBase> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = exceptionResponseDeserializer(result.body);
    }

    throw error;
  }

  return currentUsagesBaseDeserializer(result.body);
}

/** Get the current usage of a resource. */
export async function get(
  context: Client,
  apiVersion: string,
  resourceName: string,
  scope: string,
  options: UsagesGetOptionalParams = { requestOptions: {} },
): Promise<CurrentUsagesBase> {
  const result = await _getSend(context, apiVersion, resourceName, scope, options);
  return _getDeserialize(result);
}
