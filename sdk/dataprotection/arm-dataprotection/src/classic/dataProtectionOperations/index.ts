// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import { list } from "../../api/dataProtectionOperations/operations.js";
import type { DataProtectionOperationsListOptionalParams } from "../../api/dataProtectionOperations/options.js";
import type { Operation } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DataProtectionOperations operations. */
export interface DataProtectionOperationsOperations {
  /** List the operations for the provider */
  list: (
    options?: DataProtectionOperationsListOptionalParams,
  ) => PagedAsyncIterableIterator<Operation>;
}

function _getDataProtectionOperations(context: DataProtectionContext) {
  return {
    list: (options?: DataProtectionOperationsListOptionalParams) => list(context, options),
  };
}

export function _getDataProtectionOperationsOperations(
  context: DataProtectionContext,
): DataProtectionOperationsOperations {
  return {
    ..._getDataProtectionOperations(context),
  };
}
