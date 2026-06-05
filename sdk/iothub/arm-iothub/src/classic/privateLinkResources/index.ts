// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IotHubContext } from "../../api/iotHubContext.js";
import { list, get } from "../../api/privateLinkResources/operations.js";
import type {
  PrivateLinkResourcesListOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "../../api/privateLinkResources/options.js";
import type { GroupIdInformation, PrivateLinkResources } from "../../models/models.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** List private link resources for the given IotHub */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: PrivateLinkResourcesListOptionalParams,
  ) => Promise<PrivateLinkResources>;
  /** Get the specified private link resource for the given IotHub */
  get: (
    resourceGroupName: string,
    resourceName: string,
    groupId: string,
    options?: PrivateLinkResourcesGetOptionalParams,
  ) => Promise<GroupIdInformation>;
}

function _getPrivateLinkResources(context: IotHubContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: PrivateLinkResourcesListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    get: (
      resourceGroupName: string,
      resourceName: string,
      groupId: string,
      options?: PrivateLinkResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, groupId, options),
  };
}

export function _getPrivateLinkResourcesOperations(
  context: IotHubContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}
