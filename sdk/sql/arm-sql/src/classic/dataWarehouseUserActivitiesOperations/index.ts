// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { listByDatabase, get } from "../../api/dataWarehouseUserActivitiesOperations/operations.js";
import {
  DataWarehouseUserActivitiesOperationsListByDatabaseOptionalParams,
  DataWarehouseUserActivitiesOperationsGetOptionalParams,
} from "../../api/dataWarehouseUserActivitiesOperations/options.js";
import { DataWarehouseUserActivities, DataWarehouseUserActivityName } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DataWarehouseUserActivitiesOperations operations. */
export interface DataWarehouseUserActivitiesOperationsOperations {
  /** List the user activities of a data warehouse which includes running and suspended queries */
  listByDatabase: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DataWarehouseUserActivitiesOperationsListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<DataWarehouseUserActivities>;
  /** Gets the user activities of a data warehouse which includes running and suspended queries */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    dataWarehouseUserActivityName: DataWarehouseUserActivityName,
    options?: DataWarehouseUserActivitiesOperationsGetOptionalParams,
  ) => Promise<DataWarehouseUserActivities>;
}

function _getDataWarehouseUserActivitiesOperations(context: SqlManagementContext) {
  return {
    listByDatabase: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DataWarehouseUserActivitiesOperationsListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, serverName, databaseName, options),
    get: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      dataWarehouseUserActivityName: DataWarehouseUserActivityName,
      options?: DataWarehouseUserActivitiesOperationsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        dataWarehouseUserActivityName,
        options,
      ),
  };
}

export function _getDataWarehouseUserActivitiesOperationsOperations(
  context: SqlManagementContext,
): DataWarehouseUserActivitiesOperationsOperations {
  return {
    ..._getDataWarehouseUserActivitiesOperations(context),
  };
}
