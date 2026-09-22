// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebPubSubManagementContext } from "../../api/webPubSubManagementContext.js";
import { list } from "../../api/webPubSubPrivateLinkResources/operations.js";
import type { WebPubSubPrivateLinkResourcesListOptionalParams } from "../../api/webPubSubPrivateLinkResources/options.js";
import type { PrivateLinkResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WebPubSubPrivateLinkResources operations. */
export interface WebPubSubPrivateLinkResourcesOperations {
  /** Get the private link resources that need to be created for a resource. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: WebPubSubPrivateLinkResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkResource>;
}

function _getWebPubSubPrivateLinkResources(context: WebPubSubManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: WebPubSubPrivateLinkResourcesListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
  };
}

export function _getWebPubSubPrivateLinkResourcesOperations(
  context: WebPubSubManagementContext,
): WebPubSubPrivateLinkResourcesOperations {
  return {
    ..._getWebPubSubPrivateLinkResources(context),
  };
}
