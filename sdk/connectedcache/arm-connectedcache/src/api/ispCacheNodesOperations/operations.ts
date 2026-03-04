// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConnectedCacheContext as Client } from "../index.js";
import type {
  ConnectedCachePatchResource,
  IspCacheNodeResource,
  _IspCacheNodeResourceListResult,
  MccCacheNodeBgpCidrDetails,
  MccCacheNodeInstallDetails,
  MccCacheNodeAutoUpdateHistory,
  MccCacheNodeIssueHistory,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  connectedCachePatchResourceSerializer,
  ispCacheNodeResourceSerializer,
  ispCacheNodeResourceDeserializer,
  _ispCacheNodeResourceListResultDeserializer,
  mccCacheNodeBgpCidrDetailsDeserializer,
  mccCacheNodeInstallDetailsDeserializer,
  mccCacheNodeAutoUpdateHistoryDeserializer,
  mccCacheNodeIssueHistoryDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  IspCacheNodesOperationsGetCacheNodeMccIssueDetailsHistoryOptionalParams,
  IspCacheNodesOperationsGetCacheNodeAutoUpdateHistoryOptionalParams,
  IspCacheNodesOperationsGetCacheNodeInstallDetailsOptionalParams,
  IspCacheNodesOperationsGetBgpCidrsOptionalParams,
  IspCacheNodesOperationsListByIspCustomerResourceOptionalParams,
  IspCacheNodesOperationsDeleteOptionalParams,
  IspCacheNodesOperationsUpdateOptionalParams,
  IspCacheNodesOperationsCreateOrUpdateOptionalParams,
  IspCacheNodesOperationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getCacheNodeMccIssueDetailsHistorySend(
  context: Client,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  options: IspCacheNodesOperationsGetCacheNodeMccIssueDetailsHistoryOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/ispCustomers/{customerResourceName}/ispCacheNodes/{cacheNodeResourceName}/getCacheNodeMccIssueDetailsHistory{?api%2Dversion}",
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
  options: IspCacheNodesOperationsGetCacheNodeMccIssueDetailsHistoryOptionalParams = {
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
  options: IspCacheNodesOperationsGetCacheNodeAutoUpdateHistoryOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/ispCustomers/{customerResourceName}/ispCacheNodes/{cacheNodeResourceName}/getCacheNodeAutoUpdateHistory{?api%2Dversion}",
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
  options: IspCacheNodesOperationsGetCacheNodeAutoUpdateHistoryOptionalParams = {
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
  options: IspCacheNodesOperationsGetCacheNodeInstallDetailsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/ispCustomers/{customerResourceName}/ispCacheNodes/{cacheNodeResourceName}/getCacheNodeInstallDetails{?api%2Dversion}",
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
  options: IspCacheNodesOperationsGetCacheNodeInstallDetailsOptionalParams = { requestOptions: {} },
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

export function _getBgpCidrsSend(
  context: Client,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  options: IspCacheNodesOperationsGetBgpCidrsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/ispCustomers/{customerResourceName}/ispCacheNodes/{cacheNodeResourceName}/getBgpCidrs{?api%2Dversion}",
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

export async function _getBgpCidrsDeserialize(
  result: PathUncheckedResponse,
): Promise<MccCacheNodeBgpCidrDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return mccCacheNodeBgpCidrDetailsDeserializer(result.body);
}

/** This api gets ispCacheNode resource information */
export async function getBgpCidrs(
  context: Client,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  options: IspCacheNodesOperationsGetBgpCidrsOptionalParams = { requestOptions: {} },
): Promise<MccCacheNodeBgpCidrDetails> {
  const result = await _getBgpCidrsSend(
    context,
    resourceGroupName,
    customerResourceName,
    cacheNodeResourceName,
    options,
  );
  return _getBgpCidrsDeserialize(result);
}

export function _listByIspCustomerResourceSend(
  context: Client,
  resourceGroupName: string,
  customerResourceName: string,
  options: IspCacheNodesOperationsListByIspCustomerResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/ispCustomers/{customerResourceName}/ispCacheNodes{?api%2Dversion}",
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

export async function _listByIspCustomerResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_IspCacheNodeResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _ispCacheNodeResourceListResultDeserializer(result.body);
}

/** This api retrieves information about all ispCacheNode resources under the given subscription and resource group */
export function listByIspCustomerResource(
  context: Client,
  resourceGroupName: string,
  customerResourceName: string,
  options: IspCacheNodesOperationsListByIspCustomerResourceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<IspCacheNodeResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByIspCustomerResourceSend(context, resourceGroupName, customerResourceName, options),
    _listByIspCustomerResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  options: IspCacheNodesOperationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/ispCustomers/{customerResourceName}/ispCacheNodes/{cacheNodeResourceName}{?api%2Dversion}",
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
  options: IspCacheNodesOperationsDeleteOptionalParams = { requestOptions: {} },
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
  options: IspCacheNodesOperationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/ispCustomers/{customerResourceName}/ispCacheNodes/{cacheNodeResourceName}{?api%2Dversion}",
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
): Promise<IspCacheNodeResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return ispCacheNodeResourceDeserializer(result.body);
}

/** This api updates an existing ispCacheNode resource */
export async function update(
  context: Client,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  properties: ConnectedCachePatchResource,
  options: IspCacheNodesOperationsUpdateOptionalParams = { requestOptions: {} },
): Promise<IspCacheNodeResource> {
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
  resource: IspCacheNodeResource,
  options: IspCacheNodesOperationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/ispCustomers/{customerResourceName}/ispCacheNodes/{cacheNodeResourceName}{?api%2Dversion}",
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
    body: ispCacheNodeResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<IspCacheNodeResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return ispCacheNodeResourceDeserializer(result.body);
}

/** This api creates an ispCacheNode with the specified create parameters */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  resource: IspCacheNodeResource,
  options: IspCacheNodesOperationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<IspCacheNodeResource>, IspCacheNodeResource> {
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
  }) as PollerLike<OperationState<IspCacheNodeResource>, IspCacheNodeResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  options: IspCacheNodesOperationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/ispCustomers/{customerResourceName}/ispCacheNodes/{cacheNodeResourceName}{?api%2Dversion}",
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
): Promise<IspCacheNodeResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return ispCacheNodeResourceDeserializer(result.body);
}

/** This api gets ispCacheNode resource information */
export async function get(
  context: Client,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  options: IspCacheNodesOperationsGetOptionalParams = { requestOptions: {} },
): Promise<IspCacheNodeResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    customerResourceName,
    cacheNodeResourceName,
    options,
  );
  return _getDeserialize(result);
}
