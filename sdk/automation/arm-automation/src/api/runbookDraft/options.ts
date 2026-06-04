// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RunbookDraftUndoEditOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RunbookDraftGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RunbookDraftReplaceContentOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RunbookDraftGetContentOptionalParams extends OperationOptions {}
