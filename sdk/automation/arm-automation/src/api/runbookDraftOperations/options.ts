// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RunbookDraftOperationsUndoEditOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RunbookDraftOperationsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RunbookDraftOperationsReplaceContentOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RunbookDraftOperationsGetContentOptionalParams extends OperationOptions {}
