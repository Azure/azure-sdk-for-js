// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext as Client } from "../index.js";
import type {
  _OutboundRuleListResult,
  ManagedNetworkSettingsBasicResource,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _outboundRuleListResultDeserializer,
  managedNetworkSettingsBasicResourceSerializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { OutboundRulesPostOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _postSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  managedNetworkName: string,
  body: ManagedNetworkSettingsBasicResource,
  options: OutboundRulesPostOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/managedNetworks/{managedNetworkName}/batchOutboundRules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      managedNetworkName: managedNetworkName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: managedNetworkSettingsBasicResourceSerializer(body),
  });
}

export async function _postDeserialize(
  result: PathUncheckedResponse,
): Promise<_OutboundRuleListResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _outboundRuleListResultDeserializer(result.body);
}

/** The POST API for updating the outbound rules of the managed network associated with the cognitive services account. */
export function post(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  managedNetworkName: string,
  body: ManagedNetworkSettingsBasicResource,
  options: OutboundRulesPostOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<_OutboundRuleListResult>, _OutboundRuleListResult> {
  return getLongRunningPoller(context, _postDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _postSend(context, resourceGroupName, accountName, managedNetworkName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-15-preview",
  }) as PollerLike<OperationState<_OutboundRuleListResult>, _OutboundRuleListResult>;
}
