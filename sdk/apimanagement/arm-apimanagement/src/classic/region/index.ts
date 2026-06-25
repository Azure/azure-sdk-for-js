// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext } from "../../api/apiManagementContext.js";
import { listByService } from "../../api/region/operations.js";
import { RegionListByServiceOptionalParams } from "../../api/region/options.js";
import { RegionContract } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Region operations. */
export interface RegionOperations {
  /** Lists all azure regions in which the service exists. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: RegionListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<RegionContract>;
}

function _getRegion(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: RegionListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
  };
}

export function _getRegionOperations(context: ApiManagementContext): RegionOperations {
  return {
    ..._getRegion(context),
  };
}
