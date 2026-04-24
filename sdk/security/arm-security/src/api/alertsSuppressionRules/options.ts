// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AlertsSuppressionRulesListOptionalParams extends OperationOptions {
  /** Type of the alert to get rules for */
  alertType?: string;
}

/** Optional parameters. */
export interface AlertsSuppressionRulesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AlertsSuppressionRulesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AlertsSuppressionRulesGetOptionalParams extends OperationOptions {}
