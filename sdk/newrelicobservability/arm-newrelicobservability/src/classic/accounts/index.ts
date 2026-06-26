// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NewRelicObservabilityContext } from "../../api/newRelicObservabilityContext.js";
import { list } from "../../api/accounts/operations.js";
import { AccountsListOptionalParams } from "../../api/accounts/options.js";
import { AccountResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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
