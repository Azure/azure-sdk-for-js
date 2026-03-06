// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConnectedCacheContext } from "../../api/connectedCacheContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/enterpriseMccCustomers/operations.js";
import type {
  EnterpriseMccCustomersListBySubscriptionOptionalParams,
  EnterpriseMccCustomersListByResourceGroupOptionalParams,
  EnterpriseMccCustomersDeleteOptionalParams,
  EnterpriseMccCustomersUpdateOptionalParams,
  EnterpriseMccCustomersCreateOrUpdateOptionalParams,
  EnterpriseMccCustomersGetOptionalParams,
} from "../../api/enterpriseMccCustomers/options.js";
import type {
  ConnectedCachePatchResource,
  EnterpriseMccCustomerResource,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EnterpriseMccCustomers operations. */
export interface EnterpriseMccCustomersOperations {
  /** This api gets information about all enterpriseMccCustomer resources under the given subscription */
  listBySubscription: (
    options?: EnterpriseMccCustomersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<EnterpriseMccCustomerResource>;
  /** This api gets the information about all enterprise mcc customer resources under the given subscription and resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: EnterpriseMccCustomersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<EnterpriseMccCustomerResource>;
  /** This api deletes an existing enterprise mcc customer resource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    customerResourceName: string,
    options?: EnterpriseMccCustomersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** This api updates an existing enterprise mcc customer resource */
  update: (
    resourceGroupName: string,
    customerResourceName: string,
    properties: ConnectedCachePatchResource,
    options?: EnterpriseMccCustomersUpdateOptionalParams,
  ) => Promise<EnterpriseMccCustomerResource>;
  /** This api creates an enterprise mcc customer with the specified create parameters */
  createOrUpdate: (
    resourceGroupName: string,
    customerResourceName: string,
    resource: EnterpriseMccCustomerResource,
    options?: EnterpriseMccCustomersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EnterpriseMccCustomerResource>, EnterpriseMccCustomerResource>;
  /** Gets the enterprise mcc customer resource information using this get call */
  get: (
    resourceGroupName: string,
    customerResourceName: string,
    options?: EnterpriseMccCustomersGetOptionalParams,
  ) => Promise<EnterpriseMccCustomerResource>;
}

function _getEnterpriseMccCustomers(context: ConnectedCacheContext) {
  return {
    listBySubscription: (options?: EnterpriseMccCustomersListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: EnterpriseMccCustomersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      customerResourceName: string,
      options?: EnterpriseMccCustomersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, customerResourceName, options),
    update: (
      resourceGroupName: string,
      customerResourceName: string,
      properties: ConnectedCachePatchResource,
      options?: EnterpriseMccCustomersUpdateOptionalParams,
    ) => update(context, resourceGroupName, customerResourceName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      customerResourceName: string,
      resource: EnterpriseMccCustomerResource,
      options?: EnterpriseMccCustomersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, customerResourceName, resource, options),
    get: (
      resourceGroupName: string,
      customerResourceName: string,
      options?: EnterpriseMccCustomersGetOptionalParams,
    ) => get(context, resourceGroupName, customerResourceName, options),
  };
}

export function _getEnterpriseMccCustomersOperations(
  context: ConnectedCacheContext,
): EnterpriseMccCustomersOperations {
  return {
    ..._getEnterpriseMccCustomers(context),
  };
}
