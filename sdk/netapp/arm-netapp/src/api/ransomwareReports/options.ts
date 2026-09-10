// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RansomwareReportsClearSuspectsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RansomwareReportsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RansomwareReportsGetOptionalParams extends OperationOptions {}
