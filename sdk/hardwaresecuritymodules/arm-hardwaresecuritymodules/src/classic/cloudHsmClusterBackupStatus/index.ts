// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureDedicatedHSMResourceProviderContext } from "../../api/azureDedicatedHSMResourceProviderContext.js";
import type { CloudHsmClusterBackupStatusGetOptionalParams } from "../../api/cloudHsmClusterBackupStatus/options.js";
import { get } from "../../api/cloudHsmClusterBackupStatus/operations.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CloudHsmClusterBackupStatus operations. */
export interface CloudHsmClusterBackupStatusOperations {
  /** Gets the backup operation status of the specified Cloud HSM Cluster */
  get: (
    resourceGroupName: string,
    cloudHsmClusterName: string,
    jobId: string,
    options?: CloudHsmClusterBackupStatusGetOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
}

function _getCloudHsmClusterBackupStatus(context: AzureDedicatedHSMResourceProviderContext) {
  return {
    get: (
      resourceGroupName: string,
      cloudHsmClusterName: string,
      jobId: string,
      options?: CloudHsmClusterBackupStatusGetOptionalParams,
    ) => get(context, resourceGroupName, cloudHsmClusterName, jobId, options),
  };
}

export function _getCloudHsmClusterBackupStatusOperations(
  context: AzureDedicatedHSMResourceProviderContext,
): CloudHsmClusterBackupStatusOperations {
  return {
    ..._getCloudHsmClusterBackupStatus(context),
  };
}
