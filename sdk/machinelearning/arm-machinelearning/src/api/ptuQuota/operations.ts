// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext as Client } from "../index.js";
import type {
  _AvailableQuotaArmPaginatedResult,
  AvailableQuota,
  _UsageAndQuotaDetailsArmPaginatedResult,
  UsageAndQuotaDetails,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _availableQuotaArmPaginatedResultDeserializer,
  availableQuotaDeserializer,
  _usageAndQuotaDetailsArmPaginatedResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PTUQuotaListOptionalParams,
  PTUQuotaGetAvailableOptionalParams,
  PTUQuotaListAvailableOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  location: string,
  options: PTUQuotaListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.MachineLearningServices/locations/{location}/quotaAndUsage{?api%2Dversion,%24skip}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
      "%24skip": options?.skip,
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
): Promise<_UsageAndQuotaDetailsArmPaginatedResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _usageAndQuotaDetailsArmPaginatedResultDeserializer(result.body);
}

/** List MaaS PTU usage and quota. */
export function list(
  context: Client,
  location: string,
  options: PTUQuotaListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<UsageAndQuotaDetails> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, location, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-15-preview",
    },
  );
}

export function _getAvailableSend(
  context: Client,
  location: string,
  options: PTUQuotaGetAvailableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.MachineLearningServices/locations/{location}/availableQuota/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
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

export async function _getAvailableDeserialize(
  result: PathUncheckedResponse,
): Promise<AvailableQuota> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return availableQuotaDeserializer(result.body);
}

/** Get available MaaS PTU quota. */
export async function getAvailable(
  context: Client,
  location: string,
  options: PTUQuotaGetAvailableOptionalParams = { requestOptions: {} },
): Promise<AvailableQuota> {
  const result = await _getAvailableSend(context, location, options);
  return _getAvailableDeserialize(result);
}

export function _listAvailableSend(
  context: Client,
  location: string,
  options: PTUQuotaListAvailableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.MachineLearningServices/locations/{location}/availableQuota{?api%2Dversion,%24skip}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
      "%24skip": options?.skip,
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

export async function _listAvailableDeserialize(
  result: PathUncheckedResponse,
): Promise<_AvailableQuotaArmPaginatedResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _availableQuotaArmPaginatedResultDeserializer(result.body);
}

/** List available MaaS PTU quota. */
export function listAvailable(
  context: Client,
  location: string,
  options: PTUQuotaListAvailableOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AvailableQuota> {
  return buildPagedAsyncIterator(
    context,
    () => _listAvailableSend(context, location, options),
    _listAvailableDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-15-preview",
    },
  );
}
