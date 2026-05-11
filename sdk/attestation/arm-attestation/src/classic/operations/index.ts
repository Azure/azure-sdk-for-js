// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AttestationManagementContext } from "../../api/attestationManagementContext.js";
import { list } from "../../api/operations/operations.js";
import { OperationsListOptionalParams } from "../../api/operations/options.js";
import { OperationsDefinition } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** List the operations for the provider */
  list: (
    options?: OperationsListOptionalParams,
  ) => PagedAsyncIterableIterator<OperationsDefinition>;
}

function _getOperations(context: AttestationManagementContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(
  context: AttestationManagementContext,
): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
