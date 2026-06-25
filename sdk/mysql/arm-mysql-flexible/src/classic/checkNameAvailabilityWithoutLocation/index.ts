// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerContext } from "../../api/mySQLManagementFlexibleServerContext.js";
import { execute } from "../../api/checkNameAvailabilityWithoutLocation/operations.js";
import { CheckNameAvailabilityWithoutLocationExecuteOptionalParams } from "../../api/checkNameAvailabilityWithoutLocation/options.js";
import { NameAvailabilityRequest, NameAvailability } from "../../models/models.js";

/** Interface representing a CheckNameAvailabilityWithoutLocation operations. */
export interface CheckNameAvailabilityWithoutLocationOperations {
  /** Check the availability of name for server */
  execute: (
    nameAvailabilityRequest: NameAvailabilityRequest,
    options?: CheckNameAvailabilityWithoutLocationExecuteOptionalParams,
  ) => Promise<NameAvailability>;
}

function _getCheckNameAvailabilityWithoutLocation(context: MySQLManagementFlexibleServerContext) {
  return {
    execute: (
      nameAvailabilityRequest: NameAvailabilityRequest,
      options?: CheckNameAvailabilityWithoutLocationExecuteOptionalParams,
    ) => execute(context, nameAvailabilityRequest, options),
  };
}

export function _getCheckNameAvailabilityWithoutLocationOperations(
  context: MySQLManagementFlexibleServerContext,
): CheckNameAvailabilityWithoutLocationOperations {
  return {
    ..._getCheckNameAvailabilityWithoutLocation(context),
  };
}
