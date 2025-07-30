// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KubernetesContext } from "../../api/kubernetesContext.js";
import { get } from "../../api/operations/operations.js";
import { OperationsGetOptionalParams } from "../../api/operations/options.js";
import { Operation } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** List the operations for the provider */
  get: (options?: OperationsGetOptionalParams) => PagedAsyncIterableIterator<Operation>;
}

function _getOperations(context: KubernetesContext) {
  return {
    get: (options?: OperationsGetOptionalParams) => get(context, options),
  };
}

export function _getOperationsOperations(context: KubernetesContext): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
