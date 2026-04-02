// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  RouteFilterRule,
  _RouteFilterRuleListResult,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  routeFilterRuleSerializer,
  routeFilterRuleDeserializer,
  _routeFilterRuleListResultDeserializer,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RouteFilterRulesListByRouteFilterOptionalParams,
  RouteFilterRulesCreateOrUpdateOptionalParams,
  RouteFilterRulesGetOptionalParams,
  RouteFilterRulesDeleteOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByRouteFilterSend(
  context: Client,
  resourceGroupName: string,
  routeFilterName: string,
  options: RouteFilterRulesListByRouteFilterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/routeFilters/{routeFilterName}/routeFilterRules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      routeFilterName: routeFilterName,
      "api%2Dversion": "2025-05-01",
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

export async function _listByRouteFilterDeserialize(
  result: PathUncheckedResponse,
): Promise<_RouteFilterRuleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _routeFilterRuleListResultDeserializer(result.body);
}

/** Gets all RouteFilterRules in a route filter. */
export function listByRouteFilter(
  context: Client,
  resourceGroupName: string,
  routeFilterName: string,
  options: RouteFilterRulesListByRouteFilterOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RouteFilterRule> {
  return buildPagedAsyncIterator(
    context,
    () => _listByRouteFilterSend(context, resourceGroupName, routeFilterName, options),
    _listByRouteFilterDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  routeFilterName: string,
  ruleName: string,
  routeFilterRuleParameters: RouteFilterRule,
  options: RouteFilterRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/routeFilters/{routeFilterName}/routeFilterRules/{ruleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      routeFilterName: routeFilterName,
      ruleName: ruleName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: routeFilterRuleSerializer(routeFilterRuleParameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<RouteFilterRule> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return routeFilterRuleDeserializer(result.body);
}

/** Creates or updates a route in the specified route filter. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  routeFilterName: string,
  ruleName: string,
  routeFilterRuleParameters: RouteFilterRule,
  options: RouteFilterRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RouteFilterRule>, RouteFilterRule> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        routeFilterName,
        ruleName,
        routeFilterRuleParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<RouteFilterRule>, RouteFilterRule>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  routeFilterName: string,
  ruleName: string,
  options: RouteFilterRulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/routeFilters/{routeFilterName}/routeFilterRules/{ruleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      routeFilterName: routeFilterName,
      ruleName: ruleName,
      "api%2Dversion": "2025-05-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<RouteFilterRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return routeFilterRuleDeserializer(result.body);
}

/** Gets the specified rule from a route filter. */
export async function get(
  context: Client,
  resourceGroupName: string,
  routeFilterName: string,
  ruleName: string,
  options: RouteFilterRulesGetOptionalParams = { requestOptions: {} },
): Promise<RouteFilterRule> {
  const result = await _getSend(context, resourceGroupName, routeFilterName, ruleName, options);
  return _getDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  routeFilterName: string,
  ruleName: string,
  options: RouteFilterRulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/routeFilters/{routeFilterName}/routeFilterRules/{ruleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      routeFilterName: routeFilterName,
      ruleName: ruleName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes the specified rule from a route filter. */
/**
 *  @fixme Delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  routeFilterName: string,
  ruleName: string,
  options: RouteFilterRulesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, routeFilterName, ruleName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}
