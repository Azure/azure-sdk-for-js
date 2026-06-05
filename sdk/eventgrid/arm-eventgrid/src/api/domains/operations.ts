// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext as Client } from "../index.js";
import type {
  Domain,
  DomainUpdateParameters,
  _DomainsListResult,
  DomainSharedAccessKeys,
  DomainRegenerateKeyRequest,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  domainSerializer,
  domainDeserializer,
  domainUpdateParametersSerializer,
  _domainsListResultDeserializer,
  domainSharedAccessKeysDeserializer,
  domainRegenerateKeyRequestSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DomainsRegenerateKeyOptionalParams,
  DomainsListSharedAccessKeysOptionalParams,
  DomainsListBySubscriptionOptionalParams,
  DomainsListByResourceGroupOptionalParams,
  DomainsDeleteOptionalParams,
  DomainsUpdateOptionalParams,
  DomainsCreateOrUpdateOptionalParams,
  DomainsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _regenerateKeySend(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  regenerateKeyRequest: DomainRegenerateKeyRequest,
  options: DomainsRegenerateKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/regenerateKey{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainName: domainName,
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
    body: domainRegenerateKeyRequestSerializer(regenerateKeyRequest),
  });
}

export async function _regenerateKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<DomainSharedAccessKeys> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return domainSharedAccessKeysDeserializer(result.body);
}

/** Regenerate a shared access key for a domain. */
export async function regenerateKey(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  regenerateKeyRequest: DomainRegenerateKeyRequest,
  options: DomainsRegenerateKeyOptionalParams = { requestOptions: {} },
): Promise<DomainSharedAccessKeys> {
  const result = await _regenerateKeySend(
    context,
    resourceGroupName,
    domainName,
    regenerateKeyRequest,
    options,
  );
  return _regenerateKeyDeserialize(result);
}

export function _listSharedAccessKeysSend(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  options: DomainsListSharedAccessKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/listKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainName: domainName,
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
): Promise<DomainSharedAccessKeys> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return domainSharedAccessKeysDeserializer(result.body);
}

/** List the two keys used to publish to a domain. */
export async function listSharedAccessKeys(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  options: DomainsListSharedAccessKeysOptionalParams = { requestOptions: {} },
): Promise<DomainSharedAccessKeys> {
  const result = await _listSharedAccessKeysSend(context, resourceGroupName, domainName, options);
  return _listSharedAccessKeysDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: DomainsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.EventGrid/domains{?api%2Dversion,%24filter,%24top}",
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
): Promise<_DomainsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _domainsListResultDeserializer(result.body);
}

/** List all the domains under an Azure subscription. */
export function listBySubscription(
  context: Client,
  options: DomainsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Domain> {
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
  options: DomainsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains{?api%2Dversion,%24filter,%24top}",
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
): Promise<_DomainsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _domainsListResultDeserializer(result.body);
}

/** List all the domains under a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: DomainsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Domain> {
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
  domainName: string,
  options: DomainsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainName: domainName,
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

/** Delete existing domain. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  options: DomainsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, domainName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  domainUpdateParameters: DomainUpdateParameters,
  options: DomainsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainName: domainName,
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
    body: domainUpdateParametersSerializer(domainUpdateParameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Domain> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return domainDeserializer(result.body);
}

/** Asynchronously updates a domain with the specified parameters. */
export function update(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  domainUpdateParameters: DomainUpdateParameters,
  options: DomainsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Domain>, Domain> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, domainName, domainUpdateParameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15-preview",
  }) as PollerLike<OperationState<Domain>, Domain>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  domainInfo: Domain,
  options: DomainsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainName: domainName,
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
    body: domainSerializer(domainInfo),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Domain> {
  const expectedStatuses = ["201", "200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return domainDeserializer(result.body);
}

/** Asynchronously creates or updates a new domain with the specified parameters. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  domainInfo: Domain,
  options: DomainsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Domain>, Domain> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["201", "200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, domainName, domainInfo, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15-preview",
  }) as PollerLike<OperationState<Domain>, Domain>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  options: DomainsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      domainName: domainName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Domain> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return domainDeserializer(result.body);
}

/** Get properties of a domain. */
export async function get(
  context: Client,
  resourceGroupName: string,
  domainName: string,
  options: DomainsGetOptionalParams = { requestOptions: {} },
): Promise<Domain> {
  const result = await _getSend(context, resourceGroupName, domainName, options);
  return _getDeserialize(result);
}
