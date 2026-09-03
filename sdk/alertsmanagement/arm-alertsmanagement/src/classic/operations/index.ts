// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AlertsManagementContext } from "../../api/alertsManagementContext.js";
import { list } from "../../api/operations/operations.js";
import { OperationsListOptionalParams } from "../../api/operations/options.js";
import { Operation } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** List all operations available through Azure Alerts Management Resource Provider. */
  list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<Operation>;
}

function _getOperations(context: AlertsManagementContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(context: AlertsManagementContext): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
