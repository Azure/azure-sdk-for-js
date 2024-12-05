// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevOpsInfrastructureContext } from "../../api/devOpsInfrastructureContext.js";
import { ResourceDetailsListByPoolOptionalParams } from "../../api/options.js";
import { resourceDetailsListByPool } from "../../api/resourceDetails/index.js";
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

export function getResourceDetails(context: DevOpsInfrastructureContext, subscriptionId: string) {
  return {
    listByPool: (
      resourceGroupName: string,
      poolName: string,
      options?: ResourceDetailsListByPoolOptionalParams,
    ) => resourceDetailsListByPool(context, subscriptionId, resourceGroupName, poolName, options),
  };
}

export function getResourceDetailsOperations(
  context: DevOpsInfrastructureContext,
  subscriptionId: string,
): ResourceDetailsOperations {
  return {
    ...getResourceDetails(context, subscriptionId),
  };
}
