// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ConnectionRaiBlocklistDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Api version used by proxy call */
  proxyApiVersion?: string;
}

/** Optional parameters. */
export interface ConnectionRaiBlocklistCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Api version used by proxy call */
  proxyApiVersion?: string;
}

/** Optional parameters. */
export interface ConnectionRaiBlocklistGetOptionalParams extends OperationOptions {}
