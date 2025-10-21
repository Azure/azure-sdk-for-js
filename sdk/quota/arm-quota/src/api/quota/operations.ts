// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureQuotaExtensionAPIContext as Client } from "../index.js";
import type { CurrentQuotaLimitBase, _QuotaLimits } from "../../models/models.js";
import {
  exceptionResponseDeserializer,
  currentQuotaLimitBaseSerializer,
  currentQuotaLimitBaseDeserializer,
  _quotaLimitsDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  QuotaListOptionalParams,
  QuotaUpdateOptionalParams,
  QuotaCreateOrUpdateOptionalParams,
  QuotaGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  scope: string,
  options: QuotaListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Quota/quotas{?api%2Dversion}",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_QuotaLimits> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = exceptionResponseDeserializer(result.body);
    throw error;
  }

  return _quotaLimitsDeserializer(result.body);
}

/** Get a list of current quota limits of all resources for the specified scope. The response from this GET operation can be leveraged to submit requests to update a quota. */
export function list(
  context: Client,
  scope: string,
  options: QuotaListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CurrentQuotaLimitBase> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, scope, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _updateSend(
  context: Client,
  resourceName: string,
  scope: string,
  createQuotaRequest: CurrentQuotaLimitBase,
  options: QuotaUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Quota/quotas/{resourceName}{?api%2Dversion}",
    {
      scope: scope,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: currentQuotaLimitBaseSerializer(createQuotaRequest),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<CurrentQuotaLimitBase> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = exceptionResponseDeserializer(result.body);
    throw error;
  }

  return currentQuotaLimitBaseDeserializer(result.body);
}

/**
 * Update the quota limit for a specific resource to the specified value:
 * 1. Use the Usages-GET and Quota-GET operations to determine the remaining quota for the specific resource and to calculate the new quota limit. These steps are detailed in [this example](https://techcommunity.microsoft.com/t5/azure-governance-and-management/using-the-new-quota-rest-api/ba-p/2183670).
 * 2. Use this PUT operation to update the quota limit. Please check the URI in location header for the detailed status of the request.
 */
export function update(
  context: Client,
  resourceName: string,
  scope: string,
  createQuotaRequest: CurrentQuotaLimitBase,
  options: QuotaUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CurrentQuotaLimitBase>, CurrentQuotaLimitBase> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceName, scope, createQuotaRequest, options),
    resourceLocationConfig: "original-uri",
  }) as PollerLike<OperationState<CurrentQuotaLimitBase>, CurrentQuotaLimitBase>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceName: string,
  scope: string,
  createQuotaRequest: CurrentQuotaLimitBase,
  options: QuotaCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Quota/quotas/{resourceName}{?api%2Dversion}",
    {
      scope: scope,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: currentQuotaLimitBaseSerializer(createQuotaRequest),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<CurrentQuotaLimitBase> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = exceptionResponseDeserializer(result.body);
    throw error;
  }

  return currentQuotaLimitBaseDeserializer(result.body);
}

/**
 * Create or update the quota limit for the specified resource with the requested value. To update the quota, follow these steps:
 * 1. Use the GET operation for quotas and usages to determine how much quota remains for the specific resource and to calculate the new quota limit. These steps are detailed in [this example](https://techcommunity.microsoft.com/t5/azure-governance-and-management/using-the-new-quota-rest-api/ba-p/2183670).
 * 2. Use this PUT operation to update the quota limit. Please check the URI in location header for the detailed status of the request.
 */
export function createOrUpdate(
  context: Client,
  resourceName: string,
  scope: string,
  createQuotaRequest: CurrentQuotaLimitBase,
  options: QuotaCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CurrentQuotaLimitBase>, CurrentQuotaLimitBase> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceName, scope, createQuotaRequest, options),
    resourceLocationConfig: "original-uri",
  }) as PollerLike<OperationState<CurrentQuotaLimitBase>, CurrentQuotaLimitBase>;
}

export function _getSend(
  context: Client,
  resourceName: string,
  scope: string,
  options: QuotaGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Quota/quotas/{resourceName}{?api%2Dversion}",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<CurrentQuotaLimitBase> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = exceptionResponseDeserializer(result.body);
    throw error;
  }

  return currentQuotaLimitBaseDeserializer(result.body);
}

/** Get the quota limit of a resource. The response can be used to determine the remaining quota to calculate a new quota limit that can be submitted with a PUT request. */
export async function get(
  context: Client,
  resourceName: string,
  scope: string,
  options: QuotaGetOptionalParams = { requestOptions: {} },
): Promise<CurrentQuotaLimitBase> {
  const result = await _getSend(context, resourceName, scope, options);
  return _getDeserialize(result);
}
