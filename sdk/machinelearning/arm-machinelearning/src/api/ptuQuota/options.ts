// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PTUQuotaListOptionalParams extends OperationOptions {
  /** Continuation token for pagination. */
  skip?: string;
}

/** Optional parameters. */
export interface PTUQuotaGetAvailableOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PTUQuotaListAvailableOptionalParams extends OperationOptions {
  /** Continuation token for pagination. */
  skip?: string;
}
