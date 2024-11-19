// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConnectedCacheContext } from "../../api/connectedCacheContext.js";
import {
  ispCustomersGet,
  ispCustomersCreateOrUpdate,
  ispCustomersUpdate,
  ispCustomersDelete,
  ispCustomersListByResourceGroup,
  ispCustomersListBySubscription,
} from "../../api/ispCustomers/index.js";
import {
  IspCustomersGetOptionalParams,
  IspCustomersCreateOrUpdateOptionalParams,
  IspCustomersUpdateOptionalParams,
  IspCustomersDeleteOptionalParams,
  IspCustomersListByResourceGroupOptionalParams,
  IspCustomersListBySubscriptionOptionalParams,
} from "../../api/options.js";
import {
  ConnectedCachePatchResource,
  IspCustomerResource,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a IspCustomers operations. */
export interface IspCustomersOperations {
  /** Gets the ispCustomer resource information using this get call */
  get: (
    resourceGroupName: string,
    customerResourceName: string,
    options?: IspCustomersGetOptionalParams,
  ) => Promise<IspCustomerResource>;
  /** This api creates an ispCustomer with the specified create parameters */
  createOrUpdate: (
    resourceGroupName: string,
    customerResourceName: string,
    resource: IspCustomerResource,
    options?: IspCustomersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<IspCustomerResource>, IspCustomerResource>;
  /** This api updates an existing ispCustomer resource */
  update: (
    resourceGroupName: string,
    customerResourceName: string,
    properties: ConnectedCachePatchResource,
    options?: IspCustomersUpdateOptionalParams,
  ) => Promise<IspCustomerResource>;
  /** This api deletes an existing ispCustomer resource */
  delete: (
    resourceGroupName: string,
    customerResourceName: string,
    options?: IspCustomersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** This api gets the information about all ispCustomer resources under the given subscription and resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: IspCustomersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<IspCustomerResource>;
  /** This api gets information about all ispCustomer resources under the given subscription */
  listBySubscription: (
    options?: IspCustomersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<IspCustomerResource>;
}

export function getIspCustomers(
  context: ConnectedCacheContext,
  subscriptionId: string,
) {
  return {
    get: (
      resourceGroupName: string,
      customerResourceName: string,
      options?: IspCustomersGetOptionalParams,
    ) =>
      ispCustomersGet(
        context,
        subscriptionId,
        resourceGroupName,
        customerResourceName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      customerResourceName: string,
      resource: IspCustomerResource,
      options?: IspCustomersCreateOrUpdateOptionalParams,
    ) =>
      ispCustomersCreateOrUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        customerResourceName,
        resource,
        options,
      ),
    update: (
      resourceGroupName: string,
      customerResourceName: string,
      properties: ConnectedCachePatchResource,
      options?: IspCustomersUpdateOptionalParams,
    ) =>
      ispCustomersUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        customerResourceName,
        properties,
        options,
      ),
    delete: (
      resourceGroupName: string,
      customerResourceName: string,
      options?: IspCustomersDeleteOptionalParams,
    ) =>
      ispCustomersDelete(
        context,
        subscriptionId,
        resourceGroupName,
        customerResourceName,
        options,
      ),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: IspCustomersListByResourceGroupOptionalParams,
    ) =>
      ispCustomersListByResourceGroup(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    listBySubscription: (
      options?: IspCustomersListBySubscriptionOptionalParams,
    ) => ispCustomersListBySubscription(context, subscriptionId, options),
  };
}

export function getIspCustomersOperations(
  context: ConnectedCacheContext,
  subscriptionId: string,
): IspCustomersOperations {
  return {
    ...getIspCustomers(context, subscriptionId),
  };
}
