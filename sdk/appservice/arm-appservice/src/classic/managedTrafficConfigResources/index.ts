// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import {
  updateManagedTrafficConfig,
  getManagedTrafficConfig,
  listManagedTrafficConfigs,
} from "../../api/managedTrafficConfigResources/operations.js";
import type {
  ManagedTrafficConfigResourcesUpdateManagedTrafficConfigOptionalParams,
  ManagedTrafficConfigResourcesGetManagedTrafficConfigOptionalParams,
  ManagedTrafficConfigResourcesListManagedTrafficConfigsOptionalParams,
} from "../../api/managedTrafficConfigResources/options.js";
import type { ManagedTrafficConfigResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ManagedTrafficConfigResources operations. */
export interface ManagedTrafficConfigResourcesOperations {
  /** Updates managed traffic configuration for a Web App. */
  updateManagedTrafficConfig: (
    resourceGroupName: string,
    name: string,
    resource: ManagedTrafficConfigResource,
    options?: ManagedTrafficConfigResourcesUpdateManagedTrafficConfigOptionalParams,
  ) => Promise<ManagedTrafficConfigResource>;
  /** Gets managed traffic configuration for a Web App. */
  getManagedTrafficConfig: (
    resourceGroupName: string,
    name: string,
    options?: ManagedTrafficConfigResourcesGetManagedTrafficConfigOptionalParams,
  ) => Promise<ManagedTrafficConfigResource>;
  /** Lists managed traffic configuration resources for a Web App. */
  listManagedTrafficConfigs: (
    resourceGroupName: string,
    name: string,
    options?: ManagedTrafficConfigResourcesListManagedTrafficConfigsOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedTrafficConfigResource>;
}

function _getManagedTrafficConfigResources(context: WebSiteManagementContext) {
  return {
    updateManagedTrafficConfig: (
      resourceGroupName: string,
      name: string,
      resource: ManagedTrafficConfigResource,
      options?: ManagedTrafficConfigResourcesUpdateManagedTrafficConfigOptionalParams,
    ) => updateManagedTrafficConfig(context, resourceGroupName, name, resource, options),
    getManagedTrafficConfig: (
      resourceGroupName: string,
      name: string,
      options?: ManagedTrafficConfigResourcesGetManagedTrafficConfigOptionalParams,
    ) => getManagedTrafficConfig(context, resourceGroupName, name, options),
    listManagedTrafficConfigs: (
      resourceGroupName: string,
      name: string,
      options?: ManagedTrafficConfigResourcesListManagedTrafficConfigsOptionalParams,
    ) => listManagedTrafficConfigs(context, resourceGroupName, name, options),
  };
}

export function _getManagedTrafficConfigResourcesOperations(
  context: WebSiteManagementContext,
): ManagedTrafficConfigResourcesOperations {
  return {
    ..._getManagedTrafficConfigResources(context),
  };
}
