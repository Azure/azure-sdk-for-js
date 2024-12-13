// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ConnectedCacheContext as Client,
  IspCacheNodesOperationsCreateOrUpdateOptionalParams,
  IspCacheNodesOperationsDeleteOptionalParams,
  IspCacheNodesOperationsGetBgpCidrsOptionalParams,
  IspCacheNodesOperationsGetCacheNodeInstallDetailsOptionalParams,
  IspCacheNodesOperationsGetOptionalParams,
  IspCacheNodesOperationsListByIspCustomerResourceOptionalParams,
  IspCacheNodesOperationsUpdateOptionalParams,
} from "../index.js";
import {
  ConnectedCachePatchResource,
  connectedCachePatchResourceSerializer,
  MccCacheNodeInstallDetails,
  mccCacheNodeInstallDetailsDeserializer,
  IspCacheNodeResource,
  ispCacheNodeResourceSerializer,
  ispCacheNodeResourceDeserializer,
  _IspCacheNodeResourceListResult,
  _ispCacheNodeResourceListResultDeserializer,
  MccCacheNodeBgpCidrDetails,
  mccCacheNodeBgpCidrDetailsDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _ispCacheNodesOperationsGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  options: IspCacheNodesOperationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/ispCustomers/{customerResourceName}/ispCacheNodes/{cacheNodeResourceName}",
      subscriptionId,
      resourceGroupName,
      customerResourceName,
      cacheNodeResourceName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _ispCacheNodesOperationsGetDeserialize(
  result: PathUncheckedResponse,
): Promise<IspCacheNodeResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return ispCacheNodeResourceDeserializer(result.body);
}

/** This api gets ispCacheNode resource information */
export async function ispCacheNodesOperationsGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  options: IspCacheNodesOperationsGetOptionalParams = { requestOptions: {} },
): Promise<IspCacheNodeResource> {
  const result = await _ispCacheNodesOperationsGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    customerResourceName,
    cacheNodeResourceName,
    options,
  );
  return _ispCacheNodesOperationsGetDeserialize(result);
}

export function _ispCacheNodesOperationsCreateOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  resource: IspCacheNodeResource,
  options: IspCacheNodesOperationsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/ispCustomers/{customerResourceName}/ispCacheNodes/{cacheNodeResourceName}",
      subscriptionId,
      resourceGroupName,
      customerResourceName,
      cacheNodeResourceName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: ispCacheNodeResourceSerializer(resource),
    });
}

export async function _ispCacheNodesOperationsCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<IspCacheNodeResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return ispCacheNodeResourceDeserializer(result.body);
}

/** This api creates an ispCacheNode with the specified create parameters */
export function ispCacheNodesOperationsCreateOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  resource: IspCacheNodeResource,
  options: IspCacheNodesOperationsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<IspCacheNodeResource>, IspCacheNodeResource> {
  return getLongRunningPoller(
    context,
    _ispCacheNodesOperationsCreateOrUpdateDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _ispCacheNodesOperationsCreateOrUpdateSend(
          context,
          subscriptionId,
          resourceGroupName,
          customerResourceName,
          cacheNodeResourceName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<IspCacheNodeResource>, IspCacheNodeResource>;
}

export function _ispCacheNodesOperationsUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  properties: ConnectedCachePatchResource,
  options: IspCacheNodesOperationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/ispCustomers/{customerResourceName}/ispCacheNodes/{cacheNodeResourceName}",
      subscriptionId,
      resourceGroupName,
      customerResourceName,
      cacheNodeResourceName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: connectedCachePatchResourceSerializer(properties),
    });
}

export async function _ispCacheNodesOperationsUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<IspCacheNodeResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return ispCacheNodeResourceDeserializer(result.body);
}

/** This api updates an existing ispCacheNode resource */
export async function ispCacheNodesOperationsUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  properties: ConnectedCachePatchResource,
  options: IspCacheNodesOperationsUpdateOptionalParams = { requestOptions: {} },
): Promise<IspCacheNodeResource> {
  const result = await _ispCacheNodesOperationsUpdateSend(
    context,
    subscriptionId,
    resourceGroupName,
    customerResourceName,
    cacheNodeResourceName,
    properties,
    options,
  );
  return _ispCacheNodesOperationsUpdateDeserialize(result);
}

export function _ispCacheNodesOperationsDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  options: IspCacheNodesOperationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/ispCustomers/{customerResourceName}/ispCacheNodes/{cacheNodeResourceName}",
      subscriptionId,
      resourceGroupName,
      customerResourceName,
      cacheNodeResourceName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _ispCacheNodesOperationsDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** This api deletes an existing ispCacheNode resource */
export function ispCacheNodesOperationsDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  options: IspCacheNodesOperationsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _ispCacheNodesOperationsDeleteDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _ispCacheNodesOperationsDeleteSend(
          context,
          subscriptionId,
          resourceGroupName,
          customerResourceName,
          cacheNodeResourceName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _ispCacheNodesOperationsListByIspCustomerResourceSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  options: IspCacheNodesOperationsListByIspCustomerResourceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/ispCustomers/{customerResourceName}/ispCacheNodes",
      subscriptionId,
      resourceGroupName,
      customerResourceName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _ispCacheNodesOperationsListByIspCustomerResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_IspCacheNodeResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _ispCacheNodeResourceListResultDeserializer(result.body);
}

/** This api retrieves information about all ispCacheNode resources under the given subscription and resource group */
export function ispCacheNodesOperationsListByIspCustomerResource(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  options: IspCacheNodesOperationsListByIspCustomerResourceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<IspCacheNodeResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _ispCacheNodesOperationsListByIspCustomerResourceSend(
        context,
        subscriptionId,
        resourceGroupName,
        customerResourceName,
        options,
      ),
    _ispCacheNodesOperationsListByIspCustomerResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _ispCacheNodesOperationsGetBgpCidrsSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  options: IspCacheNodesOperationsGetBgpCidrsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/ispCustomers/{customerResourceName}/ispCacheNodes/{cacheNodeResourceName}/getBgpCidrs",
      subscriptionId,
      resourceGroupName,
      customerResourceName,
      cacheNodeResourceName,
    )
    .post({ ...operationOptionsToRequestParameters(options) });
}

export async function _ispCacheNodesOperationsGetBgpCidrsDeserialize(
  result: PathUncheckedResponse,
): Promise<MccCacheNodeBgpCidrDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return mccCacheNodeBgpCidrDetailsDeserializer(result.body);
}

/** This api gets ispCacheNode resource information */
export async function ispCacheNodesOperationsGetBgpCidrs(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  options: IspCacheNodesOperationsGetBgpCidrsOptionalParams = {
    requestOptions: {},
  },
): Promise<MccCacheNodeBgpCidrDetails> {
  const result = await _ispCacheNodesOperationsGetBgpCidrsSend(
    context,
    subscriptionId,
    resourceGroupName,
    customerResourceName,
    cacheNodeResourceName,
    options,
  );
  return _ispCacheNodesOperationsGetBgpCidrsDeserialize(result);
}

export function _ispCacheNodesOperationsGetCacheNodeInstallDetailsSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  options: IspCacheNodesOperationsGetCacheNodeInstallDetailsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/ispCustomers/{customerResourceName}/ispCacheNodes/{cacheNodeResourceName}/getCacheNodeInstallDetails",
      subscriptionId,
      resourceGroupName,
      customerResourceName,
      cacheNodeResourceName,
    )
    .post({ ...operationOptionsToRequestParameters(options) });
}

export async function _ispCacheNodesOperationsGetCacheNodeInstallDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<MccCacheNodeInstallDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return mccCacheNodeInstallDetailsDeserializer(result.body);
}

/** This api gets secrets of the ispCacheNode resource install details */
export async function ispCacheNodesOperationsGetCacheNodeInstallDetails(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  cacheNodeResourceName: string,
  options: IspCacheNodesOperationsGetCacheNodeInstallDetailsOptionalParams = {
    requestOptions: {},
  },
): Promise<MccCacheNodeInstallDetails> {
  const result = await _ispCacheNodesOperationsGetCacheNodeInstallDetailsSend(
    context,
    subscriptionId,
    resourceGroupName,
    customerResourceName,
    cacheNodeResourceName,
    options,
  );
  return _ispCacheNodesOperationsGetCacheNodeInstallDetailsDeserialize(result);
}
