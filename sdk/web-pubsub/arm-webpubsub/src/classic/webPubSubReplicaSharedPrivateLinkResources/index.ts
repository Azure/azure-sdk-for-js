// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubManagementContext } from "../../api/webPubSubManagementContext.js";
import {
  list,
  createOrUpdate,
  get,
} from "../../api/webPubSubReplicaSharedPrivateLinkResources/operations.js";
import {
  WebPubSubReplicaSharedPrivateLinkResourcesListOptionalParams,
  WebPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
  WebPubSubReplicaSharedPrivateLinkResourcesGetOptionalParams,
} from "../../api/webPubSubReplicaSharedPrivateLinkResources/options.js";
import { SharedPrivateLinkResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a WebPubSubReplicaSharedPrivateLinkResources operations. */
export interface WebPubSubReplicaSharedPrivateLinkResourcesOperations {
  /** List shared private link resources */
  list: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    options?: WebPubSubReplicaSharedPrivateLinkResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<SharedPrivateLinkResource>;
  /** Create or update a shared private link resource */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    sharedPrivateLinkResourceName: string,
    parameters: SharedPrivateLinkResource,
    options?: WebPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SharedPrivateLinkResource>, SharedPrivateLinkResource>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    sharedPrivateLinkResourceName: string,
    parameters: SharedPrivateLinkResource,
    options?: WebPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<SharedPrivateLinkResource>, SharedPrivateLinkResource>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    sharedPrivateLinkResourceName: string,
    parameters: SharedPrivateLinkResource,
    options?: WebPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
  ) => Promise<SharedPrivateLinkResource>;
  /** Get the specified shared private link resource */
  get: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    sharedPrivateLinkResourceName: string,
    options?: WebPubSubReplicaSharedPrivateLinkResourcesGetOptionalParams,
  ) => Promise<SharedPrivateLinkResource>;
}

function _getWebPubSubReplicaSharedPrivateLinkResources(context: WebPubSubManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      replicaName: string,
      options?: WebPubSubReplicaSharedPrivateLinkResourcesListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, replicaName, options),
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      replicaName: string,
      sharedPrivateLinkResourceName: string,
      parameters: SharedPrivateLinkResource,
      options?: WebPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        replicaName,
        sharedPrivateLinkResourceName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      replicaName: string,
      sharedPrivateLinkResourceName: string,
      parameters: SharedPrivateLinkResource,
      options?: WebPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        replicaName,
        sharedPrivateLinkResourceName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      replicaName: string,
      sharedPrivateLinkResourceName: string,
      parameters: SharedPrivateLinkResource,
      options?: WebPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        replicaName,
        sharedPrivateLinkResourceName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      resourceName: string,
      replicaName: string,
      sharedPrivateLinkResourceName: string,
      options?: WebPubSubReplicaSharedPrivateLinkResourcesGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        resourceName,
        replicaName,
        sharedPrivateLinkResourceName,
        options,
      ),
  };
}

export function _getWebPubSubReplicaSharedPrivateLinkResourcesOperations(
  context: WebPubSubManagementContext,
): WebPubSubReplicaSharedPrivateLinkResourcesOperations {
  return {
    ..._getWebPubSubReplicaSharedPrivateLinkResources(context),
  };
}
