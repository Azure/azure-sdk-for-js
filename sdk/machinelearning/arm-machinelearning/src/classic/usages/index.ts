// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import { list } from "../../api/usages/operations.js";
import type { UsagesListOptionalParams } from "../../api/usages/options.js";
import type { Usage } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Usages operations. */
export interface UsagesOperations {
  /** Gets the current usage information as well as limits for AML resources for given subscription and location. */
  list: (location: string, options?: UsagesListOptionalParams) => PagedAsyncIterableIterator<Usage>;
}

function _getUsages(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (location: string, options?: UsagesListOptionalParams) =>
      list(context, location, options),
  };
}

export function _getUsagesOperations(
  context: AzureMachineLearningServicesManagementContext,
): UsagesOperations {
  return {
    ..._getUsages(context),
  };
}
