// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ReachabilityAnalysisIntentsListOptionalParams extends OperationOptions {
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
export interface ReachabilityAnalysisIntentsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ReachabilityAnalysisIntentsCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ReachabilityAnalysisIntentsGetOptionalParams extends OperationOptions {}
