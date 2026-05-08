// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext } from "../../api/horizonDbContext.js";
import { list, get } from "../../api/horizonDbPrivateLinkResources/operations.js";
import type {
  HorizonDbPrivateLinkResourcesListOptionalParams,
  HorizonDbPrivateLinkResourcesGetOptionalParams,
} from "../../api/horizonDbPrivateLinkResources/options.js";
import type { HorizonDbPrivateLinkResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a HorizonDbPrivateLinkResources operations. */
export interface HorizonDbPrivateLinkResourcesOperations {
  /** Lists private link resources in a HorizonDb cluster. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    options?: HorizonDbPrivateLinkResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<HorizonDbPrivateLinkResource>;
  /** Gets a private link resource. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    groupName: string,
    options?: HorizonDbPrivateLinkResourcesGetOptionalParams,
  ) => Promise<HorizonDbPrivateLinkResource>;
}

function _getHorizonDbPrivateLinkResources(context: HorizonDbContext) {
  return {
    list: (
      resourceGroupName: string,
      clusterName: string,
      options?: HorizonDbPrivateLinkResourcesListOptionalParams,
    ) => list(context, resourceGroupName, clusterName, options),
    get: (
      resourceGroupName: string,
      clusterName: string,
      groupName: string,
      options?: HorizonDbPrivateLinkResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, groupName, options),
  };
}

export function _getHorizonDbPrivateLinkResourcesOperations(
  context: HorizonDbContext,
): HorizonDbPrivateLinkResourcesOperations {
  return {
    ..._getHorizonDbPrivateLinkResources(context),
  };
}
