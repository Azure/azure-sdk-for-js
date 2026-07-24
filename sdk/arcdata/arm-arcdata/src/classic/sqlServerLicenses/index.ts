// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureArcDataContext } from "../../api/azureArcDataContext.js";
import {
  list,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/sqlServerLicenses/operations.js";
import type {
  SqlServerLicensesListOptionalParams,
  SqlServerLicensesListByResourceGroupOptionalParams,
  SqlServerLicensesDeleteOptionalParams,
  SqlServerLicensesUpdateOptionalParams,
  SqlServerLicensesCreateOptionalParams,
  SqlServerLicensesGetOptionalParams,
} from "../../api/sqlServerLicenses/options.js";
import type { SqlServerLicense, SqlServerLicenseUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SqlServerLicenses operations. */
export interface SqlServerLicensesOperations {
  /** List sqlServerLicense resources in the subscription */
  list: (
    options?: SqlServerLicensesListOptionalParams,
  ) => PagedAsyncIterableIterator<SqlServerLicense>;
  /** Gets all sqlServerLicenses in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: SqlServerLicensesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<SqlServerLicense>;
  /** Deletes a SQL Server license resource */
  delete: (
    resourceGroupName: string,
    sqlServerLicenseName: string,
    options?: SqlServerLicensesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a SQL Server license resource */
  update: (
    resourceGroupName: string,
    sqlServerLicenseName: string,
    parameters: SqlServerLicenseUpdate,
    options?: SqlServerLicensesUpdateOptionalParams,
  ) => Promise<SqlServerLicense>;
  /** Creates or replaces a SQL Server license resource */
  create: (
    resourceGroupName: string,
    sqlServerLicenseName: string,
    sqlServerLicense: SqlServerLicense,
    options?: SqlServerLicensesCreateOptionalParams,
  ) => Promise<SqlServerLicense>;
  /** Retrieves a SQL Server license resource */
  get: (
    resourceGroupName: string,
    sqlServerLicenseName: string,
    options?: SqlServerLicensesGetOptionalParams,
  ) => Promise<SqlServerLicense>;
}

function _getSqlServerLicenses(context: AzureArcDataContext) {
  return {
    list: (options?: SqlServerLicensesListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: SqlServerLicensesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      sqlServerLicenseName: string,
      options?: SqlServerLicensesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, sqlServerLicenseName, options),
    update: (
      resourceGroupName: string,
      sqlServerLicenseName: string,
      parameters: SqlServerLicenseUpdate,
      options?: SqlServerLicensesUpdateOptionalParams,
    ) => update(context, resourceGroupName, sqlServerLicenseName, parameters, options),
    create: (
      resourceGroupName: string,
      sqlServerLicenseName: string,
      sqlServerLicense: SqlServerLicense,
      options?: SqlServerLicensesCreateOptionalParams,
    ) => create(context, resourceGroupName, sqlServerLicenseName, sqlServerLicense, options),
    get: (
      resourceGroupName: string,
      sqlServerLicenseName: string,
      options?: SqlServerLicensesGetOptionalParams,
    ) => get(context, resourceGroupName, sqlServerLicenseName, options),
  };
}

export function _getSqlServerLicensesOperations(
  context: AzureArcDataContext,
): SqlServerLicensesOperations {
  return {
    ..._getSqlServerLicenses(context),
  };
}
