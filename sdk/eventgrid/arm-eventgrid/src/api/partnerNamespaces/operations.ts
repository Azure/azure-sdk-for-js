// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext as Client } from "../index.js";
import type {
  PartnerNamespace,
  PartnerNamespaceUpdateParameters,
  _PartnerNamespacesListResult,
  PartnerNamespaceSharedAccessKeys,
  PartnerNamespaceRegenerateKeyRequest,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  partnerNamespaceSerializer,
  partnerNamespaceDeserializer,
  partnerNamespaceUpdateParametersSerializer,
  _partnerNamespacesListResultDeserializer,
  partnerNamespaceSharedAccessKeysDeserializer,
  partnerNamespaceRegenerateKeyRequestSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PartnerNamespacesRegenerateKeyOptionalParams,
  PartnerNamespacesListSharedAccessKeysOptionalParams,
  PartnerNamespacesListBySubscriptionOptionalParams,
  PartnerNamespacesListByResourceGroupOptionalParams,
  PartnerNamespacesDeleteOptionalParams,
  PartnerNamespacesUpdateOptionalParams,
  PartnerNamespacesCreateOrUpdateOptionalParams,
  PartnerNamespacesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _regenerateKeySend(
  context: Client,
  resourceGroupName: string,
  partnerNamespaceName: string,
  regenerateKeyRequest: PartnerNamespaceRegenerateKeyRequest,
  options: PartnerNamespacesRegenerateKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerNamespaces/{partnerNamespaceName}/regenerateKey{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      partnerNamespaceName: partnerNamespaceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: partnerNamespaceRegenerateKeyRequestSerializer(regenerateKeyRequest),
  });
}

export async function _regenerateKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<PartnerNamespaceSharedAccessKeys> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return partnerNamespaceSharedAccessKeysDeserializer(result.body);
}

/** Regenerate a shared access key for a partner namespace. */
export async function regenerateKey(
  context: Client,
  resourceGroupName: string,
  partnerNamespaceName: string,
  regenerateKeyRequest: PartnerNamespaceRegenerateKeyRequest,
  options: PartnerNamespacesRegenerateKeyOptionalParams = { requestOptions: {} },
): Promise<PartnerNamespaceSharedAccessKeys> {
  const result = await _regenerateKeySend(
    context,
    resourceGroupName,
    partnerNamespaceName,
    regenerateKeyRequest,
    options,
  );
  return _regenerateKeyDeserialize(result);
}

export function _listSharedAccessKeysSend(
  context: Client,
  resourceGroupName: string,
  partnerNamespaceName: string,
  options: PartnerNamespacesListSharedAccessKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerNamespaces/{partnerNamespaceName}/listKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      partnerNamespaceName: partnerNamespaceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
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

export async function _listSharedAccessKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<PartnerNamespaceSharedAccessKeys> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return partnerNamespaceSharedAccessKeysDeserializer(result.body);
}

/** List the two keys used to publish to a partner namespace. */
export async function listSharedAccessKeys(
  context: Client,
  resourceGroupName: string,
  partnerNamespaceName: string,
  options: PartnerNamespacesListSharedAccessKeysOptionalParams = { requestOptions: {} },
): Promise<PartnerNamespaceSharedAccessKeys> {
  const result = await _listSharedAccessKeysSend(
    context,
    resourceGroupName,
    partnerNamespaceName,
    options,
  );
  return _listSharedAccessKeysDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: PartnerNamespacesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.EventGrid/partnerNamespaces{?api%2Dversion,%24filter,%24top}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
      "%24filter": options?.filter,
      "%24top": options?.top,
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
): Promise<_PartnerNamespacesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _partnerNamespacesListResultDeserializer(result.body);
}

/** List all the partner namespaces under an Azure subscription. */
export function listBySubscription(
  context: Client,
  options: PartnerNamespacesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PartnerNamespace> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-15-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: PartnerNamespacesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerNamespaces{?api%2Dversion,%24filter,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
      "%24filter": options?.filter,
      "%24top": options?.top,
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
): Promise<_PartnerNamespacesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _partnerNamespacesListResultDeserializer(result.body);
}

/** List all the partner namespaces under a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: PartnerNamespacesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PartnerNamespace> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-15-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  partnerNamespaceName: string,
  options: PartnerNamespacesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerNamespaces/{partnerNamespaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      partnerNamespaceName: partnerNamespaceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete existing partner namespace. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  partnerNamespaceName: string,
  options: PartnerNamespacesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, partnerNamespaceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  partnerNamespaceName: string,
  partnerNamespaceUpdateParameters: PartnerNamespaceUpdateParameters,
  options: PartnerNamespacesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerNamespaces/{partnerNamespaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      partnerNamespaceName: partnerNamespaceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: partnerNamespaceUpdateParametersSerializer(partnerNamespaceUpdateParameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<PartnerNamespace> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return partnerNamespaceDeserializer(result.body);
}

/** Asynchronously updates a partner namespace with the specified parameters. */
export function update(
  context: Client,
  resourceGroupName: string,
  partnerNamespaceName: string,
  partnerNamespaceUpdateParameters: PartnerNamespaceUpdateParameters,
  options: PartnerNamespacesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PartnerNamespace>, PartnerNamespace> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        partnerNamespaceName,
        partnerNamespaceUpdateParameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15-preview",
  }) as PollerLike<OperationState<PartnerNamespace>, PartnerNamespace>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  partnerNamespaceName: string,
  partnerNamespaceInfo: PartnerNamespace,
  options: PartnerNamespacesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerNamespaces/{partnerNamespaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      partnerNamespaceName: partnerNamespaceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: partnerNamespaceSerializer(partnerNamespaceInfo),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PartnerNamespace> {
  const expectedStatuses = ["201", "200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return partnerNamespaceDeserializer(result.body);
}

/** Asynchronously creates a new partner namespace with the specified parameters. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  partnerNamespaceName: string,
  partnerNamespaceInfo: PartnerNamespace,
  options: PartnerNamespacesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PartnerNamespace>, PartnerNamespace> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["201", "200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        partnerNamespaceName,
        partnerNamespaceInfo,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15-preview",
  }) as PollerLike<OperationState<PartnerNamespace>, PartnerNamespace>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  partnerNamespaceName: string,
  options: PartnerNamespacesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerNamespaces/{partnerNamespaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      partnerNamespaceName: partnerNamespaceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PartnerNamespace> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return partnerNamespaceDeserializer(result.body);
}

/** Get properties of a partner namespace. */
export async function get(
  context: Client,
  resourceGroupName: string,
  partnerNamespaceName: string,
  options: PartnerNamespacesGetOptionalParams = { requestOptions: {} },
): Promise<PartnerNamespace> {
  const result = await _getSend(context, resourceGroupName, partnerNamespaceName, options);
  return _getDeserialize(result);
}
