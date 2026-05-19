// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementContext } from "../../api/storageManagementContext.js";
import { list, get } from "../../api/deletedAccounts/operations.js";
import {
  DeletedAccountsListOptionalParams,
  DeletedAccountsGetOptionalParams,
} from "../../api/deletedAccounts/options.js";
import { DeletedAccount } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DeletedAccounts operations. */
export interface DeletedAccountsOperations {
  /** Lists deleted accounts under the subscription. */
  list: (options?: DeletedAccountsListOptionalParams) => PagedAsyncIterableIterator<DeletedAccount>;
  /** Get properties of specified deleted account resource. */
  get: (
    location: string,
    deletedAccountName: string,
    options?: DeletedAccountsGetOptionalParams,
  ) => Promise<DeletedAccount>;
}

function _getDeletedAccounts(context: StorageManagementContext) {
  return {
    list: (options?: DeletedAccountsListOptionalParams) => list(context, options),
    get: (
      location: string,
      deletedAccountName: string,
      options?: DeletedAccountsGetOptionalParams,
    ) => get(context, location, deletedAccountName, options),
  };
}

export function _getDeletedAccountsOperations(
  context: StorageManagementContext,
): DeletedAccountsOperations {
  return {
    ..._getDeletedAccounts(context),
  };
}
