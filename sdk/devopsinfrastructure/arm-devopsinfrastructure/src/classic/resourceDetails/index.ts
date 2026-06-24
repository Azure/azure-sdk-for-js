// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevOpsInfrastructureContext } from "../../api/devOpsInfrastructureContext.js";
import { listByPool } from "../../api/resourceDetails/operations.js";
import { ResourceDetailsListByPoolOptionalParams } from "../../api/resourceDetails/options.js";
import { ResourceDetailsObject } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ResourceDetails operations. */
export interface ResourceDetailsOperations {
  /** List ResourceDetailsObject resources by Pool */
  listByPool: (
    resourceGroupName: string,
    poolName: string,
    options?: ResourceDetailsListByPoolOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceDetailsObject>;
}

function _getResourceDetails(context: DevOpsInfrastructureContext) {
  return {
    listByPool: (
      resourceGroupName: string,
      poolName: string,
      options?: ResourceDetailsListByPoolOptionalParams,
    ) => listByPool(context, resourceGroupName, poolName, options),
  };
}

export function _getResourceDetailsOperations(
  context: DevOpsInfrastructureContext,
): ResourceDetailsOperations {
  return {
    ..._getResourceDetails(context),
  };
}
