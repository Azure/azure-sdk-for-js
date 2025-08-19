// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  SecurityRule,
  securityRuleSerializer,
  securityRuleDeserializer,
  _SecurityRuleListResult,
  _securityRuleListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SecurityRulesListByNetworkSecurityGroupOptionalParams,
  SecurityRulesDeleteOptionalParams,
  SecurityRulesCreateOrUpdateOptionalParams,
  SecurityRulesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listByNetworkSecurityGroupSend(
  context: Client,
  resourceGroupName: string,
  networkSecurityGroupName: string,
  options: SecurityRulesListByNetworkSecurityGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/networkSecurityGroups/{networkSecurityGroupName}/securityRules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkSecurityGroupName: networkSecurityGroupName,
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

export async function _listByNetworkSecurityGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_SecurityRuleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _securityRuleListResultDeserializer(result.body);
}

/** Gets all security rules in a Network Security Group. */
export function listByNetworkSecurityGroup(
  context: Client,
  resourceGroupName: string,
  networkSecurityGroupName: string,
  options: SecurityRulesListByNetworkSecurityGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SecurityRule> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByNetworkSecurityGroupSend(
        context,
        resourceGroupName,
        networkSecurityGroupName,
        options,
      ),
    _listByNetworkSecurityGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  networkSecurityGroupName: string,
  securityRuleName: string,
  options: SecurityRulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/networkSecurityGroups/{networkSecurityGroupName}/securityRules/{securityRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkSecurityGroupName: networkSecurityGroupName,
      securityRuleName: securityRuleName,
      "api%2Dversion": context.apiVersion,
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

/** Deletes the specified security rule. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  networkSecurityGroupName: string,
  securityRuleName: string,
  options: SecurityRulesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, networkSecurityGroupName, securityRuleName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  networkSecurityGroupName: string,
  securityRuleName: string,
  resource: SecurityRule,
  options: SecurityRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/networkSecurityGroups/{networkSecurityGroupName}/securityRules/{securityRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkSecurityGroupName: networkSecurityGroupName,
      securityRuleName: securityRuleName,
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
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: securityRuleSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SecurityRule> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return securityRuleDeserializer(result.body);
}

/** Creates or updates a security rule in the specified resource group. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  networkSecurityGroupName: string,
  securityRuleName: string,
  resource: SecurityRule,
  options: SecurityRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SecurityRule>, SecurityRule> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        networkSecurityGroupName,
        securityRuleName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<SecurityRule>, SecurityRule>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  networkSecurityGroupName: string,
  securityRuleName: string,
  options: SecurityRulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/networkSecurityGroups/{networkSecurityGroupName}/securityRules/{securityRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkSecurityGroupName: networkSecurityGroupName,
      securityRuleName: securityRuleName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SecurityRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return securityRuleDeserializer(result.body);
}

/** Gets the specified security rule. */
export async function get(
  context: Client,
  resourceGroupName: string,
  networkSecurityGroupName: string,
  securityRuleName: string,
  options: SecurityRulesGetOptionalParams = { requestOptions: {} },
): Promise<SecurityRule> {
  const result = await _getSend(
    context,
    resourceGroupName,
    networkSecurityGroupName,
    securityRuleName,
    options,
  );
  return _getDeserialize(result);
}
