// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { list } from "../../api/usages/operations.js";
import { UsagesListOptionalParams } from "../../api/usages/options.js";
import { Usage } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Usages operations. */
export interface UsagesOperations {
  /** Get usages for the requested subscription */
  list: (location: string, options?: UsagesListOptionalParams) => PagedAsyncIterableIterator<Usage>;
}

function _getUsages(context: CognitiveServicesManagementContext) {
  return {
    list: (location: string, options?: UsagesListOptionalParams) =>
      list(context, location, options),
  };
}

export function _getUsagesOperations(
  context: CognitiveServicesManagementContext,
): UsagesOperations {
  return {
    ..._getUsages(context),
  };
}
