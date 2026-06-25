// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeContext } from "../../api/edgeContext.js";
import {
  $delete,
  update,
  createOrUpdate,
  get,
  listByServiceGroup,
} from "../../api/sitesByServiceGroup/operations.js";
import {
  SitesByServiceGroupDeleteOptionalParams,
  SitesByServiceGroupUpdateOptionalParams,
  SitesByServiceGroupCreateOrUpdateOptionalParams,
  SitesByServiceGroupGetOptionalParams,
  SitesByServiceGroupListByServiceGroupOptionalParams,
} from "../../api/sitesByServiceGroup/options.js";
import { Site, SiteUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SitesByServiceGroup operations. */
export interface SitesByServiceGroupOperations {
  /** Delete a Site */
  delete: (
    servicegroupName: string,
    siteName: string,
    options?: SitesByServiceGroupDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a Site */
  update: (
    servicegroupName: string,
    siteName: string,
    properties: SiteUpdate,
    options?: SitesByServiceGroupUpdateOptionalParams,
  ) => Promise<Site>;
  /** Create a Site */
  createOrUpdate: (
    servicegroupName: string,
    siteName: string,
    resource: Site,
    options?: SitesByServiceGroupCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Site>, Site>;
  /** Get a Site */
  get: (
    servicegroupName: string,
    siteName: string,
    options?: SitesByServiceGroupGetOptionalParams,
  ) => Promise<Site>;
  /** List Site resources by scope */
  listByServiceGroup: (
    servicegroupName: string,
    options?: SitesByServiceGroupListByServiceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Site>;
}

function _getSitesByServiceGroup(context: EdgeContext) {
  return {
    delete: (
      servicegroupName: string,
      siteName: string,
      options?: SitesByServiceGroupDeleteOptionalParams,
    ) => $delete(context, servicegroupName, siteName, options),
    update: (
      servicegroupName: string,
      siteName: string,
      properties: SiteUpdate,
      options?: SitesByServiceGroupUpdateOptionalParams,
    ) => update(context, servicegroupName, siteName, properties, options),
    createOrUpdate: (
      servicegroupName: string,
      siteName: string,
      resource: Site,
      options?: SitesByServiceGroupCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, servicegroupName, siteName, resource, options),
    get: (
      servicegroupName: string,
      siteName: string,
      options?: SitesByServiceGroupGetOptionalParams,
    ) => get(context, servicegroupName, siteName, options),
    listByServiceGroup: (
      servicegroupName: string,
      options?: SitesByServiceGroupListByServiceGroupOptionalParams,
    ) => listByServiceGroup(context, servicegroupName, options),
  };
}

export function _getSitesByServiceGroupOperations(
  context: EdgeContext,
): SitesByServiceGroupOperations {
  return {
    ..._getSitesByServiceGroup(context),
  };
}
