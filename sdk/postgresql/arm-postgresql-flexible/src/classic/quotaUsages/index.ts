// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgreSQLManagementFlexibleServerContext } from "../../api/postgreSQLManagementFlexibleServerContext.js";
import { list } from "../../api/quotaUsages/operations.js";
import type { QuotaUsagesListOptionalParams } from "../../api/quotaUsages/options.js";
import type { QuotaUsage } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a QuotaUsages operations. */
export interface QuotaUsagesOperations {
  /** Get quota usages at specified location in a given subscription. */
  list: (
    locationName: string,
    options?: QuotaUsagesListOptionalParams,
  ) => PagedAsyncIterableIterator<QuotaUsage>;
}

function _getQuotaUsages(context: PostgreSQLManagementFlexibleServerContext) {
  return {
    list: (locationName: string, options?: QuotaUsagesListOptionalParams) =>
      list(context, locationName, options),
  };
}

export function _getQuotaUsagesOperations(
  context: PostgreSQLManagementFlexibleServerContext,
): QuotaUsagesOperations {
  return {
    ..._getQuotaUsages(context),
  };
}
