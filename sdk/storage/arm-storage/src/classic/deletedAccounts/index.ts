// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageManagementContext } from "../../api/storageManagementContext.js";
import { list, get } from "../../api/deletedAccounts/operations.js";
import type {
  DeletedAccountsListOptionalParams,
  DeletedAccountsGetOptionalParams,
} from "../../api/deletedAccounts/options.js";
import type { DeletedAccount } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DeletedAccounts operations. */
export interface DeletedAccountsOperations {
  /** Lists deleted accounts under the subscription. */
  list: (options?: DeletedAccountsListOptionalParams) => PagedAsyncIterableIterator<DeletedAccount>;
  /** Get properties of specified deleted account resource. */
  get: (
    deletedAccountName: string,
    location: string,
    options?: DeletedAccountsGetOptionalParams,
  ) => Promise<DeletedAccount>;
}

function _getDeletedAccounts(context: StorageManagementContext) {
  return {
    list: (options?: DeletedAccountsListOptionalParams) => list(context, options),
    get: (
      deletedAccountName: string,
      location: string,
      options?: DeletedAccountsGetOptionalParams,
    ) => get(context, deletedAccountName, location, options),
  };
}

export function _getDeletedAccountsOperations(
  context: StorageManagementContext,
): DeletedAccountsOperations {
  return {
    ..._getDeletedAccounts(context),
  };
}
