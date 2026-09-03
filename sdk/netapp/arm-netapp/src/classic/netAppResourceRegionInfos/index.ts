// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import { list, get } from "../../api/netAppResourceRegionInfos/operations.js";
import type {
  NetAppResourceRegionInfosListOptionalParams,
  NetAppResourceRegionInfosGetOptionalParams,
} from "../../api/netAppResourceRegionInfos/options.js";
import type { RegionInfoResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a NetAppResourceRegionInfos operations. */
export interface NetAppResourceRegionInfosOperations {
  /** Provides region specific information. */
  list: (
    location: string,
    options?: NetAppResourceRegionInfosListOptionalParams,
  ) => PagedAsyncIterableIterator<RegionInfoResource>;
  /** Provides storage to network proximity and logical zone mapping information. */
  get: (
    location: string,
    options?: NetAppResourceRegionInfosGetOptionalParams,
  ) => Promise<RegionInfoResource>;
}

function _getNetAppResourceRegionInfos(context: NetAppManagementContext) {
  return {
    list: (location: string, options?: NetAppResourceRegionInfosListOptionalParams) =>
      list(context, location, options),
    get: (location: string, options?: NetAppResourceRegionInfosGetOptionalParams) =>
      get(context, location, options),
  };
}

export function _getNetAppResourceRegionInfosOperations(
  context: NetAppManagementContext,
): NetAppResourceRegionInfosOperations {
  return {
    ..._getNetAppResourceRegionInfos(context),
  };
}
