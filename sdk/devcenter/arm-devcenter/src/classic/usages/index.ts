// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext } from "../../api/devCenterContext.js";
import { listByLocation } from "../../api/usages/operations.js";
import type { UsagesListByLocationOptionalParams } from "../../api/usages/options.js";
import type { Usage } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Usages operations. */
export interface UsagesOperations {
  /** Lists the current usages and limits in this location for the provided subscription. */
  listByLocation: (
    location: string,
    options?: UsagesListByLocationOptionalParams,
  ) => PagedAsyncIterableIterator<Usage>;
}

function _getUsages(context: DevCenterContext) {
  return {
    listByLocation: (location: string, options?: UsagesListByLocationOptionalParams) =>
      listByLocation(context, location, options),
  };
}

export function _getUsagesOperations(context: DevCenterContext): UsagesOperations {
  return {
    ..._getUsages(context),
  };
}
