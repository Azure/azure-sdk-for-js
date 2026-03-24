// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HDInsightManagementContext } from "../../api/hdInsightManagementContext.js";
import {
  getExecutionDetail,
  getExecutionAsyncOperationStatus,
  listByCluster,
  $delete,
} from "../../api/scriptActions/operations.js";
import type {
  ScriptActionsGetExecutionDetailOptionalParams,
  ScriptActionsGetExecutionAsyncOperationStatusOptionalParams,
  ScriptActionsListByClusterOptionalParams,
  ScriptActionsDeleteOptionalParams,
} from "../../api/scriptActions/options.js";
import type { AsyncOperationResult, RuntimeScriptActionDetail } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ScriptActions operations. */
export interface ScriptActionsOperations {
  /** Gets the script execution detail for the given script execution ID. */
  getExecutionDetail: (
    resourceGroupName: string,
    clusterName: string,
    scriptExecutionId: string,
    options?: ScriptActionsGetExecutionDetailOptionalParams,
  ) => Promise<RuntimeScriptActionDetail>;
  /** Gets the async operation status of execution operation. */
  getExecutionAsyncOperationStatus: (
    resourceGroupName: string,
    clusterName: string,
    operationId: string,
    options?: ScriptActionsGetExecutionAsyncOperationStatusOptionalParams,
  ) => Promise<AsyncOperationResult>;
  /** Lists all the persisted script actions for the specified cluster. */
  listByCluster: (
    resourceGroupName: string,
    clusterName: string,
    options?: ScriptActionsListByClusterOptionalParams,
  ) => PagedAsyncIterableIterator<RuntimeScriptActionDetail>;
  /** Deletes a specified persisted script action of the cluster. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    scriptName: string,
    options?: ScriptActionsDeleteOptionalParams,
  ) => Promise<void>;
}

function _getScriptActions(context: HDInsightManagementContext) {
  return {
    getExecutionDetail: (
      resourceGroupName: string,
      clusterName: string,
      scriptExecutionId: string,
      options?: ScriptActionsGetExecutionDetailOptionalParams,
    ) => getExecutionDetail(context, resourceGroupName, clusterName, scriptExecutionId, options),
    getExecutionAsyncOperationStatus: (
      resourceGroupName: string,
      clusterName: string,
      operationId: string,
      options?: ScriptActionsGetExecutionAsyncOperationStatusOptionalParams,
    ) =>
      getExecutionAsyncOperationStatus(
        context,
        resourceGroupName,
        clusterName,
        operationId,
        options,
      ),
    listByCluster: (
      resourceGroupName: string,
      clusterName: string,
      options?: ScriptActionsListByClusterOptionalParams,
    ) => listByCluster(context, resourceGroupName, clusterName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      scriptName: string,
      options?: ScriptActionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, scriptName, options),
  };
}

export function _getScriptActionsOperations(
  context: HDInsightManagementContext,
): ScriptActionsOperations {
  return {
    ..._getScriptActions(context),
  };
}
