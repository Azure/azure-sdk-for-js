// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementContext } from "../../api/oracleDatabaseManagementContext.js";
import { AutonomousDbVersion } from "../../models/models.js";
import {
  AutonomousDatabaseVersionsListByLocationOptionalParams,
  AutonomousDatabaseVersionsGetOptionalParams,
} from "../../api/autonomousDatabaseVersions/options.js";
import { listByLocation, get } from "../../api/autonomousDatabaseVersions/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AutonomousDatabaseVersions operations. */
export interface AutonomousDatabaseVersionsOperations {
  /** List AutonomousDbVersion resources by SubscriptionLocationResource */
  listByLocation: (
    location: string,
    options?: AutonomousDatabaseVersionsListByLocationOptionalParams,
  ) => PagedAsyncIterableIterator<AutonomousDbVersion>;
  /** Get a AutonomousDbVersion */
  get: (
    location: string,
    autonomousdbversionsname: string,
    options?: AutonomousDatabaseVersionsGetOptionalParams,
  ) => Promise<AutonomousDbVersion>;
}

function _getAutonomousDatabaseVersions(context: OracleDatabaseManagementContext) {
  return {
    listByLocation: (
      location: string,
      options?: AutonomousDatabaseVersionsListByLocationOptionalParams,
    ) => listByLocation(context, location, options),
    get: (
      location: string,
      autonomousdbversionsname: string,
      options?: AutonomousDatabaseVersionsGetOptionalParams,
    ) => get(context, location, autonomousdbversionsname, options),
  };
}

export function _getAutonomousDatabaseVersionsOperations(
  context: OracleDatabaseManagementContext,
): AutonomousDatabaseVersionsOperations {
  return {
    ..._getAutonomousDatabaseVersions(context),
  };
}
