// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPIContext } from "../../api/azureVMwareSolutionAPIContext.js";
import { ScriptExecution } from "../../models/models.js";
import {
  ScriptExecutionsGetExecutionLogsOptionalParams,
  ScriptExecutionsDeleteOptionalParams,
  ScriptExecutionsCreateOrUpdateOptionalParams,
  ScriptExecutionsGetOptionalParams,
  ScriptExecutionsListOptionalParams,
} from "../../api/scriptExecutions/options.js";
import {
  getExecutionLogs,
  $delete,
  createOrUpdate,
  get,
  list,
} from "../../api/scriptExecutions/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ScriptExecutions operations. */
export interface ScriptExecutionsOperations {
  /** Return the logs for a script execution resource */
  getExecutionLogs: (
    resourceGroupName: string,
    privateCloudName: string,
    scriptExecutionName: string,
    options?: ScriptExecutionsGetExecutionLogsOptionalParams,
  ) => Promise<ScriptExecution>;
  /** Delete a ScriptExecution */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    privateCloudName: string,
    scriptExecutionName: string,
    options?: ScriptExecutionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a ScriptExecution */
  createOrUpdate: (
    resourceGroupName: string,
    privateCloudName: string,
    scriptExecutionName: string,
    scriptExecution: ScriptExecution,
    options?: ScriptExecutionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ScriptExecution>, ScriptExecution>;
  /** Get a ScriptExecution */
  get: (
    resourceGroupName: string,
    privateCloudName: string,
    scriptExecutionName: string,
    options?: ScriptExecutionsGetOptionalParams,
  ) => Promise<ScriptExecution>;
  /** List ScriptExecution resources by PrivateCloud */
  list: (
    resourceGroupName: string,
    privateCloudName: string,
    options?: ScriptExecutionsListOptionalParams,
  ) => PagedAsyncIterableIterator<ScriptExecution>;
}

function _getScriptExecutions(context: AzureVMwareSolutionAPIContext) {
  return {
    getExecutionLogs: (
      resourceGroupName: string,
      privateCloudName: string,
      scriptExecutionName: string,
      options?: ScriptExecutionsGetExecutionLogsOptionalParams,
    ) =>
      getExecutionLogs(context, resourceGroupName, privateCloudName, scriptExecutionName, options),
    delete: (
      resourceGroupName: string,
      privateCloudName: string,
      scriptExecutionName: string,
      options?: ScriptExecutionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, privateCloudName, scriptExecutionName, options),
    createOrUpdate: (
      resourceGroupName: string,
      privateCloudName: string,
      scriptExecutionName: string,
      scriptExecution: ScriptExecution,
      options?: ScriptExecutionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        privateCloudName,
        scriptExecutionName,
        scriptExecution,
        options,
      ),
    get: (
      resourceGroupName: string,
      privateCloudName: string,
      scriptExecutionName: string,
      options?: ScriptExecutionsGetOptionalParams,
    ) => get(context, resourceGroupName, privateCloudName, scriptExecutionName, options),
    list: (
      resourceGroupName: string,
      privateCloudName: string,
      options?: ScriptExecutionsListOptionalParams,
    ) => list(context, resourceGroupName, privateCloudName, options),
  };
}

export function _getScriptExecutionsOperations(
  context: AzureVMwareSolutionAPIContext,
): ScriptExecutionsOperations {
  return {
    ..._getScriptExecutions(context),
  };
}
