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
    apiVersion: string,
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
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    scriptExecutionName: string,
    options?: ScriptExecutionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a ScriptExecution */
  createOrUpdate: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    scriptExecutionName: string,
    scriptExecution: ScriptExecution,
    options?: ScriptExecutionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ScriptExecution>, ScriptExecution>;
  /** Get a ScriptExecution */
  get: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    scriptExecutionName: string,
    options?: ScriptExecutionsGetOptionalParams,
  ) => Promise<ScriptExecution>;
  /** List ScriptExecution resources by PrivateCloud */
  list: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    options?: ScriptExecutionsListOptionalParams,
  ) => PagedAsyncIterableIterator<ScriptExecution>;
}

function _getScriptExecutions(context: AzureVMwareSolutionAPIContext) {
  return {
    getExecutionLogs: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      scriptExecutionName: string,
      options?: ScriptExecutionsGetExecutionLogsOptionalParams,
    ) =>
      getExecutionLogs(
        context,
        apiVersion,
        resourceGroupName,
        privateCloudName,
        scriptExecutionName,
        options,
      ),
    delete: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      scriptExecutionName: string,
      options?: ScriptExecutionsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        apiVersion,
        resourceGroupName,
        privateCloudName,
        scriptExecutionName,
        options,
      ),
    createOrUpdate: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      scriptExecutionName: string,
      scriptExecution: ScriptExecution,
      options?: ScriptExecutionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        apiVersion,
        resourceGroupName,
        privateCloudName,
        scriptExecutionName,
        scriptExecution,
        options,
      ),
    get: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      scriptExecutionName: string,
      options?: ScriptExecutionsGetOptionalParams,
    ) =>
      get(context, apiVersion, resourceGroupName, privateCloudName, scriptExecutionName, options),
    list: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      options?: ScriptExecutionsListOptionalParams,
    ) => list(context, apiVersion, resourceGroupName, privateCloudName, options),
  };
}

export function _getScriptExecutionsOperations(
  context: AzureVMwareSolutionAPIContext,
): ScriptExecutionsOperations {
  return {
    ..._getScriptExecutions(context),
  };
}
