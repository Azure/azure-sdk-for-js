// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DbNodesActionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DbNodesListByParentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DbNodesGetOptionalParams extends OperationOptions {}
