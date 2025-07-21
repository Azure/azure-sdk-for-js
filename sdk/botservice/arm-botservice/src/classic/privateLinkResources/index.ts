// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotServiceContext } from "../../api/botServiceContext.js";
import { PrivateLinkResourceListResult } from "../../models/models.js";
import { PrivateLinkResourcesListByBotResourceOptionalParams } from "../../api/privateLinkResources/options.js";
import { listByBotResource } from "../../api/privateLinkResources/operations.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** Gets the private link resources that need to be created for a Bot. */
  listByBotResource: (
    resourceGroupName: string,
    resourceName: string,
    options?: PrivateLinkResourcesListByBotResourceOptionalParams,
  ) => Promise<PrivateLinkResourceListResult>;
}

function _getPrivateLinkResources(context: BotServiceContext) {
  return {
    listByBotResource: (
      resourceGroupName: string,
      resourceName: string,
      options?: PrivateLinkResourcesListByBotResourceOptionalParams,
    ) => listByBotResource(context, resourceGroupName, resourceName, options),
  };
}

export function _getPrivateLinkResourcesOperations(
  context: BotServiceContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}
