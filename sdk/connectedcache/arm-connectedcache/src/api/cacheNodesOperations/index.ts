// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  CacheNodesOperationsCreateorUpdateOptionalParams,
  CacheNodesOperationsDeleteOptionalParams,
  CacheNodesOperationsGetOptionalParams,
  CacheNodesOperationsListByResourceGroupOptionalParams,
  CacheNodesOperationsListBySubscriptionOptionalParams,
  CacheNodesOperationsUpdateOptionalParams,
  ConnectedCacheContext as Client,
} from "../index.js";
import {
  ConnectedCachePatchResource,
  connectedCachePatchResourceSerializer,
  CacheNodePreviewResource,
  cacheNodePreviewResourceSerializer,
  cacheNodePreviewResourceDeserializer,
  _CacheNodePreviewResourceListResult,
  _cacheNodePreviewResourceListResultDeserializer,
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

export function _cacheNodesOperationsGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  options: CacheNodesOperationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/cacheNodes/{customerResourceName}",
      subscriptionId,
      resourceGroupName,
      customerResourceName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _cacheNodesOperationsGetDeserialize(
  result: PathUncheckedResponse,
): Promise<CacheNodePreviewResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return cacheNodePreviewResourceDeserializer(result.body);
}

/** Retrieves the properties of a cacheNodes */
export async function cacheNodesOperationsGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  options: CacheNodesOperationsGetOptionalParams = { requestOptions: {} },
): Promise<CacheNodePreviewResource> {
  const result = await _cacheNodesOperationsGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    customerResourceName,
    options,
  );
  return _cacheNodesOperationsGetDeserialize(result);
}

export function _cacheNodesOperationsCreateorUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  resource: CacheNodePreviewResource,
  options: CacheNodesOperationsCreateorUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/cacheNodes/{customerResourceName}",
      subscriptionId,
      resourceGroupName,
      customerResourceName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: cacheNodePreviewResourceSerializer(resource),
    });
}

export async function _cacheNodesOperationsCreateorUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<CacheNodePreviewResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return cacheNodePreviewResourceDeserializer(result.body);
}

/** Creates a cacheNodes with the specified create parameters */
export function cacheNodesOperationsCreateorUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  resource: CacheNodePreviewResource,
  options: CacheNodesOperationsCreateorUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<CacheNodePreviewResource>,
  CacheNodePreviewResource
> {
  return getLongRunningPoller(
    context,
    _cacheNodesOperationsCreateorUpdateDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _cacheNodesOperationsCreateorUpdateSend(
          context,
          subscriptionId,
          resourceGroupName,
          customerResourceName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<
    OperationState<CacheNodePreviewResource>,
    CacheNodePreviewResource
  >;
}

export function _cacheNodesOperationsDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  options: CacheNodesOperationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/cacheNodes/{customerResourceName}",
      subscriptionId,
      resourceGroupName,
      customerResourceName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _cacheNodesOperationsDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Deletes an existing cache Node */
export async function cacheNodesOperationsDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  options: CacheNodesOperationsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _cacheNodesOperationsDeleteSend(
    context,
    subscriptionId,
    resourceGroupName,
    customerResourceName,
    options,
  );
  return _cacheNodesOperationsDeleteDeserialize(result);
}

export function _cacheNodesOperationsUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  properties: ConnectedCachePatchResource,
  options: CacheNodesOperationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/cacheNodes/{customerResourceName}",
      subscriptionId,
      resourceGroupName,
      customerResourceName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: connectedCachePatchResourceSerializer(properties),
    });
}

export async function _cacheNodesOperationsUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<CacheNodePreviewResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return cacheNodePreviewResourceDeserializer(result.body);
}

/** updates an existing Cache Node */
export async function cacheNodesOperationsUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  customerResourceName: string,
  properties: ConnectedCachePatchResource,
  options: CacheNodesOperationsUpdateOptionalParams = { requestOptions: {} },
): Promise<CacheNodePreviewResource> {
  const result = await _cacheNodesOperationsUpdateSend(
    context,
    subscriptionId,
    resourceGroupName,
    customerResourceName,
    properties,
    options,
  );
  return _cacheNodesOperationsUpdateDeserialize(result);
}

export function _cacheNodesOperationsListByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: CacheNodesOperationsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ConnectedCache/cacheNodes",
      subscriptionId,
      resourceGroupName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _cacheNodesOperationsListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_CacheNodePreviewResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _cacheNodePreviewResourceListResultDeserializer(result.body);
}

/** Retrieves the properties of all ConnectedCache */
export function cacheNodesOperationsListByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: CacheNodesOperationsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<CacheNodePreviewResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _cacheNodesOperationsListByResourceGroupSend(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    _cacheNodesOperationsListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _cacheNodesOperationsListBySubscriptionSend(
  context: Client,
  subscriptionId: string,
  options: CacheNodesOperationsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.ConnectedCache/cacheNodes",
      subscriptionId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _cacheNodesOperationsListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_CacheNodePreviewResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _cacheNodePreviewResourceListResultDeserializer(result.body);
}

/** Retrieves the properties of all ConnectedCaches */
export function cacheNodesOperationsListBySubscription(
  context: Client,
  subscriptionId: string,
  options: CacheNodesOperationsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<CacheNodePreviewResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _cacheNodesOperationsListBySubscriptionSend(
        context,
        subscriptionId,
        options,
      ),
    _cacheNodesOperationsListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
