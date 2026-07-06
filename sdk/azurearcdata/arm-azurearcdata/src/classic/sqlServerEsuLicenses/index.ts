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
} from "../../api/sqlServerEsuLicenses/operations.js";
import type {
  SqlServerEsuLicensesListOptionalParams,
  SqlServerEsuLicensesListByResourceGroupOptionalParams,
  SqlServerEsuLicensesDeleteOptionalParams,
  SqlServerEsuLicensesUpdateOptionalParams,
  SqlServerEsuLicensesCreateOptionalParams,
  SqlServerEsuLicensesGetOptionalParams,
} from "../../api/sqlServerEsuLicenses/options.js";
import type { SqlServerEsuLicense, SqlServerEsuLicenseUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SqlServerEsuLicenses operations. */
export interface SqlServerEsuLicensesOperations {
  /** List sqlServerEsuLicense resources in the subscription */
  list: (
    options?: SqlServerEsuLicensesListOptionalParams,
  ) => PagedAsyncIterableIterator<SqlServerEsuLicense>;
  /** Gets all sqlServerEsuLicenses in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: SqlServerEsuLicensesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<SqlServerEsuLicense>;
  /** Deletes a SQL Server ESU license resource */
  delete: (
    resourceGroupName: string,
    sqlServerEsuLicenseName: string,
    options?: SqlServerEsuLicensesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a SQL Server ESU license resource */
  update: (
    resourceGroupName: string,
    sqlServerEsuLicenseName: string,
    parameters: SqlServerEsuLicenseUpdate,
    options?: SqlServerEsuLicensesUpdateOptionalParams,
  ) => Promise<SqlServerEsuLicense>;
  /** Creates or replaces a SQL Server ESU license resource */
  create: (
    resourceGroupName: string,
    sqlServerEsuLicenseName: string,
    sqlServerEsuLicense: SqlServerEsuLicense,
    options?: SqlServerEsuLicensesCreateOptionalParams,
  ) => Promise<SqlServerEsuLicense>;
  /** Retrieves a SQL Server ESU license resource */
  get: (
    resourceGroupName: string,
    sqlServerEsuLicenseName: string,
    options?: SqlServerEsuLicensesGetOptionalParams,
  ) => Promise<SqlServerEsuLicense>;
}

function _getSqlServerEsuLicenses(context: AzureArcDataContext) {
  return {
    list: (options?: SqlServerEsuLicensesListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: SqlServerEsuLicensesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      sqlServerEsuLicenseName: string,
      options?: SqlServerEsuLicensesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, sqlServerEsuLicenseName, options),
    update: (
      resourceGroupName: string,
      sqlServerEsuLicenseName: string,
      parameters: SqlServerEsuLicenseUpdate,
      options?: SqlServerEsuLicensesUpdateOptionalParams,
    ) => update(context, resourceGroupName, sqlServerEsuLicenseName, parameters, options),
    create: (
      resourceGroupName: string,
      sqlServerEsuLicenseName: string,
      sqlServerEsuLicense: SqlServerEsuLicense,
      options?: SqlServerEsuLicensesCreateOptionalParams,
    ) => create(context, resourceGroupName, sqlServerEsuLicenseName, sqlServerEsuLicense, options),
    get: (
      resourceGroupName: string,
      sqlServerEsuLicenseName: string,
      options?: SqlServerEsuLicensesGetOptionalParams,
    ) => get(context, resourceGroupName, sqlServerEsuLicenseName, options),
  };
}

export function _getSqlServerEsuLicensesOperations(
  context: AzureArcDataContext,
): SqlServerEsuLicensesOperations {
  return {
    ..._getSqlServerEsuLicenses(context),
  };
}
