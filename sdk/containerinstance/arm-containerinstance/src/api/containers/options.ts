// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ContainersAttachOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ContainersExecuteCommandOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ContainersListLogsOptionalParams extends OperationOptions {
  /** The number of lines to show from the tail of the container instance log. If not provided, all available logs are shown up to 4mb. */
  tail?: number;
  /** If true, adds a timestamp at the beginning of every line of log output. If not provided, defaults to false. */
  timestamps?: boolean;
}
