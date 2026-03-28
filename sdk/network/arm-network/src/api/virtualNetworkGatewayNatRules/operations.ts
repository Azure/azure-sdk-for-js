// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  VirtualNetworkGatewayNatRule,
  _ListVirtualNetworkGatewayNatRulesResult,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  virtualNetworkGatewayNatRuleSerializer,
  virtualNetworkGatewayNatRuleDeserializer,
  _listVirtualNetworkGatewayNatRulesResultDeserializer,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VirtualNetworkGatewayNatRulesListByVirtualNetworkGatewayOptionalParams,
  VirtualNetworkGatewayNatRulesDeleteOptionalParams,
  VirtualNetworkGatewayNatRulesCreateOrUpdateOptionalParams,
  VirtualNetworkGatewayNatRulesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByVirtualNetworkGatewaySend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewayNatRulesListByVirtualNetworkGatewayOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/natRules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
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

export async function _listByVirtualNetworkGatewayDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListVirtualNetworkGatewayNatRulesResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _listVirtualNetworkGatewayNatRulesResultDeserializer(result.body);
}

/** Retrieves all nat rules for a particular virtual network gateway. */
export function listByVirtualNetworkGateway(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewayNatRulesListByVirtualNetworkGatewayOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<VirtualNetworkGatewayNatRule> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByVirtualNetworkGatewaySend(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        options,
      ),
    _listByVirtualNetworkGatewayDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  natRuleName: string,
  options: VirtualNetworkGatewayNatRulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/natRules/{natRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
      natRuleName: natRuleName,
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

/** Deletes a nat rule. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  natRuleName: string,
  options: VirtualNetworkGatewayNatRulesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, virtualNetworkGatewayName, natRuleName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  natRuleName: string,
  natRuleParameters: VirtualNetworkGatewayNatRule,
  options: VirtualNetworkGatewayNatRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/natRules/{natRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
      natRuleName: natRuleName,
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
    body: virtualNetworkGatewayNatRuleSerializer(natRuleParameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualNetworkGatewayNatRule> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualNetworkGatewayNatRuleDeserializer(result.body);
}

/** Creates a nat rule to a scalable virtual network gateway if it doesn't exist else updates the existing nat rules. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  natRuleName: string,
  natRuleParameters: VirtualNetworkGatewayNatRule,
  options: VirtualNetworkGatewayNatRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VirtualNetworkGatewayNatRule>, VirtualNetworkGatewayNatRule> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        natRuleName,
        natRuleParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<VirtualNetworkGatewayNatRule>, VirtualNetworkGatewayNatRule>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  natRuleName: string,
  options: VirtualNetworkGatewayNatRulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/natRules/{natRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
      natRuleName: natRuleName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualNetworkGatewayNatRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualNetworkGatewayNatRuleDeserializer(result.body);
}

/** Retrieves the details of a nat rule. */
export async function get(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  natRuleName: string,
  options: VirtualNetworkGatewayNatRulesGetOptionalParams = { requestOptions: {} },
): Promise<VirtualNetworkGatewayNatRule> {
  const result = await _getSend(
    context,
    resourceGroupName,
    virtualNetworkGatewayName,
    natRuleName,
    options,
  );
  return _getDeserialize(result);
}
