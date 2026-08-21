// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkspacePurgePurgeLakeDataOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
/** Optional parameters. */
export interface WorkspacePurgeGetPurgeStatusOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface WorkspacePurgePurgeOptionalParams extends OperationOptions {}
