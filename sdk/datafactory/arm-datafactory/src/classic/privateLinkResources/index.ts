// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext } from "../../api/dataFactoryManagementContext.js";
import { get } from "../../api/privateLinkResources/operations.js";
import type { PrivateLinkResourcesGetOptionalParams } from "../../api/privateLinkResources/options.js";
import type { PrivateLinkResourcesWrapper } from "../../models/models.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** Gets the private link resources */
  get: (
    resourceGroupName: string,
    factoryName: string,
    options?: PrivateLinkResourcesGetOptionalParams,
  ) => Promise<PrivateLinkResourcesWrapper>;
}

function _getPrivateLinkResources(context: DataFactoryManagementContext) {
  return {
    get: (
      resourceGroupName: string,
      factoryName: string,
      options?: PrivateLinkResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, factoryName, options),
  };
}

export function _getPrivateLinkResourcesOperations(
  context: DataFactoryManagementContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}
