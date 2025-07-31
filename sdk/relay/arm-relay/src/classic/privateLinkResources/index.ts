// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RelayAPIContext } from "../../api/relayAPIContext.js";
import { list, get } from "../../api/privateLinkResources/operations.js";
import {
  PrivateLinkResourcesListOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "../../api/privateLinkResources/options.js";
import { PrivateLinkResource, PrivateLinkResourcesListResult } from "../../models/models.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** Gets lists of resources that supports Privatelinks. */
  list: (
    resourceGroupName: string,
    namespaceName: string,
    options?: PrivateLinkResourcesListOptionalParams,
  ) => Promise<PrivateLinkResourcesListResult>;
  /** Gets a description for the specified Private Endpoint Connection name. */
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
