// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext } from "../../api/mySQLManagementFlexibleServerContext.js";
import { execute } from "../../api/checkNameAvailability/operations.js";
import type { CheckNameAvailabilityExecuteOptionalParams } from "../../api/checkNameAvailability/options.js";
import type { NameAvailabilityRequest, NameAvailability } from "../../models/models.js";

/** Interface representing a CheckNameAvailability operations. */
export interface CheckNameAvailabilityOperations {
  /** Check the availability of name for server */
  execute: (
    locationName: string,
    nameAvailabilityRequest: NameAvailabilityRequest,
    options?: CheckNameAvailabilityExecuteOptionalParams,
  ) => Promise<NameAvailability>;
}

function _getCheckNameAvailability(context: MySQLManagementFlexibleServerContext) {
  return {
    execute: (
      locationName: string,
      nameAvailabilityRequest: NameAvailabilityRequest,
      options?: CheckNameAvailabilityExecuteOptionalParams,
    ) => execute(context, locationName, nameAvailabilityRequest, options),
  };
}

export function _getCheckNameAvailabilityOperations(
  context: MySQLManagementFlexibleServerContext,
): CheckNameAvailabilityOperations {
  return {
    ..._getCheckNameAvailability(context),
  };
}
