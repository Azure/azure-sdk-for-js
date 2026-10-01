// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureBotServiceContext } from "../../api/azureBotServiceContext.js";
import { listByBotResource } from "../../api/privateLinkResources/operations.js";
import type { PrivateLinkResourcesListByBotResourceOptionalParams } from "../../api/privateLinkResources/options.js";
import type { PrivateLinkResourceListResult } from "../../models/models.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** Gets the private link resources that need to be created for a Bot. */
  listByBotResource: (
    resourceGroupName: string,
    resourceName: string,
    options?: PrivateLinkResourcesListByBotResourceOptionalParams,
  ) => Promise<PrivateLinkResourceListResult>;
}

function _getPrivateLinkResources(context: AzureBotServiceContext) {
  return {
    listByBotResource: (
      resourceGroupName: string,
      resourceName: string,
      options?: PrivateLinkResourcesListByBotResourceOptionalParams,
    ) => listByBotResource(context, resourceGroupName, resourceName, options),
  };
}

export function _getPrivateLinkResourcesOperations(
  context: AzureBotServiceContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}
