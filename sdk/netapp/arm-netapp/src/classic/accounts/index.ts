// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import {
  changeKeyVault,
  getChangeKeyVaultInformation,
  transitionToCmk,
  renewCredentials,
  listBySubscription,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/accounts/operations.js";
import type {
  AccountsChangeKeyVaultOptionalParams,
  AccountsGetChangeKeyVaultInformationOptionalParams,
  AccountsTransitionToCmkOptionalParams,
  AccountsRenewCredentialsOptionalParams,
  AccountsListBySubscriptionOptionalParams,
  AccountsListOptionalParams,
  AccountsDeleteOptionalParams,
  AccountsUpdateOptionalParams,
  AccountsCreateOrUpdateOptionalParams,
  AccountsGetOptionalParams,
} from "../../api/accounts/options.js";
import type {
  NetAppAccount,
  NetAppAccountPatch,
  GetKeyVaultStatusResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Accounts operations. */
export interface AccountsOperations {
  /** Affects existing volumes that are encrypted with Key Vault/Managed HSM, and new volumes. Supports HSM to Key Vault, Key Vault to HSM, HSM to HSM and Key Vault to Key Vault. */
  changeKeyVault: (
    resourceGroupName: string,
    accountName: string,
    options?: AccountsChangeKeyVaultOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Contains data from encryption.keyVaultProperties as well as information about which private endpoint is used by each encryption sibling set. Response from this endpoint can be modified and used as request body for POST request. */
  getChangeKeyVaultInformation: (
    resourceGroupName: string,
    accountName: string,
    options?: AccountsGetChangeKeyVaultInformationOptionalParams,
  ) => PollerLike<OperationState<GetKeyVaultStatusResponse>, GetKeyVaultStatusResponse>;
  /** Transitions all volumes in a VNet to a different encryption key source (Microsoft-managed key or Azure Key Vault). Operation fails if targeted volumes share encryption sibling set with volumes from another account. */
  transitionToCmk: (
    resourceGroupName: string,
    accountName: string,
    options?: AccountsTransitionToCmkOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Renew identity credentials that are used to authenticate to key vault, for customer-managed key encryption. If encryption.identity.principalId does not match identity.principalId, running this operation will fix it. */
  renewCredentials: (
    resourceGroupName: string,
    accountName: string,
    options?: AccountsRenewCredentialsOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List and describe all NetApp accounts in the subscription. */
  listBySubscription: (
    options?: AccountsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<NetAppAccount>;
  /** List and describe all NetApp accounts in the resource group. */
  list: (
    resourceGroupName: string,
    options?: AccountsListOptionalParams,
  ) => PagedAsyncIterableIterator<NetAppAccount>;
  /** Delete the specified NetApp account */
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
  /** Patch the specified NetApp account */
  update: (
    resourceGroupName: string,
    accountName: string,
    body: NetAppAccountPatch,
    options?: AccountsUpdateOptionalParams,
  ) => PollerLike<OperationState<NetAppAccount>, NetAppAccount>;
  /** Create or update the specified NetApp account within the resource group */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    body: NetAppAccount,
    options?: AccountsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<NetAppAccount>, NetAppAccount>;
  /** Get the NetApp account */
  get: (
    resourceGroupName: string,
    accountName: string,
    options?: AccountsGetOptionalParams,
  ) => Promise<NetAppAccount>;
}

function _getAccounts(context: NetAppManagementContext) {
  return {
    changeKeyVault: (
      resourceGroupName: string,
      accountName: string,
      options?: AccountsChangeKeyVaultOptionalParams,
    ) => changeKeyVault(context, resourceGroupName, accountName, options),
    getChangeKeyVaultInformation: (
      resourceGroupName: string,
      accountName: string,
      options?: AccountsGetChangeKeyVaultInformationOptionalParams,
    ) => getChangeKeyVaultInformation(context, resourceGroupName, accountName, options),
    transitionToCmk: (
      resourceGroupName: string,
      accountName: string,
      options?: AccountsTransitionToCmkOptionalParams,
    ) => transitionToCmk(context, resourceGroupName, accountName, options),
    renewCredentials: (
      resourceGroupName: string,
      accountName: string,
      options?: AccountsRenewCredentialsOptionalParams,
    ) => renewCredentials(context, resourceGroupName, accountName, options),
    listBySubscription: (options?: AccountsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    list: (resourceGroupName: string, options?: AccountsListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      options?: AccountsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      body: NetAppAccountPatch,
      options?: AccountsUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, body, options),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      body: NetAppAccount,
      options?: AccountsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, accountName, body, options),
    get: (resourceGroupName: string, accountName: string, options?: AccountsGetOptionalParams) =>
      get(context, resourceGroupName, accountName, options),
  };
}

export function _getAccountsOperations(context: NetAppManagementContext): AccountsOperations {
  return {
    ..._getAccounts(context),
  };
}
