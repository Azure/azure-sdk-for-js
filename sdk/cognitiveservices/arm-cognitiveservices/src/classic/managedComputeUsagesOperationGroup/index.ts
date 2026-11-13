// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { list } from "../../api/managedComputeUsagesOperationGroup/operations.js";
import type { ManagedComputeUsagesOperationGroupListOptionalParams } from "../../api/managedComputeUsagesOperationGroup/options.js";
import type { ManagedComputeUsage } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ManagedComputeUsagesOperationGroup operations. */
export interface ManagedComputeUsagesOperationGroupOperations {
  /** List managed compute quota usages for a subscription and location. */
  list: (
    location: string,
    options?: ManagedComputeUsagesOperationGroupListOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedComputeUsage>;
}

function _getManagedComputeUsagesOperationGroup(context: CognitiveServicesManagementContext) {
  return {
    list: (location: string, options?: ManagedComputeUsagesOperationGroupListOptionalParams) =>
      list(context, location, options),
  };
}

export function _getManagedComputeUsagesOperationGroupOperations(
  context: CognitiveServicesManagementContext,
): ManagedComputeUsagesOperationGroupOperations {
  return {
    ..._getManagedComputeUsagesOperationGroup(context),
  };
}
