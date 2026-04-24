// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, get } from "../../api/privateLinkResources/operations.js";
import type {
  PrivateLinkResourcesListOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "../../api/privateLinkResources/options.js";
import type { PrivateLinksAPIPrivateLinkGroupResource } from "../../models/privateLinksAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** List all private link resources in a private link. */
  list: (
    resourceGroupName: string,
    options?: PrivateLinkResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinksAPIPrivateLinkGroupResource>;
  /** Get the specified private link resource associated with the private link. */
  get: (
    resourceGroupName: string,
    groupId: string,
    options?: PrivateLinkResourcesGetOptionalParams,
  ) => Promise<PrivateLinksAPIPrivateLinkGroupResource>;
}

function _getPrivateLinkResources(context: SecurityCenterContext) {
  return {
    list: (resourceGroupName: string, options?: PrivateLinkResourcesListOptionalParams) =>
      list(context, resourceGroupName, options),
    get: (
      resourceGroupName: string,
      groupId: string,
      options?: PrivateLinkResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, groupId, options),
  };
}

export function _getPrivateLinkResourcesOperations(
  context: SecurityCenterContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}
