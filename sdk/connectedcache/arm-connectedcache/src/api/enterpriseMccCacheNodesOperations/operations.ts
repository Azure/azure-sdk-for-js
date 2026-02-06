// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConnectedCacheContext as Client } from "../index.js";
import type {
  ConnectedCachePatchResource,
  MccCacheNodeInstallDetails,
  MccCacheNodeAutoUpdateHistory,
  MccCacheNodeIssueHistory,
  EnterpriseMccCacheNodeResource,
  _EnterpriseMccCacheNodeResourceListResult,
  MccCacheNodeTlsCertificateHistory,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  connectedCachePatchResourceSerializer,
  mccCacheNodeInstallDetailsDeserializer,
  mccCacheNodeAutoUpdateHistoryDeserializer,
  mccCacheNodeIssueHistoryDeserializer,
  enterpriseMccCacheNodeResourceSerializer,
  enterpriseMccCacheNodeResourceDeserializer,
  _enterpriseMccCacheNodeResourceListResultDeserializer,
  mccCacheNodeTlsCertificateHistoryDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  EnterpriseMccCacheNodesOperationsGetCacheNodeTlsCertificateHistoryOptionalParams,
  EnterpriseMccCacheNodesOperationsGetCacheNodeMccIssueDetailsHistoryOptionalParams,
  EnterpriseMccCacheNodesOperationsGetCacheNodeAutoUpdateHistoryOptionalParams,
  EnterpriseMccCacheNodesOperationsGetCacheNodeInstallDetailsOptionalParams,
  EnterpriseMccCacheNodesOperationsListByEnterpriseMccCustomerResourceOptionalParams,
  EnterpriseMccCacheNodesOperationsDeleteOptionalParams,
  EnterpriseMccCacheNodesOperationsUpdateOptionalParams,
  EnterpriseMccCacheNodesOperationsCreateOrUpdateOptionalParams,
  EnterpriseMccCacheNodesOperationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getCacheNodeTlsCertificateHistorySend(
  context: Client,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  options: EnterpriseMccCacheNodesOperationsGetCacheNodeTlsCertificateHistoryOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/enterpriseMccCustomers/{customerResourceName}/enterpriseMccCacheNodes/{cacheNodeResourceName}/getCacheNodeTlsCertificateHistory{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      customerResourceName: customerResourceName,
      cacheNodeResourceName: cacheNodeResourceName,
      "api%2Dversion": context.apiVersion,
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

export async function _getCacheNodeTlsCertificateHistoryDeserialize(
  result: PathUncheckedResponse,
): Promise<MccCacheNodeTlsCertificateHistory> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return mccCacheNodeTlsCertificateHistoryDeserializer(result.body);
}

/** This api gets ispCacheNode resource tls certificate histrory information */
export async function getCacheNodeTlsCertificateHistory(
  context: Client,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  options: EnterpriseMccCacheNodesOperationsGetCacheNodeTlsCertificateHistoryOptionalParams = {
    requestOptions: {},
  },
): Promise<MccCacheNodeTlsCertificateHistory> {
  const result = await _getCacheNodeTlsCertificateHistorySend(
    context,
    resourceGroupName,
    customerResourceName,
    cacheNodeResourceName,
    options,
  );
  return _getCacheNodeTlsCertificateHistoryDeserialize(result);
}

export function _getCacheNodeMccIssueDetailsHistorySend(
  context: Client,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  options: EnterpriseMccCacheNodesOperationsGetCacheNodeMccIssueDetailsHistoryOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/enterpriseMccCustomers/{customerResourceName}/enterpriseMccCacheNodes/{cacheNodeResourceName}/getCacheNodeMccIssueDetailsHistory{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      customerResourceName: customerResourceName,
      cacheNodeResourceName: cacheNodeResourceName,
      "api%2Dversion": context.apiVersion,
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

export async function _getCacheNodeMccIssueDetailsHistoryDeserialize(
  result: PathUncheckedResponse,
): Promise<MccCacheNodeIssueHistory> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return mccCacheNodeIssueHistoryDeserializer(result.body);
}

/** This api gets ispCacheNode resource issues details histrory information */
export async function getCacheNodeMccIssueDetailsHistory(
  context: Client,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  options: EnterpriseMccCacheNodesOperationsGetCacheNodeMccIssueDetailsHistoryOptionalParams = {
    requestOptions: {},
  },
): Promise<MccCacheNodeIssueHistory> {
  const result = await _getCacheNodeMccIssueDetailsHistorySend(
    context,
    resourceGroupName,
    customerResourceName,
    cacheNodeResourceName,
    options,
  );
  return _getCacheNodeMccIssueDetailsHistoryDeserialize(result);
}

export function _getCacheNodeAutoUpdateHistorySend(
  context: Client,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  options: EnterpriseMccCacheNodesOperationsGetCacheNodeAutoUpdateHistoryOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/enterpriseMccCustomers/{customerResourceName}/enterpriseMccCacheNodes/{cacheNodeResourceName}/getCacheNodeAutoUpdateHistory{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      customerResourceName: customerResourceName,
      cacheNodeResourceName: cacheNodeResourceName,
      "api%2Dversion": context.apiVersion,
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

export async function _getCacheNodeAutoUpdateHistoryDeserialize(
  result: PathUncheckedResponse,
): Promise<MccCacheNodeAutoUpdateHistory> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return mccCacheNodeAutoUpdateHistoryDeserializer(result.body);
}

/** This api gets ispCacheNode resource auto update histrory information */
export async function getCacheNodeAutoUpdateHistory(
  context: Client,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  options: EnterpriseMccCacheNodesOperationsGetCacheNodeAutoUpdateHistoryOptionalParams = {
    requestOptions: {},
  },
): Promise<MccCacheNodeAutoUpdateHistory> {
  const result = await _getCacheNodeAutoUpdateHistorySend(
    context,
    resourceGroupName,
    customerResourceName,
    cacheNodeResourceName,
    options,
  );
  return _getCacheNodeAutoUpdateHistoryDeserialize(result);
}

export function _getCacheNodeInstallDetailsSend(
  context: Client,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  options: EnterpriseMccCacheNodesOperationsGetCacheNodeInstallDetailsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/enterpriseMccCustomers/{customerResourceName}/enterpriseMccCacheNodes/{cacheNodeResourceName}/getCacheNodeInstallDetails{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      customerResourceName: customerResourceName,
      cacheNodeResourceName: cacheNodeResourceName,
      "api%2Dversion": context.apiVersion,
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

export async function _getCacheNodeInstallDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<MccCacheNodeInstallDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return mccCacheNodeInstallDetailsDeserializer(result.body);
}

/** This api gets secrets of the ispCacheNode resource install details */
export async function getCacheNodeInstallDetails(
  context: Client,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  options: EnterpriseMccCacheNodesOperationsGetCacheNodeInstallDetailsOptionalParams = {
    requestOptions: {},
  },
): Promise<MccCacheNodeInstallDetails> {
  const result = await _getCacheNodeInstallDetailsSend(
    context,
    resourceGroupName,
    customerResourceName,
    cacheNodeResourceName,
    options,
  );
  return _getCacheNodeInstallDetailsDeserialize(result);
}

export function _listByEnterpriseMccCustomerResourceSend(
  context: Client,
  resourceGroupName: string,
  customerResourceName: string,
  options: EnterpriseMccCacheNodesOperationsListByEnterpriseMccCustomerResourceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/enterpriseMccCustomers/{customerResourceName}/enterpriseMccCacheNodes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      customerResourceName: customerResourceName,
      "api%2Dversion": context.apiVersion,
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

export async function _listByEnterpriseMccCustomerResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_EnterpriseMccCacheNodeResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _enterpriseMccCacheNodeResourceListResultDeserializer(result.body);
}

/** This api retrieves information about all ispCacheNode resources under the given subscription and resource group */
export function listByEnterpriseMccCustomerResource(
  context: Client,
  resourceGroupName: string,
  customerResourceName: string,
  options: EnterpriseMccCacheNodesOperationsListByEnterpriseMccCustomerResourceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<EnterpriseMccCacheNodeResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByEnterpriseMccCustomerResourceSend(
        context,
        resourceGroupName,
        customerResourceName,
        options,
      ),
    _listByEnterpriseMccCustomerResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  options: EnterpriseMccCacheNodesOperationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/enterpriseMccCustomers/{customerResourceName}/enterpriseMccCacheNodes/{cacheNodeResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      customerResourceName: customerResourceName,
      cacheNodeResourceName: cacheNodeResourceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
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

/** This api deletes an existing ispCacheNode resource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  options: EnterpriseMccCacheNodesOperationsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        customerResourceName,
        cacheNodeResourceName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  properties: ConnectedCachePatchResource,
  options: EnterpriseMccCacheNodesOperationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/enterpriseMccCustomers/{customerResourceName}/enterpriseMccCacheNodes/{cacheNodeResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      customerResourceName: customerResourceName,
      cacheNodeResourceName: cacheNodeResourceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: connectedCachePatchResourceSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<EnterpriseMccCacheNodeResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return enterpriseMccCacheNodeResourceDeserializer(result.body);
}

/** This api updates an existing ispCacheNode resource */
export async function update(
  context: Client,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  properties: ConnectedCachePatchResource,
  options: EnterpriseMccCacheNodesOperationsUpdateOptionalParams = { requestOptions: {} },
): Promise<EnterpriseMccCacheNodeResource> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    customerResourceName,
    cacheNodeResourceName,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  resource: EnterpriseMccCacheNodeResource,
  options: EnterpriseMccCacheNodesOperationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/enterpriseMccCustomers/{customerResourceName}/enterpriseMccCacheNodes/{cacheNodeResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      customerResourceName: customerResourceName,
      cacheNodeResourceName: cacheNodeResourceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: enterpriseMccCacheNodeResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<EnterpriseMccCacheNodeResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return enterpriseMccCacheNodeResourceDeserializer(result.body);
}

/** This api creates an ispCacheNode with the specified create parameters */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  resource: EnterpriseMccCacheNodeResource,
  options: EnterpriseMccCacheNodesOperationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EnterpriseMccCacheNodeResource>, EnterpriseMccCacheNodeResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        customerResourceName,
        cacheNodeResourceName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<EnterpriseMccCacheNodeResource>, EnterpriseMccCacheNodeResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  options: EnterpriseMccCacheNodesOperationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/enterpriseMccCustomers/{customerResourceName}/enterpriseMccCacheNodes/{cacheNodeResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      customerResourceName: customerResourceName,
      cacheNodeResourceName: cacheNodeResourceName,
      "api%2Dversion": context.apiVersion,
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
): Promise<EnterpriseMccCacheNodeResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return enterpriseMccCacheNodeResourceDeserializer(result.body);
}

/** This api gets ispCacheNode resource information */
export async function get(
  context: Client,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  options: EnterpriseMccCacheNodesOperationsGetOptionalParams = { requestOptions: {} },
): Promise<EnterpriseMccCacheNodeResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    customerResourceName,
    cacheNodeResourceName,
    options,
  );
  return _getDeserialize(result);
}
