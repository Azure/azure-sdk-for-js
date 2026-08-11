// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftResourceHealthContext } from "../../api/microsoftResourceHealthContext.js";
import { list } from "../../api/operations/operations.js";
import { OperationsListOptionalParams } from "../../api/operations/options.js";
import { OperationListResult } from "../../models/models.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** Lists available operations for the resourcehealth resource provider */
  list: (options?: OperationsListOptionalParams) => Promise<OperationListResult>;
}

function _getOperations(context: MicrosoftResourceHealthContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(
  context: MicrosoftResourceHealthContext,
): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
