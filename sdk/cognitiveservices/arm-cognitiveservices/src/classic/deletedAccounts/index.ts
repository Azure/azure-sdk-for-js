// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { list, purge, get } from "../../api/deletedAccounts/operations.js";
import type {
  DeletedAccountsListOptionalParams,
  DeletedAccountsPurgeOptionalParams,
  DeletedAccountsGetOptionalParams,
} from "../../api/deletedAccounts/options.js";
import type { Account } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DeletedAccounts operations. */
export interface DeletedAccountsOperations {
  /** Returns all the resources of a particular type belonging to a subscription. */
  list: (options?: DeletedAccountsListOptionalParams) => PagedAsyncIterableIterator<Account>;
  /** Deletes a Cognitive Services account from the resource group. */
  purge: (
    location: string,
    resourceGroupName: string,
    accountName: string,
    options?: DeletedAccountsPurgeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Returns a Cognitive Services account specified by the parameters. */
  get: (
    location: string,
    resourceGroupName: string,
    accountName: string,
    options?: DeletedAccountsGetOptionalParams,
  ) => Promise<Account>;
}

function _getDeletedAccounts(context: CognitiveServicesManagementContext) {
  return {
    list: (options?: DeletedAccountsListOptionalParams) => list(context, options),
    purge: (
      location: string,
      resourceGroupName: string,
      accountName: string,
      options?: DeletedAccountsPurgeOptionalParams,
    ) => purge(context, location, resourceGroupName, accountName, options),
    get: (
      location: string,
      resourceGroupName: string,
      accountName: string,
      options?: DeletedAccountsGetOptionalParams,
    ) => get(context, location, resourceGroupName, accountName, options),
  };
}

export function _getDeletedAccountsOperations(
  context: CognitiveServicesManagementContext,
): DeletedAccountsOperations {
  return {
    ..._getDeletedAccounts(context),
  };
}
