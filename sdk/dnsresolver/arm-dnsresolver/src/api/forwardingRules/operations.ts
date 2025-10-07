// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DnsResolverManagementContext as Client } from "../index.js";
import type {
  ForwardingRule,
  ForwardingRulePatch,
  _ForwardingRuleListResult,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  forwardingRuleSerializer,
  forwardingRuleDeserializer,
  forwardingRulePatchSerializer,
  _forwardingRuleListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ForwardingRulesListOptionalParams,
  ForwardingRulesDeleteOptionalParams,
  ForwardingRulesUpdateOptionalParams,
  ForwardingRulesCreateOrUpdateOptionalParams,
  ForwardingRulesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  dnsForwardingRulesetName: string,
  options: ForwardingRulesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsForwardingRulesets/{dnsForwardingRulesetName}/forwardingRules{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dnsForwardingRulesetName: dnsForwardingRulesetName,
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
): Promise<_ForwardingRuleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _forwardingRuleListResultDeserializer(result.body);
}

/** Lists forwarding rules in a DNS forwarding ruleset. */
export function list(
  context: Client,
  resourceGroupName: string,
  dnsForwardingRulesetName: string,
  options: ForwardingRulesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ForwardingRule> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, dnsForwardingRulesetName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  dnsForwardingRulesetName: string,
  forwardingRuleName: string,
  options: ForwardingRulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsForwardingRulesets/{dnsForwardingRulesetName}/forwardingRules/{forwardingRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dnsForwardingRulesetName: dnsForwardingRulesetName,
      forwardingRuleName: forwardingRuleName,
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
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a forwarding rule in a DNS forwarding ruleset. WARNING: This operation cannot be undone. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  dnsForwardingRulesetName: string,
  forwardingRuleName: string,
  options: ForwardingRulesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    dnsForwardingRulesetName,
    forwardingRuleName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  dnsForwardingRulesetName: string,
  forwardingRuleName: string,
  parameters: ForwardingRulePatch,
  options: ForwardingRulesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsForwardingRulesets/{dnsForwardingRulesetName}/forwardingRules/{forwardingRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dnsForwardingRulesetName: dnsForwardingRulesetName,
      forwardingRuleName: forwardingRuleName,
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
    body: forwardingRulePatchSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ForwardingRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return forwardingRuleDeserializer(result.body);
}

/** Updates a forwarding rule in a DNS forwarding ruleset. */
export async function update(
  context: Client,
  resourceGroupName: string,
  dnsForwardingRulesetName: string,
  forwardingRuleName: string,
  parameters: ForwardingRulePatch,
  options: ForwardingRulesUpdateOptionalParams = { requestOptions: {} },
): Promise<ForwardingRule> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    dnsForwardingRulesetName,
    forwardingRuleName,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  dnsForwardingRulesetName: string,
  forwardingRuleName: string,
  parameters: ForwardingRule,
  options: ForwardingRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsForwardingRulesets/{dnsForwardingRulesetName}/forwardingRules/{forwardingRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dnsForwardingRulesetName: dnsForwardingRulesetName,
      forwardingRuleName: forwardingRuleName,
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
    body: forwardingRuleSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ForwardingRule> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return forwardingRuleDeserializer(result.body);
}

/** Creates or updates a forwarding rule in a DNS forwarding ruleset. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  dnsForwardingRulesetName: string,
  forwardingRuleName: string,
  parameters: ForwardingRule,
  options: ForwardingRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ForwardingRule> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    dnsForwardingRulesetName,
    forwardingRuleName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  dnsForwardingRulesetName: string,
  forwardingRuleName: string,
  options: ForwardingRulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsForwardingRulesets/{dnsForwardingRulesetName}/forwardingRules/{forwardingRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dnsForwardingRulesetName: dnsForwardingRulesetName,
      forwardingRuleName: forwardingRuleName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ForwardingRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return forwardingRuleDeserializer(result.body);
}

/** Gets properties of a forwarding rule in a DNS forwarding ruleset. */
export async function get(
  context: Client,
  resourceGroupName: string,
  dnsForwardingRulesetName: string,
  forwardingRuleName: string,
  options: ForwardingRulesGetOptionalParams = { requestOptions: {} },
): Promise<ForwardingRule> {
  const result = await _getSend(
    context,
    resourceGroupName,
    dnsForwardingRulesetName,
    forwardingRuleName,
    options,
  );
  return _getDeserialize(result);
}
