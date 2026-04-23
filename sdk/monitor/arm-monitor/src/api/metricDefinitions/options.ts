// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface MetricDefinitionsListOptionalParams extends OperationOptions {
  /** Metric namespace where the metrics you want reside. */
  metricnamespace?: string;
}

/** Optional parameters. */
export interface MetricDefinitionsListAtSubscriptionScopeOptionalParams extends OperationOptions {
  /** Metric namespace where the metrics you want reside. */
  metricnamespace?: string;
}
