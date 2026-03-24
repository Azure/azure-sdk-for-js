// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PortalRevisionListByServiceOptionalParams extends OperationOptions {
  /**
   * | Field       | Supported operators    | Supported functions               |
   * |-------------|------------------------|-----------------------------------|
   *
   * |name | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith|
   * |description | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith|
   * |isCurrent | eq, ne |    |
   */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
}

/** Optional parameters. */
export interface PortalRevisionUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PortalRevisionCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PortalRevisionGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PortalRevisionGetOptionalParams extends OperationOptions {}
