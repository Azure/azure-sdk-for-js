// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SignalRManagementContext } from "../../api/signalRManagementContext.js";
import { list } from "../../api/signalRPrivateLinkResources/operations.js";
import { SignalRPrivateLinkResourcesListOptionalParams } from "../../api/signalRPrivateLinkResources/options.js";
import { PrivateLinkResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SignalRPrivateLinkResources operations. */
export interface SignalRPrivateLinkResourcesOperations {
  /** Get the private link resources that need to be created for a resource. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: SignalRPrivateLinkResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkResource>;
}

function _getSignalRPrivateLinkResources(context: SignalRManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: SignalRPrivateLinkResourcesListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
  };
}

export function _getSignalRPrivateLinkResourcesOperations(
  context: SignalRManagementContext,
): SignalRPrivateLinkResourcesOperations {
  return {
    ..._getSignalRPrivateLinkResources(context),
  };
}
