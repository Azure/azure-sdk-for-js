// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebPubSubManagementContext } from "../../api/webPubSubManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/webPubSubSharedPrivateLinkResources/operations.js";
import type {
  WebPubSubSharedPrivateLinkResourcesListOptionalParams,
  WebPubSubSharedPrivateLinkResourcesDeleteOptionalParams,
  WebPubSubSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
  WebPubSubSharedPrivateLinkResourcesGetOptionalParams,
} from "../../api/webPubSubSharedPrivateLinkResources/options.js";
import type { SharedPrivateLinkResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a WebPubSubSharedPrivateLinkResources operations. */
export interface WebPubSubSharedPrivateLinkResourcesOperations {
  /** List shared private link resources */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: WebPubSubSharedPrivateLinkResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<SharedPrivateLinkResource>;
  /** Delete the specified shared private link resource */
  delete: (
    sharedPrivateLinkResourceName: string,
    resourceGroupName: string,
    resourceName: string,
    options?: WebPubSubSharedPrivateLinkResourcesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update a shared private link resource */
  createOrUpdate: (
    sharedPrivateLinkResourceName: string,
    resourceGroupName: string,
    resourceName: string,
    parameters: SharedPrivateLinkResource,
    options?: WebPubSubSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SharedPrivateLinkResource>, SharedPrivateLinkResource>;
  /** Get the specified shared private link resource */
  get: (
    sharedPrivateLinkResourceName: string,
    resourceGroupName: string,
    resourceName: string,
    options?: WebPubSubSharedPrivateLinkResourcesGetOptionalParams,
  ) => Promise<SharedPrivateLinkResource>;
}

function _getWebPubSubSharedPrivateLinkResources(context: WebPubSubManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: WebPubSubSharedPrivateLinkResourcesListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    delete: (
      sharedPrivateLinkResourceName: string,
      resourceGroupName: string,
      resourceName: string,
      options?: WebPubSubSharedPrivateLinkResourcesDeleteOptionalParams,
    ) => $delete(context, sharedPrivateLinkResourceName, resourceGroupName, resourceName, options),
    createOrUpdate: (
      sharedPrivateLinkResourceName: string,
      resourceGroupName: string,
      resourceName: string,
      parameters: SharedPrivateLinkResource,
      options?: WebPubSubSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        sharedPrivateLinkResourceName,
        resourceGroupName,
        resourceName,
        parameters,
        options,
      ),
    get: (
      sharedPrivateLinkResourceName: string,
      resourceGroupName: string,
      resourceName: string,
      options?: WebPubSubSharedPrivateLinkResourcesGetOptionalParams,
    ) => get(context, sharedPrivateLinkResourceName, resourceGroupName, resourceName, options),
  };
}

export function _getWebPubSubSharedPrivateLinkResourcesOperations(
  context: WebPubSubManagementContext,
): WebPubSubSharedPrivateLinkResourcesOperations {
  return {
    ..._getWebPubSubSharedPrivateLinkResources(context),
  };
}
