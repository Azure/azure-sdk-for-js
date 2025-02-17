// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementContext } from "../../api/deviceRegistryManagementContext.js";
import {
  billingContainersListBySubscription,
  billingContainersGet,
} from "../../api/billingContainers/index.js";
import { BillingContainer } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import {
  BillingContainersListBySubscriptionOptionalParams,
  BillingContainersGetOptionalParams,
} from "../../api/options.js";

/** Interface representing a BillingContainers operations. */
export interface BillingContainersOperations {
  /** List BillingContainer resources by subscription ID */
  listBySubscription: (
    options?: BillingContainersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<BillingContainer>;
  /** Get a BillingContainer */
  get: (
    billingContainerName: string,
    options?: BillingContainersGetOptionalParams,
  ) => Promise<BillingContainer>;
}

function _getBillingContainers(context: DeviceRegistryManagementContext) {
  return {
    listBySubscription: (options?: BillingContainersListBySubscriptionOptionalParams) =>
      billingContainersListBySubscription(context, options),
    get: (billingContainerName: string, options?: BillingContainersGetOptionalParams) =>
      billingContainersGet(context, billingContainerName, options),
  };
}

export function _getBillingContainersOperations(
  context: DeviceRegistryManagementContext,
): BillingContainersOperations {
  return {
    ..._getBillingContainers(context),
  };
}
