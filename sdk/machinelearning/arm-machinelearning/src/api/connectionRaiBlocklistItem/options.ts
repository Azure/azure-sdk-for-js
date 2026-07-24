// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ConnectionRaiBlocklistItemDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Api version used by proxy call */
  proxyApiVersion?: string;
}

/** Optional parameters. */
export interface ConnectionRaiBlocklistItemCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Api version used by proxy call */
  proxyApiVersion?: string;
}

/** Optional parameters. */
export interface ConnectionRaiBlocklistItemGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConnectionRaiBlocklistItemDeleteBulkOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConnectionRaiBlocklistItemAddBulkOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
