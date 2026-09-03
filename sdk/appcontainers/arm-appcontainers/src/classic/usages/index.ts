// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import { list } from "../../api/usages/operations.js";
import { UsagesListOptionalParams } from "../../api/usages/options.js";
import { Usage } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Usages operations. */
export interface UsagesOperations {
  /** Gets, for the specified location, the current resource usage information as well as the limits under the subscription. */
  list: (location: string, options?: UsagesListOptionalParams) => PagedAsyncIterableIterator<Usage>;
}

function _getUsages(context: ContainerAppsAPIContext) {
  return {
    list: (location: string, options?: UsagesListOptionalParams) =>
      list(context, location, options),
  };
}

export function _getUsagesOperations(context: ContainerAppsAPIContext): UsagesOperations {
  return {
    ..._getUsages(context),
  };
}
