// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SearchManagementContext } from "../../api/searchManagementContext.js";
import { listSupported } from "../../api/privateLinkResources/operations.js";
import type { PrivateLinkResourcesListSupportedOptionalParams } from "../../api/privateLinkResources/options.js";
import type { PrivateLinkResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** Gets a list of all supported private link resource types for the given service. */
  listSupported: (
    resourceGroupName: string,
    searchServiceName: string,
    options?: PrivateLinkResourcesListSupportedOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkResource>;
}

function _getPrivateLinkResources(context: SearchManagementContext) {
  return {
    listSupported: (
      resourceGroupName: string,
      searchServiceName: string,
      options?: PrivateLinkResourcesListSupportedOptionalParams,
    ) => listSupported(context, resourceGroupName, searchServiceName, options),
  };
}

export function _getPrivateLinkResourcesOperations(
  context: SearchManagementContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}
