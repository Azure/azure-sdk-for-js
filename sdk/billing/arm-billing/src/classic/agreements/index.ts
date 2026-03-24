// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext } from "../../api/billingManagementContext.js";
import { listByBillingAccount, get } from "../../api/agreements/operations.js";
import type {
  AgreementsListByBillingAccountOptionalParams,
  AgreementsGetOptionalParams,
} from "../../api/agreements/options.js";
import type { Agreement } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Agreements operations. */
export interface AgreementsOperations {
  /** Lists the agreements for a billing account. */
  listByBillingAccount: (
    billingAccountName: string,
    options?: AgreementsListByBillingAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Agreement>;
  /** Gets an agreement by ID. */
  get: (
    billingAccountName: string,
    agreementName: string,
    options?: AgreementsGetOptionalParams,
  ) => Promise<Agreement>;
}

function _getAgreements(context: BillingManagementContext) {
  return {
    listByBillingAccount: (
      billingAccountName: string,
      options?: AgreementsListByBillingAccountOptionalParams,
    ) => listByBillingAccount(context, billingAccountName, options),
    get: (
      billingAccountName: string,
      agreementName: string,
      options?: AgreementsGetOptionalParams,
    ) => get(context, billingAccountName, agreementName, options),
  };
}

export function _getAgreementsOperations(context: BillingManagementContext): AgreementsOperations {
  return {
    ..._getAgreements(context),
  };
}
