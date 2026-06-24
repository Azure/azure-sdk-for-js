// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GrafanaFetchAvailablePluginsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GrafanaCheckEnterpriseDetailsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GrafanaListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GrafanaListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GrafanaDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GrafanaUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GrafanaCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GrafanaGetOptionalParams extends OperationOptions {}
