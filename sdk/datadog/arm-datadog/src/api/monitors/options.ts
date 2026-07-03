// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DatadogMonitorResource,
  DatadogMonitorResourceUpdateParameters,
  DatadogApiKey,
} from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface MonitorsRefreshSetPasswordLinkOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsListMonitoredResourcesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsListLinkedResourcesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsListHostsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsSetDefaultKeyOptionalParams extends OperationOptions {
  body?: DatadogApiKey;
}

/** Optional parameters. */
export interface MonitorsGetDefaultKeyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsListApiKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsGetDefaultApplicationKeyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsManageSreAgentConnectorsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitorsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MonitorsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  body?: DatadogMonitorResourceUpdateParameters;
}

/** Optional parameters. */
export interface MonitorsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  body?: DatadogMonitorResource;
}

/** Optional parameters. */
export interface MonitorsGetOptionalParams extends OperationOptions {}
