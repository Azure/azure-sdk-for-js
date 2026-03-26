// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext as Client } from "../index.js";
import type { QuotaTier, _QuotaTierListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  quotaTierSerializer,
  quotaTierDeserializer,
  _quotaTierListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  QuotaTiersListBySubscriptionOptionalParams,
  QuotaTiersUpdateOptionalParams,
  QuotaTiersCreateOrUpdateOptionalParams,
  QuotaTiersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listBySubscriptionSend(
  context: Client,
  options: QuotaTiersListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/quotaTiers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_QuotaTierListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _quotaTierListResultDeserializer(result.body);
}

/** Returns all the resources of a particular type belonging to a subscription. */
export function listBySubscription(
  context: Client,
  options: QuotaTiersListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<QuotaTier> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-15-preview",
    },
  );
}

export function _updateSend(
  context: Client,
  defaultParam: string,
  tier: QuotaTier,
  options: QuotaTiersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/quotaTiers/{default}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      default: defaultParam,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: quotaTierSerializer(tier),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<QuotaTier> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return quotaTierDeserializer(result.body);
}

/** Update the Quota Tier information for the given subscription. QuotaTiers is a subscription wide resource type. It holds current tier information. */
export async function update(
  context: Client,
  defaultParam: string,
  tier: QuotaTier,
  options: QuotaTiersUpdateOptionalParams = { requestOptions: {} },
): Promise<QuotaTier> {
  const result = await _updateSend(context, defaultParam, tier, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  defaultParam: string,
  tier: QuotaTier,
  options: QuotaTiersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/quotaTiers/{default}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      default: defaultParam,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: quotaTierSerializer(tier),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<QuotaTier> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return quotaTierDeserializer(result.body);
}

/** Update the Quota Tier information for the given subscription. QuotaTiers is a subscription wide resource type. It holds current tier information. */
export async function createOrUpdate(
  context: Client,
  defaultParam: string,
  tier: QuotaTier,
  options: QuotaTiersCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<QuotaTier> {
  const result = await _createOrUpdateSend(context, defaultParam, tier, options);
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  defaultParam: string,
  options: QuotaTiersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/quotaTiers/{default}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      default: defaultParam,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<QuotaTier> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return quotaTierDeserializer(result.body);
}

/** Gets the Quota Tier information for the given subscription. QuotaTiers is a subscription wide resource type. It holds current tier information. */
export async function get(
  context: Client,
  defaultParam: string,
  options: QuotaTiersGetOptionalParams = { requestOptions: {} },
): Promise<QuotaTier> {
  const result = await _getSend(context, defaultParam, options);
  return _getDeserialize(result);
}
