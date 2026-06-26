// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementContext } from "../../api/healthcareApisManagementContext.js";
import { listByService, get } from "../../api/privateLinkResources/operations.js";
import {
  PrivateLinkResourcesListByServiceOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "../../api/privateLinkResources/options.js";
import {
  PrivateLinkResourceDescription,
  PrivateLinkResourceListResultDescription,
} from "../../models/models.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** Gets the private link resources that need to be created for a service. */
  listByService: (
    resourceGroupName: string,
    resourceName: string,
    options?: PrivateLinkResourcesListByServiceOptionalParams,
  ) => Promise<PrivateLinkResourceListResultDescription>;
  /** Gets a private link resource that need to be created for a service. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    groupName: string,
    options?: PrivateLinkResourcesGetOptionalParams,
  ) => Promise<PrivateLinkResourceDescription>;
}

function _getPrivateLinkResources(context: HealthcareApisManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      resourceName: string,
      options?: PrivateLinkResourcesListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, resourceName, options),
    get: (
      resourceGroupName: string,
      resourceName: string,
      groupName: string,
      options?: PrivateLinkResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, groupName, options),
  };
}

export function _getPrivateLinkResourcesOperations(
  context: HealthcareApisManagementContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}
