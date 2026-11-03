// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PowerPlatformContext } from "../../api/powerPlatformContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/accounts/operations.js";
import type {
  AccountsListBySubscriptionOptionalParams,
  AccountsListByResourceGroupOptionalParams,
  AccountsDeleteOptionalParams,
  AccountsUpdateOptionalParams,
  AccountsCreateOrUpdateOptionalParams,
  AccountsGetOptionalParams,
} from "../../api/accounts/options.js";
import type { Account, PatchAccount } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Accounts operations. */
export interface AccountsOperations {
  /** Retrieve a list of accounts within a subscription. */
  listBySubscription: (
    options?: AccountsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Account>;
  /** Retrieve a list of accounts within a given resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AccountsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Account>;
  /** Delete an account. */
  delete: (
    accountName: string,
    resourceGroupName: string,
    options?: AccountsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an account. */
  update: (
    accountName: string,
    resourceGroupName: string,
    parameters: PatchAccount,
    options?: AccountsUpdateOptionalParams,
  ) => Promise<Account>;
  /** Creates an account. */
  createOrUpdate: (
    accountName: string,
    resourceGroupName: string,
    parameters: Account,
    options?: AccountsCreateOrUpdateOptionalParams,
  ) => Promise<Account>;
  /** Get information about an account. */
  get: (
    accountName: string,
    resourceGroupName: string,
    options?: AccountsGetOptionalParams,
  ) => Promise<Account>;
}

function _getAccounts(context: PowerPlatformContext) {
  return {
    listBySubscription: (options?: AccountsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AccountsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      accountName: string,
      resourceGroupName: string,
      options?: AccountsDeleteOptionalParams,
    ) => $delete(context, accountName, resourceGroupName, options),
    update: (
      accountName: string,
      resourceGroupName: string,
      parameters: PatchAccount,
      options?: AccountsUpdateOptionalParams,
    ) => update(context, accountName, resourceGroupName, parameters, options),
    createOrUpdate: (
      accountName: string,
      resourceGroupName: string,
      parameters: Account,
      options?: AccountsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, accountName, resourceGroupName, parameters, options),
    get: (accountName: string, resourceGroupName: string, options?: AccountsGetOptionalParams) =>
      get(context, accountName, resourceGroupName, options),
  };
}

export function _getAccountsOperations(context: PowerPlatformContext): AccountsOperations {
  return {
    ..._getAccounts(context),
  };
}
