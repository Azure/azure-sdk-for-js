// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type { VirtualNetworkRule, _VirtualNetworkRuleListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  virtualNetworkRuleSerializer,
  virtualNetworkRuleDeserializer,
  _virtualNetworkRuleListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VirtualNetworkRulesListByServerOptionalParams,
  VirtualNetworkRulesDeleteOptionalParams,
  VirtualNetworkRulesCreateOrUpdateOptionalParams,
  VirtualNetworkRulesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByServerSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: VirtualNetworkRulesListByServerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/virtualNetworkRules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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
): Promise<_VirtualNetworkRuleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _virtualNetworkRuleListResultDeserializer(result.body);
}

/** Gets a list of virtual network rules in a server. */
export function listByServer(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: VirtualNetworkRulesListByServerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VirtualNetworkRule> {
  return buildPagedAsyncIterator(
    context,
    () => _listByServerSend(context, resourceGroupName, serverName, options),
    _listByServerDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  virtualNetworkRuleName: string,
  options: VirtualNetworkRulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/virtualNetworkRules/{virtualNetworkRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      virtualNetworkRuleName: virtualNetworkRuleName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

/** Deletes the virtual network rule with the given name. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  virtualNetworkRuleName: string,
  options: VirtualNetworkRulesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, serverName, virtualNetworkRuleName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  virtualNetworkRuleName: string,
  parameters: VirtualNetworkRule,
  options: VirtualNetworkRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/virtualNetworkRules/{virtualNetworkRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      virtualNetworkRuleName: virtualNetworkRuleName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: virtualNetworkRuleSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualNetworkRule> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return virtualNetworkRuleDeserializer(result.body);
}

/** Creates or updates an existing virtual network rule. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  virtualNetworkRuleName: string,
  parameters: VirtualNetworkRule,
  options: VirtualNetworkRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VirtualNetworkRule>, VirtualNetworkRule> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        serverName,
        virtualNetworkRuleName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<VirtualNetworkRule>, VirtualNetworkRule>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  virtualNetworkRuleName: string,
  options: VirtualNetworkRulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/virtualNetworkRules/{virtualNetworkRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      virtualNetworkRuleName: virtualNetworkRuleName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<VirtualNetworkRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return virtualNetworkRuleDeserializer(result.body);
}

/** Gets a virtual network rule. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  virtualNetworkRuleName: string,
  options: VirtualNetworkRulesGetOptionalParams = { requestOptions: {} },
): Promise<VirtualNetworkRule> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serverName,
    virtualNetworkRuleName,
    options,
  );
  return _getDeserialize(result);
}
