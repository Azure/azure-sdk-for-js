// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import { list, get } from "../../api/netAppResourceQuotaLimits/operations.js";
import type {
  NetAppResourceQuotaLimitsListOptionalParams,
  NetAppResourceQuotaLimitsGetOptionalParams,
} from "../../api/netAppResourceQuotaLimits/options.js";
import type { QuotaItem } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a NetAppResourceQuotaLimits operations. */
export interface NetAppResourceQuotaLimitsOperations {
  /** Get the default and current limits for quotas */
  list: (
    location: string,
    options?: NetAppResourceQuotaLimitsListOptionalParams,
  ) => PagedAsyncIterableIterator<QuotaItem>;
  /** Get the default and current quota limit */
  get: (
    location: string,
    quotaLimitName: string,
    options?: NetAppResourceQuotaLimitsGetOptionalParams,
  ) => Promise<QuotaItem>;
}

function _getNetAppResourceQuotaLimits(context: NetAppManagementContext) {
  return {
    list: (location: string, options?: NetAppResourceQuotaLimitsListOptionalParams) =>
      list(context, location, options),
    get: (
      location: string,
      quotaLimitName: string,
      options?: NetAppResourceQuotaLimitsGetOptionalParams,
    ) => get(context, location, quotaLimitName, options),
  };
}

export function _getNetAppResourceQuotaLimitsOperations(
  context: NetAppManagementContext,
): NetAppResourceQuotaLimitsOperations {
  return {
    ..._getNetAppResourceQuotaLimits(context),
  };
}
