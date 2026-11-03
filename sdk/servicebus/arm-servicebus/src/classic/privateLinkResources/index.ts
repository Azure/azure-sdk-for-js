// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceBusManagementContext } from "../../api/serviceBusManagementContext.js";
import { get } from "../../api/privateLinkResources/operations.js";
import type { PrivateLinkResourcesGetOptionalParams } from "../../api/privateLinkResources/options.js";
import type { PrivateLinkResourcesListResult } from "../../models/models.js";

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
