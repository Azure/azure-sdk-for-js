// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext } from "../../api/cdnManagementContext.js";
import { list } from "../../api/resourceUsageOperations/operations.js";
import type { ResourceUsageOperationsListOptionalParams } from "../../api/resourceUsageOperations/options.js";
import type { ResourceUsage } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ResourceUsageOperations operations. */
export interface ResourceUsageOperationsOperations {
  /** Check the quota and actual usage of the CDN profiles under the given subscription. */
  list: (
    options?: ResourceUsageOperationsListOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceUsage>;
}

function _getResourceUsageOperations(context: CdnManagementContext) {
  return {
    list: (options?: ResourceUsageOperationsListOptionalParams) => list(context, options),
  };
}

export function _getResourceUsageOperationsOperations(
  context: CdnManagementContext,
): ResourceUsageOperationsOperations {
  return {
    ..._getResourceUsageOperations(context),
  };
}
