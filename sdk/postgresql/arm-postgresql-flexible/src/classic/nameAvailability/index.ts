// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgreSQLManagementFlexibleServerContext } from "../../api/postgreSQLManagementFlexibleServerContext.js";
import { checkWithLocation, checkGlobally } from "../../api/nameAvailability/operations.js";
import type {
  NameAvailabilityCheckWithLocationOptionalParams,
  NameAvailabilityCheckGloballyOptionalParams,
} from "../../api/nameAvailability/options.js";
import type { CheckNameAvailabilityRequest, NameAvailabilityModel } from "../../models/models.js";

/** Interface representing a NameAvailability operations. */
export interface NameAvailabilityOperations {
  /** Check the availability of name for resource */
  checkWithLocation: (
    locationName: string,
    parameters: CheckNameAvailabilityRequest,
    options?: NameAvailabilityCheckWithLocationOptionalParams,
  ) => Promise<NameAvailabilityModel>;
  /** Checks the validity and availability of the given name, to assign it to a new server or to use it as the base name of a new pair of virtual endpoints. */
  checkGlobally: (
    parameters: CheckNameAvailabilityRequest,
    options?: NameAvailabilityCheckGloballyOptionalParams,
  ) => Promise<NameAvailabilityModel>;
}

function _getNameAvailability(context: PostgreSQLManagementFlexibleServerContext) {
  return {
    checkWithLocation: (
      locationName: string,
      parameters: CheckNameAvailabilityRequest,
      options?: NameAvailabilityCheckWithLocationOptionalParams,
    ) => checkWithLocation(context, locationName, parameters, options),
    checkGlobally: (
      parameters: CheckNameAvailabilityRequest,
      options?: NameAvailabilityCheckGloballyOptionalParams,
    ) => checkGlobally(context, parameters, options),
  };
}

export function _getNameAvailabilityOperations(
  context: PostgreSQLManagementFlexibleServerContext,
): NameAvailabilityOperations {
  return {
    ..._getNameAvailability(context),
  };
}
