// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext } from "../../api/oracleDatabaseManagementContext.js";
import { listByLocation, get } from "../../api/dbVersions/operations.js";
import type {
  DbVersionsListByLocationOptionalParams,
  DbVersionsGetOptionalParams,
} from "../../api/dbVersions/options.js";
import type { DbVersion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DbVersions operations. */
export interface DbVersionsOperations {
  /** List DbVersion resources by SubscriptionLocationResource */
  listByLocation: (
    location: string,
    options?: DbVersionsListByLocationOptionalParams,
  ) => PagedAsyncIterableIterator<DbVersion>;
  /** Get a DbVersion */
  get: (
    location: string,
    dbversionsname: string,
    options?: DbVersionsGetOptionalParams,
  ) => Promise<DbVersion>;
}

function _getDbVersions(context: OracleDatabaseManagementContext) {
  return {
    listByLocation: (location: string, options?: DbVersionsListByLocationOptionalParams) =>
      listByLocation(context, location, options),
    get: (location: string, dbversionsname: string, options?: DbVersionsGetOptionalParams) =>
      get(context, location, dbversionsname, options),
  };
}

export function _getDbVersionsOperations(
  context: OracleDatabaseManagementContext,
): DbVersionsOperations {
  return {
    ..._getDbVersions(context),
  };
}
