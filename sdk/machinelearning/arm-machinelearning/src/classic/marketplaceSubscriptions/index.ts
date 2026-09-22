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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: MarketplaceSubscriptionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: MarketplaceSubscriptionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: MarketplaceSubscriptionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update Marketplace Subscription (asynchronous). */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: MarketplaceSubscription,
    options?: MarketplaceSubscriptionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<MarketplaceSubscription>, MarketplaceSubscription>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: MarketplaceSubscription,
    options?: MarketplaceSubscriptionsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<MarketplaceSubscription>, MarketplaceSubscription>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: MarketplaceSubscription,
    options?: MarketplaceSubscriptionsCreateOrUpdateOptionalParams,
  ) => Promise<MarketplaceSubscription>;
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
    beginDelete: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: MarketplaceSubscriptionsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, workspaceName, name, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: MarketplaceSubscriptionsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, workspaceName, name, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: MarketplaceSubscription,
      options?: MarketplaceSubscriptionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, name, body, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: MarketplaceSubscription,
      options?: MarketplaceSubscriptionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, workspaceName, name, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: MarketplaceSubscription,
      options?: MarketplaceSubscriptionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, workspaceName, name, body, options);
    },
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
