// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementContext } from "../../api/storageCacheManagementContext.js";
import { list } from "../../api/usageModels/operations.js";
import { UsageModelsListOptionalParams } from "../../api/usageModels/options.js";
import { UsageModel } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a UsageModels operations. */
export interface UsageModelsOperations {
  /** Get the list of cache usage models available to this subscription. */
  list: (options?: UsageModelsListOptionalParams) => PagedAsyncIterableIterator<UsageModel>;
}

function _getUsageModels(context: StorageCacheManagementContext) {
  return {
    list: (options?: UsageModelsListOptionalParams) => list(context, options),
  };
}

export function _getUsageModelsOperations(
  context: StorageCacheManagementContext,
): UsageModelsOperations {
  return {
    ..._getUsageModels(context),
  };
}
