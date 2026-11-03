// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface TransparentDataEncryptionsListBySchedulerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface TransparentDataEncryptionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface TransparentDataEncryptionsCreateOrReplaceOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface TransparentDataEncryptionsGetOptionalParams extends OperationOptions {}
