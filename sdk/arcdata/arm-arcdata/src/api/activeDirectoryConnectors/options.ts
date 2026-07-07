// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ActiveDirectoryConnectorsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ActiveDirectoryConnectorsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ActiveDirectoryConnectorsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ActiveDirectoryConnectorsGetOptionalParams extends OperationOptions {}
