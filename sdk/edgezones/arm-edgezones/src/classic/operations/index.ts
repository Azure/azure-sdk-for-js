// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeZonesContext } from "../../api/edgeZonesContext.js";
import { Operation } from "../../models/models.js";
import { operationsList } from "../../api/operations/index.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { OperationsListOptionalParams } from "../../models/options.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** List the operations for the provider */
  list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<Operation>;
}

export function getOperations(context: EdgeZonesContext) {
  return {
    list: (options?: OperationsListOptionalParams) => operationsList(context, options),
  };
}

export function getOperationsOperations(context: EdgeZonesContext): OperationsOperations {
  return {
    ...getOperations(context),
  };
}
