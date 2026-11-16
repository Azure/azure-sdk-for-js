// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext } from "../../api/siteRecoveryManagementContext.js";
import { list } from "../../api/operations/operations.js";
import type { OperationsListOptionalParams } from "../../api/operations/options.js";
import type { OperationsDiscovery } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** Operation to return the list of available operations. */
  list: (
    resourceGroupName: string,
    options?: OperationsListOptionalParams,
  ) => PagedAsyncIterableIterator<OperationsDiscovery>;
}

function _getOperations(context: SiteRecoveryManagementContext) {
  return {
    list: (resourceGroupName: string, options?: OperationsListOptionalParams) =>
      list(context, resourceGroupName, options),
  };
}

export function _getOperationsOperations(
  context: SiteRecoveryManagementContext,
): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
