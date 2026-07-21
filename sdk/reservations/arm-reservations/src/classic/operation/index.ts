// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureReservationAPIContext } from "../../api/azureReservationAPIContext.js";
import { list } from "../../api/operation/operations.js";
import type { OperationListOptionalParams } from "../../api/operation/options.js";
import type { OperationResponse } from "../../models/reservations/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operation operations. */
export interface OperationOperations {
  /** List all the operations. */
  list: (options?: OperationListOptionalParams) => PagedAsyncIterableIterator<OperationResponse>;
}

function _getOperation(context: AzureReservationAPIContext) {
  return {
    list: (options?: OperationListOptionalParams) => list(context, options),
  };
}

export function _getOperationOperations(context: AzureReservationAPIContext): OperationOperations {
  return {
    ..._getOperation(context),
  };
}
