// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface JobListOptionalParams extends OperationOptions {
  /** OData options. */
  odataOptions?: string;
  /** Continuation token. */
  continuationToken?: string;
  /** Page size. */
  pageSize?: number;
}

/** Optional parameters. */
export interface JobGetOptionalParams extends OperationOptions {}
