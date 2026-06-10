// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConnectedKubernetesContext } from "../../api/connectedKubernetesContext.js";
import { get } from "../../api/operations/operations.js";
import type { OperationsGetOptionalParams } from "../../api/operations/options.js";
import type { Operation } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** List the operations for the provider */
  get: (options?: OperationsGetOptionalParams) => PagedAsyncIterableIterator<Operation>;
}

function _getOperations(context: ConnectedKubernetesContext) {
  return {
    get: (options?: OperationsGetOptionalParams) => get(context, options),
  };
}

export function _getOperationsOperations(
  context: ConnectedKubernetesContext,
): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
