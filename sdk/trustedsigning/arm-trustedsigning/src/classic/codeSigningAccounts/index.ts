// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CodeSigningContext } from "../../api/codeSigningContext.js";
import {
  CodeSigningAccount,
  CodeSigningAccountPatch,
  CheckNameAvailability,
  CheckNameAvailabilityResult,
} from "../../models/models.js";
import {
  get,
  create,
  update,
  $delete,
  listByResourceGroup,
  listBySubscription,
  checkNameAvailability,
} from "../../api/codeSigningAccounts/index.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  CodeSigningAccountsGetOptionalParams,
  CodeSigningAccountsCreateOptionalParams,
  CodeSigningAccountsUpdateOptionalParams,
  CodeSigningAccountsDeleteOptionalParams,
  CodeSigningAccountsListByResourceGroupOptionalParams,
  CodeSigningAccountsListBySubscriptionOptionalParams,
  CodeSigningAccountsCheckNameAvailabilityOptionalParams,
} from "../../models/options.js";

/** Interface representing a CodeSigningAccounts operations. */
export interface CodeSigningAccountsOperations {
  /** Get a trusted Signing Account. */
  get: (
    resourceGroupName: string,
    accountName: string,
    options?: CodeSigningAccountsGetOptionalParams,
  ) => Promise<CodeSigningAccount>;
  /** Create a trusted Signing Account. */
  create: (
    resourceGroupName: string,
    accountName: string,
    resource: CodeSigningAccount,
    options?: CodeSigningAccountsCreateOptionalParams,
  ) => PollerLike<OperationState<CodeSigningAccount>, CodeSigningAccount>;
  /** Update a trusted signing account. */
  update: (
    resourceGroupName: string,
    accountName: string,
    properties: CodeSigningAccountPatch,
    options?: CodeSigningAccountsUpdateOptionalParams,
  ) => PollerLike<OperationState<CodeSigningAccount>, CodeSigningAccount>;
  /** Delete a trusted signing account. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    options?: CodeSigningAccountsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Lists trusted signing accounts within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: CodeSigningAccountsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<CodeSigningAccount>;
  /** Lists trusted signing accounts within a subscription. */
  listBySubscription: (
    options?: CodeSigningAccountsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<CodeSigningAccount>;
  /** Checks that the trusted signing account name is valid and is not already in use. */
  checkNameAvailability: (
    body: CheckNameAvailability,
    options?: CodeSigningAccountsCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityResult>;
}

export function getCodeSigningAccounts(context: CodeSigningContext, subscriptionId: string) {
  return {
    get: (
      resourceGroupName: string,
      accountName: string,
      options?: CodeSigningAccountsGetOptionalParams,
    ) => get(context, subscriptionId, resourceGroupName, accountName, options),
    create: (
      resourceGroupName: string,
      accountName: string,
      resource: CodeSigningAccount,
      options?: CodeSigningAccountsCreateOptionalParams,
    ) => create(context, subscriptionId, resourceGroupName, accountName, resource, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      properties: CodeSigningAccountPatch,
      options?: CodeSigningAccountsUpdateOptionalParams,
    ) => update(context, subscriptionId, resourceGroupName, accountName, properties, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      options?: CodeSigningAccountsDeleteOptionalParams,
    ) => $delete(context, subscriptionId, resourceGroupName, accountName, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: CodeSigningAccountsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, subscriptionId, resourceGroupName, options),
    listBySubscription: (options?: CodeSigningAccountsListBySubscriptionOptionalParams) =>
      listBySubscription(context, subscriptionId, options),
    checkNameAvailability: (
      body: CheckNameAvailability,
      options?: CodeSigningAccountsCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, subscriptionId, body, options),
  };
}

export function getCodeSigningAccountsOperations(
  context: CodeSigningContext,
  subscriptionId: string,
): CodeSigningAccountsOperations {
  return {
    ...getCodeSigningAccounts(context, subscriptionId),
  };
}
