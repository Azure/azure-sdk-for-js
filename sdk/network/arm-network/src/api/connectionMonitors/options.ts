// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ConnectionMonitorsStopOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConnectionMonitorsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConnectionMonitorsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConnectionMonitorsUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConnectionMonitorsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Value indicating whether connection monitor V1 should be migrated to V2 format. */
  migrate?: string;
}

/** Optional parameters. */
export interface ConnectionMonitorsGetOptionalParams extends OperationOptions {}
