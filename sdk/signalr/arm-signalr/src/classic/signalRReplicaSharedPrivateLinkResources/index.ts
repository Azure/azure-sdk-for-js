// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SignalRManagementContext } from "../../api/signalRManagementContext.js";
import {
  list,
  createOrUpdate,
  get,
} from "../../api/signalRReplicaSharedPrivateLinkResources/operations.js";
import {
  SignalRReplicaSharedPrivateLinkResourcesListOptionalParams,
  SignalRReplicaSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
  SignalRReplicaSharedPrivateLinkResourcesGetOptionalParams,
} from "../../api/signalRReplicaSharedPrivateLinkResources/options.js";
import { SharedPrivateLinkResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SignalRReplicaSharedPrivateLinkResources operations. */
export interface SignalRReplicaSharedPrivateLinkResourcesOperations {
  /** List shared private link resources */
  list: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    options?: SignalRReplicaSharedPrivateLinkResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<SharedPrivateLinkResource>;
  /** Create or update a shared private link resource */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    sharedPrivateLinkResourceName: string,
    parameters: SharedPrivateLinkResource,
    options?: SignalRReplicaSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SharedPrivateLinkResource>, SharedPrivateLinkResource>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    sharedPrivateLinkResourceName: string,
    parameters: SharedPrivateLinkResource,
    options?: SignalRReplicaSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
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
    options?: SignalRReplicaSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
  ) => Promise<SharedPrivateLinkResource>;
  /** Get the specified shared private link resource */
  get: (
    resourceGroupName: string,
    resourceName: string,
    replicaName: string,
    sharedPrivateLinkResourceName: string,
    options?: SignalRReplicaSharedPrivateLinkResourcesGetOptionalParams,
  ) => Promise<SharedPrivateLinkResource>;
}

function _getSignalRReplicaSharedPrivateLinkResources(context: SignalRManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      replicaName: string,
      options?: SignalRReplicaSharedPrivateLinkResourcesListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, replicaName, options),
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      replicaName: string,
      sharedPrivateLinkResourceName: string,
      parameters: SharedPrivateLinkResource,
      options?: SignalRReplicaSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
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
      options?: SignalRReplicaSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
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
      options?: SignalRReplicaSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
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
      options?: SignalRReplicaSharedPrivateLinkResourcesGetOptionalParams,
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

export function _getSignalRReplicaSharedPrivateLinkResourcesOperations(
  context: SignalRManagementContext,
): SignalRReplicaSharedPrivateLinkResourcesOperations {
  return {
    ..._getSignalRReplicaSharedPrivateLinkResources(context),
  };
}
