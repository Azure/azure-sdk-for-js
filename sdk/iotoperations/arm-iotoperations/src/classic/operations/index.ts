// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsContext } from "../../api/ioTOperationsContext.js";
import { Operation } from "../../models/models.js";
import { OperationsListOptionalParams } from "../../api/operations/options.js";
import { list } from "../../api/operations/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** List the operations for the provider */
  list: (
    apiVersion: string,
    options?: OperationsListOptionalParams,
  ) => PagedAsyncIterableIterator<Operation>;
}

function _getOperations(context: IoTOperationsContext) {
  return {
    list: (apiVersion: string, options?: OperationsListOptionalParams) =>
      list(context, apiVersion, options),
  };
}

export function _getOperationsOperations(context: IoTOperationsContext): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
