// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HealthcareApisManagementContext } from "../../api/healthcareApisManagementContext.js";
import { list } from "../../api/operations/operations.js";
import type { OperationsListOptionalParams } from "../../api/operations/options.js";
import type { OperationDetail } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** Lists all of the available operations supported by Microsoft Healthcare resource provider. */
  list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<OperationDetail>;
}

function _getOperations(context: HealthcareApisManagementContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(
  context: HealthcareApisManagementContext,
): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
