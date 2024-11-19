// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConnectedCacheContext } from "../../api/connectedCacheContext.js";
import {
  enterpriseCustomerOperationsGet,
  enterpriseCustomerOperationsCreateOrUpdate,
  enterpriseCustomerOperationsUpdate,
  enterpriseCustomerOperationsDelete,
  enterpriseCustomerOperationsListByResourceGroup,
  enterpriseCustomerOperationsListBySubscription,
} from "../../api/enterpriseCustomerOperations/index.js";
import {
  EnterpriseCustomerOperationsGetOptionalParams,
  EnterpriseCustomerOperationsCreateOrUpdateOptionalParams,
  EnterpriseCustomerOperationsUpdateOptionalParams,
  EnterpriseCustomerOperationsDeleteOptionalParams,
  EnterpriseCustomerOperationsListByResourceGroupOptionalParams,
  EnterpriseCustomerOperationsListBySubscriptionOptionalParams,
} from "../../api/options.js";
import {
  ConnectedCachePatchResource,
  EnterprisePreviewResource,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EnterpriseCustomerOperations operations. */
export interface EnterpriseCustomerOperationsOperations {
  /** Retrieves the properties of a Enterprise customer */
  get: (
    resourceGroupName: string,
    customerResourceName: string,
    options?: EnterpriseCustomerOperationsGetOptionalParams,
  ) => Promise<EnterprisePreviewResource>;
  /** Creates a cacheNodes with the specified create parameters */
  createOrUpdate: (
    resourceGroupName: string,
    customerResourceName: string,
    resource: EnterprisePreviewResource,
    options?: EnterpriseCustomerOperationsCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<EnterprisePreviewResource>,
    EnterprisePreviewResource
  >;
  /** updates an existing enterpriseCustomers */
  update: (
    resourceGroupName: string,
    customerResourceName: string,
    properties: ConnectedCachePatchResource,
    options?: EnterpriseCustomerOperationsUpdateOptionalParams,
  ) => Promise<EnterprisePreviewResource>;
  /** Deletes an existing customer Enterprise resource */
  delete: (
    resourceGroupName: string,
    customerResourceName: string,
    options?: EnterpriseCustomerOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Retrieves the properties of all ConnectedCache enterpriseCustomers */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: EnterpriseCustomerOperationsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<EnterprisePreviewResource>;
  /** Retrieves the properties of all ConnectedCaches */
  listBySubscription: (
    options?: EnterpriseCustomerOperationsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<EnterprisePreviewResource>;
}

export function getEnterpriseCustomerOperations(
  context: ConnectedCacheContext,
  subscriptionId: string,
) {
  return {
    get: (
      resourceGroupName: string,
      customerResourceName: string,
      options?: EnterpriseCustomerOperationsGetOptionalParams,
    ) =>
      enterpriseCustomerOperationsGet(
        context,
        subscriptionId,
        resourceGroupName,
        customerResourceName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      customerResourceName: string,
      resource: EnterprisePreviewResource,
      options?: EnterpriseCustomerOperationsCreateOrUpdateOptionalParams,
    ) =>
      enterpriseCustomerOperationsCreateOrUpdate(
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
      options?: EnterpriseCustomerOperationsUpdateOptionalParams,
    ) =>
      enterpriseCustomerOperationsUpdate(
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
      options?: EnterpriseCustomerOperationsDeleteOptionalParams,
    ) =>
      enterpriseCustomerOperationsDelete(
        context,
        subscriptionId,
        resourceGroupName,
        customerResourceName,
        options,
      ),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: EnterpriseCustomerOperationsListByResourceGroupOptionalParams,
    ) =>
      enterpriseCustomerOperationsListByResourceGroup(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    listBySubscription: (
      options?: EnterpriseCustomerOperationsListBySubscriptionOptionalParams,
    ) =>
      enterpriseCustomerOperationsListBySubscription(
        context,
        subscriptionId,
        options,
      ),
  };
}

export function getEnterpriseCustomerOperationsOperations(
  context: ConnectedCacheContext,
  subscriptionId: string,
): EnterpriseCustomerOperationsOperations {
  return {
    ...getEnterpriseCustomerOperations(context, subscriptionId),
  };
}
