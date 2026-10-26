// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VmApplicationsListOptionalParams extends OperationOptions {
  /** The maximum number of results to return. */
  top?: number;
  /** The continuation token for the next page of results. */
  skipToken?: string;
}

/** Optional parameters. */
export interface VmApplicationsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VmApplicationsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VmApplicationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VmApplicationsGetInstanceViewOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VmApplicationsGetOptionalParams extends OperationOptions {}
