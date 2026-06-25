// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionContext } from "../../api/dataProtectionContext.js";
import { trigger } from "../../api/exportJobs/operations.js";
import { ExportJobsTriggerOptionalParams } from "../../api/exportJobs/options.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ExportJobs operations. */
export interface ExportJobsOperations {
  /** Triggers export of jobs and returns an OperationID to track. */
  trigger: (
    resourceGroupName: string,
    vaultName: string,
    options?: ExportJobsTriggerOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
}

function _getExportJobs(context: DataProtectionContext) {
  return {
    trigger: (
      resourceGroupName: string,
      vaultName: string,
      options?: ExportJobsTriggerOptionalParams,
    ) => trigger(context, resourceGroupName, vaultName, options),
  };
}

export function _getExportJobsOperations(context: DataProtectionContext): ExportJobsOperations {
  return {
    ..._getExportJobs(context),
  };
}
