// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface JobsExecutionsListOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. */
  filter?: string;
}
