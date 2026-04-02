// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  LoadBalancingRule,
  _LoadBalancerLoadBalancingRuleListResult,
  LoadBalancerHealthPerRule,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  loadBalancingRuleDeserializer,
  _loadBalancerLoadBalancingRuleListResultDeserializer,
  loadBalancerHealthPerRuleDeserializer,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  LoadBalancerLoadBalancingRulesHealthOptionalParams,
  LoadBalancerLoadBalancingRulesListOptionalParams,
  LoadBalancerLoadBalancingRulesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _healthSend(
  context: Client,
  groupName: string,
  loadBalancerName: string,
  loadBalancingRuleName: string,
  options: LoadBalancerLoadBalancingRulesHealthOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/loadBalancingRules/{loadBalancingRuleName}/health{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      loadBalancerName: loadBalancerName,
      loadBalancingRuleName: loadBalancingRuleName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _healthDeserialize(
  result: PathUncheckedResponse,
): Promise<LoadBalancerHealthPerRule> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return loadBalancerHealthPerRuleDeserializer(result.body);
}

/** Get health details of a load balancing rule. */
export function health(
  context: Client,
  groupName: string,
  loadBalancerName: string,
  loadBalancingRuleName: string,
  options: LoadBalancerLoadBalancingRulesHealthOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<LoadBalancerHealthPerRule>, LoadBalancerHealthPerRule> {
  return getLongRunningPoller(context, _healthDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _healthSend(context, groupName, loadBalancerName, loadBalancingRuleName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<LoadBalancerHealthPerRule>, LoadBalancerHealthPerRule>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  loadBalancerName: string,
  options: LoadBalancerLoadBalancingRulesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/loadBalancingRules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      loadBalancerName: loadBalancerName,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_LoadBalancerLoadBalancingRuleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _loadBalancerLoadBalancingRuleListResultDeserializer(result.body);
}

/** Gets all the load balancing rules in a load balancer. */
export function list(
  context: Client,
  resourceGroupName: string,
  loadBalancerName: string,
  options: LoadBalancerLoadBalancingRulesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LoadBalancingRule> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, loadBalancerName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  loadBalancerName: string,
  loadBalancingRuleName: string,
  options: LoadBalancerLoadBalancingRulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/loadBalancingRules/{loadBalancingRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      loadBalancerName: loadBalancerName,
      loadBalancingRuleName: loadBalancingRuleName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<LoadBalancingRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return loadBalancingRuleDeserializer(result.body);
}

/** Gets the specified load balancer load balancing rule. */
export async function get(
  context: Client,
  resourceGroupName: string,
  loadBalancerName: string,
  loadBalancingRuleName: string,
  options: LoadBalancerLoadBalancingRulesGetOptionalParams = { requestOptions: {} },
): Promise<LoadBalancingRule> {
  const result = await _getSend(
    context,
    resourceGroupName,
    loadBalancerName,
    loadBalancingRuleName,
    options,
  );
  return _getDeserialize(result);
}
