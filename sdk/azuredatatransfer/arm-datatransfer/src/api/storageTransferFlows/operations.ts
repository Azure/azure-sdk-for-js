// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureDataTransferContext as Client } from "../index.js";
import type {
  StorageTransferFlow,
  StorageTransferFlowsPatch,
  _StorageTransferFlowListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  storageTransferFlowSerializer,
  storageTransferFlowDeserializer,
  storageTransferFlowsPatchSerializer,
  _storageTransferFlowListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  StorageTransferFlowsLinkRemoteFlowOptionalParams,
  StorageTransferFlowsEnableTransferOptionalParams,
  StorageTransferFlowsDisableTransferOptionalParams,
  StorageTransferFlowsDeleteOptionalParams,
  StorageTransferFlowsListBySubscriptionOptionalParams,
  StorageTransferFlowsListByResourceGroupOptionalParams,
  StorageTransferFlowsUpdateOptionalParams,
  StorageTransferFlowsCreateOrUpdateOptionalParams,
  StorageTransferFlowsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _linkRemoteFlowSend(
  context: Client,
  resourceGroupName: string,
  storageTransferFlowName: string,
  options: StorageTransferFlowsLinkRemoteFlowOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/storageTransferFlows/{storageTransferFlowName}/linkRemoteFlow{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageTransferFlowName: storageTransferFlowName,
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
): Promise<StorageTransferFlow> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return storageTransferFlowDeserializer(result.body);
}

/** Pairs this storage transfer flow with the storage transfer flow identified by its remoteTransferFlowResourceId on the other side of the pipeline. Once both sides are linked and approved, data can be transferred between them. */
export function linkRemoteFlow(
  context: Client,
  resourceGroupName: string,
  storageTransferFlowName: string,
  options: StorageTransferFlowsLinkRemoteFlowOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<StorageTransferFlow>, StorageTransferFlow> {
  return getLongRunningPoller(context, _linkRemoteFlowDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _linkRemoteFlowSend(context, resourceGroupName, storageTransferFlowName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-29-preview",
  }) as PollerLike<OperationState<StorageTransferFlow>, StorageTransferFlow>;
}

export function _enableTransferSend(
  context: Client,
  resourceGroupName: string,
  storageTransferFlowName: string,
  options: StorageTransferFlowsEnableTransferOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/storageTransferFlows/{storageTransferFlowName}/enableTransfer{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageTransferFlowName: storageTransferFlowName,
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
): Promise<StorageTransferFlow> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return storageTransferFlowDeserializer(result.body);
}

/** Starts (or resumes) data transfer through the specified storage transfer flow. The transfer flow must be approved and linked. */
export function enableTransfer(
  context: Client,
  resourceGroupName: string,
  storageTransferFlowName: string,
  options: StorageTransferFlowsEnableTransferOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<StorageTransferFlow>, StorageTransferFlow> {
  return getLongRunningPoller(context, _enableTransferDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _enableTransferSend(context, resourceGroupName, storageTransferFlowName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-29-preview",
  }) as PollerLike<OperationState<StorageTransferFlow>, StorageTransferFlow>;
}

export function _disableTransferSend(
  context: Client,
  resourceGroupName: string,
  storageTransferFlowName: string,
  options: StorageTransferFlowsDisableTransferOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/storageTransferFlows/{storageTransferFlowName}/disableTransfer{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageTransferFlowName: storageTransferFlowName,
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
): Promise<StorageTransferFlow> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return storageTransferFlowDeserializer(result.body);
}

/** Stops data transfer through the specified storage transfer flow. */
export function disableTransfer(
  context: Client,
  resourceGroupName: string,
  storageTransferFlowName: string,
  options: StorageTransferFlowsDisableTransferOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<StorageTransferFlow>, StorageTransferFlow> {
  return getLongRunningPoller(context, _disableTransferDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _disableTransferSend(context, resourceGroupName, storageTransferFlowName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-29-preview",
  }) as PollerLike<OperationState<StorageTransferFlow>, StorageTransferFlow>;
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  storageTransferFlowName: string,
  options: StorageTransferFlowsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/storageTransferFlows/{storageTransferFlowName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageTransferFlowName: storageTransferFlowName,
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

/** Deletes the storage transfer flow resource. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  storageTransferFlowName: string,
  options: StorageTransferFlowsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, storageTransferFlowName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-29-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: StorageTransferFlowsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AzureDataTransfer/storageTransferFlows{?api%2Dversion}",
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
): Promise<_StorageTransferFlowListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _storageTransferFlowListResultDeserializer(result.body);
}

/** Gets storage transfer flows in a subscription. */
export function listBySubscription(
  context: Client,
  options: StorageTransferFlowsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StorageTransferFlow> {
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
  options: StorageTransferFlowsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/storageTransferFlows{?api%2Dversion}",
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
): Promise<_StorageTransferFlowListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _storageTransferFlowListResultDeserializer(result.body);
}

/** Gets storage transfer flows in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: StorageTransferFlowsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StorageTransferFlow> {
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
  storageTransferFlowName: string,
  storageTransferFlow: StorageTransferFlowsPatch,
  options: StorageTransferFlowsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/storageTransferFlows/{storageTransferFlowName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageTransferFlowName: storageTransferFlowName,
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
    body: storageTransferFlowsPatchSerializer(storageTransferFlow),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<StorageTransferFlow> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return storageTransferFlowDeserializer(result.body);
}

/** Updates the StorageTransferFlow resource. */
export function update(
  context: Client,
  resourceGroupName: string,
  storageTransferFlowName: string,
  storageTransferFlow: StorageTransferFlowsPatch,
  options: StorageTransferFlowsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<StorageTransferFlow>, StorageTransferFlow> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        storageTransferFlowName,
        storageTransferFlow,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-29-preview",
  }) as PollerLike<OperationState<StorageTransferFlow>, StorageTransferFlow>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  storageTransferFlowName: string,
  storageTransferFlow: StorageTransferFlow,
  options: StorageTransferFlowsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/storageTransferFlows/{storageTransferFlowName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageTransferFlowName: storageTransferFlowName,
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
    body: storageTransferFlowSerializer(storageTransferFlow),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<StorageTransferFlow> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return storageTransferFlowDeserializer(result.body);
}

/** Creates or updates the StorageTransferFlow resource. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  storageTransferFlowName: string,
  storageTransferFlow: StorageTransferFlow,
  options: StorageTransferFlowsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<StorageTransferFlow>, StorageTransferFlow> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        storageTransferFlowName,
        storageTransferFlow,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-06-29-preview",
  }) as PollerLike<OperationState<StorageTransferFlow>, StorageTransferFlow>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  storageTransferFlowName: string,
  options: StorageTransferFlowsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/storageTransferFlows/{storageTransferFlowName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageTransferFlowName: storageTransferFlowName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<StorageTransferFlow> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return storageTransferFlowDeserializer(result.body);
}

/** Gets StorageTransferFlow resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  storageTransferFlowName: string,
  options: StorageTransferFlowsGetOptionalParams = { requestOptions: {} },
): Promise<StorageTransferFlow> {
  const result = await _getSend(context, resourceGroupName, storageTransferFlowName, options);
  return _getDeserialize(result);
}
