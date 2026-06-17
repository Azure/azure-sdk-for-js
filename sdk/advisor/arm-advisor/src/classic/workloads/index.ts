// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AdvisorManagementContext } from "../../api/advisorManagementContext.js";
import { list } from "../../api/workloads/operations.js";
import type { WorkloadsListOptionalParams } from "../../api/workloads/options.js";
import type { WorkloadResult } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Workloads operations. */
export interface WorkloadsOperations {
  /** Get list of Workloads. */
  list: (options?: WorkloadsListOptionalParams) => PagedAsyncIterableIterator<WorkloadResult>;
}

function _getWorkloads(context: AdvisorManagementContext) {
  return {
    list: (options?: WorkloadsListOptionalParams) => list(context, options),
  };
}

export function _getWorkloadsOperations(context: AdvisorManagementContext): WorkloadsOperations {
  return {
    ..._getWorkloads(context),
  };
}
