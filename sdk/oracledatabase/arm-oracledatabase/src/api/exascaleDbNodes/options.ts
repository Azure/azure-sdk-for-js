// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ExascaleDbNodesActionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExascaleDbNodesListByParentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExascaleDbNodesGetOptionalParams extends OperationOptions {}
