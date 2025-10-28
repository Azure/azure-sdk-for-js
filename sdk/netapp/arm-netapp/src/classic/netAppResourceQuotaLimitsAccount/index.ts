// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import { list, get } from "../../api/netAppResourceQuotaLimitsAccount/operations.js";
import type {
  NetAppResourceQuotaLimitsAccountListOptionalParams,
  NetAppResourceQuotaLimitsAccountGetOptionalParams,
} from "../../api/netAppResourceQuotaLimitsAccount/options.js";
import type { QuotaItem } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a NetAppResourceQuotaLimitsAccount operations. */
export interface NetAppResourceQuotaLimitsAccountOperations {
  /** Gets a list of quota limits for all quotas that are under account. Currently PoolsPerAccount is the only one. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: NetAppResourceQuotaLimitsAccountListOptionalParams,
  ) => PagedAsyncIterableIterator<QuotaItem>;
  /** Get the default, current and usages account quota limit */
  get: (
    resourceGroupName: string,
    accountName: string,
    quotaLimitName: string,
    options?: NetAppResourceQuotaLimitsAccountGetOptionalParams,
  ) => Promise<QuotaItem>;
}

function _getNetAppResourceQuotaLimitsAccount(context: NetAppManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: NetAppResourceQuotaLimitsAccountListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      quotaLimitName: string,
      options?: NetAppResourceQuotaLimitsAccountGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, quotaLimitName, options),
  };
}

export function _getNetAppResourceQuotaLimitsAccountOperations(
  context: NetAppManagementContext,
): NetAppResourceQuotaLimitsAccountOperations {
  return {
    ..._getNetAppResourceQuotaLimitsAccount(context),
  };
}
