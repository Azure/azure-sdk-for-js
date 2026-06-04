// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface JobStreamListByJobOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. */
  filter?: string;
  /** Identifies this specific client request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface JobStreamGetOptionalParams extends OperationOptions {
  /** Identifies this specific client request. */
  clientRequestId?: string;
}
