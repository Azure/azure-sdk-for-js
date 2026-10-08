// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PrivateTrafficManagerManagementContext } from "../../api/privateTrafficManagerManagementContext.js";
import { listByParent, $delete, update, createOrUpdate, get } from "../../api/sites/operations.js";
import type {
  SitesListByParentOptionalParams,
  SitesDeleteOptionalParams,
  SitesUpdateOptionalParams,
  SitesCreateOrUpdateOptionalParams,
  SitesGetOptionalParams,
} from "../../api/sites/options.js";
import type { Site, SiteUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Sites operations. */
export interface SitesOperations {
  /** Lists all Sites within a topology map. */
  listByParent: (
    resourceGroupName: string,
    topologyMapName: string,
    options?: SitesListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<Site>;
  /** Deletes a Site. */
  delete: (
    resourceGroupName: string,
    topologyMapName: string,
    siteName: string,
    options?: SitesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a Site. */
  update: (
    resourceGroupName: string,
    topologyMapName: string,
    siteName: string,
    properties: SiteUpdate,
    options?: SitesUpdateOptionalParams,
  ) => PollerLike<OperationState<Site>, Site>;
  /** Create or update a Site. */
  createOrUpdate: (
    resourceGroupName: string,
    topologyMapName: string,
    siteName: string,
    resource: Site,
    options?: SitesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Site>, Site>;
  /** Gets a Site. */
  get: (
    resourceGroupName: string,
    topologyMapName: string,
    siteName: string,
    options?: SitesGetOptionalParams,
  ) => Promise<Site>;
}

function _getSites(context: PrivateTrafficManagerManagementContext) {
  return {
    listByParent: (
      resourceGroupName: string,
      topologyMapName: string,
      options?: SitesListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, topologyMapName, options),
    delete: (
      resourceGroupName: string,
      topologyMapName: string,
      siteName: string,
      options?: SitesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, topologyMapName, siteName, options),
    update: (
      resourceGroupName: string,
      topologyMapName: string,
      siteName: string,
      properties: SiteUpdate,
      options?: SitesUpdateOptionalParams,
    ) => update(context, resourceGroupName, topologyMapName, siteName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      topologyMapName: string,
      siteName: string,
      resource: Site,
      options?: SitesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, topologyMapName, siteName, resource, options),
    get: (
      resourceGroupName: string,
      topologyMapName: string,
      siteName: string,
      options?: SitesGetOptionalParams,
    ) => get(context, resourceGroupName, topologyMapName, siteName, options),
  };
}

export function _getSitesOperations(
  context: PrivateTrafficManagerManagementContext,
): SitesOperations {
  return {
    ..._getSites(context),
  };
}
