// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext as Client } from "../index.js";
import type {
  HorizonDbFirewallRule,
  _HorizonDbFirewallRuleListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  horizonDbFirewallRuleSerializer,
  horizonDbFirewallRuleDeserializer,
  _horizonDbFirewallRuleListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  HorizonDbFirewallRulesDeleteOptionalParams,
  HorizonDbFirewallRulesCreateOrUpdateOptionalParams,
  HorizonDbFirewallRulesListOptionalParams,
  HorizonDbFirewallRulesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  firewallRuleName: string,
  options: HorizonDbFirewallRulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/pools/{poolName}/firewallRules/{firewallRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      poolName: poolName,
      firewallRuleName: firewallRuleName,
      "api%2Dversion": context.apiVersion ?? "2026-01-20-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a HorizonDb firewall rule. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  firewallRuleName: string,
  options: HorizonDbFirewallRulesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, clusterName, poolName, firewallRuleName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-20-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  firewallRuleName: string,
  resource: HorizonDbFirewallRule,
  options: HorizonDbFirewallRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/pools/{poolName}/firewallRules/{firewallRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      poolName: poolName,
      firewallRuleName: firewallRuleName,
      "api%2Dversion": context.apiVersion ?? "2026-01-20-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: horizonDbFirewallRuleSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<HorizonDbFirewallRule> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return horizonDbFirewallRuleDeserializer(result.body);
}

/** Creates a new HorizonDb firewall rule or updates an existing rule. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  firewallRuleName: string,
  resource: HorizonDbFirewallRule,
  options: HorizonDbFirewallRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<HorizonDbFirewallRule>, HorizonDbFirewallRule> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        clusterName,
        poolName,
        firewallRuleName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-01-20-preview",
  }) as PollerLike<OperationState<HorizonDbFirewallRule>, HorizonDbFirewallRule>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  options: HorizonDbFirewallRulesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/pools/{poolName}/firewallRules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      poolName: poolName,
      "api%2Dversion": context.apiVersion ?? "2026-01-20-preview",
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
): Promise<_HorizonDbFirewallRuleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _horizonDbFirewallRuleListResultDeserializer(result.body);
}

/** Lists all HorizonDb firewall rules in a pool. */
export function list(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  options: HorizonDbFirewallRulesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<HorizonDbFirewallRule> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, clusterName, poolName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-20-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  firewallRuleName: string,
  options: HorizonDbFirewallRulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/pools/{poolName}/firewallRules/{firewallRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      poolName: poolName,
      firewallRuleName: firewallRuleName,
      "api%2Dversion": context.apiVersion ?? "2026-01-20-preview",
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
): Promise<HorizonDbFirewallRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return horizonDbFirewallRuleDeserializer(result.body);
}

/** Gets information about a HorizonDb firewall rule. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  poolName: string,
  firewallRuleName: string,
  options: HorizonDbFirewallRulesGetOptionalParams = { requestOptions: {} },
): Promise<HorizonDbFirewallRule> {
  const result = await _getSend(
    context,
    resourceGroupName,
    clusterName,
    poolName,
    firewallRuleName,
    options,
  );
  return _getDeserialize(result);
}
