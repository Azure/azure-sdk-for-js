// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureTerraformContext } from "../../api/azureTerraformContext.js";
import { operationsList } from "../../api/operations/index.js";
import type { OperationsListOptionalParams } from "../../api/options.js";
import type { Operation } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** List the operations for the provider */
  list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<Operation>;
}

export function getOperations(context: AzureTerraformContext) {
  return {
    list: (options?: OperationsListOptionalParams) => operationsList(context, options),
  };
}

export function getOperationsOperations(context: AzureTerraformContext): OperationsOperations {
  return {
    ...getOperations(context),
  };
}
