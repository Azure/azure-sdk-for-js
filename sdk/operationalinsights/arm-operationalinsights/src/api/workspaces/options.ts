// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkspacesFailoverOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WorkspacesReconcileNSPOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WorkspacesListNSPOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspacesGetNSPOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspacesFailbackOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WorkspacesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspacesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspacesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Deletes the workspace without the recovery option. A workspace that was deleted with this flag cannot be recovered. */
  force?: boolean;
}

/** Optional parameters. */
export interface WorkspacesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspacesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WorkspacesGetOptionalParams extends OperationOptions {}
