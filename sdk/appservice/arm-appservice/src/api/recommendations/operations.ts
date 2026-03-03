// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext as Client } from "../index.js";
import type {
  RecommendationRule,
  _RecommendationCollection,
  Recommendation,
} from "../../models/models.js";
import {
  defaultErrorResponseDeserializer,
  recommendationRuleDeserializer,
  _recommendationCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RecommendationsDisableRecommendationForSubscriptionOptionalParams,
  RecommendationsResetAllFiltersOptionalParams,
  RecommendationsListOptionalParams,
  RecommendationsResetAllFiltersForWebAppOptionalParams,
  RecommendationsDisableAllForWebAppOptionalParams,
  RecommendationsListRecommendedRulesForWebAppOptionalParams,
  RecommendationsListHistoryForWebAppOptionalParams,
  RecommendationsDisableRecommendationForHostingEnvironmentOptionalParams,
  RecommendationsGetRuleDetailsByHostingEnvironmentOptionalParams,
  RecommendationsResetAllFiltersForHostingEnvironmentOptionalParams,
  RecommendationsDisableAllForHostingEnvironmentOptionalParams,
  RecommendationsListRecommendedRulesForHostingEnvironmentOptionalParams,
  RecommendationsListHistoryForHostingEnvironmentOptionalParams,
  RecommendationsDisableRecommendationForSiteOptionalParams,
  RecommendationsGetRuleDetailsByWebAppOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _disableRecommendationForSubscriptionSend(
  context: Client,
  name: string,
  options: RecommendationsDisableRecommendationForSubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/recommendations/{name}/disable{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _disableRecommendationForSubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Disables the specified rule so it will not apply to a subscription in the future. */
export async function disableRecommendationForSubscription(
  context: Client,
  name: string,
  options: RecommendationsDisableRecommendationForSubscriptionOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _disableRecommendationForSubscriptionSend(context, name, options);
  return _disableRecommendationForSubscriptionDeserialize(result);
}

export function _resetAllFiltersSend(
  context: Client,
  options: RecommendationsResetAllFiltersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/recommendations/reset{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _resetAllFiltersDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Reset all recommendation opt-out settings for a subscription. */
export async function resetAllFilters(
  context: Client,
  options: RecommendationsResetAllFiltersOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _resetAllFiltersSend(context, options);
  return _resetAllFiltersDeserialize(result);
}

export function _listSend(
  context: Client,
  options: RecommendationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/recommendations{?api%2Dversion,featured,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      featured: options?.featured,
      "%24filter": options?.filter,
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
): Promise<_RecommendationCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _recommendationCollectionDeserializer(result.body);
}

/** Description for List all recommendations for a subscription. */
export function list(
  context: Client,
  options: RecommendationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Recommendation> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _resetAllFiltersForWebAppSend(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  options: RecommendationsResetAllFiltersForWebAppOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/recommendations/reset{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      siteName: siteName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _resetAllFiltersForWebAppDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Reset all recommendation opt-out settings for an app. */
export async function resetAllFiltersForWebApp(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  options: RecommendationsResetAllFiltersForWebAppOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _resetAllFiltersForWebAppSend(context, resourceGroupName, siteName, options);
  return _resetAllFiltersForWebAppDeserialize(result);
}

export function _disableAllForWebAppSend(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  options: RecommendationsDisableAllForWebAppOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/recommendations/disable{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      siteName: siteName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _disableAllForWebAppDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Disable all recommendations for an app. */
export async function disableAllForWebApp(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  options: RecommendationsDisableAllForWebAppOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _disableAllForWebAppSend(context, resourceGroupName, siteName, options);
  return _disableAllForWebAppDeserialize(result);
}

export function _listRecommendedRulesForWebAppSend(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  options: RecommendationsListRecommendedRulesForWebAppOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/recommendations{?api%2Dversion,featured,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      siteName: siteName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      featured: options?.featured,
      "%24filter": options?.filter,
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

export async function _listRecommendedRulesForWebAppDeserialize(
  result: PathUncheckedResponse,
): Promise<_RecommendationCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _recommendationCollectionDeserializer(result.body);
}

/** Description for Get all recommendations for an app. */
export function listRecommendedRulesForWebApp(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  options: RecommendationsListRecommendedRulesForWebAppOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Recommendation> {
  return buildPagedAsyncIterator(
    context,
    () => _listRecommendedRulesForWebAppSend(context, resourceGroupName, siteName, options),
    _listRecommendedRulesForWebAppDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listHistoryForWebAppSend(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  options: RecommendationsListHistoryForWebAppOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/recommendationHistory{?api%2Dversion,expiredOnly,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      siteName: siteName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      expiredOnly: options?.expiredOnly,
      "%24filter": options?.filter,
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

export async function _listHistoryForWebAppDeserialize(
  result: PathUncheckedResponse,
): Promise<_RecommendationCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _recommendationCollectionDeserializer(result.body);
}

/** Description for Get past recommendations for an app, optionally specified by the time range. */
export function listHistoryForWebApp(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  options: RecommendationsListHistoryForWebAppOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Recommendation> {
  return buildPagedAsyncIterator(
    context,
    () => _listHistoryForWebAppSend(context, resourceGroupName, siteName, options),
    _listHistoryForWebAppDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _disableRecommendationForHostingEnvironmentSend(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  name: string,
  hostingEnvironmentName: string,
  options: RecommendationsDisableRecommendationForHostingEnvironmentOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{hostingEnvironmentName}/recommendations/{name}/disable{?api%2Dversion,environmentName}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      hostingEnvironmentName: hostingEnvironmentName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      environmentName: environmentName,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _disableRecommendationForHostingEnvironmentDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Disables the specific rule for a web site permanently. */
export async function disableRecommendationForHostingEnvironment(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  name: string,
  hostingEnvironmentName: string,
  options: RecommendationsDisableRecommendationForHostingEnvironmentOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _disableRecommendationForHostingEnvironmentSend(
    context,
    resourceGroupName,
    environmentName,
    name,
    hostingEnvironmentName,
    options,
  );
  return _disableRecommendationForHostingEnvironmentDeserialize(result);
}

export function _getRuleDetailsByHostingEnvironmentSend(
  context: Client,
  resourceGroupName: string,
  hostingEnvironmentName: string,
  name: string,
  options: RecommendationsGetRuleDetailsByHostingEnvironmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{hostingEnvironmentName}/recommendations/{name}{?api%2Dversion,updateSeen,recommendationId}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      hostingEnvironmentName: hostingEnvironmentName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      updateSeen: options?.updateSeen,
      recommendationId: options?.recommendationId,
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

export async function _getRuleDetailsByHostingEnvironmentDeserialize(
  result: PathUncheckedResponse,
): Promise<RecommendationRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return recommendationRuleDeserializer(result.body);
}

/** Description for Get a recommendation rule for an app. */
export async function getRuleDetailsByHostingEnvironment(
  context: Client,
  resourceGroupName: string,
  hostingEnvironmentName: string,
  name: string,
  options: RecommendationsGetRuleDetailsByHostingEnvironmentOptionalParams = { requestOptions: {} },
): Promise<RecommendationRule> {
  const result = await _getRuleDetailsByHostingEnvironmentSend(
    context,
    resourceGroupName,
    hostingEnvironmentName,
    name,
    options,
  );
  return _getRuleDetailsByHostingEnvironmentDeserialize(result);
}

export function _resetAllFiltersForHostingEnvironmentSend(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  hostingEnvironmentName: string,
  options: RecommendationsResetAllFiltersForHostingEnvironmentOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{hostingEnvironmentName}/recommendations/reset{?api%2Dversion,environmentName}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      hostingEnvironmentName: hostingEnvironmentName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      environmentName: environmentName,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _resetAllFiltersForHostingEnvironmentDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Reset all recommendation opt-out settings for an app. */
export async function resetAllFiltersForHostingEnvironment(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  hostingEnvironmentName: string,
  options: RecommendationsResetAllFiltersForHostingEnvironmentOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _resetAllFiltersForHostingEnvironmentSend(
    context,
    resourceGroupName,
    environmentName,
    hostingEnvironmentName,
    options,
  );
  return _resetAllFiltersForHostingEnvironmentDeserialize(result);
}

export function _disableAllForHostingEnvironmentSend(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  hostingEnvironmentName: string,
  options: RecommendationsDisableAllForHostingEnvironmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{hostingEnvironmentName}/recommendations/disable{?api%2Dversion,environmentName}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      hostingEnvironmentName: hostingEnvironmentName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      environmentName: environmentName,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _disableAllForHostingEnvironmentDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Disable all recommendations for an app. */
export async function disableAllForHostingEnvironment(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  hostingEnvironmentName: string,
  options: RecommendationsDisableAllForHostingEnvironmentOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _disableAllForHostingEnvironmentSend(
    context,
    resourceGroupName,
    environmentName,
    hostingEnvironmentName,
    options,
  );
  return _disableAllForHostingEnvironmentDeserialize(result);
}

export function _listRecommendedRulesForHostingEnvironmentSend(
  context: Client,
  resourceGroupName: string,
  hostingEnvironmentName: string,
  options: RecommendationsListRecommendedRulesForHostingEnvironmentOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{hostingEnvironmentName}/recommendations{?api%2Dversion,featured,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      hostingEnvironmentName: hostingEnvironmentName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      featured: options?.featured,
      "%24filter": options?.filter,
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

export async function _listRecommendedRulesForHostingEnvironmentDeserialize(
  result: PathUncheckedResponse,
): Promise<_RecommendationCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _recommendationCollectionDeserializer(result.body);
}

/** Description for Get all recommendations for a hosting environment. */
export function listRecommendedRulesForHostingEnvironment(
  context: Client,
  resourceGroupName: string,
  hostingEnvironmentName: string,
  options: RecommendationsListRecommendedRulesForHostingEnvironmentOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<Recommendation> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listRecommendedRulesForHostingEnvironmentSend(
        context,
        resourceGroupName,
        hostingEnvironmentName,
        options,
      ),
    _listRecommendedRulesForHostingEnvironmentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listHistoryForHostingEnvironmentSend(
  context: Client,
  resourceGroupName: string,
  hostingEnvironmentName: string,
  options: RecommendationsListHistoryForHostingEnvironmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{hostingEnvironmentName}/recommendationHistory{?api%2Dversion,expiredOnly,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      hostingEnvironmentName: hostingEnvironmentName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      expiredOnly: options?.expiredOnly,
      "%24filter": options?.filter,
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

export async function _listHistoryForHostingEnvironmentDeserialize(
  result: PathUncheckedResponse,
): Promise<_RecommendationCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _recommendationCollectionDeserializer(result.body);
}

/** Description for Get past recommendations for an app, optionally specified by the time range. */
export function listHistoryForHostingEnvironment(
  context: Client,
  resourceGroupName: string,
  hostingEnvironmentName: string,
  options: RecommendationsListHistoryForHostingEnvironmentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Recommendation> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listHistoryForHostingEnvironmentSend(
        context,
        resourceGroupName,
        hostingEnvironmentName,
        options,
      ),
    _listHistoryForHostingEnvironmentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _disableRecommendationForSiteSend(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  name: string,
  options: RecommendationsDisableRecommendationForSiteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/recommendations/{name}/disable{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      siteName: siteName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _disableRecommendationForSiteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Disables the specific rule for a web site permanently. */
export async function disableRecommendationForSite(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  name: string,
  options: RecommendationsDisableRecommendationForSiteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _disableRecommendationForSiteSend(
    context,
    resourceGroupName,
    siteName,
    name,
    options,
  );
  return _disableRecommendationForSiteDeserialize(result);
}

export function _getRuleDetailsByWebAppSend(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  name: string,
  options: RecommendationsGetRuleDetailsByWebAppOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/recommendations/{name}{?api%2Dversion,updateSeen,recommendationId}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      siteName: siteName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      updateSeen: options?.updateSeen,
      recommendationId: options?.recommendationId,
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

export async function _getRuleDetailsByWebAppDeserialize(
  result: PathUncheckedResponse,
): Promise<RecommendationRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return recommendationRuleDeserializer(result.body);
}

/** Description for Get a recommendation rule for an app. */
export async function getRuleDetailsByWebApp(
  context: Client,
  resourceGroupName: string,
  siteName: string,
  name: string,
  options: RecommendationsGetRuleDetailsByWebAppOptionalParams = { requestOptions: {} },
): Promise<RecommendationRule> {
  const result = await _getRuleDetailsByWebAppSend(
    context,
    resourceGroupName,
    siteName,
    name,
    options,
  );
  return _getRuleDetailsByWebAppDeserialize(result);
}
