// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementContext } from "../../api/oracleDatabaseManagementContext.js";
import { SystemVersion } from "../../models/models.js";
import {
  SystemVersionsListByLocationOptionalParams,
  SystemVersionsGetOptionalParams,
} from "../../api/systemVersions/options.js";
import { listByLocation, get } from "../../api/systemVersions/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SystemVersions operations. */
export interface SystemVersionsOperations {
  /** List SystemVersion resources by SubscriptionLocationResource */
  listByLocation: (
    location: string,
    options?: SystemVersionsListByLocationOptionalParams,
  ) => PagedAsyncIterableIterator<SystemVersion>;
  /** Get a SystemVersion */
  get: (
    location: string,
    systemversionname: string,
    options?: SystemVersionsGetOptionalParams,
  ) => Promise<SystemVersion>;
}

function _getSystemVersions(context: OracleDatabaseManagementContext) {
  return {
    listByLocation: (location: string, options?: SystemVersionsListByLocationOptionalParams) =>
      listByLocation(context, location, options),
    get: (location: string, systemversionname: string, options?: SystemVersionsGetOptionalParams) =>
      get(context, location, systemversionname, options),
  };
}

export function _getSystemVersionsOperations(
  context: OracleDatabaseManagementContext,
): SystemVersionsOperations {
  return {
    ..._getSystemVersions(context),
  };
}
