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
  /** Create or update a shared private link resource */
  createOrUpdate: (
    sharedPrivateLinkResourceName: string,
    resourceGroupName: string,
    resourceName: string,
    parameters: SharedPrivateLinkResource,
    options?: SignalRSharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SharedPrivateLinkResource>, SharedPrivateLinkResource>;
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
