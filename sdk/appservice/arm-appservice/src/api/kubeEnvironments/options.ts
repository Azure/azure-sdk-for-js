// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface KubeEnvironmentsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface KubeEnvironmentsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface KubeEnvironmentsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface KubeEnvironmentsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface KubeEnvironmentsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface KubeEnvironmentsGetOptionalParams extends OperationOptions {}
