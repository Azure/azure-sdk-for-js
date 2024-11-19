// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConnectedCacheContext } from "../../api/connectedCacheContext.js";
import {
  cacheNodesOperationsGet,
  cacheNodesOperationsCreateorUpdate,
  cacheNodesOperationsDelete,
  cacheNodesOperationsUpdate,
  cacheNodesOperationsListByResourceGroup,
  cacheNodesOperationsListBySubscription,
} from "../../api/cacheNodesOperations/index.js";
import {
  ConnectedCachePatchResource,
  CacheNodePreviewResource,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  CacheNodesOperationsGetOptionalParams,
  CacheNodesOperationsCreateorUpdateOptionalParams,
  CacheNodesOperationsDeleteOptionalParams,
  CacheNodesOperationsUpdateOptionalParams,
  CacheNodesOperationsListByResourceGroupOptionalParams,
  CacheNodesOperationsListBySubscriptionOptionalParams,
} from "../../api/options.js";

/** Interface representing a CacheNodesOperations operations. */
export interface CacheNodesOperationsOperations {
  /** Retrieves the properties of a cacheNodes */
  get: (
    resourceGroupName: string,
    customerResourceName: string,
    options?: CacheNodesOperationsGetOptionalParams,
  ) => Promise<CacheNodePreviewResource>;
  /** Creates a cacheNodes with the specified create parameters */
  createorUpdate: (
    resourceGroupName: string,
    customerResourceName: string,
    resource: CacheNodePreviewResource,
    options?: CacheNodesOperationsCreateorUpdateOptionalParams,
  ) => PollerLike<
    OperationState<CacheNodePreviewResource>,
    CacheNodePreviewResource
  >;
  /** Deletes an existing cache Node */
  delete: (
    resourceGroupName: string,
    customerResourceName: string,
    options?: CacheNodesOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** updates an existing Cache Node */
  update: (
    resourceGroupName: string,
    customerResourceName: string,
    properties: ConnectedCachePatchResource,
    options?: CacheNodesOperationsUpdateOptionalParams,
  ) => Promise<CacheNodePreviewResource>;
  /** Retrieves the properties of all ConnectedCache */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: CacheNodesOperationsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<CacheNodePreviewResource>;
  /** Retrieves the properties of all ConnectedCaches */
  listBySubscription: (
    options?: CacheNodesOperationsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<CacheNodePreviewResource>;
}

export function getCacheNodesOperations(
  context: ConnectedCacheContext,
  subscriptionId: string,
) {
  return {
    get: (
      resourceGroupName: string,
      customerResourceName: string,
      options?: CacheNodesOperationsGetOptionalParams,
    ) =>
      cacheNodesOperationsGet(
        context,
        subscriptionId,
        resourceGroupName,
        customerResourceName,
        options,
      ),
    createorUpdate: (
      resourceGroupName: string,
      customerResourceName: string,
      resource: CacheNodePreviewResource,
      options?: CacheNodesOperationsCreateorUpdateOptionalParams,
    ) =>
      cacheNodesOperationsCreateorUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        customerResourceName,
        resource,
        options,
      ),
    delete: (
      resourceGroupName: string,
      customerResourceName: string,
      options?: CacheNodesOperationsDeleteOptionalParams,
    ) =>
      cacheNodesOperationsDelete(
        context,
        subscriptionId,
        resourceGroupName,
        customerResourceName,
        options,
      ),
    update: (
      resourceGroupName: string,
      customerResourceName: string,
      properties: ConnectedCachePatchResource,
      options?: CacheNodesOperationsUpdateOptionalParams,
    ) =>
      cacheNodesOperationsUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        customerResourceName,
        properties,
        options,
      ),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: CacheNodesOperationsListByResourceGroupOptionalParams,
    ) =>
      cacheNodesOperationsListByResourceGroup(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    listBySubscription: (
      options?: CacheNodesOperationsListBySubscriptionOptionalParams,
    ) =>
      cacheNodesOperationsListBySubscription(context, subscriptionId, options),
  };
}

export function getCacheNodesOperationsOperations(
  context: ConnectedCacheContext,
  subscriptionId: string,
): CacheNodesOperationsOperations {
  return {
    ...getCacheNodesOperations(context, subscriptionId),
  };
}
