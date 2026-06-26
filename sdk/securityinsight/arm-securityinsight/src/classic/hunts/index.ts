// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/hunts/operations.js";
import {
  HuntsListOptionalParams,
  HuntsDeleteOptionalParams,
  HuntsCreateOrUpdateOptionalParams,
  HuntsGetOptionalParams,
} from "../../api/hunts/options.js";
import { Hunt } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Hunts operations. */
export interface HuntsOperations {
  /** Gets all hunts, without relations and comments. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: HuntsListOptionalParams,
  ) => PagedAsyncIterableIterator<Hunt>;
  /** Delete a hunt. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    huntId: string,
    options?: HuntsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a hunt */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    huntId: string,
    hunt: Hunt,
    options?: HuntsCreateOrUpdateOptionalParams,
  ) => Promise<Hunt>;
  /** Gets a hunt, without relations and comments. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    huntId: string,
    options?: HuntsGetOptionalParams,
  ) => Promise<Hunt>;
}

function _getHunts(context: SecurityInsightsContext) {
  return {
    list: (resourceGroupName: string, workspaceName: string, options?: HuntsListOptionalParams) =>
      list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      huntId: string,
      options?: HuntsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, huntId, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      huntId: string,
      hunt: Hunt,
      options?: HuntsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, huntId, hunt, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      huntId: string,
      options?: HuntsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, huntId, options),
  };
}

export function _getHuntsOperations(context: SecurityInsightsContext): HuntsOperations {
  return {
    ..._getHunts(context),
  };
}
