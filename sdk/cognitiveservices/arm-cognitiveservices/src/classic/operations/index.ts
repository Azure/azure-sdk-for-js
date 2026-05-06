// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { list } from "../../api/operations/operations.js";
import { OperationsListOptionalParams } from "../../api/operations/options.js";
import { Operation } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** Lists all the available Cognitive Services account operations. */
  list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<Operation>;
}

function _getOperations(context: CognitiveServicesManagementContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(
  context: CognitiveServicesManagementContext,
): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
