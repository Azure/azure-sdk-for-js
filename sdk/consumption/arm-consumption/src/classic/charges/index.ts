// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConsumptionManagementContext } from "../../api/consumptionManagementContext.js";
import { list } from "../../api/charges/operations.js";
import type { ChargesListOptionalParams } from "../../api/charges/options.js";
import type { ChargesListResult } from "../../models/models.js";

/** Interface representing a Charges operations. */
export interface ChargesOperations {
  /** Lists the charges based for the defined scope. */
  list: (scope: string, options?: ChargesListOptionalParams) => Promise<ChargesListResult>;
}

function _getCharges(context: ConsumptionManagementContext) {
  return {
    list: (scope: string, options?: ChargesListOptionalParams) => list(context, scope, options),
  };
}

export function _getChargesOperations(context: ConsumptionManagementContext): ChargesOperations {
  return {
    ..._getCharges(context),
  };
}
