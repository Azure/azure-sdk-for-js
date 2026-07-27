// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ReachabilityAnalysisRunsListOptionalParams extends OperationOptions {
  /** Optional skip token. */
  skipToken?: string;
  /** Optional num entries to skip. */
  skip?: number;
  /** Optional num entries to show. */
  top?: number;
  /** Optional key by which to sort. */
  sortKey?: string;
  /** Optional sort value for pagination. */
  sortValue?: string;
}

/** Optional parameters. */
export interface ReachabilityAnalysisRunsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ReachabilityAnalysisRunsCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ReachabilityAnalysisRunsGetOptionalParams extends OperationOptions {}
