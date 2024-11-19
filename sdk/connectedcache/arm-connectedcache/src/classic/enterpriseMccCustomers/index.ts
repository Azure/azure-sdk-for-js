// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConnectedCacheContext } from "../../api/connectedCacheContext.js";
import {
  enterpriseMccCustomersGet,
  enterpriseMccCustomersCreateOrUpdate,
  enterpriseMccCustomersUpdate,
  enterpriseMccCustomersDelete,
  enterpriseMccCustomersListByResourceGroup,
  enterpriseMccCustomersListBySubscription,
} from "../../api/enterpriseMccCustomers/index.js";
import {
  EnterpriseMccCustomersGetOptionalParams,
  EnterpriseMccCustomersCreateOrUpdateOptionalParams,
  EnterpriseMccCustomersUpdateOptionalParams,
  EnterpriseMccCustomersDeleteOptionalParams,
  EnterpriseMccCustomersListByResourceGroupOptionalParams,
  EnterpriseMccCustomersListBySubscriptionOptionalParams,
} from "../../api/options.js";
import {
  ConnectedCachePatchResource,
  EnterpriseMccCustomerResource,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EnterpriseMccCustomers operations. */
export interface EnterpriseMccCustomersOperations {
  /** Gets the enterprise mcc customer resource information using this get call */
  get: (
    resourceGroupName: string,
    customerResourceName: string,
    options?: EnterpriseMccCustomersGetOptionalParams,
  ) => Promise<EnterpriseMccCustomerResource>;
  /** This api creates an enterprise mcc customer with the specified create parameters */
  createOrUpdate: (
    resourceGroupName: string,
    customerResourceName: string,
    resource: EnterpriseMccCustomerResource,
    options?: EnterpriseMccCustomersCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<EnterpriseMccCustomerResource>,
    EnterpriseMccCustomerResource
  >;
  /** This api updates an existing enterprise mcc customer resource */
  update: (
    resourceGroupName: string,
    customerResourceName: string,
    properties: ConnectedCachePatchResource,
    options?: EnterpriseMccCustomersUpdateOptionalParams,
  ) => Promise<EnterpriseMccCustomerResource>;
  /** This api deletes an existing enterprise mcc customer resource */
  delete: (
    resourceGroupName: string,
    customerResourceName: string,
    options?: EnterpriseMccCustomersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** This api gets the information about all enterprise mcc customer resources under the given subscription and resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: EnterpriseMccCustomersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<EnterpriseMccCustomerResource>;
  /** This api gets information about all enterpriseMccCustomer resources under the given subscription */
  listBySubscription: (
    options?: EnterpriseMccCustomersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<EnterpriseMccCustomerResource>;
}

export function getEnterpriseMccCustomers(
  context: ConnectedCacheContext,
  subscriptionId: string,
) {
  return {
    get: (
      resourceGroupName: string,
      customerResourceName: string,
      options?: EnterpriseMccCustomersGetOptionalParams,
    ) =>
      enterpriseMccCustomersGet(
        context,
        subscriptionId,
        resourceGroupName,
        customerResourceName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      customerResourceName: string,
      resource: EnterpriseMccCustomerResource,
      options?: EnterpriseMccCustomersCreateOrUpdateOptionalParams,
    ) =>
      enterpriseMccCustomersCreateOrUpdate(
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
      options?: EnterpriseMccCustomersUpdateOptionalParams,
    ) =>
      enterpriseMccCustomersUpdate(
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
      options?: EnterpriseMccCustomersDeleteOptionalParams,
    ) =>
      enterpriseMccCustomersDelete(
        context,
        subscriptionId,
        resourceGroupName,
        customerResourceName,
        options,
      ),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: EnterpriseMccCustomersListByResourceGroupOptionalParams,
    ) =>
      enterpriseMccCustomersListByResourceGroup(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    listBySubscription: (
      options?: EnterpriseMccCustomersListBySubscriptionOptionalParams,
    ) =>
      enterpriseMccCustomersListBySubscription(
        context,
        subscriptionId,
        options,
      ),
  };
}

export function getEnterpriseMccCustomersOperations(
  context: ConnectedCacheContext,
  subscriptionId: string,
): EnterpriseMccCustomersOperations {
  return {
    ...getEnterpriseMccCustomers(context, subscriptionId),
  };
}
