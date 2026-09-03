// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import {
  listWorkflows,
  getWorkflow,
  invoke,
  listWorkflowsConnections,
  deployWorkflowArtifacts,
  $delete,
  createOrUpdate,
  get,
} from "../../api/logicApps/operations.js";
import {
  LogicAppsListWorkflowsOptionalParams,
  LogicAppsGetWorkflowOptionalParams,
  LogicAppsInvokeOptionalParams,
  LogicAppsListWorkflowsConnectionsOptionalParams,
  LogicAppsDeployWorkflowArtifactsOptionalParams,
  LogicAppsDeleteOptionalParams,
  LogicAppsCreateOrUpdateOptionalParams,
  LogicAppsGetOptionalParams,
} from "../../api/logicApps/options.js";
import { LogicApp, WorkflowEnvelope, Object, LogicAppsProxyMethod } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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
  /** Proxies a the API call to the logic app backed by the container app. */
  invoke: (
    resourceGroupName: string,
    containerAppName: string,
    logicAppName: string,
    xMsLogicAppsProxyPath: string,
    xMsLogicAppsProxyMethod: LogicAppsProxyMethod,
    options?: LogicAppsInvokeOptionalParams,
  ) => Promise<Object>;
  /** Gets logic app's connections. */
  listWorkflowsConnections: (
    resourceGroupName: string,
    containerAppName: string,
    logicAppName: string,
    options?: LogicAppsListWorkflowsConnectionsOptionalParams,
  ) => Promise<WorkflowEnvelope>;
  /** Creates or updates the artifacts for the logic app */
  deployWorkflowArtifacts: (
    resourceGroupName: string,
    containerAppName: string,
    logicAppName: string,
    options?: LogicAppsDeployWorkflowArtifactsOptionalParams,
  ) => Promise<void>;
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
    resource: LogicApp,
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
    invoke: (
      resourceGroupName: string,
      containerAppName: string,
      logicAppName: string,
      xMsLogicAppsProxyPath: string,
      xMsLogicAppsProxyMethod: LogicAppsProxyMethod,
      options?: LogicAppsInvokeOptionalParams,
    ) =>
      invoke(
        context,
        resourceGroupName,
        containerAppName,
        logicAppName,
        xMsLogicAppsProxyPath,
        xMsLogicAppsProxyMethod,
        options,
      ),
    listWorkflowsConnections: (
      resourceGroupName: string,
      containerAppName: string,
      logicAppName: string,
      options?: LogicAppsListWorkflowsConnectionsOptionalParams,
    ) =>
      listWorkflowsConnections(context, resourceGroupName, containerAppName, logicAppName, options),
    deployWorkflowArtifacts: (
      resourceGroupName: string,
      containerAppName: string,
      logicAppName: string,
      options?: LogicAppsDeployWorkflowArtifactsOptionalParams,
    ) =>
      deployWorkflowArtifacts(context, resourceGroupName, containerAppName, logicAppName, options),
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
      resource: LogicApp,
      options?: LogicAppsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, containerAppName, logicAppName, resource, options),
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
