// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DnsResolverManagementContext as Client } from "../index.js";
import type {
  DnsResolverDomainList,
  DnsResolverDomainListPatch,
  _DnsResolverDomainListListResult,
  DnsResolverDomainListBulk,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  dnsResolverDomainListSerializer,
  dnsResolverDomainListDeserializer,
  dnsResolverDomainListPatchSerializer,
  _dnsResolverDomainListListResultDeserializer,
  dnsResolverDomainListBulkSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DnsResolverDomainListsBulkOptionalParams,
  DnsResolverDomainListsListOptionalParams,
  DnsResolverDomainListsListByResourceGroupOptionalParams,
  DnsResolverDomainListsDeleteOptionalParams,
  DnsResolverDomainListsUpdateOptionalParams,
  DnsResolverDomainListsCreateOrUpdateOptionalParams,
  DnsResolverDomainListsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _bulkSend(
  context: Client,
  resourceGroupName: string,
  dnsResolverDomainListName: string,
  parameters: DnsResolverDomainListBulk,
  options: DnsResolverDomainListsBulkOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverDomainLists/{dnsResolverDomainListName}/bulk{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dnsResolverDomainListName: dnsResolverDomainListName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: dnsResolverDomainListBulkSerializer(parameters),
  });
}

export async function _bulkDeserialize(
  result: PathUncheckedResponse,
): Promise<DnsResolverDomainList> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return dnsResolverDomainListDeserializer(result.body);
}

/** Uploads or downloads the list of domains for a DNS Resolver Domain List from a storage link. */
export function bulk(
  context: Client,
  resourceGroupName: string,
  dnsResolverDomainListName: string,
  parameters: DnsResolverDomainListBulk,
  options: DnsResolverDomainListsBulkOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DnsResolverDomainList>, DnsResolverDomainList> {
  return getLongRunningPoller(context, _bulkDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _bulkSend(context, resourceGroupName, dnsResolverDomainListName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<DnsResolverDomainList>, DnsResolverDomainList>;
}

export function _listSend(
  context: Client,
  options: DnsResolverDomainListsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/dnsResolverDomainLists{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
      "%24top": options?.top,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_DnsResolverDomainListListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _dnsResolverDomainListListResultDeserializer(result.body);
}

/** Lists DNS resolver domain lists in all resource groups of a subscription. */
export function list(
  context: Client,
  options: DnsResolverDomainListsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DnsResolverDomainList> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: DnsResolverDomainListsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverDomainLists{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion,
      "%24top": options?.top,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_DnsResolverDomainListListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _dnsResolverDomainListListResultDeserializer(result.body);
}

/** Lists DNS resolver domain lists within a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: DnsResolverDomainListsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<DnsResolverDomainList> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  dnsResolverDomainListName: string,
  options: DnsResolverDomainListsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverDomainLists/{dnsResolverDomainListName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dnsResolverDomainListName: dnsResolverDomainListName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a DNS resolver domain list. WARNING: This operation cannot be undone. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  dnsResolverDomainListName: string,
  options: DnsResolverDomainListsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, dnsResolverDomainListName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  dnsResolverDomainListName: string,
  parameters: DnsResolverDomainListPatch,
  options: DnsResolverDomainListsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverDomainLists/{dnsResolverDomainListName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dnsResolverDomainListName: dnsResolverDomainListName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: dnsResolverDomainListPatchSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<DnsResolverDomainList> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return dnsResolverDomainListDeserializer(result.body);
}

/** Updates a DNS resolver domain list. */
export function update(
  context: Client,
  resourceGroupName: string,
  dnsResolverDomainListName: string,
  parameters: DnsResolverDomainListPatch,
  options: DnsResolverDomainListsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DnsResolverDomainList>, DnsResolverDomainList> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, dnsResolverDomainListName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<DnsResolverDomainList>, DnsResolverDomainList>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  dnsResolverDomainListName: string,
  parameters: DnsResolverDomainList,
  options: DnsResolverDomainListsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverDomainLists/{dnsResolverDomainListName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dnsResolverDomainListName: dnsResolverDomainListName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: dnsResolverDomainListSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DnsResolverDomainList> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return dnsResolverDomainListDeserializer(result.body);
}

/** Creates or updates a DNS resolver domain list. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  dnsResolverDomainListName: string,
  parameters: DnsResolverDomainList,
  options: DnsResolverDomainListsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<DnsResolverDomainList>, DnsResolverDomainList> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        dnsResolverDomainListName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<DnsResolverDomainList>, DnsResolverDomainList>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  dnsResolverDomainListName: string,
  options: DnsResolverDomainListsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverDomainLists/{dnsResolverDomainListName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dnsResolverDomainListName: dnsResolverDomainListName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<DnsResolverDomainList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return dnsResolverDomainListDeserializer(result.body);
}

/** Gets properties of a DNS resolver domain list. */
export async function get(
  context: Client,
  resourceGroupName: string,
  dnsResolverDomainListName: string,
  options: DnsResolverDomainListsGetOptionalParams = { requestOptions: {} },
): Promise<DnsResolverDomainList> {
  const result = await _getSend(context, resourceGroupName, dnsResolverDomainListName, options);
  return _getDeserialize(result);
}
