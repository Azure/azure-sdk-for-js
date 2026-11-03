// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext } from "../../api/computeManagementContext.js";
import { list } from "../../api/usage/operations.js";
import type { UsageListOptionalParams } from "../../api/usage/options.js";
import type { Usage } from "../../models/compute/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Usage operations. */
export interface UsageOperations {
  /** Gets, for the specified location, the current compute resource usage information as well as the limits for compute resources under the subscription. */
  list: (location: string, options?: UsageListOptionalParams) => PagedAsyncIterableIterator<Usage>;
}

function _getUsage(context: ComputeManagementContext) {
  return {
    list: (location: string, options?: UsageListOptionalParams) => list(context, location, options),
  };
}

export function _getUsageOperations(context: ComputeManagementContext): UsageOperations {
  return {
    ..._getUsage(context),
  };
}
