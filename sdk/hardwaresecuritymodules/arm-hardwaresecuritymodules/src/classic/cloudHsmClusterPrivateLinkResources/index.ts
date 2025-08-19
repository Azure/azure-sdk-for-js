// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDedicatedHSMResourceProviderContext } from "../../api/azureDedicatedHSMResourceProviderContext.js";
import { listByCloudHsmCluster } from "../../api/cloudHsmClusterPrivateLinkResources/operations.js";
import { CloudHsmClusterPrivateLinkResourcesListByCloudHsmClusterOptionalParams } from "../../api/cloudHsmClusterPrivateLinkResources/options.js";
import { PrivateLinkResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a CloudHsmClusterPrivateLinkResources operations. */
export interface CloudHsmClusterPrivateLinkResourcesOperations {
  /** Gets the private link resources supported for the Cloud Hsm Cluster. */
  listByCloudHsmCluster: (
    resourceGroupName: string,
    cloudHsmClusterName: string,
    options?: CloudHsmClusterPrivateLinkResourcesListByCloudHsmClusterOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkResource>;
}

function _getCloudHsmClusterPrivateLinkResources(
  context: AzureDedicatedHSMResourceProviderContext,
) {
  return {
    listByCloudHsmCluster: (
      resourceGroupName: string,
      cloudHsmClusterName: string,
      options?: CloudHsmClusterPrivateLinkResourcesListByCloudHsmClusterOptionalParams,
    ) => listByCloudHsmCluster(context, resourceGroupName, cloudHsmClusterName, options),
  };
}

export function _getCloudHsmClusterPrivateLinkResourcesOperations(
  context: AzureDedicatedHSMResourceProviderContext,
): CloudHsmClusterPrivateLinkResourcesOperations {
  return {
    ..._getCloudHsmClusterPrivateLinkResources(context),
  };
}
