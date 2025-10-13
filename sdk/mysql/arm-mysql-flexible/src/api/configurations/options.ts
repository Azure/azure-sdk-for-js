// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ConfigurationsBatchUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConfigurationsListByServerOptionalParams extends OperationOptions {
  /** The tags of the server configuration. */
  tags?: string;
  /** The keyword of the server configuration. */
  keyword?: string;
  /** The page of the server configuration. */
  page?: number;
  /** The pageSize of the server configuration. */
  pageSize?: number;
}

/** Optional parameters. */
export interface ConfigurationsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConfigurationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConfigurationsGetOptionalParams extends OperationOptions {}
