// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import { listByLocation, get } from "../../api/subscriptionUsages/operations.js";
import type {
  SubscriptionUsagesListByLocationOptionalParams,
  SubscriptionUsagesGetOptionalParams,
} from "../../api/subscriptionUsages/options.js";
import type { SubscriptionUsage } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SubscriptionUsages operations. */
export interface SubscriptionUsagesOperations {
  /** Gets all subscription usage metrics in a given location. */
  listByLocation: (
    locationName: string,
    options?: SubscriptionUsagesListByLocationOptionalParams,
  ) => PagedAsyncIterableIterator<SubscriptionUsage>;
  /** Gets a subscription usage metric. */
  get: (
    locationName: string,
    usageName: string,
    options?: SubscriptionUsagesGetOptionalParams,
  ) => Promise<SubscriptionUsage>;
}

function _getSubscriptionUsages(context: SqlContext) {
  return {
    listByLocation: (
      locationName: string,
      options?: SubscriptionUsagesListByLocationOptionalParams,
    ) => listByLocation(context, locationName, options),
    get: (locationName: string, usageName: string, options?: SubscriptionUsagesGetOptionalParams) =>
      get(context, locationName, usageName, options),
  };
}

export function _getSubscriptionUsagesOperations(
  context: SqlContext,
): SubscriptionUsagesOperations {
  return {
    ..._getSubscriptionUsages(context),
  };
}
