// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIVMManagementContext as Client } from "../index.js";
import type { InboundRule, _InboundRuleListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  inboundRuleSerializer,
  inboundRuleDeserializer,
  _inboundRuleListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  InboundRulesListByNatGatewayOptionalParams,
  InboundRulesDeleteOptionalParams,
  InboundRulesCreateOrUpdateOptionalParams,
  InboundRulesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByNatGatewaySend(
  context: Client,
  resourceGroupName: string,
  natGatewayName: string,
  options: InboundRulesListByNatGatewayOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/natGateways/{natGatewayName}/inboundRules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      natGatewayName: natGatewayName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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

export async function _listByNatGatewayDeserialize(
  result: PathUncheckedResponse,
): Promise<_InboundRuleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _inboundRuleListResultDeserializer(result.body);
}

/** Lists all of the inbound rules in the specified NAT gateway. Use the nextLink property in the response to get the next page of inbound rules. */
export function listByNatGateway(
  context: Client,
  resourceGroupName: string,
  natGatewayName: string,
  options: InboundRulesListByNatGatewayOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<InboundRule> {
  return buildPagedAsyncIterator(
    context,
    () => _listByNatGatewaySend(context, resourceGroupName, natGatewayName, options),
    _listByNatGatewayDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-04-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  natGatewayName: string,
  inboundRuleName: string,
  options: InboundRulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/natGateways/{natGatewayName}/inboundRules/{inboundRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      natGatewayName: natGatewayName,
      inboundRuleName: inboundRuleName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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

/** The operation to delete an inbound rule. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  natGatewayName: string,
  inboundRuleName: string,
  options: InboundRulesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, natGatewayName, inboundRuleName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  natGatewayName: string,
  inboundRuleName: string,
  resource: InboundRule,
  options: InboundRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/natGateways/{natGatewayName}/inboundRules/{inboundRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      natGatewayName: natGatewayName,
      inboundRuleName: inboundRuleName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: inboundRuleSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<InboundRule> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return inboundRuleDeserializer(result.body);
}

/** The operation to create or update an inbound rule. Please note some properties can be set only during inbound rule creation. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  natGatewayName: string,
  inboundRuleName: string,
  resource: InboundRule,
  options: InboundRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<InboundRule>, InboundRule> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        natGatewayName,
        inboundRuleName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<InboundRule>, InboundRule>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  natGatewayName: string,
  inboundRuleName: string,
  options: InboundRulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/natGateways/{natGatewayName}/inboundRules/{inboundRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      natGatewayName: natGatewayName,
      inboundRuleName: inboundRuleName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<InboundRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return inboundRuleDeserializer(result.body);
}

/** The operation to get an inbound rule. */
export async function get(
  context: Client,
  resourceGroupName: string,
  natGatewayName: string,
  inboundRuleName: string,
  options: InboundRulesGetOptionalParams = { requestOptions: {} },
): Promise<InboundRule> {
  const result = await _getSend(
    context,
    resourceGroupName,
    natGatewayName,
    inboundRuleName,
    options,
  );
  return _getDeserialize(result);
}
