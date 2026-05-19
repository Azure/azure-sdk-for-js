// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementContext } from "../../api/hdInsightManagementContext.js";
import { listByCluster, get } from "../../api/privateLinkResources/operations.js";
import {
  PrivateLinkResourcesListByClusterOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "../../api/privateLinkResources/options.js";
import { PrivateLinkResource, PrivateLinkResourceListResult } from "../../models/models.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** Lists the private link resources in a HDInsight cluster. */
  listByCluster: (
    resourceGroupName: string,
    clusterName: string,
    options?: PrivateLinkResourcesListByClusterOptionalParams,
  ) => Promise<PrivateLinkResourceListResult>;
  /** Gets the specific private link resource. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    privateLinkResourceName: string,
    options?: PrivateLinkResourcesGetOptionalParams,
  ) => Promise<PrivateLinkResource>;
}

function _getPrivateLinkResources(context: HDInsightManagementContext) {
  return {
    listByCluster: (
      resourceGroupName: string,
      clusterName: string,
      options?: PrivateLinkResourcesListByClusterOptionalParams,
    ) => listByCluster(context, resourceGroupName, clusterName, options),
    get: (
      resourceGroupName: string,
      clusterName: string,
      privateLinkResourceName: string,
      options?: PrivateLinkResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, privateLinkResourceName, options),
  };
}

export function _getPrivateLinkResourcesOperations(
  context: HDInsightManagementContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}
