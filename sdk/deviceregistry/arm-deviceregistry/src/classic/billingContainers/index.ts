// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementContext } from "../../api/deviceRegistryManagementContext.js";
import {
  billingContainersGet,
  billingContainersListBySubscription,
} from "../../api/billingContainers/index.js";
import { BillingContainer } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import {
  BillingContainersGetOptionalParams,
  BillingContainersListBySubscriptionOptionalParams,
} from "../../api/options.js";

/** Interface representing a BillingContainers operations. */
export interface BillingContainersOperations {
  /** Get a BillingContainer */
  get: (
    billingContainerName: string,
    options?: BillingContainersGetOptionalParams,
  ) => Promise<BillingContainer>;
  /** List BillingContainer resources by subscription ID */
  listBySubscription: (
    options?: BillingContainersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<BillingContainer>;
}

export function getBillingContainers(
  context: DeviceRegistryManagementContext,
  subscriptionId: string,
) {
  return {
    get: (
      billingContainerName: string,
      options?: BillingContainersGetOptionalParams,
    ) =>
      billingContainersGet(
        context,
        subscriptionId,
        billingContainerName,
        options,
      ),
    listBySubscription: (
      options?: BillingContainersListBySubscriptionOptionalParams,
    ) => billingContainersListBySubscription(context, subscriptionId, options),
  };
}

export function getBillingContainersOperations(
  context: DeviceRegistryManagementContext,
  subscriptionId: string,
): BillingContainersOperations {
  return {
    ...getBillingContainers(context, subscriptionId),
  };
}
