// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface OnlineExperimentationWorkspacesListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OnlineExperimentationWorkspacesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OnlineExperimentationWorkspacesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface OnlineExperimentationWorkspacesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface OnlineExperimentationWorkspacesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface OnlineExperimentationWorkspacesGetOptionalParams extends OperationOptions {}
