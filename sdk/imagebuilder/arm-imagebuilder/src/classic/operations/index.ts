// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImageBuilderContext } from "../../api/imageBuilderContext.js";
import { list } from "../../api/operations/operations.js";
import { OperationsListOptionalParams } from "../../api/operations/options.js";
import { Operation } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** Lists available operations for the Microsoft.VirtualMachineImages provider */
  list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<Operation>;
}

function _getOperations(context: ImageBuilderContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(context: ImageBuilderContext): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
