// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext } from "../../api/horizonDbContext.js";
import { list, get } from "../../api/horizonDbPools/operations.js";
import type {
  HorizonDbPoolsListOptionalParams,
  HorizonDbPoolsGetOptionalParams,
} from "../../api/horizonDbPools/options.js";
import type { HorizonDbPool } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a HorizonDbPools operations. */
export interface HorizonDbPoolsOperations {
  /** Lists all HorizonDb pools in a cluster. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    options?: HorizonDbPoolsListOptionalParams,
  ) => PagedAsyncIterableIterator<HorizonDbPool>;
  /** Gets information about a HorizonDb pool. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    poolName: string,
    options?: HorizonDbPoolsGetOptionalParams,
  ) => Promise<HorizonDbPool>;
}

function _getHorizonDbPools(context: HorizonDbContext) {
  return {
    list: (
      resourceGroupName: string,
      clusterName: string,
      options?: HorizonDbPoolsListOptionalParams,
    ) => list(context, resourceGroupName, clusterName, options),
    get: (
      resourceGroupName: string,
      clusterName: string,
      poolName: string,
      options?: HorizonDbPoolsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, poolName, options),
  };
}

export function _getHorizonDbPoolsOperations(context: HorizonDbContext): HorizonDbPoolsOperations {
  return {
    ..._getHorizonDbPools(context),
  };
}
