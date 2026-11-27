// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IoTFirmwareDefenseContext } from "../../api/ioTFirmwareDefenseContext.js";
import { listByWorkspace, get } from "../../api/usageMetrics/operations.js";
import type {
  UsageMetricsListByWorkspaceOptionalParams,
  UsageMetricsGetOptionalParams,
} from "../../api/usageMetrics/options.js";
import type { UsageMetric } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a UsageMetrics operations. */
export interface UsageMetricsOperations {
  /** Lists monthly usage information for a workspace. */
  listByWorkspace: (
    resourceGroupName: string,
    workspaceName: string,
    options?: UsageMetricsListByWorkspaceOptionalParams,
  ) => PagedAsyncIterableIterator<UsageMetric>;
  /** Gets monthly usage information for a workspace. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: UsageMetricsGetOptionalParams,
  ) => Promise<UsageMetric>;
}

function _getUsageMetrics(context: IoTFirmwareDefenseContext) {
  return {
    listByWorkspace: (
      resourceGroupName: string,
      workspaceName: string,
      options?: UsageMetricsListByWorkspaceOptionalParams,
    ) => listByWorkspace(context, resourceGroupName, workspaceName, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: UsageMetricsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, name, options),
  };
}

export function _getUsageMetricsOperations(
  context: IoTFirmwareDefenseContext,
): UsageMetricsOperations {
  return {
    ..._getUsageMetrics(context),
  };
}
