// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureDedicatedHSMResourceProviderContext } from "../../api/azureDedicatedHSMResourceProviderContext.js";
import type { PrivateLinkResource } from "../../models/models.js";
import type { CloudHsmClusterPrivateLinkResourcesListByCloudHsmClusterOptionalParams } from "../../api/cloudHsmClusterPrivateLinkResources/options.js";
import { listByCloudHsmCluster } from "../../api/cloudHsmClusterPrivateLinkResources/operations.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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
