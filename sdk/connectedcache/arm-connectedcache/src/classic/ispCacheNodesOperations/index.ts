// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConnectedCacheContext } from "../../api/connectedCacheContext.js";
import {
  getCacheNodeMccIssueDetailsHistory,
  getCacheNodeAutoUpdateHistory,
  getCacheNodeInstallDetails,
  getBgpCidrs,
  listByIspCustomerResource,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/ispCacheNodesOperations/operations.js";
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
} from "../../api/ispCacheNodesOperations/options.js";
import type {
  ConnectedCachePatchResource,
  IspCacheNodeResource,
  MccCacheNodeBgpCidrDetails,
  MccCacheNodeInstallDetails,
  MccCacheNodeAutoUpdateHistory,
  MccCacheNodeIssueHistory,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a IspCacheNodesOperations operations. */
export interface IspCacheNodesOperationsOperations {
  /** This api gets ispCacheNode resource issues details histrory information */
  getCacheNodeMccIssueDetailsHistory: (
    resourceGroupName: string,
    customerResourceName: string,
    cacheNodeResourceName: string,
    options?: IspCacheNodesOperationsGetCacheNodeMccIssueDetailsHistoryOptionalParams,
  ) => Promise<MccCacheNodeIssueHistory>;
  /** This api gets ispCacheNode resource auto update histrory information */
  getCacheNodeAutoUpdateHistory: (
    resourceGroupName: string,
    customerResourceName: string,
    cacheNodeResourceName: string,
    options?: IspCacheNodesOperationsGetCacheNodeAutoUpdateHistoryOptionalParams,
  ) => Promise<MccCacheNodeAutoUpdateHistory>;
  /** This api gets secrets of the ispCacheNode resource install details */
  getCacheNodeInstallDetails: (
    resourceGroupName: string,
    customerResourceName: string,
    cacheNodeResourceName: string,
    options?: IspCacheNodesOperationsGetCacheNodeInstallDetailsOptionalParams,
  ) => Promise<MccCacheNodeInstallDetails>;
  /** This api gets ispCacheNode resource information */
  getBgpCidrs: (
    resourceGroupName: string,
    customerResourceName: string,
    cacheNodeResourceName: string,
    options?: IspCacheNodesOperationsGetBgpCidrsOptionalParams,
  ) => Promise<MccCacheNodeBgpCidrDetails>;
  /** This api retrieves information about all ispCacheNode resources under the given subscription and resource group */
  listByIspCustomerResource: (
    resourceGroupName: string,
    customerResourceName: string,
    options?: IspCacheNodesOperationsListByIspCustomerResourceOptionalParams,
  ) => PagedAsyncIterableIterator<IspCacheNodeResource>;
  /** This api deletes an existing ispCacheNode resource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    customerResourceName: string,
    cacheNodeResourceName: string,
    options?: IspCacheNodesOperationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** This api updates an existing ispCacheNode resource */
  update: (
    resourceGroupName: string,
    customerResourceName: string,
    cacheNodeResourceName: string,
    properties: ConnectedCachePatchResource,
    options?: IspCacheNodesOperationsUpdateOptionalParams,
  ) => Promise<IspCacheNodeResource>;
  /** This api creates an ispCacheNode with the specified create parameters */
  createOrUpdate: (
    resourceGroupName: string,
    customerResourceName: string,
    cacheNodeResourceName: string,
    resource: IspCacheNodeResource,
    options?: IspCacheNodesOperationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<IspCacheNodeResource>, IspCacheNodeResource>;
  /** This api gets ispCacheNode resource information */
  get: (
    resourceGroupName: string,
    customerResourceName: string,
    cacheNodeResourceName: string,
    options?: IspCacheNodesOperationsGetOptionalParams,
  ) => Promise<IspCacheNodeResource>;
}

function _getIspCacheNodesOperations(context: ConnectedCacheContext) {
  return {
    getCacheNodeMccIssueDetailsHistory: (
      resourceGroupName: string,
      customerResourceName: string,
      cacheNodeResourceName: string,
      options?: IspCacheNodesOperationsGetCacheNodeMccIssueDetailsHistoryOptionalParams,
    ) =>
      getCacheNodeMccIssueDetailsHistory(
        context,
        resourceGroupName,
        customerResourceName,
        cacheNodeResourceName,
        options,
      ),
    getCacheNodeAutoUpdateHistory: (
      resourceGroupName: string,
      customerResourceName: string,
      cacheNodeResourceName: string,
      options?: IspCacheNodesOperationsGetCacheNodeAutoUpdateHistoryOptionalParams,
    ) =>
      getCacheNodeAutoUpdateHistory(
        context,
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
      getCacheNodeInstallDetails(
        context,
        resourceGroupName,
        customerResourceName,
        cacheNodeResourceName,
        options,
      ),
    getBgpCidrs: (
      resourceGroupName: string,
      customerResourceName: string,
      cacheNodeResourceName: string,
      options?: IspCacheNodesOperationsGetBgpCidrsOptionalParams,
    ) =>
      getBgpCidrs(context, resourceGroupName, customerResourceName, cacheNodeResourceName, options),
    listByIspCustomerResource: (
      resourceGroupName: string,
      customerResourceName: string,
      options?: IspCacheNodesOperationsListByIspCustomerResourceOptionalParams,
    ) => listByIspCustomerResource(context, resourceGroupName, customerResourceName, options),
    delete: (
      resourceGroupName: string,
      customerResourceName: string,
      cacheNodeResourceName: string,
      options?: IspCacheNodesOperationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, customerResourceName, cacheNodeResourceName, options),
    update: (
      resourceGroupName: string,
      customerResourceName: string,
      cacheNodeResourceName: string,
      properties: ConnectedCachePatchResource,
      options?: IspCacheNodesOperationsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        customerResourceName,
        cacheNodeResourceName,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      customerResourceName: string,
      cacheNodeResourceName: string,
      resource: IspCacheNodeResource,
      options?: IspCacheNodesOperationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        customerResourceName,
        cacheNodeResourceName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      customerResourceName: string,
      cacheNodeResourceName: string,
      options?: IspCacheNodesOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, customerResourceName, cacheNodeResourceName, options),
  };
}

export function _getIspCacheNodesOperationsOperations(
  context: ConnectedCacheContext,
): IspCacheNodesOperationsOperations {
  return {
    ..._getIspCacheNodesOperations(context),
  };
}
