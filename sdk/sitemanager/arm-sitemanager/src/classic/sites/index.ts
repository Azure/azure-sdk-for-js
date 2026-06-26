// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeContext } from "../../api/edgeContext.js";
import {
  $delete,
  update,
  createOrUpdate,
  get,
  listByResourceGroup,
} from "../../api/sites/operations.js";
import {
  SitesDeleteOptionalParams,
  SitesUpdateOptionalParams,
  SitesCreateOrUpdateOptionalParams,
  SitesGetOptionalParams,
  SitesListByResourceGroupOptionalParams,
} from "../../api/sites/options.js";
import { Site, SiteUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Sites operations. */
export interface SitesOperations {
  /** Delete a Site */
  delete: (
    resourceGroupName: string,
    siteName: string,
    options?: SitesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a Site */
  update: (
    resourceGroupName: string,
    siteName: string,
    properties: SiteUpdate,
    options?: SitesUpdateOptionalParams,
  ) => Promise<Site>;
  /** Create a Site */
  createOrUpdate: (
    resourceGroupName: string,
    siteName: string,
    resource: Site,
    options?: SitesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Site>, Site>;
  /** Get a Site */
  get: (
    resourceGroupName: string,
    siteName: string,
    options?: SitesGetOptionalParams,
  ) => Promise<Site>;
  /** List Site resources by scope */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: SitesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Site>;
}

function _getSites(context: EdgeContext) {
  return {
    delete: (resourceGroupName: string, siteName: string, options?: SitesDeleteOptionalParams) =>
      $delete(context, resourceGroupName, siteName, options),
    update: (
      resourceGroupName: string,
      siteName: string,
      properties: SiteUpdate,
      options?: SitesUpdateOptionalParams,
    ) => update(context, resourceGroupName, siteName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      siteName: string,
      resource: Site,
      options?: SitesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, siteName, resource, options),
    get: (resourceGroupName: string, siteName: string, options?: SitesGetOptionalParams) =>
      get(context, resourceGroupName, siteName, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: SitesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
  };
}

export function _getSitesOperations(context: EdgeContext): SitesOperations {
  return {
    ..._getSites(context),
  };
}
