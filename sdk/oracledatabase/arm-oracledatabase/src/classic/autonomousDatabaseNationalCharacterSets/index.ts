// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext } from "../../api/oracleDatabaseManagementContext.js";
import {
  listByLocation,
  get,
} from "../../api/autonomousDatabaseNationalCharacterSets/operations.js";
import type {
  AutonomousDatabaseNationalCharacterSetsListByLocationOptionalParams,
  AutonomousDatabaseNationalCharacterSetsGetOptionalParams,
} from "../../api/autonomousDatabaseNationalCharacterSets/options.js";
import type { AutonomousDatabaseNationalCharacterSet } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AutonomousDatabaseNationalCharacterSets operations. */
export interface AutonomousDatabaseNationalCharacterSetsOperations {
  /** List AutonomousDatabaseNationalCharacterSet resources by SubscriptionLocationResource */
  listByLocation: (
    location: string,
    options?: AutonomousDatabaseNationalCharacterSetsListByLocationOptionalParams,
  ) => PagedAsyncIterableIterator<AutonomousDatabaseNationalCharacterSet>;
  /** Get a AutonomousDatabaseNationalCharacterSet */
  get: (
    location: string,
    adbsncharsetname: string,
    options?: AutonomousDatabaseNationalCharacterSetsGetOptionalParams,
  ) => Promise<AutonomousDatabaseNationalCharacterSet>;
}

function _getAutonomousDatabaseNationalCharacterSets(context: OracleDatabaseManagementContext) {
  return {
    listByLocation: (
      location: string,
      options?: AutonomousDatabaseNationalCharacterSetsListByLocationOptionalParams,
    ) => listByLocation(context, location, options),
    get: (
      location: string,
      adbsncharsetname: string,
      options?: AutonomousDatabaseNationalCharacterSetsGetOptionalParams,
    ) => get(context, location, adbsncharsetname, options),
  };
}

export function _getAutonomousDatabaseNationalCharacterSetsOperations(
  context: OracleDatabaseManagementContext,
): AutonomousDatabaseNationalCharacterSetsOperations {
  return {
    ..._getAutonomousDatabaseNationalCharacterSets(context),
  };
}
