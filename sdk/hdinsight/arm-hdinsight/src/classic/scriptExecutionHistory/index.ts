// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HDInsightManagementContext } from "../../api/hdInsightManagementContext.js";
import { promote, listByCluster } from "../../api/scriptExecutionHistory/operations.js";
import type {
  ScriptExecutionHistoryPromoteOptionalParams,
  ScriptExecutionHistoryListByClusterOptionalParams,
} from "../../api/scriptExecutionHistory/options.js";
import type { RuntimeScriptActionDetail } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ScriptExecutionHistory operations. */
export interface ScriptExecutionHistoryOperations {
  /** Promotes the specified ad-hoc script execution to a persisted script. */
  promote: (
    resourceGroupName: string,
    clusterName: string,
    scriptExecutionId: string,
    options?: ScriptExecutionHistoryPromoteOptionalParams,
  ) => Promise<void>;
  /** Lists all scripts' execution history for the specified cluster. */
  listByCluster: (
    resourceGroupName: string,
    clusterName: string,
    options?: ScriptExecutionHistoryListByClusterOptionalParams,
  ) => PagedAsyncIterableIterator<RuntimeScriptActionDetail>;
}

function _getScriptExecutionHistory(context: HDInsightManagementContext) {
  return {
    promote: (
      resourceGroupName: string,
      clusterName: string,
      scriptExecutionId: string,
      options?: ScriptExecutionHistoryPromoteOptionalParams,
    ) => promote(context, resourceGroupName, clusterName, scriptExecutionId, options),
    listByCluster: (
      resourceGroupName: string,
      clusterName: string,
      options?: ScriptExecutionHistoryListByClusterOptionalParams,
    ) => listByCluster(context, resourceGroupName, clusterName, options),
  };
}

export function _getScriptExecutionHistoryOperations(
  context: HDInsightManagementContext,
): ScriptExecutionHistoryOperations {
  return {
    ..._getScriptExecutionHistory(context),
  };
}
