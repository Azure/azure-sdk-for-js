// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RunbookGetContentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RunbookPublishOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RunbookListByAutomationAccountOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RunbookDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RunbookUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RunbookCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RunbookGetOptionalParams extends OperationOptions {}
