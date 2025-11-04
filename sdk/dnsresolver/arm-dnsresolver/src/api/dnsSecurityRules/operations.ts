// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DnsResolverManagementContext as Client } from "../index.js";
import type {
  DnsSecurityRule,
  DnsSecurityRulePatch,
  _DnsSecurityRuleListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  dnsSecurityRuleSerializer,
  dnsSecurityRuleDeserializer,
  dnsSecurityRulePatchSerializer,
  _dnsSecurityRuleListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DnsSecurityRulesListOptionalParams,
  DnsSecurityRulesDeleteOptionalParams,
  DnsSecurityRulesUpdateOptionalParams,
  DnsSecurityRulesCreateOrUpdateOptionalParams,
  DnsSecurityRulesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  dnsResolverPolicyName: string,
  options: DnsSecurityRulesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverPolicies/{dnsResolverPolicyName}/dnsSecurityRules{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dnsResolverPolicyName: dnsResolverPolicyName,
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
): Promise<_DnsSecurityRuleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _dnsSecurityRuleListResultDeserializer(result.body);
}

/** Lists DNS security rules for a DNS resolver policy. */
export function list(
  context: Client,
  resourceGroupName: string,
  dnsResolverPolicyName: string,
  options: DnsSecurityRulesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DnsSecurityRule> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, dnsResolverPolicyName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  dnsResolverPolicyName: string,
  dnsSecurityRuleName: string,
  options: DnsSecurityRulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverPolicies/{dnsResolverPolicyName}/dnsSecurityRules/{dnsSecurityRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dnsResolverPolicyName: dnsResolverPolicyName,
      dnsSecurityRuleName: dnsSecurityRuleName,
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
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a DNS security rule for a DNS resolver policy. WARNING: This operation cannot be undone. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  dnsResolverPolicyName: string,
  dnsSecurityRuleName: string,
  options: DnsSecurityRulesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, dnsResolverPolicyName, dnsSecurityRuleName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  dnsResolverPolicyName: string,
  dnsSecurityRuleName: string,
  parameters: DnsSecurityRulePatch,
  options: DnsSecurityRulesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverPolicies/{dnsResolverPolicyName}/dnsSecurityRules/{dnsSecurityRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dnsResolverPolicyName: dnsResolverPolicyName,
      dnsSecurityRuleName: dnsSecurityRuleName,
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
    body: dnsSecurityRulePatchSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<DnsSecurityRule> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return dnsSecurityRuleDeserializer(result.body);
}

/** Updates a DNS security rule. */
export function update(
  context: Client,
  resourceGroupName: string,
  dnsResolverPolicyName: string,
  dnsSecurityRuleName: string,
  parameters: DnsSecurityRulePatch,
  options: DnsSecurityRulesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DnsSecurityRule>, DnsSecurityRule> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        dnsResolverPolicyName,
        dnsSecurityRuleName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<DnsSecurityRule>, DnsSecurityRule>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  dnsResolverPolicyName: string,
  dnsSecurityRuleName: string,
  parameters: DnsSecurityRule,
  options: DnsSecurityRulesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverPolicies/{dnsResolverPolicyName}/dnsSecurityRules/{dnsSecurityRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dnsResolverPolicyName: dnsResolverPolicyName,
      dnsSecurityRuleName: dnsSecurityRuleName,
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
    body: dnsSecurityRuleSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DnsSecurityRule> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return dnsSecurityRuleDeserializer(result.body);
}

/** Creates or updates a DNS security rule for a DNS resolver policy. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  dnsResolverPolicyName: string,
  dnsSecurityRuleName: string,
  parameters: DnsSecurityRule,
  options: DnsSecurityRulesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<DnsSecurityRule>, DnsSecurityRule> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        dnsResolverPolicyName,
        dnsSecurityRuleName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<DnsSecurityRule>, DnsSecurityRule>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  dnsResolverPolicyName: string,
  dnsSecurityRuleName: string,
  options: DnsSecurityRulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverPolicies/{dnsResolverPolicyName}/dnsSecurityRules/{dnsSecurityRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dnsResolverPolicyName: dnsResolverPolicyName,
      dnsSecurityRuleName: dnsSecurityRuleName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DnsSecurityRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return dnsSecurityRuleDeserializer(result.body);
}

/** Gets properties of a DNS security rule for a DNS resolver policy. */
export async function get(
  context: Client,
  resourceGroupName: string,
  dnsResolverPolicyName: string,
  dnsSecurityRuleName: string,
  options: DnsSecurityRulesGetOptionalParams = { requestOptions: {} },
): Promise<DnsSecurityRule> {
  const result = await _getSend(
    context,
    resourceGroupName,
    dnsResolverPolicyName,
    dnsSecurityRuleName,
    options,
  );
  return _getDeserialize(result);
}
