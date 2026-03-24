// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ExtensionsGetAzureAsyncOperationStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExtensionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExtensionsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExtensionsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExtensionsDisableAzureMonitorAgentOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExtensionsGetAzureMonitorAgentStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExtensionsEnableAzureMonitorAgentOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExtensionsDisableAzureMonitorOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExtensionsGetAzureMonitorStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExtensionsEnableAzureMonitorOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExtensionsDisableMonitoringOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExtensionsGetMonitoringStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExtensionsEnableMonitoringOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
