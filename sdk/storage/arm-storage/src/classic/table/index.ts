// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementContext } from "../../api/storageManagementContext.js";
import { list, $delete, update, create, get } from "../../api/table/operations.js";
import {
  TableListOptionalParams,
  TableDeleteOptionalParams,
  TableUpdateOptionalParams,
  TableCreateOptionalParams,
  TableGetOptionalParams,
} from "../../api/table/options.js";
import { Table } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Table operations. */
export interface TableOperations {
  /** Gets a list of all the tables under the specified storage account */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: TableListOptionalParams,
  ) => PagedAsyncIterableIterator<Table>;
  /** Deletes the table with the specified table name, under the specified account if it exists. */
  delete: (
    resourceGroupName: string,
    accountName: string,
    tableName: string,
    options?: TableDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a new table with the specified table name, under the specified account. */
  update: (
    resourceGroupName: string,
    accountName: string,
    tableName: string,
    options?: TableUpdateOptionalParams,
  ) => Promise<Table>;
  /** Creates a new table with the specified table name, under the specified account. */
  create: (
    resourceGroupName: string,
    accountName: string,
    tableName: string,
    options?: TableCreateOptionalParams,
  ) => Promise<Table>;
  /** Gets the table with the specified table name, under the specified account if it exists. */
  get: (
    resourceGroupName: string,
    accountName: string,
    tableName: string,
    options?: TableGetOptionalParams,
  ) => Promise<Table>;
}

function _getTable(context: StorageManagementContext) {
  return {
    list: (resourceGroupName: string, accountName: string, options?: TableListOptionalParams) =>
      list(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      tableName: string,
      options?: TableDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, tableName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      tableName: string,
      options?: TableUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, tableName, options),
    create: (
      resourceGroupName: string,
      accountName: string,
      tableName: string,
      options?: TableCreateOptionalParams,
    ) => create(context, resourceGroupName, accountName, tableName, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      tableName: string,
      options?: TableGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, tableName, options),
  };
}

export function _getTableOperations(context: StorageManagementContext): TableOperations {
  return {
    ..._getTable(context),
  };
}
