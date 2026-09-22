// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureReservationAPIContext as Client } from "../index.js";
import type { CurrentQuotaLimitBase, _QuotaLimits } from "../../models/quota/models.js";
import {
  exceptionResponseDeserializer,
  currentQuotaLimitBaseSerializer,
  currentQuotaLimitBaseDeserializer,
  _quotaLimitsDeserializer,
} from "../../models/quota/models.js";
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
  subscriptionId: string,
  providerId: string,
  location: string,
  options: QuotaListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Capacity/resourceProviders/{providerId}/locations/{location}/serviceLimits{?api%2Dversion}",
    {
      subscriptionId: subscriptionId,
      providerId: providerId,
      location: location,
      "api%2Dversion": "2020-10-25",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_QuotaLimits> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = exceptionResponseDeserializer(result.body);
    }

    throw error;
  }

  return _quotaLimitsDeserializer(result.body);
}

/** Gets a list of current quotas (service limits) and usage for all resources. The response from the list quota operation can be leveraged to request quota updates. */
export function list(
  context: Client,
  subscriptionId: string,
  providerId: string,
  location: string,
  options: QuotaListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CurrentQuotaLimitBase> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, subscriptionId, providerId, location, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2020-10-25" },
  );
}

export function _updateSend(
  context: Client,
  subscriptionId: string,
  providerId: string,
  location: string,
  resourceName: string,
  createQuotaRequest: CurrentQuotaLimitBase,
  options: QuotaUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Capacity/resourceProviders/{providerId}/locations/{location}/serviceLimits/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: subscriptionId,
      providerId: providerId,
      location: location,
      resourceName: resourceName,
      "api%2Dversion": "2020-10-25",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: currentQuotaLimitBaseSerializer(createQuotaRequest),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<CurrentQuotaLimitBase> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = exceptionResponseDeserializer(result.body);
    }

    throw error;
  }

  return currentQuotaLimitBaseDeserializer(result.body);
}

/**
 * Update the quota (service limits) of this resource to the requested value.
 * • To get the quota information for specific resource, send a GET request.
 * • To increase the quota, update the limit field from the GET response to a new value.
 * • To update the quota value, submit the JSON response to the quota request API to update the quota.
 * • To update the quota. use the PATCH operation.
 */
export function update(
  context: Client,
  subscriptionId: string,
  providerId: string,
  location: string,
  resourceName: string,
  createQuotaRequest: CurrentQuotaLimitBase,
  options: QuotaUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CurrentQuotaLimitBase>, CurrentQuotaLimitBase> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        subscriptionId,
        providerId,
        location,
        resourceName,
        createQuotaRequest,
        options,
      ),
    resourceLocationConfig: "original-uri",
    apiVersion: "2020-10-25",
  }) as PollerLike<OperationState<CurrentQuotaLimitBase>, CurrentQuotaLimitBase>;
}

export function _createOrUpdateSend(
  context: Client,
  subscriptionId: string,
  providerId: string,
  location: string,
  resourceName: string,
  createQuotaRequest: CurrentQuotaLimitBase,
  options: QuotaCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Capacity/resourceProviders/{providerId}/locations/{location}/serviceLimits/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: subscriptionId,
      providerId: providerId,
      location: location,
      resourceName: resourceName,
      "api%2Dversion": "2020-10-25",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: currentQuotaLimitBaseSerializer(createQuotaRequest),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<CurrentQuotaLimitBase> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = exceptionResponseDeserializer(result.body);
    }

    throw error;
  }

  return currentQuotaLimitBaseDeserializer(result.body);
}

/**
 * Create or update the quota (service limits) of a resource to the requested value.
 * Steps:
 * 1. Make the Get request to get the quota information for specific resource.
 * 2. To increase the quota, update the limit field in the response from Get request to new value.
 * 3. Submit the JSON to the quota request API to update the quota.
 * The Create quota request may be constructed as follows. The PUT operation can be used to update the quota.
 */
export function createOrUpdate(
  context: Client,
  subscriptionId: string,
  providerId: string,
  location: string,
  resourceName: string,
  createQuotaRequest: CurrentQuotaLimitBase,
  options: QuotaCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CurrentQuotaLimitBase>, CurrentQuotaLimitBase> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        subscriptionId,
        providerId,
        location,
        resourceName,
        createQuotaRequest,
        options,
      ),
    resourceLocationConfig: "original-uri",
    apiVersion: "2020-10-25",
  }) as PollerLike<OperationState<CurrentQuotaLimitBase>, CurrentQuotaLimitBase>;
}

export function _getSend(
  context: Client,
  subscriptionId: string,
  providerId: string,
  location: string,
  resourceName: string,
  options: QuotaGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Capacity/resourceProviders/{providerId}/locations/{location}/serviceLimits/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: subscriptionId,
      providerId: providerId,
      location: location,
      resourceName: resourceName,
      "api%2Dversion": "2020-10-25",
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
): Promise<CurrentQuotaLimitBase> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = exceptionResponseDeserializer(result.body);
    }

    throw error;
  }

  return currentQuotaLimitBaseDeserializer(result.body);
}

/** Get the current quota (service limit) and usage of a resource. You can use the response from the GET operation to submit quota update request. */
export async function get(
  context: Client,
  subscriptionId: string,
  providerId: string,
  location: string,
  resourceName: string,
  options: QuotaGetOptionalParams = { requestOptions: {} },
): Promise<CurrentQuotaLimitBase> {
  const result = await _getSend(
    context,
    subscriptionId,
    providerId,
    location,
    resourceName,
    options,
  );
  return _getDeserialize(result);
}
