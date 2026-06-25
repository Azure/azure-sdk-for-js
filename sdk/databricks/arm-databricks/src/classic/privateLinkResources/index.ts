// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDatabricksManagementContext } from "../../api/azureDatabricksManagementContext.js";
import { list, get } from "../../api/privateLinkResources/operations.js";
import {
  PrivateLinkResourcesListOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "../../api/privateLinkResources/options.js";
import { GroupIdInformation } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** List private link resources for a given workspace */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: PrivateLinkResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<GroupIdInformation>;
  /** Get the specified private link resource for the given group id (sub-resource) */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    groupId: string,
    options?: PrivateLinkResourcesGetOptionalParams,
  ) => Promise<GroupIdInformation>;
}

function _getPrivateLinkResources(context: AzureDatabricksManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: PrivateLinkResourcesListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      groupId: string,
      options?: PrivateLinkResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, groupId, options),
  };
}

export function _getPrivateLinkResourcesOperations(
  context: AzureDatabricksManagementContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}
