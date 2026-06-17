// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface NetworkSecurityPerimeterConfigurationsReconcileOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NetworkSecurityPerimeterConfigurationsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NetworkSecurityPerimeterConfigurationsGetOptionalParams extends OperationOptions {}
