// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DiagnoseWorkspaceParameters } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkspacesResyncKeysOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WorkspacesPrepareNotebookOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WorkspacesListOutboundNetworkDependenciesEndpointsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspacesListStorageAccountKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspacesListNotebookKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspacesListNotebookAccessTokenOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspacesListKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspacesDiagnoseOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The parameter of diagnosing workspace health */
  body?: DiagnoseWorkspaceParameters;
}

/** Optional parameters. */
export interface WorkspacesListBySubscriptionOptionalParams extends OperationOptions {
  /** Kind of workspace. */
  kind?: string;
  /** Continuation token for pagination. */
  skip?: string;
  aiCapabilities?: string;
}

/** Optional parameters. */
export interface WorkspacesListByResourceGroupOptionalParams extends OperationOptions {
  /** Kind of workspace. */
  kind?: string;
  /** Continuation token for pagination. */
  skip?: string;
  aiCapabilities?: string;
}

/** Optional parameters. */
export interface WorkspacesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Flag to indicate delete is a purge request. */
  forceToPurge?: boolean;
}

/** Optional parameters. */
export interface WorkspacesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WorkspacesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WorkspacesGetOptionalParams extends OperationOptions {}
