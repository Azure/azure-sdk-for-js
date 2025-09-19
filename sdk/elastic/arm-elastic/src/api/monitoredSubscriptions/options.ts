// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitoredSubscriptionProperties } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface MonitoredSubscriptionsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MonitoredSubscriptionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MonitoredSubscriptionsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  body?: MonitoredSubscriptionProperties;
}

/** Optional parameters. */
export interface MonitoredSubscriptionsCreateorUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  body?: MonitoredSubscriptionProperties;
}

/** Optional parameters. */
export interface MonitoredSubscriptionsGetOptionalParams extends OperationOptions {}
