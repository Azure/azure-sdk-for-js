// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkflowArtifacts } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface LogicAppsListWorkflowsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LogicAppsGetWorkflowOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LogicAppsInvokeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LogicAppsListWorkflowsConnectionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LogicAppsDeployWorkflowArtifactsOptionalParams extends OperationOptions {
  /** Application settings and files of the workflow. */
  workflowArtifacts?: WorkflowArtifacts;
}

/** Optional parameters. */
export interface LogicAppsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LogicAppsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface LogicAppsGetOptionalParams extends OperationOptions {}
