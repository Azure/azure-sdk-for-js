// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfidentialLedgerContext } from "../../api/confidentialLedgerContext.js";
import { list } from "../../api/operations/operations.js";
import { OperationsListOptionalParams } from "../../api/operations/options.js";
import { ResourceProviderOperationDefinition } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** List the operations for the provider */
  list: (
    options?: OperationsListOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceProviderOperationDefinition>;
}

function _getOperations(context: ConfidentialLedgerContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(context: ConfidentialLedgerContext): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
