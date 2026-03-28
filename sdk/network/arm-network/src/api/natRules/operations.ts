// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  VpnGatewayNatRule,
  _ListVpnGatewayNatRulesResult,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  vpnGatewayNatRuleSerializer,
  vpnGatewayNatRuleDeserializer,
  _listVpnGatewayNatRulesResultDeserializer,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NatRulesListByVpnGatewayOptionalParams,
  NatRulesDeleteOptionalParams,
  NatRulesCreateOrUpdateOptionalParams,
  NatRulesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByVpnGatewaySend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  options: NatRulesListByVpnGatewayOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/natRules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      gatewayName: gatewayName,
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

export async function _listByVpnGatewayDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListVpnGatewayNatRulesResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _listVpnGatewayNatRulesResultDeserializer(result.body);
}

/** Retrieves all nat rules for a particular virtual wan vpn gateway. */
export function listByVpnGateway(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  options: NatRulesListByVpnGatewayOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VpnGatewayNatRule> {
  return buildPagedAsyncIterator(
    context,
    () => _listByVpnGatewaySend(context, resourceGroupName, gatewayName, options),
    _listByVpnGatewayDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  natRuleName: string,
  options: NatRulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/natRules/{natRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      gatewayName: gatewayName,
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
  gatewayName: string,
  natRuleName: string,
  options: NatRulesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, gatewayName, natRuleName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  natRuleName: string,
  natRuleParameters: VpnGatewayNatRule,
  options: NatRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/natRules/{natRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      gatewayName: gatewayName,
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
    body: vpnGatewayNatRuleSerializer(natRuleParameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<VpnGatewayNatRule> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return vpnGatewayNatRuleDeserializer(result.body);
}

/** Creates a nat rule to a scalable vpn gateway if it doesn't exist else updates the existing nat rules. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  natRuleName: string,
  natRuleParameters: VpnGatewayNatRule,
  options: NatRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VpnGatewayNatRule>, VpnGatewayNatRule> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        gatewayName,
        natRuleName,
        natRuleParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<VpnGatewayNatRule>, VpnGatewayNatRule>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  natRuleName: string,
  options: NatRulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/natRules/{natRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      gatewayName: gatewayName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<VpnGatewayNatRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return vpnGatewayNatRuleDeserializer(result.body);
}

/** Retrieves the details of a nat ruleGet. */
export async function get(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  natRuleName: string,
  options: NatRulesGetOptionalParams = { requestOptions: {} },
): Promise<VpnGatewayNatRule> {
  const result = await _getSend(context, resourceGroupName, gatewayName, natRuleName, options);
  return _getDeserialize(result);
}
