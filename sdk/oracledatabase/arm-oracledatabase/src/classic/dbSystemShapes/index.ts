// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementContext } from "../../api/oracleDatabaseManagementContext.js";
import { DbSystemShape } from "../../models/models.js";
import {
  DbSystemShapesListByLocationOptionalParams,
  DbSystemShapesGetOptionalParams,
} from "../../api/dbSystemShapes/options.js";
import { listByLocation, get } from "../../api/dbSystemShapes/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DbSystemShapes operations. */
export interface DbSystemShapesOperations {
  /** List DbSystemShape resources by SubscriptionLocationResource */
  listByLocation: (
    location: string,
    options?: DbSystemShapesListByLocationOptionalParams,
  ) => PagedAsyncIterableIterator<DbSystemShape>;
  /** Get a DbSystemShape */
  get: (
    location: string,
    dbsystemshapename: string,
    options?: DbSystemShapesGetOptionalParams,
  ) => Promise<DbSystemShape>;
}

function _getDbSystemShapes(context: OracleDatabaseManagementContext) {
  return {
    listByLocation: (location: string, options?: DbSystemShapesListByLocationOptionalParams) =>
      listByLocation(context, location, options),
    get: (location: string, dbsystemshapename: string, options?: DbSystemShapesGetOptionalParams) =>
      get(context, location, dbsystemshapename, options),
  };
}

export function _getDbSystemShapesOperations(
  context: OracleDatabaseManagementContext,
): DbSystemShapesOperations {
  return {
    ..._getDbSystemShapes(context),
  };
}
