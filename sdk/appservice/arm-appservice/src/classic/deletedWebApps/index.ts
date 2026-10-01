// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import {
  list,
  listByLocation,
  getDeletedWebAppByLocation,
} from "../../api/deletedWebApps/operations.js";
import type {
  DeletedWebAppsListOptionalParams,
  DeletedWebAppsListByLocationOptionalParams,
  DeletedWebAppsGetDeletedWebAppByLocationOptionalParams,
} from "../../api/deletedWebApps/options.js";
import type { DeletedSite } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DeletedWebApps operations. */
export interface DeletedWebAppsOperations {
  /** Description for Get all deleted apps for a subscription. */
  list: (options?: DeletedWebAppsListOptionalParams) => PagedAsyncIterableIterator<DeletedSite>;
  /** Description for Get all deleted apps for a subscription at location */
  listByLocation: (
    location: string,
    options?: DeletedWebAppsListByLocationOptionalParams,
  ) => PagedAsyncIterableIterator<DeletedSite>;
  /** Description for Get deleted app for a subscription at location. */
  getDeletedWebAppByLocation: (
    location: string,
    deletedSiteId: string,
    options?: DeletedWebAppsGetDeletedWebAppByLocationOptionalParams,
  ) => Promise<DeletedSite>;
}

function _getDeletedWebApps(context: WebSiteManagementContext) {
  return {
    list: (options?: DeletedWebAppsListOptionalParams) => list(context, options),
    listByLocation: (location: string, options?: DeletedWebAppsListByLocationOptionalParams) =>
      listByLocation(context, location, options),
    getDeletedWebAppByLocation: (
      location: string,
      deletedSiteId: string,
      options?: DeletedWebAppsGetDeletedWebAppByLocationOptionalParams,
    ) => getDeletedWebAppByLocation(context, location, deletedSiteId, options),
  };
}

export function _getDeletedWebAppsOperations(
  context: WebSiteManagementContext,
): DeletedWebAppsOperations {
  return {
    ..._getDeletedWebApps(context),
  };
}
