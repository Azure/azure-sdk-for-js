// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  FirewallRule,
  firewallRuleSerializer,
  firewallRuleDeserializer,
  _FirewallRuleListResult,
  _firewallRuleListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  FirewallRulesListByServerOptionalParams,
  FirewallRulesDeleteOptionalParams,
  FirewallRulesCreateOrUpdateOptionalParams,
  FirewallRulesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listByServerSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: FirewallRulesListByServerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/firewallRules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion ?? "2025-06-01-preview",
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

export async function _listByServerDeserialize(
  result: PathUncheckedResponse,
): Promise<_FirewallRuleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _firewallRuleListResultDeserializer(result.body);
}

/** List all the firewall rules in a given server. */
export function listByServer(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: FirewallRulesListByServerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FirewallRule> {
  return buildPagedAsyncIterator(
    context,
    () => _listByServerSend(context, resourceGroupName, serverName, options),
    _listByServerDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-06-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  firewallRuleName: string,
  options: FirewallRulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/firewallRules/{firewallRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      firewallRuleName: firewallRuleName,
      "api%2Dversion": context.apiVersion ?? "2025-06-01-preview",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a firewall rule. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  firewallRuleName: string,
  options: FirewallRulesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, serverName, firewallRuleName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-06-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  firewallRuleName: string,
  parameters: FirewallRule,
  options: FirewallRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/firewallRules/{firewallRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      firewallRuleName: firewallRuleName,
      "api%2Dversion": context.apiVersion ?? "2025-06-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: firewallRuleSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<FirewallRule> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return firewallRuleDeserializer(result.body);
}

/** Creates a new firewall rule or updates an existing firewall rule. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  firewallRuleName: string,
  parameters: FirewallRule,
  options: FirewallRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FirewallRule>, FirewallRule> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        serverName,
        firewallRuleName,
        parameters,
        options,
      ),
    resourceLocationConfig: "original-uri",
    apiVersion: context.apiVersion ?? "2025-06-01-preview",
  }) as PollerLike<OperationState<FirewallRule>, FirewallRule>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  firewallRuleName: string,
  options: FirewallRulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/firewallRules/{firewallRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      firewallRuleName: firewallRuleName,
      "api%2Dversion": context.apiVersion ?? "2025-06-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<FirewallRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return firewallRuleDeserializer(result.body);
}

/** Gets information about a server firewall rule. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  firewallRuleName: string,
  options: FirewallRulesGetOptionalParams = { requestOptions: {} },
): Promise<FirewallRule> {
  const result = await _getSend(context, resourceGroupName, serverName, firewallRuleName, options);
  return _getDeserialize(result);
}
