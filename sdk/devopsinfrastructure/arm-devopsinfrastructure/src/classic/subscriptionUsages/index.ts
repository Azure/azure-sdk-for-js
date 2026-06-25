// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevOpsInfrastructureContext } from "../../api/devOpsInfrastructureContext.js";
import { usages } from "../../api/subscriptionUsages/operations.js";
import { SubscriptionUsagesUsagesOptionalParams } from "../../api/subscriptionUsages/options.js";
import { Quota } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SubscriptionUsages operations. */
export interface SubscriptionUsagesOperations {
  /** List Quota resources by subscription ID */
  usages: (
    location: string,
    options?: SubscriptionUsagesUsagesOptionalParams,
  ) => PagedAsyncIterableIterator<Quota>;
}

function _getSubscriptionUsages(context: DevOpsInfrastructureContext) {
  return {
    usages: (location: string, options?: SubscriptionUsagesUsagesOptionalParams) =>
      usages(context, location, options),
  };
}

export function _getSubscriptionUsagesOperations(
  context: DevOpsInfrastructureContext,
): SubscriptionUsagesOperations {
  return {
    ..._getSubscriptionUsages(context),
  };
}
