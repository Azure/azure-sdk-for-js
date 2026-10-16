// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext } from "../../api/oracleDatabaseManagementContext.js";
import { listByLocation, get } from "../../api/databaseSystemShapeResources/operations.js";
import type {
  DatabaseSystemShapeResourcesListByLocationOptionalParams,
  DatabaseSystemShapeResourcesGetOptionalParams,
} from "../../api/databaseSystemShapeResources/options.js";
import type { DatabaseSystemShape } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DatabaseSystemShapeResources operations. */
export interface DatabaseSystemShapeResourcesOperations {
  /** List DatabaseSystemShape resources by SubscriptionLocationResource */
  listByLocation: (
    location: string,
    options?: DatabaseSystemShapeResourcesListByLocationOptionalParams,
  ) => PagedAsyncIterableIterator<DatabaseSystemShape>;
  /** Get a DatabaseSystemShape */
  get: (
    location: string,
    databasesystemshapename: string,
    options?: DatabaseSystemShapeResourcesGetOptionalParams,
  ) => Promise<DatabaseSystemShape>;
}

function _getDatabaseSystemShapeResources(context: OracleDatabaseManagementContext) {
  return {
    listByLocation: (
      location: string,
      options?: DatabaseSystemShapeResourcesListByLocationOptionalParams,
    ) => listByLocation(context, location, options),
    get: (
      location: string,
      databasesystemshapename: string,
      options?: DatabaseSystemShapeResourcesGetOptionalParams,
    ) => get(context, location, databasesystemshapename, options),
  };
}

export function _getDatabaseSystemShapeResourcesOperations(
  context: OracleDatabaseManagementContext,
): DatabaseSystemShapeResourcesOperations {
  return {
    ..._getDatabaseSystemShapeResources(context),
  };
}
