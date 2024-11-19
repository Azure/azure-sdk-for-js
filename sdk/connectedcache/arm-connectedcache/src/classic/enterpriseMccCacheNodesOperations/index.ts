// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConnectedCacheContext } from "../../api/connectedCacheContext.js";
import {
  enterpriseMccCacheNodesOperationsGet,
  enterpriseMccCacheNodesOperationsCreateOrUpdate,
  enterpriseMccCacheNodesOperationsUpdate,
  enterpriseMccCacheNodesOperationsDelete,
  enterpriseMccCacheNodesOperationsListByEnterpriseMccCustomerResource,
  enterpriseMccCacheNodesOperationsGetCacheNodeInstallDetails,
} from "../../api/enterpriseMccCacheNodesOperations/index.js";
import {
  EnterpriseMccCacheNodesOperationsGetOptionalParams,
  EnterpriseMccCacheNodesOperationsCreateOrUpdateOptionalParams,
  EnterpriseMccCacheNodesOperationsUpdateOptionalParams,
  EnterpriseMccCacheNodesOperationsDeleteOptionalParams,
  EnterpriseMccCacheNodesOperationsListByEnterpriseMccCustomerResourceOptionalParams,
  EnterpriseMccCacheNodesOperationsGetCacheNodeInstallDetailsOptionalParams,
} from "../../api/options.js";
import {
  EnterpriseMccCacheNodeResource,
  ConnectedCachePatchResource,
  MccCacheNodeInstallDetails,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EnterpriseMccCacheNodesOperations operations. */
export interface EnterpriseMccCacheNodesOperationsOperations {
  /** This api gets ispCacheNode resource information */
  get: (
    resourceGroupName: string,
    customerResourceName: string,
    cacheNodeResourceName: string,
    options?: EnterpriseMccCacheNodesOperationsGetOptionalParams,
  ) => Promise<EnterpriseMccCacheNodeResource>;
  /** This api creates an ispCacheNode with the specified create parameters */
  createOrUpdate: (
    resourceGroupName: string,
    customerResourceName: string,
    cacheNodeResourceName: string,
    resource: EnterpriseMccCacheNodeResource,
    options?: EnterpriseMccCacheNodesOperationsCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<EnterpriseMccCacheNodeResource>,
    EnterpriseMccCacheNodeResource
  >;
  /** This api updates an existing ispCacheNode resource */
  update: (
    resourceGroupName: string,
    customerResourceName: string,
    cacheNodeResourceName: string,
    properties: ConnectedCachePatchResource,
    options?: EnterpriseMccCacheNodesOperationsUpdateOptionalParams,
  ) => Promise<EnterpriseMccCacheNodeResource>;
  /** This api deletes an existing ispCacheNode resource */
  delete: (
    resourceGroupName: string,
    customerResourceName: string,
    cacheNodeResourceName: string,
    options?: EnterpriseMccCacheNodesOperationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** This api retrieves information about all ispCacheNode resources under the given subscription and resource group */
  listByEnterpriseMccCustomerResource: (
    resourceGroupName: string,
    customerResourceName: string,
    options?: EnterpriseMccCacheNodesOperationsListByEnterpriseMccCustomerResourceOptionalParams,
  ) => PagedAsyncIterableIterator<EnterpriseMccCacheNodeResource>;
  /** This api gets secrets of the ispCacheNode resource install details */
  getCacheNodeInstallDetails: (
    resourceGroupName: string,
    customerResourceName: string,
    cacheNodeResourceName: string,
    options?: EnterpriseMccCacheNodesOperationsGetCacheNodeInstallDetailsOptionalParams,
  ) => Promise<MccCacheNodeInstallDetails>;
}

export function getEnterpriseMccCacheNodesOperations(
  context: ConnectedCacheContext,
  subscriptionId: string,
) {
  return {
    get: (
      resourceGroupName: string,
      customerResourceName: string,
      cacheNodeResourceName: string,
      options?: EnterpriseMccCacheNodesOperationsGetOptionalParams,
    ) =>
      enterpriseMccCacheNodesOperationsGet(
        context,
        subscriptionId,
        resourceGroupName,
        customerResourceName,
        cacheNodeResourceName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      customerResourceName: string,
      cacheNodeResourceName: string,
      resource: EnterpriseMccCacheNodeResource,
      options?: EnterpriseMccCacheNodesOperationsCreateOrUpdateOptionalParams,
    ) =>
      enterpriseMccCacheNodesOperationsCreateOrUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        customerResourceName,
        cacheNodeResourceName,
        resource,
        options,
      ),
    update: (
      resourceGroupName: string,
      customerResourceName: string,
      cacheNodeResourceName: string,
      properties: ConnectedCachePatchResource,
      options?: EnterpriseMccCacheNodesOperationsUpdateOptionalParams,
    ) =>
      enterpriseMccCacheNodesOperationsUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        customerResourceName,
        cacheNodeResourceName,
        properties,
        options,
      ),
    delete: (
      resourceGroupName: string,
      customerResourceName: string,
      cacheNodeResourceName: string,
      options?: EnterpriseMccCacheNodesOperationsDeleteOptionalParams,
    ) =>
      enterpriseMccCacheNodesOperationsDelete(
        context,
        subscriptionId,
        resourceGroupName,
        customerResourceName,
        cacheNodeResourceName,
        options,
      ),
    listByEnterpriseMccCustomerResource: (
      resourceGroupName: string,
      customerResourceName: string,
      options?: EnterpriseMccCacheNodesOperationsListByEnterpriseMccCustomerResourceOptionalParams,
    ) =>
      enterpriseMccCacheNodesOperationsListByEnterpriseMccCustomerResource(
        context,
        subscriptionId,
        resourceGroupName,
        customerResourceName,
        options,
      ),
    getCacheNodeInstallDetails: (
      resourceGroupName: string,
      customerResourceName: string,
      cacheNodeResourceName: string,
      options?: EnterpriseMccCacheNodesOperationsGetCacheNodeInstallDetailsOptionalParams,
    ) =>
      enterpriseMccCacheNodesOperationsGetCacheNodeInstallDetails(
        context,
        subscriptionId,
        resourceGroupName,
        customerResourceName,
        cacheNodeResourceName,
        options,
      ),
  };
}

export function getEnterpriseMccCacheNodesOperationsOperations(
  context: ConnectedCacheContext,
  subscriptionId: string,
): EnterpriseMccCacheNodesOperationsOperations {
  return {
    ...getEnterpriseMccCacheNodesOperations(context, subscriptionId),
  };
}
