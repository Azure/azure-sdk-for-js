// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DnsResolverManagementContext as Client } from "../index.js";
import type {
  DnsForwardingRuleset,
  DnsForwardingRulesetPatch,
  _DnsForwardingRulesetListResult,
  _VirtualNetworkDnsForwardingRulesetListResult,
  VirtualNetworkDnsForwardingRuleset,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  dnsForwardingRulesetSerializer,
  dnsForwardingRulesetDeserializer,
  dnsForwardingRulesetPatchSerializer,
  _dnsForwardingRulesetListResultDeserializer,
  _virtualNetworkDnsForwardingRulesetListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DnsForwardingRulesetsListByVirtualNetworkOptionalParams,
  DnsForwardingRulesetsListOptionalParams,
  DnsForwardingRulesetsListByResourceGroupOptionalParams,
  DnsForwardingRulesetsDeleteOptionalParams,
  DnsForwardingRulesetsUpdateOptionalParams,
  DnsForwardingRulesetsCreateOrUpdateOptionalParams,
  DnsForwardingRulesetsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByVirtualNetworkSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  options: DnsForwardingRulesetsListByVirtualNetworkOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/listDnsForwardingRulesets{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkName: virtualNetworkName,
      "api%2Dversion": context.apiVersion,
      "%24top": options?.top,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listByVirtualNetworkDeserialize(
  result: PathUncheckedResponse,
): Promise<_VirtualNetworkDnsForwardingRulesetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _virtualNetworkDnsForwardingRulesetListResultDeserializer(result.body);
}

/** Lists DNS forwarding ruleset resource IDs attached to a virtual network. */
export function listByVirtualNetwork(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  options: DnsForwardingRulesetsListByVirtualNetworkOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<VirtualNetworkDnsForwardingRuleset> {
  return buildPagedAsyncIterator(
    context,
    () => _listByVirtualNetworkSend(context, resourceGroupName, virtualNetworkName, options),
    _listByVirtualNetworkDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listSend(
  context: Client,
  options: DnsForwardingRulesetsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/dnsForwardingRulesets{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
      "%24top": options?.top,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_DnsForwardingRulesetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _dnsForwardingRulesetListResultDeserializer(result.body);
}

/** Lists DNS forwarding rulesets in all resource groups of a subscription. */
export function list(
  context: Client,
  options: DnsForwardingRulesetsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DnsForwardingRuleset> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: DnsForwardingRulesetsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsForwardingRulesets{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion,
      "%24top": options?.top,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_DnsForwardingRulesetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _dnsForwardingRulesetListResultDeserializer(result.body);
}

/** Lists DNS forwarding rulesets within a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: DnsForwardingRulesetsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<DnsForwardingRuleset> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  dnsForwardingRulesetName: string,
  options: DnsForwardingRulesetsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsForwardingRulesets/{dnsForwardingRulesetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dnsForwardingRulesetName: dnsForwardingRulesetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
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

/** Deletes a DNS forwarding ruleset. WARNING: This operation cannot be undone. All forwarding rules within the ruleset will be deleted. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  dnsForwardingRulesetName: string,
  options: DnsForwardingRulesetsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, dnsForwardingRulesetName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  dnsForwardingRulesetName: string,
  parameters: DnsForwardingRulesetPatch,
  options: DnsForwardingRulesetsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsForwardingRulesets/{dnsForwardingRulesetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dnsForwardingRulesetName: dnsForwardingRulesetName,
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
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: dnsForwardingRulesetPatchSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<DnsForwardingRuleset> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return dnsForwardingRulesetDeserializer(result.body);
}

/** Updates a DNS forwarding ruleset. */
export function update(
  context: Client,
  resourceGroupName: string,
  dnsForwardingRulesetName: string,
  parameters: DnsForwardingRulesetPatch,
  options: DnsForwardingRulesetsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DnsForwardingRuleset>, DnsForwardingRuleset> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, dnsForwardingRulesetName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<DnsForwardingRuleset>, DnsForwardingRuleset>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  dnsForwardingRulesetName: string,
  parameters: DnsForwardingRuleset,
  options: DnsForwardingRulesetsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsForwardingRulesets/{dnsForwardingRulesetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dnsForwardingRulesetName: dnsForwardingRulesetName,
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
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: dnsForwardingRulesetSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DnsForwardingRuleset> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return dnsForwardingRulesetDeserializer(result.body);
}

/** Creates or updates a DNS forwarding ruleset. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  dnsForwardingRulesetName: string,
  parameters: DnsForwardingRuleset,
  options: DnsForwardingRulesetsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<DnsForwardingRuleset>, DnsForwardingRuleset> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        dnsForwardingRulesetName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<DnsForwardingRuleset>, DnsForwardingRuleset>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  dnsForwardingRulesetName: string,
  options: DnsForwardingRulesetsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsForwardingRulesets/{dnsForwardingRulesetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dnsForwardingRulesetName: dnsForwardingRulesetName,
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
): Promise<DnsForwardingRuleset> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return dnsForwardingRulesetDeserializer(result.body);
}

/** Gets a DNS forwarding ruleset properties. */
export async function get(
  context: Client,
  resourceGroupName: string,
  dnsForwardingRulesetName: string,
  options: DnsForwardingRulesetsGetOptionalParams = { requestOptions: {} },
): Promise<DnsForwardingRuleset> {
  const result = await _getSend(context, resourceGroupName, dnsForwardingRulesetName, options);
  return _getDeserialize(result);
}
