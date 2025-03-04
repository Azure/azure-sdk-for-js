// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzurePlaywrightServiceContext } from "../../api/azurePlaywrightServiceContext.js";
import { accountQuotasGet, accountQuotasListByAccount } from "../../api/accountQuotas/index.js";
import { AccountQuota, QuotaNames } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import {
  AccountQuotasGetOptionalParams,
  AccountQuotasListByAccountOptionalParams,
} from "../../api/options.js";

/** Interface representing a AccountQuotas operations. */
export interface AccountQuotasOperations {
  /** Get quota by name for an account. */
  get: (
    resourceGroupName: string,
    accountName: string,
    quotaName: QuotaNames,
    options?: AccountQuotasGetOptionalParams,
  ) => Promise<AccountQuota>;
  /** List quotas for a given account. */
  listByAccount: (
    resourceGroupName: string,
    accountName: string,
    options?: AccountQuotasListByAccountOptionalParams,
  ) => PagedAsyncIterableIterator<AccountQuota>;
}

export function getAccountQuotas(context: AzurePlaywrightServiceContext, subscriptionId: string) {
  return {
    get: (
      resourceGroupName: string,
      accountName: string,
      quotaName: QuotaNames,
      options?: AccountQuotasGetOptionalParams,
    ) =>
      accountQuotasGet(context, subscriptionId, resourceGroupName, accountName, quotaName, options),
    listByAccount: (
      resourceGroupName: string,
      accountName: string,
      options?: AccountQuotasListByAccountOptionalParams,
    ) =>
      accountQuotasListByAccount(context, subscriptionId, resourceGroupName, accountName, options),
  };
}

export function getAccountQuotasOperations(
  context: AzurePlaywrightServiceContext,
  subscriptionId: string,
): AccountQuotasOperations {
  return {
    ...getAccountQuotas(context, subscriptionId),
  };
}
