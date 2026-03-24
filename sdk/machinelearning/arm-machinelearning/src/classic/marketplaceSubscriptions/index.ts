// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/marketplaceSubscriptions/operations.js";
import type {
  MarketplaceSubscriptionsListOptionalParams,
  MarketplaceSubscriptionsDeleteOptionalParams,
  MarketplaceSubscriptionsCreateOrUpdateOptionalParams,
  MarketplaceSubscriptionsGetOptionalParams,
} from "../../api/marketplaceSubscriptions/options.js";
import type { MarketplaceSubscription } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a MarketplaceSubscriptions operations. */
export interface MarketplaceSubscriptionsOperations {
  /** List containers. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: MarketplaceSubscriptionsListOptionalParams,
  ) => PagedAsyncIterableIterator<MarketplaceSubscription>;
  /** Delete Marketplace Subscription (asynchronous). */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: MarketplaceSubscriptionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update Marketplace Subscription (asynchronous). */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: MarketplaceSubscription,
    options?: MarketplaceSubscriptionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<MarketplaceSubscription>, MarketplaceSubscription>;
  /** Get container. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: MarketplaceSubscriptionsGetOptionalParams,
  ) => Promise<MarketplaceSubscription>;
}

function _getMarketplaceSubscriptions(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: MarketplaceSubscriptionsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: MarketplaceSubscriptionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, name, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: MarketplaceSubscription,
      options?: MarketplaceSubscriptionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, name, body, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: MarketplaceSubscriptionsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, name, options),
  };
}

export function _getMarketplaceSubscriptionsOperations(
  context: AzureMachineLearningServicesManagementContext,
): MarketplaceSubscriptionsOperations {
  return {
    ..._getMarketplaceSubscriptions(context),
  };
}
