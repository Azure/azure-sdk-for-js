// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureDataTransferContext as Client } from "../index.js";
import type {
  MessagingTransferFlow,
  MessagingTransferFlowsPatch,
  _MessagingTransferFlowListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  messagingTransferFlowSerializer,
  messagingTransferFlowDeserializer,
  messagingTransferFlowsPatchSerializer,
  _messagingTransferFlowListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  MessagingTransferFlowsLinkRemoteFlowOptionalParams,
  MessagingTransferFlowsEnableTransferOptionalParams,
  MessagingTransferFlowsDisableTransferOptionalParams,
  MessagingTransferFlowsDeleteOptionalParams,
  MessagingTransferFlowsListBySubscriptionOptionalParams,
  MessagingTransferFlowsListByResourceGroupOptionalParams,
  MessagingTransferFlowsUpdateOptionalParams,
  MessagingTransferFlowsCreateOrUpdateOptionalParams,
  MessagingTransferFlowsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _linkRemoteFlowSend(
  context: Client,
  resourceGroupName: string,
  messagingTransferFlowName: string,
  options: MessagingTransferFlowsLinkRemoteFlowOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/messagingTransferFlows/{messagingTransferFlowName}/linkRemoteFlow{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      messagingTransferFlowName: messagingTransferFlowName,
      "api%2Dversion": context.apiVersion ?? "2026-06-29-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _linkRemoteFlowDeserialize(
  result: PathUncheckedResponse,
): Promise<MessagingTransferFlow> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return messagingTransferFlowDeserializer(result.body);
}

/** Pairs this messaging transfer flow with the messaging transfer flow identified by its remoteTransferFlowResourceId on the other side of the pipeline. Once both sides are linked and approved, data can be transferred between them. */
export function linkRemoteFlow(
  context: Client,
  resourceGroupName: string,
  messagingTransferFlowName: string,
  options: MessagingTransferFlowsLinkRemoteFlowOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MessagingTransferFlow>, MessagingTransferFlow> {
  return getLongRunningPoller(context, _linkRemoteFlowDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _linkRemoteFlowSend(context, resourceGroupName, messagingTransferFlowName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-29-preview",
  }) as PollerLike<OperationState<MessagingTransferFlow>, MessagingTransferFlow>;
}

export function _enableTransferSend(
  context: Client,
  resourceGroupName: string,
  messagingTransferFlowName: string,
  options: MessagingTransferFlowsEnableTransferOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/messagingTransferFlows/{messagingTransferFlowName}/enableTransfer{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      messagingTransferFlowName: messagingTransferFlowName,
      "api%2Dversion": context.apiVersion ?? "2026-06-29-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _enableTransferDeserialize(
  result: PathUncheckedResponse,
): Promise<MessagingTransferFlow> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return messagingTransferFlowDeserializer(result.body);
}

/** Starts (or resumes) data transfer through the specified messaging transfer flow. The transfer flow must be approved and linked. */
export function enableTransfer(
  context: Client,
  resourceGroupName: string,
  messagingTransferFlowName: string,
  options: MessagingTransferFlowsEnableTransferOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MessagingTransferFlow>, MessagingTransferFlow> {
  return getLongRunningPoller(context, _enableTransferDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _enableTransferSend(context, resourceGroupName, messagingTransferFlowName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-29-preview",
  }) as PollerLike<OperationState<MessagingTransferFlow>, MessagingTransferFlow>;
}

export function _disableTransferSend(
  context: Client,
  resourceGroupName: string,
  messagingTransferFlowName: string,
  options: MessagingTransferFlowsDisableTransferOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/messagingTransferFlows/{messagingTransferFlowName}/disableTransfer{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      messagingTransferFlowName: messagingTransferFlowName,
      "api%2Dversion": context.apiVersion ?? "2026-06-29-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _disableTransferDeserialize(
  result: PathUncheckedResponse,
): Promise<MessagingTransferFlow> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return messagingTransferFlowDeserializer(result.body);
}

/** Stops data transfer through the specified messaging transfer flow. */
export function disableTransfer(
  context: Client,
  resourceGroupName: string,
  messagingTransferFlowName: string,
  options: MessagingTransferFlowsDisableTransferOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MessagingTransferFlow>, MessagingTransferFlow> {
  return getLongRunningPoller(context, _disableTransferDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _disableTransferSend(context, resourceGroupName, messagingTransferFlowName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-29-preview",
  }) as PollerLike<OperationState<MessagingTransferFlow>, MessagingTransferFlow>;
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  messagingTransferFlowName: string,
  options: MessagingTransferFlowsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/messagingTransferFlows/{messagingTransferFlowName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      messagingTransferFlowName: messagingTransferFlowName,
      "api%2Dversion": context.apiVersion ?? "2026-06-29-preview",
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

/** Deletes the MessagingTransferFlow resource. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  messagingTransferFlowName: string,
  options: MessagingTransferFlowsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, messagingTransferFlowName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-29-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: MessagingTransferFlowsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AzureDataTransfer/messagingTransferFlows{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-06-29-preview",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_MessagingTransferFlowListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _messagingTransferFlowListResultDeserializer(result.body);
}

/** Gets messaging transfer flows in a subscription. */
export function listBySubscription(
  context: Client,
  options: MessagingTransferFlowsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MessagingTransferFlow> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-06-29-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: MessagingTransferFlowsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/messagingTransferFlows{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-06-29-preview",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_MessagingTransferFlowListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _messagingTransferFlowListResultDeserializer(result.body);
}

/** Gets messaging transfer flows in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: MessagingTransferFlowsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MessagingTransferFlow> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-06-29-preview",
    },
  );
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  messagingTransferFlowName: string,
  messagingTransferFlow: MessagingTransferFlowsPatch,
  options: MessagingTransferFlowsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/messagingTransferFlows/{messagingTransferFlowName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      messagingTransferFlowName: messagingTransferFlowName,
      "api%2Dversion": context.apiVersion ?? "2026-06-29-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: messagingTransferFlowsPatchSerializer(messagingTransferFlow),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<MessagingTransferFlow> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return messagingTransferFlowDeserializer(result.body);
}

/** Updates the MessagingTransferFlow resource. */
export function update(
  context: Client,
  resourceGroupName: string,
  messagingTransferFlowName: string,
  messagingTransferFlow: MessagingTransferFlowsPatch,
  options: MessagingTransferFlowsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MessagingTransferFlow>, MessagingTransferFlow> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        messagingTransferFlowName,
        messagingTransferFlow,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-29-preview",
  }) as PollerLike<OperationState<MessagingTransferFlow>, MessagingTransferFlow>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  messagingTransferFlowName: string,
  messagingTransferFlow: MessagingTransferFlow,
  options: MessagingTransferFlowsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/messagingTransferFlows/{messagingTransferFlowName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      messagingTransferFlowName: messagingTransferFlowName,
      "api%2Dversion": context.apiVersion ?? "2026-06-29-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: messagingTransferFlowSerializer(messagingTransferFlow),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<MessagingTransferFlow> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return messagingTransferFlowDeserializer(result.body);
}

/** Creates or updates the MessagingTransferFlow resource. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  messagingTransferFlowName: string,
  messagingTransferFlow: MessagingTransferFlow,
  options: MessagingTransferFlowsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MessagingTransferFlow>, MessagingTransferFlow> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        messagingTransferFlowName,
        messagingTransferFlow,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-06-29-preview",
  }) as PollerLike<OperationState<MessagingTransferFlow>, MessagingTransferFlow>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  messagingTransferFlowName: string,
  options: MessagingTransferFlowsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/messagingTransferFlows/{messagingTransferFlowName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      messagingTransferFlowName: messagingTransferFlowName,
      "api%2Dversion": context.apiVersion ?? "2026-06-29-preview",
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
): Promise<MessagingTransferFlow> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return messagingTransferFlowDeserializer(result.body);
}

/** Gets the MessagingTransferFlow resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  messagingTransferFlowName: string,
  options: MessagingTransferFlowsGetOptionalParams = { requestOptions: {} },
): Promise<MessagingTransferFlow> {
  const result = await _getSend(context, resourceGroupName, messagingTransferFlowName, options);
  return _getDeserialize(result);
}
