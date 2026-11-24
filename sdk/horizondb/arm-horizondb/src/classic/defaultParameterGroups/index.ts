// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext } from "../../api/horizonDbContext.js";
import { get, listBySubscriptionAndRegion } from "../../api/defaultParameterGroups/operations.js";
import type {
  DefaultParameterGroupsGetOptionalParams,
  DefaultParameterGroupsListBySubscriptionAndRegionOptionalParams,
} from "../../api/defaultParameterGroups/options.js";
import type { DefaultParameterGroup } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DefaultParameterGroups operations. */
export interface DefaultParameterGroupsOperations {
  /** Gets a default parameter group available for a subscription in a specific region. Each PostgreSQL version has at most one default parameter group in a location. */
  get: (
    location: string,
    name: string,
    options?: DefaultParameterGroupsGetOptionalParams,
  ) => Promise<DefaultParameterGroup>;
  /** Lists default parameter groups available for a subscription in a specific region. The response contains at most one default parameter group for each PostgreSQL version. */
  listBySubscriptionAndRegion: (
    location: string,
    options?: DefaultParameterGroupsListBySubscriptionAndRegionOptionalParams,
  ) => PagedAsyncIterableIterator<DefaultParameterGroup>;
}

function _getDefaultParameterGroups(context: HorizonDbContext) {
  return {
    get: (location: string, name: string, options?: DefaultParameterGroupsGetOptionalParams) =>
      get(context, location, name, options),
    listBySubscriptionAndRegion: (
      location: string,
      options?: DefaultParameterGroupsListBySubscriptionAndRegionOptionalParams,
    ) => listBySubscriptionAndRegion(context, location, options),
  };
}

export function _getDefaultParameterGroupsOperations(
  context: HorizonDbContext,
): DefaultParameterGroupsOperations {
  return {
    ..._getDefaultParameterGroups(context),
  };
}
