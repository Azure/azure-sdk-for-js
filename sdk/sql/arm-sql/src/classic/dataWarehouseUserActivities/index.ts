// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import { listByDatabase, get } from "../../api/dataWarehouseUserActivities/operations.js";
import type {
  DataWarehouseUserActivitiesListByDatabaseOptionalParams,
  DataWarehouseUserActivitiesGetOptionalParams,
} from "../../api/dataWarehouseUserActivities/options.js";
import type {
  DataWarehouseUserActivities,
  DataWarehouseUserActivityName,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DataWarehouseUserActivities operations. */
export interface DataWarehouseUserActivitiesOperations {
  /** List the user activities of a data warehouse which includes running and suspended queries */
  listByDatabase: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DataWarehouseUserActivitiesListByDatabaseOptionalParams,
  ) => PagedAsyncIterableIterator<DataWarehouseUserActivities>;
  /** Gets the user activities of a data warehouse which includes running and suspended queries */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    dataWarehouseUserActivityName: DataWarehouseUserActivityName,
    options?: DataWarehouseUserActivitiesGetOptionalParams,
  ) => Promise<DataWarehouseUserActivities>;
}

function _getDataWarehouseUserActivities(context: SqlContext) {
  return {
    listByDatabase: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      options?: DataWarehouseUserActivitiesListByDatabaseOptionalParams,
    ) => listByDatabase(context, resourceGroupName, serverName, databaseName, options),
    get: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      dataWarehouseUserActivityName: DataWarehouseUserActivityName,
      options?: DataWarehouseUserActivitiesGetOptionalParams,
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

export function _getDataWarehouseUserActivitiesOperations(
  context: SqlContext,
): DataWarehouseUserActivitiesOperations {
  return {
    ..._getDataWarehouseUserActivities(context),
  };
}
