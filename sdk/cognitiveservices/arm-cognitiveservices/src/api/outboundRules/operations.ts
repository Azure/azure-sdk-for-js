// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  OutboundRuleBasicResource,
  _OutboundRuleListResult,
  _outboundRuleListResultDeserializer,
  ManagedNetworkSettingsBasicResource,
  managedNetworkSettingsBasicResourceSerializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { OutboundRulesPostOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

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
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
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
  const expectedStatuses = ["200", "202", "201"];
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
): PagedAsyncIterableIterator<OutboundRuleBasicResource> {
  const initialPagingPoller = getLongRunningPoller(
    context,
    async (result: PathUncheckedResponse) => result,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _postSend(context, resourceGroupName, accountName, managedNetworkName, body, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2026-03-15-preview",
    },
  ) as PollerLike<OperationState<PathUncheckedResponse>, PathUncheckedResponse>;

  return buildPagedAsyncIterator(
    context,
    async () => await initialPagingPoller,
    _postDeserialize,
    ["200", "202", "201"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-15-preview",
    },
  );
}
