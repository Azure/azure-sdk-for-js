// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PowerPlatformContext } from "../../api/powerPlatformContext.js";
import { list } from "../../api/operations/operations.js";
import { OperationsListOptionalParams } from "../../api/operations/options.js";
import { Operation } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** Lists all of the available PowerPlatform REST API operations. */
  list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<Operation>;
}

function _getOperations(context: PowerPlatformContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(context: PowerPlatformContext): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
