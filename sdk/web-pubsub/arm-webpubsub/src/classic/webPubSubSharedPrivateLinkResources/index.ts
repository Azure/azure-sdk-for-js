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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    sharedPrivateLinkResourceName: string,
    resourceGroupName: string,
    resourceName: string,
    options?: WebPubSubSharedPrivateLinkResourcesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    sharedPrivateLinkResourceName: string,
    resourceGroupName: string,
    resourceName: string,
    options?: WebPubSubSharedPrivateLinkResourcesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a shared private link resource */
  createOrUpdate: (
    sharedPrivateLinkResourceName: string,
    resourceGroupName: string,
    resourceName: string,
    parameters: SharedPrivateLinkResource,
    options?: WebPubSubSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SharedPrivateLinkResource>, SharedPrivateLinkResource>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    sharedPrivateLinkResourceName: string,
    resourceGroupName: string,
    resourceName: string,
    parameters: SharedPrivateLinkResource,
    options?: WebPubSubSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<SharedPrivateLinkResource>, SharedPrivateLinkResource>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    sharedPrivateLinkResourceName: string,
    resourceGroupName: string,
    resourceName: string,
    parameters: SharedPrivateLinkResource,
    options?: WebPubSubSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
  ) => Promise<SharedPrivateLinkResource>;
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
    beginDelete: async (
      sharedPrivateLinkResourceName: string,
      resourceGroupName: string,
      resourceName: string,
      options?: WebPubSubSharedPrivateLinkResourcesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        sharedPrivateLinkResourceName,
        resourceGroupName,
        resourceName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      sharedPrivateLinkResourceName: string,
      resourceGroupName: string,
      resourceName: string,
      options?: WebPubSubSharedPrivateLinkResourcesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        sharedPrivateLinkResourceName,
        resourceGroupName,
        resourceName,
        options,
      );
    },
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
    beginCreateOrUpdate: async (
      sharedPrivateLinkResourceName: string,
      resourceGroupName: string,
      resourceName: string,
      parameters: SharedPrivateLinkResource,
      options?: WebPubSubSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        sharedPrivateLinkResourceName,
        resourceGroupName,
        resourceName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      sharedPrivateLinkResourceName: string,
      resourceGroupName: string,
      resourceName: string,
      parameters: SharedPrivateLinkResource,
      options?: WebPubSubSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        sharedPrivateLinkResourceName,
        resourceGroupName,
        resourceName,
        parameters,
        options,
      );
    },
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
