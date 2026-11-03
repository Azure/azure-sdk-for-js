// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMapsManagementContext } from "../../api/azureMapsManagementContext.js";
import {
  regenerateKeys,
  listKeys,
  listSas,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/accounts/operations.js";
import type {
  AccountsRegenerateKeysOptionalParams,
  AccountsListKeysOptionalParams,
  AccountsListSasOptionalParams,
  AccountsListBySubscriptionOptionalParams,
  AccountsListByResourceGroupOptionalParams,
  AccountsDeleteOptionalParams,
  AccountsUpdateOptionalParams,
  AccountsCreateOrUpdateOptionalParams,
  AccountsGetOptionalParams,
} from "../../api/accounts/options.js";
import type {
  MapsAccount,
  MapsAccountUpdateParameters,
  AccountSasParameters,
  MapsAccountSasToken,
  MapsAccountKeys,
  MapsKeySpecification,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Accounts operations. */
export interface AccountsOperations {
  /** Regenerate either the primary or secondary key for use with the Maps APIs. The old key will stop working immediately. */
  regenerateKeys: (
    resourceGroupName: string,
    accountName: string,
    keySpecification: MapsKeySpecification,
    options?: AccountsRegenerateKeysOptionalParams,
  ) => Promise<MapsAccountKeys>;
  /** Get the keys to use with the Maps APIs. A key is used to authenticate and authorize access to the Maps REST APIs. Only one key is needed at a time; two are given to provide seamless key regeneration. */
  listKeys: (
    resourceGroupName: string,
    accountName: string,
    options?: AccountsListKeysOptionalParams,
  ) => Promise<MapsAccountKeys>;
  /**
   * Create and list an account shared access signature token. Use this SAS token for authentication to Azure Maps REST APIs through various Azure Maps SDKs. As prerequisite to create a SAS Token.
   *
   * Prerequisites:
   * 1. Create or have an existing User Assigned Managed Identity in the same Azure region as the account.
   * 2. Create or update an Azure Maps account with the same Azure region as the User Assigned Managed Identity is placed.
   */
  listSas: (
    resourceGroupName: string,
    accountName: string,
    mapsAccountSasParameters: AccountSasParameters,
    options?: AccountsListSasOptionalParams,
  ) => Promise<MapsAccountSasToken>;
  /** Get all Maps Accounts in a Subscription */
  listBySubscription: (
    options?: AccountsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<MapsAccount>;
  /** Get all Maps Accounts in a Resource Group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AccountsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<MapsAccount>;
  /** Delete a Maps Account. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    options?: AccountsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a Maps Account. Only a subset of the parameters may be updated after creation, such as Sku, Tags, Properties. */
  update: (
    resourceGroupName: string,
    accountName: string,
    mapsAccountUpdateParameters: MapsAccountUpdateParameters,
    options?: AccountsUpdateOptionalParams,
  ) => Promise<MapsAccount>;
  /** Create or update a Maps Account. A Maps Account holds the keys which allow access to the Maps REST APIs. */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    mapsAccount: MapsAccount,
    options?: AccountsCreateOrUpdateOptionalParams,
  ) => Promise<MapsAccount>;
  /** Get a Maps Account. */
  get: (
    resourceGroupName: string,
    accountName: string,
    options?: AccountsGetOptionalParams,
  ) => Promise<MapsAccount>;
}

function _getAccounts(context: AzureMapsManagementContext) {
  return {
    regenerateKeys: (
      resourceGroupName: string,
      accountName: string,
      keySpecification: MapsKeySpecification,
      options?: AccountsRegenerateKeysOptionalParams,
    ) => regenerateKeys(context, resourceGroupName, accountName, keySpecification, options),
    listKeys: (
      resourceGroupName: string,
      accountName: string,
      options?: AccountsListKeysOptionalParams,
    ) => listKeys(context, resourceGroupName, accountName, options),
    listSas: (
      resourceGroupName: string,
      accountName: string,
      mapsAccountSasParameters: AccountSasParameters,
      options?: AccountsListSasOptionalParams,
    ) => listSas(context, resourceGroupName, accountName, mapsAccountSasParameters, options),
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
    update: (
      resourceGroupName: string,
      accountName: string,
      mapsAccountUpdateParameters: MapsAccountUpdateParameters,
      options?: AccountsUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, mapsAccountUpdateParameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      mapsAccount: MapsAccount,
      options?: AccountsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, accountName, mapsAccount, options),
    get: (resourceGroupName: string, accountName: string, options?: AccountsGetOptionalParams) =>
      get(context, resourceGroupName, accountName, options),
  };
}

export function _getAccountsOperations(context: AzureMapsManagementContext): AccountsOperations {
  return {
    ..._getAccounts(context),
  };
}
