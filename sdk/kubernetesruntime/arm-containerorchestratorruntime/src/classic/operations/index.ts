// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KubernetesRuntimeContext } from "../../api/kubernetesRuntimeContext.js";
import { list } from "../../api/operations/operations.js";
import { OperationsListOptionalParams } from "../../api/operations/options.js";
import { Operation } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** List the operations for the provider */
  list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<Operation>;
}

function _getOperations(context: KubernetesRuntimeContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(context: KubernetesRuntimeContext): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
