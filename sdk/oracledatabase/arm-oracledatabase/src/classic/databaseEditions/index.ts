// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext } from "../../api/oracleDatabaseManagementContext.js";
import { listByLocation, get } from "../../api/databaseEditions/operations.js";
import type {
  DatabaseEditionsListByLocationOptionalParams,
  DatabaseEditionsGetOptionalParams,
} from "../../api/databaseEditions/options.js";
import type { DatabaseEdition } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DatabaseEditions operations. */
export interface DatabaseEditionsOperations {
  /** List DatabaseEdition resources by SubscriptionLocationResource */
  listByLocation: (
    location: string,
    options?: DatabaseEditionsListByLocationOptionalParams,
  ) => PagedAsyncIterableIterator<DatabaseEdition>;
  /** Get a DatabaseEdition */
  get: (
    location: string,
    databaseeditionname: string,
    options?: DatabaseEditionsGetOptionalParams,
  ) => Promise<DatabaseEdition>;
}

function _getDatabaseEditions(context: OracleDatabaseManagementContext) {
  return {
    listByLocation: (location: string, options?: DatabaseEditionsListByLocationOptionalParams) =>
      listByLocation(context, location, options),
    get: (
      location: string,
      databaseeditionname: string,
      options?: DatabaseEditionsGetOptionalParams,
    ) => get(context, location, databaseeditionname, options),
  };
}

export function _getDatabaseEditionsOperations(
  context: OracleDatabaseManagementContext,
): DatabaseEditionsOperations {
  return {
    ..._getDatabaseEditions(context),
  };
}
