// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/daprSubscriptions/operations.js";
import {
  DaprSubscriptionsListOptionalParams,
  DaprSubscriptionsDeleteOptionalParams,
  DaprSubscriptionsCreateOrUpdateOptionalParams,
  DaprSubscriptionsGetOptionalParams,
} from "../../api/daprSubscriptions/options.js";
import { DaprSubscription } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DaprSubscriptions operations. */
export interface DaprSubscriptionsOperations {
  /** Get the Dapr subscriptions for a managed environment. */
  list: (
    resourceGroupName: string,
    environmentName: string,
    options?: DaprSubscriptionsListOptionalParams,
  ) => PagedAsyncIterableIterator<DaprSubscription>;
  /** Delete a Dapr subscription from a Managed Environment. */
  delete: (
    resourceGroupName: string,
    environmentName: string,
    name: string,
    options?: DaprSubscriptionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a Dapr subscription in a Managed Environment. */
  createOrUpdate: (
    resourceGroupName: string,
    environmentName: string,
    name: string,
    daprSubscriptionEnvelope: DaprSubscription,
    options?: DaprSubscriptionsCreateOrUpdateOptionalParams,
  ) => Promise<DaprSubscription>;
  /** Get a dapr subscription. */
  get: (
    resourceGroupName: string,
    environmentName: string,
    name: string,
    options?: DaprSubscriptionsGetOptionalParams,
  ) => Promise<DaprSubscription>;
}

function _getDaprSubscriptions(context: ContainerAppsAPIContext) {
  return {
    list: (
      resourceGroupName: string,
      environmentName: string,
      options?: DaprSubscriptionsListOptionalParams,
    ) => list(context, resourceGroupName, environmentName, options),
    delete: (
      resourceGroupName: string,
      environmentName: string,
      name: string,
      options?: DaprSubscriptionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, environmentName, name, options),
    createOrUpdate: (
      resourceGroupName: string,
      environmentName: string,
      name: string,
      daprSubscriptionEnvelope: DaprSubscription,
      options?: DaprSubscriptionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        environmentName,
        name,
        daprSubscriptionEnvelope,
        options,
      ),
    get: (
      resourceGroupName: string,
      environmentName: string,
      name: string,
      options?: DaprSubscriptionsGetOptionalParams,
    ) => get(context, resourceGroupName, environmentName, name, options),
  };
}

export function _getDaprSubscriptionsOperations(
  context: ContainerAppsAPIContext,
): DaprSubscriptionsOperations {
  return {
    ..._getDaprSubscriptions(context),
  };
}
