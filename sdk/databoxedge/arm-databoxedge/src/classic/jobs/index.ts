// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementContext } from "../../api/dataBoxEdgeManagementContext.js";
import { get } from "../../api/jobs/operations.js";
import { JobsGetOptionalParams } from "../../api/jobs/options.js";
import { Job } from "../../models/models.js";

/** Interface representing a Jobs operations. */
export interface JobsOperations {
  /** Gets the details of a specified job on a Data Box Edge/Data Box Gateway device. */
  get: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: JobsGetOptionalParams,
  ) => Promise<Job>;
}

function _getJobs(context: DataBoxEdgeManagementContext) {
  return {
    get: (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      options?: JobsGetOptionalParams,
    ) => get(context, deviceName, name, resourceGroupName, options),
  };
}

export function _getJobsOperations(context: DataBoxEdgeManagementContext): JobsOperations {
  return {
    ..._getJobs(context),
  };
}
