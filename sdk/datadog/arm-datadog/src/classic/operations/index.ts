// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftDatadogContext } from "../../api/microsoftDatadogContext.js";
import { list } from "../../api/operations/operations.js";
import { OperationsListOptionalParams } from "../../api/operations/options.js";
import { OperationResult } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** List all operations provided by Microsoft.Datadog for the 2025-06-11 api version. */
  list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<OperationResult>;
}

function _getOperations(context: MicrosoftDatadogContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(context: MicrosoftDatadogContext): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
