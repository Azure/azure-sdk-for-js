// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext } from "../../api/cdnManagementContext.js";
import { list } from "../../api/resourceUsage/operations.js";
import type { ResourceUsageListOptionalParams } from "../../api/resourceUsage/options.js";
import type { ResourceUsage } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ResourceUsage operations. */
export interface ResourceUsageOperations {
  /** Check the quota and actual usage of the CDN profiles under the given subscription. */
  list: (options?: ResourceUsageListOptionalParams) => PagedAsyncIterableIterator<ResourceUsage>;
}

function _getResourceUsage(context: CdnManagementContext) {
  return {
    list: (options?: ResourceUsageListOptionalParams) => list(context, options),
  };
}

export function _getResourceUsageOperations(
  context: CdnManagementContext,
): ResourceUsageOperations {
  return {
    ..._getResourceUsage(context),
  };
}
