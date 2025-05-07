// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface OnlineExperimentWorkspacesListBySubscriptionOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface OnlineExperimentWorkspacesListByResourceGroupOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface OnlineExperimentWorkspacesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface OnlineExperimentWorkspacesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface OnlineExperimentWorkspacesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface OnlineExperimentWorkspacesGetOptionalParams extends OperationOptions {}
