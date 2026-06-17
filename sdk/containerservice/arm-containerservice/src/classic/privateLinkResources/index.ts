// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceContext } from "../../api/containerServiceContext.js";
import { list } from "../../api/privateLinkResources/operations.js";
import { PrivateLinkResourcesListOptionalParams } from "../../api/privateLinkResources/options.js";
import { PrivateLinkResourcesListResult } from "../../models/models.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** To learn more about private clusters, see: https://docs.microsoft.com/azure/aks/private-clusters */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: PrivateLinkResourcesListOptionalParams,
  ) => Promise<PrivateLinkResourcesListResult>;
}

function _getPrivateLinkResources(context: ContainerServiceContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: PrivateLinkResourcesListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
  };
}

export function _getPrivateLinkResourcesOperations(
  context: ContainerServiceContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}
