// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { LogSettings } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface FirewallsSaveLogProfileOptionalParams extends OperationOptions {
  logSettings?: LogSettings;
}

/** Optional parameters. */
export interface FirewallsGetSupportInfoOptionalParams extends OperationOptions {
  /** email address on behalf of which this API called */
  email?: string;
}

/** Optional parameters. */
export interface FirewallsGetLogProfileOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FirewallsGetGlobalRulestackOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FirewallsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FirewallsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FirewallsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FirewallsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FirewallsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FirewallsGetOptionalParams extends OperationOptions {}
