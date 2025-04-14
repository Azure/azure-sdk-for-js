// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzurePlaywrightServiceContext } from "../../api/azurePlaywrightServiceContext.js";
import {
  accountsGet,
  accountsCreateOrUpdate,
  accountsUpdate,
  accountsDelete,
  accountsListByResourceGroup,
  accountsListBySubscription,
  accountsCheckNameAvailability,
} from "../../api/accounts/index.js";
import {
  Account,
  AccountUpdate,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResponse,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  AccountsGetOptionalParams,
  AccountsCreateOrUpdateOptionalParams,
  AccountsUpdateOptionalParams,
  AccountsDeleteOptionalParams,
  AccountsListByResourceGroupOptionalParams,
  AccountsListBySubscriptionOptionalParams,
  AccountsCheckNameAvailabilityOptionalParams,
} from "../../api/options.js";

/** Interface representing a Accounts operations. */
export interface AccountsOperations {
  /** Get a Account */
  get: (
    resourceGroupName: string,
    accountName: string,
    options?: AccountsGetOptionalParams,
  ) => Promise<Account>;
  /** Create a Account */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    resource: Account,
    options?: AccountsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Account>, Account>;
  /** Update a Account */
  update: (
    resourceGroupName: string,
    accountName: string,
    properties: AccountUpdate,
    options?: AccountsUpdateOptionalParams,
  ) => Promise<Account>;
  /** Delete a Account */
  delete: (
    resourceGroupName: string,
    accountName: string,
    options?: AccountsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List Account resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AccountsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Account>;
  /** List Account resources by subscription ID */
  listBySubscription: (
    options?: AccountsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Account>;
  /** Adds check global name availability operation, normally used if a resource name must be globally unique. */
  checkNameAvailability: (
    body: CheckNameAvailabilityRequest,
    options?: AccountsCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityResponse>;
}

export function getAccounts(context: AzurePlaywrightServiceContext, subscriptionId: string) {
  return {
    get: (resourceGroupName: string, accountName: string, options?: AccountsGetOptionalParams) =>
      accountsGet(context, subscriptionId, resourceGroupName, accountName, options),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      resource: Account,
      options?: AccountsCreateOrUpdateOptionalParams,
    ) =>
      accountsCreateOrUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        accountName,
        resource,
        options,
      ),
    update: (
      resourceGroupName: string,
      accountName: string,
      properties: AccountUpdate,
      options?: AccountsUpdateOptionalParams,
    ) =>
      accountsUpdate(context, subscriptionId, resourceGroupName, accountName, properties, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      options?: AccountsDeleteOptionalParams,
    ) => accountsDelete(context, subscriptionId, resourceGroupName, accountName, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AccountsListByResourceGroupOptionalParams,
    ) => accountsListByResourceGroup(context, subscriptionId, resourceGroupName, options),
    listBySubscription: (options?: AccountsListBySubscriptionOptionalParams) =>
      accountsListBySubscription(context, subscriptionId, options),
    checkNameAvailability: (
      body: CheckNameAvailabilityRequest,
      options?: AccountsCheckNameAvailabilityOptionalParams,
    ) => accountsCheckNameAvailability(context, subscriptionId, body, options),
  };
}

export function getAccountsOperations(
  context: AzurePlaywrightServiceContext,
  subscriptionId: string,
): AccountsOperations {
  return {
    ...getAccounts(context, subscriptionId),
  };
}
