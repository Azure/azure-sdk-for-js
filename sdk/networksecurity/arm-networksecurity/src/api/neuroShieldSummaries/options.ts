// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface NeuroShieldSummariesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NeuroShieldSummariesListOptionalParams extends OperationOptions {
  /** The maximum number of items to return. */
  top?: number;
}
