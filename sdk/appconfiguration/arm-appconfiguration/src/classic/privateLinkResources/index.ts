// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppConfigurationManagementContext } from "../../api/appConfigurationManagementContext.js";
import { listByConfigurationStore, get } from "../../api/privateLinkResources/operations.js";
import type {
  PrivateLinkResourcesListByConfigurationStoreOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "../../api/privateLinkResources/options.js";
import type { PrivateLinkResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** Gets the private link resources that need to be created for a configuration store. */
  listByConfigurationStore: (
    resourceGroupName: string,
    configStoreName: string,
    options?: PrivateLinkResourcesListByConfigurationStoreOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkResource>;
  /** Gets a private link resource that need to be created for a configuration store. */
  get: (
    resourceGroupName: string,
    configStoreName: string,
    groupName: string,
    options?: PrivateLinkResourcesGetOptionalParams,
  ) => Promise<PrivateLinkResource>;
}

function _getPrivateLinkResources(context: AppConfigurationManagementContext) {
  return {
    listByConfigurationStore: (
      resourceGroupName: string,
      configStoreName: string,
      options?: PrivateLinkResourcesListByConfigurationStoreOptionalParams,
    ) => listByConfigurationStore(context, resourceGroupName, configStoreName, options),
    get: (
      resourceGroupName: string,
      configStoreName: string,
      groupName: string,
      options?: PrivateLinkResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, configStoreName, groupName, options),
  };
}

export function _getPrivateLinkResourcesOperations(
  context: AppConfigurationManagementContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}
