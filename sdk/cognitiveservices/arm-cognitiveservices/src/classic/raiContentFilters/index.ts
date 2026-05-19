// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { list, get } from "../../api/raiContentFilters/operations.js";
import type {
  RaiContentFiltersListOptionalParams,
  RaiContentFiltersGetOptionalParams,
} from "../../api/raiContentFilters/options.js";
import type { RaiContentFilter } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RaiContentFilters operations. */
export interface RaiContentFiltersOperations {
  /** List Content Filters types. */
  list: (
    location: string,
    options?: RaiContentFiltersListOptionalParams,
  ) => PagedAsyncIterableIterator<RaiContentFilter>;
  /** Get Content Filters by Name. */
  get: (
    location: string,
    filterName: string,
    options?: RaiContentFiltersGetOptionalParams,
  ) => Promise<RaiContentFilter>;
}

function _getRaiContentFilters(context: CognitiveServicesManagementContext) {
  return {
    list: (location: string, options?: RaiContentFiltersListOptionalParams) =>
      list(context, location, options),
    get: (location: string, filterName: string, options?: RaiContentFiltersGetOptionalParams) =>
      get(context, location, filterName, options),
  };
}

export function _getRaiContentFiltersOperations(
  context: CognitiveServicesManagementContext,
): RaiContentFiltersOperations {
  return {
    ..._getRaiContentFilters(context),
  };
}
