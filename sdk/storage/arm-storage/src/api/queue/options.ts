// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface QueueDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface QueueUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface QueueCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface QueueGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface QueueListOptionalParams extends OperationOptions {
  /** Optional, a maximum number of queues that should be included in a list queue response */
  maxpagesize?: string;
  /** Optional, When specified, only the queues with a name starting with the given filter will be listed. */
  filter?: string;
}
