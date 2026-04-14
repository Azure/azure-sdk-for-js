// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DataFlowDebugSessionExecuteCommandOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DataFlowDebugSessionDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataFlowDebugSessionAddDataFlowOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataFlowDebugSessionQueryByFactoryOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DataFlowDebugSessionCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
