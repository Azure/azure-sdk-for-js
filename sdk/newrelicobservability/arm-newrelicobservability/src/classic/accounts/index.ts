// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NewRelicObservabilityContext } from "../../api/newRelicObservabilityContext.js";
import { list } from "../../api/accounts/operations.js";
import type { AccountsListOptionalParams } from "../../api/accounts/options.js";
import type { AccountResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Accounts operations. */
export interface AccountsOperations {
  /** Lists all the New Relic accounts linked to your email address, helping you understand the existing accounts that have been created */
  list: (
    userEmail: string,
    location: string,
    options?: AccountsListOptionalParams,
  ) => PagedAsyncIterableIterator<AccountResource>;
}

function _getAccounts(context: NewRelicObservabilityContext) {
  return {
    list: (userEmail: string, location: string, options?: AccountsListOptionalParams) =>
      list(context, userEmail, location, options),
  };
}

export function _getAccountsOperations(context: NewRelicObservabilityContext): AccountsOperations {
  return {
    ..._getAccounts(context),
  };
}
