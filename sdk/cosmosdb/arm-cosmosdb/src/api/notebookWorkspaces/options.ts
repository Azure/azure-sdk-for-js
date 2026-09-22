// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface NotebookWorkspacesStartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NotebookWorkspacesRegenerateAuthTokenOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NotebookWorkspacesListConnectionInfoOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NotebookWorkspacesListByDatabaseAccountOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NotebookWorkspacesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NotebookWorkspacesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NotebookWorkspacesGetOptionalParams extends OperationOptions {}
