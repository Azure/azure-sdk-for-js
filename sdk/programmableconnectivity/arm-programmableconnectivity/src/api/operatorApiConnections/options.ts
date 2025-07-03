// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface OperatorApiConnectionsListBySubscriptionOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface OperatorApiConnectionsListByResourceGroupOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface OperatorApiConnectionsDeleteOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface OperatorApiConnectionsUpdateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface OperatorApiConnectionsCreateOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface OperatorApiConnectionsGetOptionalParams
  extends OperationOptions {}
