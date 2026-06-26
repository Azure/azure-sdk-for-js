// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommunicationServiceManagementContext } from "../../api/communicationServiceManagementContext.js";
import { list } from "../../api/operations/operations.js";
import { OperationsListOptionalParams } from "../../api/operations/options.js";
import { Operation } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** Lists all of the available REST API operations of the Microsoft.Communication provider. */
  list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<Operation>;
}

function _getOperations(context: CommunicationServiceManagementContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(
  context: CommunicationServiceManagementContext,
): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
