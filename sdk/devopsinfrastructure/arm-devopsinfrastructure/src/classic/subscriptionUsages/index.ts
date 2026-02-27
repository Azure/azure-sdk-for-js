// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevOpsInfrastructureContext } from "../../api/devOpsInfrastructureContext.js";
import type { SubscriptionUsagesUsagesOptionalParams } from "../../api/options.js";
import { subscriptionUsagesUsages } from "../../api/subscriptionUsages/index.js";
import type { Quota } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SubscriptionUsages operations. */
export interface SubscriptionUsagesOperations {
  /** List Quota resources by subscription ID */
  usages: (
    location: string,
    options?: SubscriptionUsagesUsagesOptionalParams,
  ) => PagedAsyncIterableIterator<Quota>;
}

export function getSubscriptionUsages(
  context: DevOpsInfrastructureContext,
  subscriptionId: string,
) {
  return {
    usages: (location: string, options?: SubscriptionUsagesUsagesOptionalParams) =>
      subscriptionUsagesUsages(context, subscriptionId, location, options),
  };
}

export function getSubscriptionUsagesOperations(
  context: DevOpsInfrastructureContext,
  subscriptionId: string,
): SubscriptionUsagesOperations {
  return {
    ...getSubscriptionUsages(context, subscriptionId),
  };
}
