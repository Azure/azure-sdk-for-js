// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDedicatedHSMResourceProviderContext } from "../../api/azureDedicatedHSMResourceProviderContext.js";
import { CloudHsmClusterRestoreStatusGetOptionalParams } from "../../api/cloudHsmClusterRestoreStatus/options.js";
import { get } from "../../api/cloudHsmClusterRestoreStatus/operations.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CloudHsmClusterRestoreStatus operations. */
export interface CloudHsmClusterRestoreStatusOperations {
  /** Gets the restore operation status of the specified Cloud HSM Cluster */
  get: (
    resourceGroupName: string,
    cloudHsmClusterName: string,
    jobId: string,
    options?: CloudHsmClusterRestoreStatusGetOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
}

function _getCloudHsmClusterRestoreStatus(context: AzureDedicatedHSMResourceProviderContext) {
  return {
    get: (
      resourceGroupName: string,
      cloudHsmClusterName: string,
      jobId: string,
      options?: CloudHsmClusterRestoreStatusGetOptionalParams,
    ) => get(context, resourceGroupName, cloudHsmClusterName, jobId, options),
  };
}

export function _getCloudHsmClusterRestoreStatusOperations(
  context: AzureDedicatedHSMResourceProviderContext,
): CloudHsmClusterRestoreStatusOperations {
  return {
    ..._getCloudHsmClusterRestoreStatus(context),
  };
}
