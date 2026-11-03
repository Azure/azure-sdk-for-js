// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import {
  markLastKnownGood,
  getLastKnownGood,
  listLastKnownGoods,
} from "../../api/lastKnownGoodResources/operations.js";
import type {
  LastKnownGoodResourcesMarkLastKnownGoodOptionalParams,
  LastKnownGoodResourcesGetLastKnownGoodOptionalParams,
  LastKnownGoodResourcesListLastKnownGoodsOptionalParams,
} from "../../api/lastKnownGoodResources/options.js";
import type { LastKnownGoodResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a LastKnownGoodResources operations. */
export interface LastKnownGoodResourcesOperations {
  /** Marks the current Web App state as last known good. */
  markLastKnownGood: (
    resourceGroupName: string,
    name: string,
    options?: LastKnownGoodResourcesMarkLastKnownGoodOptionalParams,
  ) => Promise<LastKnownGoodResource>;
  /** Gets the last known good revision state for a Web App. */
  getLastKnownGood: (
    resourceGroupName: string,
    name: string,
    options?: LastKnownGoodResourcesGetLastKnownGoodOptionalParams,
  ) => Promise<LastKnownGoodResource>;
  /** Lists the last known good revision state for a Web App. */
  listLastKnownGoods: (
    resourceGroupName: string,
    name: string,
    options?: LastKnownGoodResourcesListLastKnownGoodsOptionalParams,
  ) => PagedAsyncIterableIterator<LastKnownGoodResource>;
}

function _getLastKnownGoodResources(context: WebSiteManagementContext) {
  return {
    markLastKnownGood: (
      resourceGroupName: string,
      name: string,
      options?: LastKnownGoodResourcesMarkLastKnownGoodOptionalParams,
    ) => markLastKnownGood(context, resourceGroupName, name, options),
    getLastKnownGood: (
      resourceGroupName: string,
      name: string,
      options?: LastKnownGoodResourcesGetLastKnownGoodOptionalParams,
    ) => getLastKnownGood(context, resourceGroupName, name, options),
    listLastKnownGoods: (
      resourceGroupName: string,
      name: string,
      options?: LastKnownGoodResourcesListLastKnownGoodsOptionalParams,
    ) => listLastKnownGoods(context, resourceGroupName, name, options),
  };
}

export function _getLastKnownGoodResourcesOperations(
  context: WebSiteManagementContext,
): LastKnownGoodResourcesOperations {
  return {
    ..._getLastKnownGoodResources(context),
  };
}
