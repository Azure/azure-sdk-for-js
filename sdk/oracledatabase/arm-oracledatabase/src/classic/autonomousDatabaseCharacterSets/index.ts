// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext } from "../../api/oracleDatabaseManagementContext.js";
import { listByLocation, get } from "../../api/autonomousDatabaseCharacterSets/operations.js";
import type {
  AutonomousDatabaseCharacterSetsListByLocationOptionalParams,
  AutonomousDatabaseCharacterSetsGetOptionalParams,
} from "../../api/autonomousDatabaseCharacterSets/options.js";
import type { AutonomousDatabaseCharacterSet } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AutonomousDatabaseCharacterSets operations. */
export interface AutonomousDatabaseCharacterSetsOperations {
  /** List AutonomousDatabaseCharacterSet resources by SubscriptionLocationResource */
  listByLocation: (
    location: string,
    options?: AutonomousDatabaseCharacterSetsListByLocationOptionalParams,
  ) => PagedAsyncIterableIterator<AutonomousDatabaseCharacterSet>;
  /** Get a AutonomousDatabaseCharacterSet */
  get: (
    location: string,
    adbscharsetname: string,
    options?: AutonomousDatabaseCharacterSetsGetOptionalParams,
  ) => Promise<AutonomousDatabaseCharacterSet>;
}

function _getAutonomousDatabaseCharacterSets(context: OracleDatabaseManagementContext) {
  return {
    listByLocation: (
      location: string,
      options?: AutonomousDatabaseCharacterSetsListByLocationOptionalParams,
    ) => listByLocation(context, location, options),
    get: (
      location: string,
      adbscharsetname: string,
      options?: AutonomousDatabaseCharacterSetsGetOptionalParams,
    ) => get(context, location, adbscharsetname, options),
  };
}

export function _getAutonomousDatabaseCharacterSetsOperations(
  context: OracleDatabaseManagementContext,
): AutonomousDatabaseCharacterSetsOperations {
  return {
    ..._getAutonomousDatabaseCharacterSets(context),
  };
}
