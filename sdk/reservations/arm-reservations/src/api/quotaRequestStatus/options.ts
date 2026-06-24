// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface QuotaRequestStatusListOptionalParams extends OperationOptions {
  /**
   * | Field | Supported operators |
   * |---------------------|------------------------|
   * |requestSubmitTime | ge, le, eq, gt, lt |
   */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** Skiptoken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element includes a skiptoken parameter that specifies a starting point to use for subsequent calls. */
  skiptoken?: string;
}

/** Optional parameters. */
export interface QuotaRequestStatusGetOptionalParams extends OperationOptions {}
