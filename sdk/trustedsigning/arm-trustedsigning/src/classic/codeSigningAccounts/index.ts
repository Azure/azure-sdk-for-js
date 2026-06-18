// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CodeSigningContext } from "../../api/codeSigningContext.js";
import {
  checkNameAvailability,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/codeSigningAccounts/operations.js";
import {
  CodeSigningAccountsCheckNameAvailabilityOptionalParams,
  CodeSigningAccountsListBySubscriptionOptionalParams,
  CodeSigningAccountsListByResourceGroupOptionalParams,
  CodeSigningAccountsDeleteOptionalParams,
  CodeSigningAccountsUpdateOptionalParams,
  CodeSigningAccountsCreateOptionalParams,
  CodeSigningAccountsGetOptionalParams,
} from "../../api/codeSigningAccounts/options.js";
import {
  CodeSigningAccount,
  CodeSigningAccountPatch,
  CheckNameAvailability,
  CheckNameAvailabilityResult,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CodeSigningAccounts operations. */
export interface CodeSigningAccountsOperations {
  /** Checks that the trusted signing account name is valid and is not already in use. */
  checkNameAvailability: (
    body: CheckNameAvailability,
    options?: CodeSigningAccountsCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityResult>;
  /** Lists trusted signing accounts within a subscription. */
  listBySubscription: (
    options?: CodeSigningAccountsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<CodeSigningAccount>;
  /** Lists trusted signing accounts within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: CodeSigningAccountsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<CodeSigningAccount>;
  /** Delete a trusted signing account. */
  delete: (
    resourceGroupName: string,
    accountName: string,
    options?: CodeSigningAccountsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a trusted signing account. */
  update: (
    resourceGroupName: string,
    accountName: string,
    properties: CodeSigningAccountPatch,
    options?: CodeSigningAccountsUpdateOptionalParams,
  ) => PollerLike<OperationState<CodeSigningAccount>, CodeSigningAccount>;
  /** Create a trusted Signing Account. */
  create: (
    resourceGroupName: string,
    accountName: string,
    resource: CodeSigningAccount,
    options?: CodeSigningAccountsCreateOptionalParams,
  ) => PollerLike<OperationState<CodeSigningAccount>, CodeSigningAccount>;
  /** Get a trusted Signing Account. */
  get: (
    resourceGroupName: string,
    accountName: string,
    options?: CodeSigningAccountsGetOptionalParams,
  ) => Promise<CodeSigningAccount>;
}

function _getCodeSigningAccounts(context: CodeSigningContext) {
  return {
    checkNameAvailability: (
      body: CheckNameAvailability,
      options?: CodeSigningAccountsCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, body, options),
    listBySubscription: (options?: CodeSigningAccountsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: CodeSigningAccountsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      options?: CodeSigningAccountsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      properties: CodeSigningAccountPatch,
      options?: CodeSigningAccountsUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, properties, options),
    create: (
      resourceGroupName: string,
      accountName: string,
      resource: CodeSigningAccount,
      options?: CodeSigningAccountsCreateOptionalParams,
    ) => create(context, resourceGroupName, accountName, resource, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      options?: CodeSigningAccountsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, options),
  };
}

export function _getCodeSigningAccountsOperations(
  context: CodeSigningContext,
): CodeSigningAccountsOperations {
  return {
    ..._getCodeSigningAccounts(context),
  };
}
