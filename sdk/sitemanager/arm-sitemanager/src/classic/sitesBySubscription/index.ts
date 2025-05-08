// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeContext } from "../../api/edgeContext.js";
import { Site, SiteUpdate } from "../../models/models.js";
import {
  SitesBySubscriptionDeleteOptionalParams,
  SitesBySubscriptionUpdateOptionalParams,
  SitesBySubscriptionCreateOrUpdateOptionalParams,
  SitesBySubscriptionGetOptionalParams,
  SitesBySubscriptionListOptionalParams,
} from "../../api/sitesBySubscription/options.js";
import {
  $delete,
  update,
  createOrUpdate,
  get,
  list,
} from "../../api/sitesBySubscription/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SitesBySubscription operations. */
export interface SitesBySubscriptionOperations {
  /** Delete a Site */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (siteName: string, options?: SitesBySubscriptionDeleteOptionalParams) => Promise<void>;
  /** Update a Site */
  update: (
    siteName: string,
    properties: SiteUpdate,
    options?: SitesBySubscriptionUpdateOptionalParams,
  ) => Promise<Site>;
  /** Create a Site */
  createOrUpdate: (
    siteName: string,
    resource: Site,
    options?: SitesBySubscriptionCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Site>, Site>;
  /** Get a Site */
  get: (siteName: string, options?: SitesBySubscriptionGetOptionalParams) => Promise<Site>;
  /** List Site resources by subscription ID */
  list: (options?: SitesBySubscriptionListOptionalParams) => PagedAsyncIterableIterator<Site>;
}

function _getSitesBySubscription(context: EdgeContext) {
  return {
    delete: (siteName: string, options?: SitesBySubscriptionDeleteOptionalParams) =>
      $delete(context, siteName, options),
    update: (
      siteName: string,
      properties: SiteUpdate,
      options?: SitesBySubscriptionUpdateOptionalParams,
    ) => update(context, siteName, properties, options),
    createOrUpdate: (
      siteName: string,
      resource: Site,
      options?: SitesBySubscriptionCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, siteName, resource, options),
    get: (siteName: string, options?: SitesBySubscriptionGetOptionalParams) =>
      get(context, siteName, options),
    list: (options?: SitesBySubscriptionListOptionalParams) => list(context, options),
  };
}

export function _getSitesBySubscriptionOperations(
  context: EdgeContext,
): SitesBySubscriptionOperations {
  return {
    ..._getSitesBySubscription(context),
  };
}
