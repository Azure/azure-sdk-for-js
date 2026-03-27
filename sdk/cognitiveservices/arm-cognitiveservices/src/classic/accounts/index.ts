// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import {
  listModels,
  listUsages,
  listSkus,
  regenerateKey,
  listKeys,
  list,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/accounts/operations.js";
import type {
  AccountsListModelsOptionalParams,
  AccountsListUsagesOptionalParams,
  AccountsListSkusOptionalParams,
  AccountsRegenerateKeyOptionalParams,
  AccountsListKeysOptionalParams,
  AccountsListOptionalParams,
  AccountsListByResourceGroupOptionalParams,
  AccountsDeleteOptionalParams,
  AccountsUpdateOptionalParams,
  AccountsCreateOptionalParams,
  AccountsGetOptionalParams,
} from "../../api/accounts/options.js";
import type {
  Account,
  ApiKeys,
  RegenerateKeyParameters,
  AccountSkuListResult,
  _UsageListResult,
  AccountModel,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Accounts operations. */
export interface AccountsOperations {
  /** List available Models for the requested Cognitive Services account */
  listModels: (
    resourceGroupName: string,
    accountName: string,
    options?: AccountsListModelsOptionalParams,
  ) => PagedAsyncIterableIterator<AccountModel>;
  /** Get usages for the requested Cognitive Services account */
  listUsages: (
    resourceGroupName: string,
    accountName: string,
    options?: AccountsListUsagesOptionalParams,
  ) => Promise<_UsageListResult>;
  /** List available SKUs for the requested Cognitive Services account */
  listSkus: (
    resourceGroupName: string,
    accountName: string,
    options?: AccountsListSkusOptionalParams,
  ) => Promise<AccountSkuListResult>;
  /** Regenerates the specified account key for the specified Cognitive Services account. */
  regenerateKey: (
    resourceGroupName: string,
    accountName: string,
    parameters: RegenerateKeyParameters,
    options?: AccountsRegenerateKeyOptionalParams,
  ) => Promise<ApiKeys>;
  /** Lists the account keys for the specified Cognitive Services account. */
  listKeys: (
    resourceGroupName: string,
    accountName: string,
    options?: AccountsListKeysOptionalParams,
  ) => Promise<ApiKeys>;
  /** Returns all the resources of a particular type belonging to a subscription. */
  list: (options?: AccountsListOptionalParams) => PagedAsyncIterableIterator<Account>;
  /** Returns all the resources of a particular type belonging to a resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AccountsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Account>;
  /** Deletes a Cognitive Services account from the resource group. */
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
  /** Updates a Cognitive Services account */
  update: (
    resourceGroupName: string,
    accountName: string,
    account: Account,
    options?: AccountsUpdateOptionalParams,
  ) => PollerLike<OperationState<Account>, Account>;
  /** Create Cognitive Services Account. Accounts is a resource group wide resource type. It holds the keys for developer to access intelligent APIs. It's also the resource type for billing. */
  create: (
    resourceGroupName: string,
    accountName: string,
    account: Account,
    options?: AccountsCreateOptionalParams,
  ) => PollerLike<OperationState<Account>, Account>;
  /** Returns a Cognitive Services account specified by the parameters. */
  get: (
    resourceGroupName: string,
    accountName: string,
    options?: AccountsGetOptionalParams,
  ) => Promise<Account>;
}

function _getAccounts(context: CognitiveServicesManagementContext) {
  return {
    listModels: (
      resourceGroupName: string,
      accountName: string,
      options?: AccountsListModelsOptionalParams,
    ) => listModels(context, resourceGroupName, accountName, options),
    listUsages: (
      resourceGroupName: string,
      accountName: string,
      options?: AccountsListUsagesOptionalParams,
    ) => listUsages(context, resourceGroupName, accountName, options),
    listSkus: (
      resourceGroupName: string,
      accountName: string,
      options?: AccountsListSkusOptionalParams,
    ) => listSkus(context, resourceGroupName, accountName, options),
    regenerateKey: (
      resourceGroupName: string,
      accountName: string,
      parameters: RegenerateKeyParameters,
      options?: AccountsRegenerateKeyOptionalParams,
    ) => regenerateKey(context, resourceGroupName, accountName, parameters, options),
    listKeys: (
      resourceGroupName: string,
      accountName: string,
      options?: AccountsListKeysOptionalParams,
    ) => listKeys(context, resourceGroupName, accountName, options),
    list: (options?: AccountsListOptionalParams) => list(context, options),
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
      account: Account,
      options?: AccountsUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, account, options),
    create: (
      resourceGroupName: string,
      accountName: string,
      account: Account,
      options?: AccountsCreateOptionalParams,
    ) => create(context, resourceGroupName, accountName, account, options),
    get: (resourceGroupName: string, accountName: string, options?: AccountsGetOptionalParams) =>
      get(context, resourceGroupName, accountName, options),
  };
}

export function _getAccountsOperations(
  context: CognitiveServicesManagementContext,
): AccountsOperations {
  return {
    ..._getAccounts(context),
  };
}
