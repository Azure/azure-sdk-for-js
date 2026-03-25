// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext } from "../../api/containerServiceContext.js";
import { post } from "../../api/resolvePrivateLinkServiceId/operations.js";
import type { ResolvePrivateLinkServiceIdPostOptionalParams } from "../../api/resolvePrivateLinkServiceId/options.js";
import type { PrivateLinkResource } from "../../models/models.js";

/** Interface representing a ResolvePrivateLinkServiceId operations. */
export interface ResolvePrivateLinkServiceIdOperations {
  /** Gets the private link service ID for the specified managed cluster. */
  post: (
    resourceGroupName: string,
    resourceName: string,
    parameters: PrivateLinkResource,
    options?: ResolvePrivateLinkServiceIdPostOptionalParams,
  ) => Promise<PrivateLinkResource>;
}

function _getResolvePrivateLinkServiceId(context: ContainerServiceContext) {
  return {
    post: (
      resourceGroupName: string,
      resourceName: string,
      parameters: PrivateLinkResource,
      options?: ResolvePrivateLinkServiceIdPostOptionalParams,
    ) => post(context, resourceGroupName, resourceName, parameters, options),
  };
}

export function _getResolvePrivateLinkServiceIdOperations(
  context: ContainerServiceContext,
): ResolvePrivateLinkServiceIdOperations {
  return {
    ..._getResolvePrivateLinkServiceId(context),
  };
}
