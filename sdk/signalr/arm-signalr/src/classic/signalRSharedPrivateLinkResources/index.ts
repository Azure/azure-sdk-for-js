// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SignalRManagementContext } from "../../api/signalRManagementContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/signalRSharedPrivateLinkResources/operations.js";
import type {
  SignalRSharedPrivateLinkResourcesListOptionalParams,
  SignalRSharedPrivateLinkResourcesDeleteOptionalParams,
  SignalRSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
  SignalRSharedPrivateLinkResourcesGetOptionalParams,
} from "../../api/signalRSharedPrivateLinkResources/options.js";
import type { SharedPrivateLinkResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SignalRSharedPrivateLinkResources operations. */
export interface SignalRSharedPrivateLinkResourcesOperations {
  /** List shared private link resources */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: SignalRSharedPrivateLinkResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<SharedPrivateLinkResource>;
  /** Delete the specified shared private link resource */
  delete: (
    sharedPrivateLinkResourceName: string,
    resourceGroupName: string,
    resourceName: string,
    options?: SignalRSharedPrivateLinkResourcesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    sharedPrivateLinkResourceName: string,
    resourceGroupName: string,
    resourceName: string,
    options?: SignalRSharedPrivateLinkResourcesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    sharedPrivateLinkResourceName: string,
    resourceGroupName: string,
    resourceName: string,
    options?: SignalRSharedPrivateLinkResourcesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a shared private link resource */
  createOrUpdate: (
    sharedPrivateLinkResourceName: string,
    resourceGroupName: string,
    resourceName: string,
    parameters: SharedPrivateLinkResource,
    options?: SignalRSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SharedPrivateLinkResource>, SharedPrivateLinkResource>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    sharedPrivateLinkResourceName: string,
    resourceGroupName: string,
    resourceName: string,
    parameters: SharedPrivateLinkResource,
    options?: SignalRSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<SharedPrivateLinkResource>, SharedPrivateLinkResource>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    sharedPrivateLinkResourceName: string,
    resourceGroupName: string,
    resourceName: string,
    parameters: SharedPrivateLinkResource,
    options?: SignalRSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
  ) => Promise<SharedPrivateLinkResource>;
  /** Get the specified shared private link resource */
  get: (
    sharedPrivateLinkResourceName: string,
    resourceGroupName: string,
    resourceName: string,
    options?: SignalRSharedPrivateLinkResourcesGetOptionalParams,
  ) => Promise<SharedPrivateLinkResource>;
}

function _getSignalRSharedPrivateLinkResources(context: SignalRManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: SignalRSharedPrivateLinkResourcesListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    delete: (
      sharedPrivateLinkResourceName: string,
      resourceGroupName: string,
      resourceName: string,
      options?: SignalRSharedPrivateLinkResourcesDeleteOptionalParams,
    ) => $delete(context, sharedPrivateLinkResourceName, resourceGroupName, resourceName, options),
    beginDelete: async (
      sharedPrivateLinkResourceName: string,
      resourceGroupName: string,
      resourceName: string,
      options?: SignalRSharedPrivateLinkResourcesDeleteOptionalParams,
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
      options?: SignalRSharedPrivateLinkResourcesDeleteOptionalParams,
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
      options?: SignalRSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
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
      options?: SignalRSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
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
      options?: SignalRSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
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
      options?: SignalRSharedPrivateLinkResourcesGetOptionalParams,
    ) => get(context, sharedPrivateLinkResourceName, resourceGroupName, resourceName, options),
  };
}

export function _getSignalRSharedPrivateLinkResourcesOperations(
  context: SignalRManagementContext,
): SignalRSharedPrivateLinkResourcesOperations {
  return {
    ..._getSignalRSharedPrivateLinkResources(context),
  };
}
