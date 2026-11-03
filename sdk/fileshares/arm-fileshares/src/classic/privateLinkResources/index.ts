// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FileSharesContext } from "../../api/fileSharesContext.js";
import { list, get } from "../../api/privateLinkResources/operations.js";
import {
  PrivateLinkResourcesListOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "../../api/privateLinkResources/options.js";
import { PrivateLinkResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** Gets the private link resources that need to be created for a file share. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: PrivateLinkResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkResource>;
  /** Gets the private link resources that need to be created for a file share. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    privateLinkResourceName: string,
    options?: PrivateLinkResourcesGetOptionalParams,
  ) => Promise<PrivateLinkResource>;
}

function _getPrivateLinkResources(context: FileSharesContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: PrivateLinkResourcesListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    get: (
      resourceGroupName: string,
      resourceName: string,
      privateLinkResourceName: string,
      options?: PrivateLinkResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, privateLinkResourceName, options),
  };
}

export function _getPrivateLinkResourcesOperations(
  context: FileSharesContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}
