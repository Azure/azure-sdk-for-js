// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RecoveryPointsGetRPExtendedInfoOperationResultOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RecoveryPointsGetRPExtendedInfoOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RecoveryPointsListOptionalParams extends OperationOptions {
  filter?: string;
}

/** Optional parameters. */
export interface RecoveryPointsGetOptionalParams extends OperationOptions {}
