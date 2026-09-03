// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BackupsLongTermRetentionListByServerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BackupsLongTermRetentionGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BackupsLongTermRetentionStartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BackupsLongTermRetentionCheckPrerequisitesOptionalParams extends OperationOptions {}
