// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementContext } from "../../api/deviceRegistryManagementContext.js";
import { listBySubscription, get } from "../../api/billingContainers/operations.js";
import {
  BillingContainersListBySubscriptionOptionalParams,
  BillingContainersGetOptionalParams,
} from "../../api/billingContainers/options.js";
import { BillingContainer } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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
      listBySubscription(context, options),
    get: (billingContainerName: string, options?: BillingContainersGetOptionalParams) =>
      get(context, billingContainerName, options),
  };
}

export function _getBillingContainersOperations(
  context: DeviceRegistryManagementContext,
): BillingContainersOperations {
  return {
    ..._getBillingContainers(context),
  };
}
