// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IotHubContext } from "../../api/iotHubContext.js";
import { list, get } from "../../api/privateLinkResourcesOperations/operations.js";
import type {
  PrivateLinkResourcesOperationsListOptionalParams,
  PrivateLinkResourcesOperationsGetOptionalParams,
} from "../../api/privateLinkResourcesOperations/options.js";
import type { GroupIdInformation, PrivateLinkResources } from "../../models/models.js";

/** Interface representing a PrivateLinkResourcesOperations operations. */
export interface PrivateLinkResourcesOperationsOperations {
  /** List private link resources for the given IotHub */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: PrivateLinkResourcesOperationsListOptionalParams,
  ) => Promise<PrivateLinkResources>;
  /** Get the specified private link resource for the given IotHub */
  get: (
    resourceGroupName: string,
    resourceName: string,
    groupId: string,
    options?: PrivateLinkResourcesOperationsGetOptionalParams,
  ) => Promise<GroupIdInformation>;
}

function _getPrivateLinkResourcesOperations(context: IotHubContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: PrivateLinkResourcesOperationsListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    get: (
      resourceGroupName: string,
      resourceName: string,
      groupId: string,
      options?: PrivateLinkResourcesOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, groupId, options),
  };
}

export function _getPrivateLinkResourcesOperationsOperations(
  context: IotHubContext,
): PrivateLinkResourcesOperationsOperations {
  return {
    ..._getPrivateLinkResourcesOperations(context),
  };
}
