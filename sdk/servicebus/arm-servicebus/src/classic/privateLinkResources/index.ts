// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceBusManagementContext } from "../../api/serviceBusManagementContext.js";
import { get } from "../../api/privateLinkResources/operations.js";
import { PrivateLinkResourcesGetOptionalParams } from "../../api/privateLinkResources/options.js";
import { PrivateLinkResourcesListResult } from "../../models/models.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** Gets lists of resources that supports Privatelinks. */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    options?: PrivateLinkResourcesGetOptionalParams,
  ) => Promise<PrivateLinkResourcesListResult>;
}

function _getPrivateLinkResources(context: ServiceBusManagementContext) {
  return {
    get: (
      resourceGroupName: string,
      namespaceName: string,
      options?: PrivateLinkResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, options),
  };
}

export function _getPrivateLinkResourcesOperations(
  context: ServiceBusManagementContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}
