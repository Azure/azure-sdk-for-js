// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HealthbotContext } from "../../api/healthbotContext.js";
import { list } from "../../api/operations/operations.js";
import type { OperationsListOptionalParams } from "../../api/operations/options.js";
import type { OperationDetail } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** Lists all the available Azure Health Bot operations. */
  list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<OperationDetail>;
}

function _getOperations(context: HealthbotContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(context: HealthbotContext): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
