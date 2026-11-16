// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkSecurityManagementContext } from "../../api/networkSecurityManagementContext.js";
import { get, list } from "../../api/neuroShieldSummaries/operations.js";
import type {
  NeuroShieldSummariesGetOptionalParams,
  NeuroShieldSummariesListOptionalParams,
} from "../../api/neuroShieldSummaries/options.js";
import type { NeuroShieldSummary } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a NeuroShieldSummaries operations. */
export interface NeuroShieldSummariesOperations {
  /** Gets the aggregate fleet overview singleton for a NeuroShield resource. */
  get: (
    resourceGroupName: string,
    neuroShieldName: string,
    options?: NeuroShieldSummariesGetOptionalParams,
  ) => Promise<NeuroShieldSummary>;
  /** Lists the aggregate fleet overview singleton for a NeuroShield resource. */
  list: (
    resourceGroupName: string,
    neuroShieldName: string,
    options?: NeuroShieldSummariesListOptionalParams,
  ) => PagedAsyncIterableIterator<NeuroShieldSummary>;
}

function _getNeuroShieldSummaries(context: NetworkSecurityManagementContext) {
  return {
    get: (
      resourceGroupName: string,
      neuroShieldName: string,
      options?: NeuroShieldSummariesGetOptionalParams,
    ) => get(context, resourceGroupName, neuroShieldName, options),
    list: (
      resourceGroupName: string,
      neuroShieldName: string,
      options?: NeuroShieldSummariesListOptionalParams,
    ) => list(context, resourceGroupName, neuroShieldName, options),
  };
}

export function _getNeuroShieldSummariesOperations(
  context: NetworkSecurityManagementContext,
): NeuroShieldSummariesOperations {
  return {
    ..._getNeuroShieldSummaries(context),
  };
}
