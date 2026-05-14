// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, get } from "../../api/privateLinkResources/operations.js";
import {
  PrivateLinkResourcesListOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "../../api/privateLinkResources/options.js";
import { PrivateLinkGroupResource } from "../../models/privateLinksAPI/models.js";
import { PrivateLinkParameters } from "../../models/securityManagementClient/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** List all private link resources in a private link. */
  list: (
    resourceGroupName: string,
    privateLinkName: PrivateLinkParameters,
    options?: PrivateLinkResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkGroupResource>;
  /** Get the specified private link resource associated with the private link. */
  get: (
    resourceGroupName: string,
    privateLinkName: PrivateLinkParameters,
    groupId: string,
    options?: PrivateLinkResourcesGetOptionalParams,
  ) => Promise<PrivateLinkGroupResource>;
}

function _getPrivateLinkResources(context: SecurityCenterContext) {
  return {
    list: (
      resourceGroupName: string,
      privateLinkName: PrivateLinkParameters,
      options?: PrivateLinkResourcesListOptionalParams,
    ) => list(context, resourceGroupName, privateLinkName, options),
    get: (
      resourceGroupName: string,
      privateLinkName: PrivateLinkParameters,
      groupId: string,
      options?: PrivateLinkResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, privateLinkName, groupId, options),
  };
}

export function _getPrivateLinkResourcesOperations(
  context: SecurityCenterContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}
