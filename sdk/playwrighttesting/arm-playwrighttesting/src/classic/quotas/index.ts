// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzurePlaywrightServiceContext } from "../../api/azurePlaywrightServiceContext.js";
import {
  QuotasGetOptionalParams,
  QuotasListBySubscriptionOptionalParams,
} from "../../api/options.js";
import { quotasGet, quotasListBySubscription } from "../../api/quotas/index.js";
import { QuotaNames, Quota } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Quotas operations. */
export interface QuotasOperations {
  /** Get subscription quota by name. */
  get: (
    location: string,
    quotaName: QuotaNames,
    options?: QuotasGetOptionalParams,
  ) => Promise<Quota>;
  /** List quotas for a given subscription Id. */
  listBySubscription: (
    location: string,
    options?: QuotasListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Quota>;
}

export function getQuotas(context: AzurePlaywrightServiceContext, subscriptionId: string) {
  return {
    get: (location: string, quotaName: QuotaNames, options?: QuotasGetOptionalParams) =>
      quotasGet(context, subscriptionId, location, quotaName, options),
    listBySubscription: (location: string, options?: QuotasListBySubscriptionOptionalParams) =>
      quotasListBySubscription(context, subscriptionId, location, options),
  };
}

export function getQuotasOperations(
  context: AzurePlaywrightServiceContext,
  subscriptionId: string,
): QuotasOperations {
  return {
    ...getQuotas(context, subscriptionId),
  };
}
