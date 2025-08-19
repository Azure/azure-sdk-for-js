// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementContext } from "../../api/oracleDatabaseManagementContext.js";
import { DbServer } from "../../models/models.js";
import {
  DbServersListByParentOptionalParams,
  DbServersGetOptionalParams,
} from "../../api/dbServers/options.js";
import { listByParent, get } from "../../api/dbServers/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DbServers operations. */
export interface DbServersOperations {
  /** List DbServer resources by CloudExadataInfrastructure */
  listByParent: (
    resourceGroupName: string,
    cloudexadatainfrastructurename: string,
    options?: DbServersListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<DbServer>;
  /** Get a DbServer */
  get: (
    resourceGroupName: string,
    cloudexadatainfrastructurename: string,
    dbserverocid: string,
    options?: DbServersGetOptionalParams,
  ) => Promise<DbServer>;
}

function _getDbServers(context: OracleDatabaseManagementContext) {
  return {
    listByParent: (
      resourceGroupName: string,
      cloudexadatainfrastructurename: string,
      options?: DbServersListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, cloudexadatainfrastructurename, options),
    get: (
      resourceGroupName: string,
      cloudexadatainfrastructurename: string,
      dbserverocid: string,
      options?: DbServersGetOptionalParams,
    ) => get(context, resourceGroupName, cloudexadatainfrastructurename, dbserverocid, options),
  };
}

export function _getDbServersOperations(
  context: OracleDatabaseManagementContext,
): DbServersOperations {
  return {
    ..._getDbServers(context),
  };
}
