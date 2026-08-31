// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext as Client } from "../index.js";
import type { OutboundRuleBasicResource, _OutboundRuleListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  outboundRuleBasicResourceSerializer,
  outboundRuleBasicResourceDeserializer,
  _outboundRuleListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  OutboundRuleListOptionalParams,
  OutboundRuleDeleteOptionalParams,
  OutboundRuleCreateOrUpdateOptionalParams,
  OutboundRuleGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  managedNetworkName: string,
  options: OutboundRuleListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/managedNetworks/{managedNetworkName}/outboundRules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      managedNetworkName: managedNetworkName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_OutboundRuleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _outboundRuleListResultDeserializer(result.body);
}

/** The GET API for retrieveing the list of outbound rules of the managed network associated with the machine learning workspace. */
export function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  managedNetworkName: string,
  options: OutboundRuleListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<OutboundRuleBasicResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, workspaceName, managedNetworkName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-15-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  managedNetworkName: string,
  ruleName: string,
  options: OutboundRuleDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/managedNetworks/{managedNetworkName}/outboundRules/{ruleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      managedNetworkName: managedNetworkName,
      ruleName: ruleName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** The DELETE API for deleting a single outbound rule of the managed network associated with the machine learning workspace. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  managedNetworkName: string,
  ruleName: string,
  options: OutboundRuleDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        workspaceName,
        managedNetworkName,
        ruleName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  managedNetworkName: string,
  ruleName: string,
  body: OutboundRuleBasicResource,
  options: OutboundRuleCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/managedNetworks/{managedNetworkName}/outboundRules/{ruleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      managedNetworkName: managedNetworkName,
      ruleName: ruleName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: outboundRuleBasicResourceSerializer(body),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<OutboundRuleBasicResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return outboundRuleBasicResourceDeserializer(result.body);
}

/** Create a OutboundRuleBasicResource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  managedNetworkName: string,
  ruleName: string,
  body: OutboundRuleBasicResource,
  options: OutboundRuleCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OutboundRuleBasicResource>, OutboundRuleBasicResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        workspaceName,
        managedNetworkName,
        ruleName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-15-preview",
  }) as PollerLike<OperationState<OutboundRuleBasicResource>, OutboundRuleBasicResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  managedNetworkName: string,
  ruleName: string,
  options: OutboundRuleGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/managedNetworks/{managedNetworkName}/outboundRules/{ruleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      managedNetworkName: managedNetworkName,
      ruleName: ruleName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
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
): Promise<OutboundRuleBasicResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return outboundRuleBasicResourceDeserializer(result.body);
}

/** The GET API for retrieveing a single outbound rule of the managed network associated with the machine learning workspace. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  managedNetworkName: string,
  ruleName: string,
  options: OutboundRuleGetOptionalParams = { requestOptions: {} },
): Promise<OutboundRuleBasicResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    workspaceName,
    managedNetworkName,
    ruleName,
    options,
  );
  return _getDeserialize(result);
}
