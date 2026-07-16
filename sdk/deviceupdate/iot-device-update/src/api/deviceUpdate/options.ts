// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DeviceUpdateGetOperationStatusOptionalParams extends OperationOptions {
  /**
   * Defines the If-None-Match condition. The operation will be performed only if
   * the ETag on the server does not match this value.
   */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface DeviceUpdateListOperationStatusesOptionalParams extends OperationOptions {
  /**
   * Optional to filter operations by status property. Only one specific filter is
   * supported: "status eq 'NotStarted' or status eq 'Running'"
   */
  filter?: string;
  /**
   * Specifies a non-negative integer n that limits the number of items returned
   * from a collection. The service returns the number of available items up to but
   * not greater than the specified value n.
   */
  top?: number;
}

/** Optional parameters. */
export interface DeviceUpdateGetFileOptionalParams extends OperationOptions {
  /**
   * Defines the If-None-Match condition. The operation will be performed only if
   * the ETag on the server does not match this value.
   */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface DeviceUpdateListFilesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeviceUpdateListVersionsOptionalParams extends OperationOptions {
  /** Optional to filter updates by isDeployable property. */
  filter?: string;
}

/** Optional parameters. */
export interface DeviceUpdateListNamesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeviceUpdateListProvidersOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeviceUpdateDeleteUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DeviceUpdateGetUpdateOptionalParams extends OperationOptions {
  /**
   * Defines the If-None-Match condition. The operation will be performed only if
   * the ETag on the server does not match this value.
   */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface DeviceUpdateImportUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DeviceUpdateListUpdatesOptionalParams extends OperationOptions {
  /** Request updates matching a free-text search expression. */
  search?: string;
  /** Optional to filter updates by isDeployable property. */
  filter?: string;
}
