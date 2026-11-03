// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FrontDoorManagementContext } from "../../api/frontDoorManagementContext.js";
import { list } from "../../api/preconfiguredEndpoints/operations.js";
import type { PreconfiguredEndpointsListOptionalParams } from "../../api/preconfiguredEndpoints/options.js";
import type { PreconfiguredEndpoint } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PreconfiguredEndpoints operations. */
export interface PreconfiguredEndpointsOperations {
  /** Gets a list of Preconfigured Endpoints */
  list: (
    resourceGroupName: string,
    profileName: string,
    options?: PreconfiguredEndpointsListOptionalParams,
  ) => PagedAsyncIterableIterator<PreconfiguredEndpoint>;
}

function _getPreconfiguredEndpoints(context: FrontDoorManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      profileName: string,
      options?: PreconfiguredEndpointsListOptionalParams,
    ) => list(context, resourceGroupName, profileName, options),
  };
}

export function _getPreconfiguredEndpointsOperations(
  context: FrontDoorManagementContext,
): PreconfiguredEndpointsOperations {
  return {
    ..._getPreconfiguredEndpoints(context),
  };
}
