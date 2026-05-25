// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ContainerAppsSourceControlsListByContainerAppOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ContainerAppsSourceControlsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Github personal access token used for SourceControl. */
  xMsGithubAuxiliary?: string;
  /** Ignore Workflow Deletion Failure. */
  ignoreWorkflowDeletionFailure?: boolean;
  /** Delete workflow. */
  deleteWorkflow?: boolean;
}

/** Optional parameters. */
export interface ContainerAppsSourceControlsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Github personal access token used for SourceControl. */
  xMsGithubAuxiliary?: string;
}

/** Optional parameters. */
export interface ContainerAppsSourceControlsGetOptionalParams extends OperationOptions {}
