// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import {
  listWorkflows,
  getWorkflow,
  listWorkflowsConnections,
  $delete,
  createOrUpdate,
  get,
} from "../../api/logicApps/operations.js";
import type {
  LogicAppsListWorkflowsOptionalParams,
  LogicAppsGetWorkflowOptionalParams,
  LogicAppsListWorkflowsConnectionsOptionalParams,
  LogicAppsDeleteOptionalParams,
  LogicAppsCreateOrUpdateOptionalParams,
  LogicAppsGetOptionalParams,
} from "../../api/logicApps/options.js";
import type { LogicApp, WorkflowEnvelope } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a LogicApps operations. */
export interface LogicAppsOperations {
  /** List the workflows for a logic app. */
  listWorkflows: (
    resourceGroupName: string,
    containerAppName: string,
    logicAppName: string,
    options?: LogicAppsListWorkflowsOptionalParams,
  ) => PagedAsyncIterableIterator<WorkflowEnvelope>;
  /** Get workflow information by its name */
  getWorkflow: (
    resourceGroupName: string,
    containerAppName: string,
    logicAppName: string,
    workflowName: string,
    options?: LogicAppsGetWorkflowOptionalParams,
  ) => Promise<WorkflowEnvelope>;
  /** Gets logic app's connections. */
  listWorkflowsConnections: (
    resourceGroupName: string,
    containerAppName: string,
    logicAppName: string,
    options?: LogicAppsListWorkflowsConnectionsOptionalParams,
  ) => Promise<WorkflowEnvelope>;
  /** Deletes a Logic App extension resource */
  delete: (
    resourceGroupName: string,
    containerAppName: string,
    logicAppName: string,
    options?: LogicAppsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a Logic App extension resource */
  createOrUpdate: (
    resourceGroupName: string,
    containerAppName: string,
    logicAppName: string,
    options?: LogicAppsCreateOrUpdateOptionalParams,
  ) => Promise<LogicApp>;
  /** Gets a logic app extension resource. */
  get: (
    resourceGroupName: string,
    containerAppName: string,
    logicAppName: string,
    options?: LogicAppsGetOptionalParams,
  ) => Promise<LogicApp>;
}

function _getLogicApps(context: ContainerAppsAPIContext) {
  return {
    listWorkflows: (
      resourceGroupName: string,
      containerAppName: string,
      logicAppName: string,
      options?: LogicAppsListWorkflowsOptionalParams,
    ) => listWorkflows(context, resourceGroupName, containerAppName, logicAppName, options),
    getWorkflow: (
      resourceGroupName: string,
      containerAppName: string,
      logicAppName: string,
      workflowName: string,
      options?: LogicAppsGetWorkflowOptionalParams,
    ) =>
      getWorkflow(
        context,
        resourceGroupName,
        containerAppName,
        logicAppName,
        workflowName,
        options,
      ),
    listWorkflowsConnections: (
      resourceGroupName: string,
      containerAppName: string,
      logicAppName: string,
      options?: LogicAppsListWorkflowsConnectionsOptionalParams,
    ) =>
      listWorkflowsConnections(context, resourceGroupName, containerAppName, logicAppName, options),
    delete: (
      resourceGroupName: string,
      containerAppName: string,
      logicAppName: string,
      options?: LogicAppsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, containerAppName, logicAppName, options),
    createOrUpdate: (
      resourceGroupName: string,
      containerAppName: string,
      logicAppName: string,
      options?: LogicAppsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, containerAppName, logicAppName, options),
    get: (
      resourceGroupName: string,
      containerAppName: string,
      logicAppName: string,
      options?: LogicAppsGetOptionalParams,
    ) => get(context, resourceGroupName, containerAppName, logicAppName, options),
  };
}

export function _getLogicAppsOperations(context: ContainerAppsAPIContext): LogicAppsOperations {
  return {
    ..._getLogicApps(context),
  };
}
