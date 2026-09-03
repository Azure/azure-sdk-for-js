// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RecoveryPointsListOptionalParams extends OperationOptions {
  /** OData filter options. */
  filter?: string;
  /** skipToken Filter. */
  skipToken?: string;
}

/** Optional parameters. */
export interface RecoveryPointsGetOptionalParams extends OperationOptions {}
