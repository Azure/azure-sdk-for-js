// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RelayAPIContext } from "../../api/relayAPIContext.js";
import { list, get } from "../../api/privateLinkResources/operations.js";
import type {
  PrivateLinkResourcesListOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "../../api/privateLinkResources/options.js";
import type { PrivateLinkResource, PrivateLinkResourcesListResult } from "../../models/models.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** Lists the private link resources for a container registry. */
  list: (
    resourceGroupName: string,
    namespaceName: string,
    options?: PrivateLinkResourcesListOptionalParams,
  ) => Promise<PrivateLinkResourcesListResult>;
  /** Gets a private link resource by a specified group name for a container registry. */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    privateLinkResourceName: string,
    options?: PrivateLinkResourcesGetOptionalParams,
  ) => Promise<PrivateLinkResource>;
}

function _getPrivateLinkResources(context: RelayAPIContext) {
  return {
    list: (
      resourceGroupName: string,
      namespaceName: string,
      options?: PrivateLinkResourcesListOptionalParams,
    ) => list(context, resourceGroupName, namespaceName, options),
    get: (
      resourceGroupName: string,
      namespaceName: string,
      privateLinkResourceName: string,
      options?: PrivateLinkResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, privateLinkResourceName, options),
  };
}

export function _getPrivateLinkResourcesOperations(
  context: RelayAPIContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}
