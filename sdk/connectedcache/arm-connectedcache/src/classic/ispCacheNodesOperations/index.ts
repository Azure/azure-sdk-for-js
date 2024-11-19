// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConnectedCacheContext } from "../../api/connectedCacheContext.js";
import {
  ispCacheNodesOperationsGet,
  ispCacheNodesOperationsCreateOrUpdate,
  ispCacheNodesOperationsUpdate,
  ispCacheNodesOperationsDelete,
  ispCacheNodesOperationsListByIspCustomerResource,
  ispCacheNodesOperationsGetBgpCidrs,
  ispCacheNodesOperationsGetCacheNodeInstallDetails,
} from "../../api/ispCacheNodesOperations/index.js";
import {
  IspCacheNodesOperationsGetOptionalParams,
  IspCacheNodesOperationsCreateOrUpdateOptionalParams,
  IspCacheNodesOperationsUpdateOptionalParams,
  IspCacheNodesOperationsDeleteOptionalParams,
  IspCacheNodesOperationsListByIspCustomerResourceOptionalParams,
  IspCacheNodesOperationsGetBgpCidrsOptionalParams,
  IspCacheNodesOperationsGetCacheNodeInstallDetailsOptionalParams,
} from "../../api/options.js";
import {
  ConnectedCachePatchResource,
  MccCacheNodeInstallDetails,
  IspCacheNodeResource,
  MccCacheNodeBgpCidrDetails,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a IspCacheNodesOperations operations. */
export interface IspCacheNodesOperationsOperations {
  /** This api gets ispCacheNode resource information */
  get: (
    resourceGroupName: string,
    customerResourceName: string,
    cacheNodeResourceName: string,
    options?: IspCacheNodesOperationsGetOptionalParams,
  ) => Promise<IspCacheNodeResource>;
  /** This api creates an ispCacheNode with the specified create parameters */
  createOrUpdate: (
    resourceGroupName: string,
    customerResourceName: string,
    cacheNodeResourceName: string,
    resource: IspCacheNodeResource,
    options?: IspCacheNodesOperationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<IspCacheNodeResource>, IspCacheNodeResource>;
  /** This api updates an existing ispCacheNode resource */
  update: (
    resourceGroupName: string,
    customerResourceName: string,
    cacheNodeResourceName: string,
    properties: ConnectedCachePatchResource,
    options?: IspCacheNodesOperationsUpdateOptionalParams,
  ) => Promise<IspCacheNodeResource>;
  /** This api deletes an existing ispCacheNode resource */
  delete: (
    resourceGroupName: string,
    customerResourceName: string,
    cacheNodeResourceName: string,
    options?: IspCacheNodesOperationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** This api retrieves information about all ispCacheNode resources under the given subscription and resource group */
  listByIspCustomerResource: (
    resourceGroupName: string,
    customerResourceName: string,
    options?: IspCacheNodesOperationsListByIspCustomerResourceOptionalParams,
  ) => PagedAsyncIterableIterator<IspCacheNodeResource>;
  /** This api gets ispCacheNode resource information */
  getBgpCidrs: (
    resourceGroupName: string,
    customerResourceName: string,
    cacheNodeResourceName: string,
    options?: IspCacheNodesOperationsGetBgpCidrsOptionalParams,
  ) => Promise<MccCacheNodeBgpCidrDetails>;
  /** This api gets secrets of the ispCacheNode resource install details */
  getCacheNodeInstallDetails: (
    resourceGroupName: string,
    customerResourceName: string,
    cacheNodeResourceName: string,
    options?: IspCacheNodesOperationsGetCacheNodeInstallDetailsOptionalParams,
  ) => Promise<MccCacheNodeInstallDetails>;
}

export function getIspCacheNodesOperations(
  context: ConnectedCacheContext,
  subscriptionId: string,
) {
  return {
    get: (
      resourceGroupName: string,
      customerResourceName: string,
      cacheNodeResourceName: string,
      options?: IspCacheNodesOperationsGetOptionalParams,
    ) =>
      ispCacheNodesOperationsGet(
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
      resource: IspCacheNodeResource,
      options?: IspCacheNodesOperationsCreateOrUpdateOptionalParams,
    ) =>
      ispCacheNodesOperationsCreateOrUpdate(
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
      options?: IspCacheNodesOperationsUpdateOptionalParams,
    ) =>
      ispCacheNodesOperationsUpdate(
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
      options?: IspCacheNodesOperationsDeleteOptionalParams,
    ) =>
      ispCacheNodesOperationsDelete(
        context,
        subscriptionId,
        resourceGroupName,
        customerResourceName,
        cacheNodeResourceName,
        options,
      ),
    listByIspCustomerResource: (
      resourceGroupName: string,
      customerResourceName: string,
      options?: IspCacheNodesOperationsListByIspCustomerResourceOptionalParams,
    ) =>
      ispCacheNodesOperationsListByIspCustomerResource(
        context,
        subscriptionId,
        resourceGroupName,
        customerResourceName,
        options,
      ),
    getBgpCidrs: (
      resourceGroupName: string,
      customerResourceName: string,
      cacheNodeResourceName: string,
      options?: IspCacheNodesOperationsGetBgpCidrsOptionalParams,
    ) =>
      ispCacheNodesOperationsGetBgpCidrs(
        context,
        subscriptionId,
        resourceGroupName,
        customerResourceName,
        cacheNodeResourceName,
        options,
      ),
    getCacheNodeInstallDetails: (
      resourceGroupName: string,
      customerResourceName: string,
      cacheNodeResourceName: string,
      options?: IspCacheNodesOperationsGetCacheNodeInstallDetailsOptionalParams,
    ) =>
      ispCacheNodesOperationsGetCacheNodeInstallDetails(
        context,
        subscriptionId,
        resourceGroupName,
        customerResourceName,
        cacheNodeResourceName,
        options,
      ),
  };
}

export function getIspCacheNodesOperationsOperations(
  context: ConnectedCacheContext,
  subscriptionId: string,
): IspCacheNodesOperationsOperations {
  return {
    ...getIspCacheNodesOperations(context, subscriptionId),
  };
}
