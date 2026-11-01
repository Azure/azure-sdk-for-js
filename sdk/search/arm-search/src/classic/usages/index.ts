// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SearchManagementContext } from "../../api/searchManagementContext.js";
import { listBySubscription } from "../../api/usages/operations.js";
import type { UsagesListBySubscriptionOptionalParams } from "../../api/usages/options.js";
import type { QuotaUsageResult } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Usages operations. */
export interface UsagesOperations {
  /** Get a list of all Azure AI Search quota usages across the subscription. */
  listBySubscription: (
    location: string,
    options?: UsagesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<QuotaUsageResult>;
}

function _getUsages(context: SearchManagementContext) {
  return {
    listBySubscription: (location: string, options?: UsagesListBySubscriptionOptionalParams) =>
      listBySubscription(context, location, options),
  };
}

export function _getUsagesOperations(context: SearchManagementContext): UsagesOperations {
  return {
    ..._getUsages(context),
  };
}
