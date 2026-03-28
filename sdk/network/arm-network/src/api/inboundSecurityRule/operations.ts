// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type { InboundSecurityRule } from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  inboundSecurityRuleSerializer,
  inboundSecurityRuleDeserializer,
} from "../../models/microsoft/network/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  InboundSecurityRuleCreateOrUpdateOptionalParams,
  InboundSecurityRuleGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  networkVirtualApplianceName: string,
  ruleCollectionName: string,
  parameters: InboundSecurityRule,
  options: InboundSecurityRuleCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/{networkVirtualApplianceName}/inboundSecurityRules/{ruleCollectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkVirtualApplianceName: networkVirtualApplianceName,
      ruleCollectionName: ruleCollectionName,
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
    body: inboundSecurityRuleSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<InboundSecurityRule> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return inboundSecurityRuleDeserializer(result.body);
}

/** Creates or updates the specified Network Virtual Appliance Inbound Security Rules. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  networkVirtualApplianceName: string,
  ruleCollectionName: string,
  parameters: InboundSecurityRule,
  options: InboundSecurityRuleCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<InboundSecurityRule>, InboundSecurityRule> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        networkVirtualApplianceName,
        ruleCollectionName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<InboundSecurityRule>, InboundSecurityRule>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  networkVirtualApplianceName: string,
  ruleCollectionName: string,
  options: InboundSecurityRuleGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/{networkVirtualApplianceName}/inboundSecurityRules/{ruleCollectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkVirtualApplianceName: networkVirtualApplianceName,
      ruleCollectionName: ruleCollectionName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<InboundSecurityRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return inboundSecurityRuleDeserializer(result.body);
}

/** Retrieves the available specified Network Virtual Appliance Inbound Security Rules Collection. */
export async function get(
  context: Client,
  resourceGroupName: string,
  networkVirtualApplianceName: string,
  ruleCollectionName: string,
  options: InboundSecurityRuleGetOptionalParams = { requestOptions: {} },
): Promise<InboundSecurityRule> {
  const result = await _getSend(
    context,
    resourceGroupName,
    networkVirtualApplianceName,
    ruleCollectionName,
    options,
  );
  return _getDeserialize(result);
}
