// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PurviewManagementContext } from "../../api/purviewManagementContext.js";
import {
  checkNameAvailability,
  listKeys,
  addRootCollectionAdmin,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/accounts/operations.js";
import type {
  AccountsCheckNameAvailabilityOptionalParams,
  AccountsListKeysOptionalParams,
  AccountsAddRootCollectionAdminOptionalParams,
  AccountsListBySubscriptionOptionalParams,
  AccountsListByResourceGroupOptionalParams,
  AccountsDeleteOptionalParams,
  AccountsUpdateOptionalParams,
  AccountsCreateOrUpdateOptionalParams,
  AccountsGetOptionalParams,
} from "../../api/accounts/options.js";
import type {
  Account,
  AccountUpdateParameters,
  CollectionAdminUpdate,
  AccessKeys,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Accounts operations. */
export interface AccountsOperations {
  /** Checks if account name is available. */
  checkNameAvailability: (
    checkNameAvailabilityRequest: CheckNameAvailabilityRequest,
    options?: AccountsCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityResult>;
  /** List the authorization keys associated with this account. */
  listKeys: (
    resourceGroupName: string,
    accountName: string,
    options?: AccountsListKeysOptionalParams,
  ) => Promise<AccessKeys>;
  /** Add the administrator for root collection associated with this account. */
  addRootCollectionAdmin: (
    resourceGroupName: string,
    accountName: string,
    collectionAdminUpdate: CollectionAdminUpdate,
    options?: AccountsAddRootCollectionAdminOptionalParams,
  ) => Promise<void>;
  /** List accounts in Subscription */
  listBySubscription: (
    options?: AccountsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Account>;
  /** List accounts in ResourceGroup */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AccountsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Account>;
  /** Deletes an account resource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    options?: AccountsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    accountName: string,
    options?: AccountsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    accountName: string,
    options?: AccountsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an account */
  update: (
    resourceGroupName: string,
    accountName: string,
    accountUpdateParameters: AccountUpdateParameters,
    options?: AccountsUpdateOptionalParams,
  ) => PollerLike<OperationState<Account>, Account>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    accountName: string,
    accountUpdateParameters: AccountUpdateParameters,
    options?: AccountsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Account>, Account>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    accountName: string,
    accountUpdateParameters: AccountUpdateParameters,
    options?: AccountsUpdateOptionalParams,
  ) => Promise<Account>;
  /** Creates or updates an account */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    account: Account,
    options?: AccountsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Account>, Account>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    account: Account,
    options?: AccountsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Account>, Account>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    accountName: string,
    account: Account,
    options?: AccountsCreateOrUpdateOptionalParams,
  ) => Promise<Account>;
  /** Get an account */
  get: (
    resourceGroupName: string,
    accountName: string,
    options?: AccountsGetOptionalParams,
  ) => Promise<Account>;
}

function _getAccounts(context: PurviewManagementContext) {
  return {
    checkNameAvailability: (
      checkNameAvailabilityRequest: CheckNameAvailabilityRequest,
      options?: AccountsCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, checkNameAvailabilityRequest, options),
    listKeys: (
      resourceGroupName: string,
      accountName: string,
      options?: AccountsListKeysOptionalParams,
    ) => listKeys(context, resourceGroupName, accountName, options),
    addRootCollectionAdmin: (
      resourceGroupName: string,
      accountName: string,
      collectionAdminUpdate: CollectionAdminUpdate,
      options?: AccountsAddRootCollectionAdminOptionalParams,
    ) =>
      addRootCollectionAdmin(
        context,
        resourceGroupName,
        accountName,
        collectionAdminUpdate,
        options,
      ),
    listBySubscription: (options?: AccountsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AccountsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      options?: AccountsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, options),
    beginDelete: async (
      resourceGroupName: string,
      accountName: string,
      options?: AccountsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, accountName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      accountName: string,
      options?: AccountsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, accountName, options);
    },
    update: (
      resourceGroupName: string,
      accountName: string,
      accountUpdateParameters: AccountUpdateParameters,
      options?: AccountsUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, accountUpdateParameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      accountName: string,
      accountUpdateParameters: AccountUpdateParameters,
      options?: AccountsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        accountName,
        accountUpdateParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      accountName: string,
      accountUpdateParameters: AccountUpdateParameters,
      options?: AccountsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        accountName,
        accountUpdateParameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      account: Account,
      options?: AccountsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, accountName, account, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      accountName: string,
      account: Account,
      options?: AccountsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, accountName, account, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      accountName: string,
      account: Account,
      options?: AccountsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, accountName, account, options);
    },
    get: (resourceGroupName: string, accountName: string, options?: AccountsGetOptionalParams) =>
      get(context, resourceGroupName, accountName, options),
  };
}

export function _getAccountsOperations(context: PurviewManagementContext): AccountsOperations {
  return {
    ..._getAccounts(context),
  };
}
