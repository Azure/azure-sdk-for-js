// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface MetricConfigurationsListByMetricsContainerOptionalParams extends OperationOptions {
  /** An OData filter for source metric resource IDs. */
  filter?: string;
}

/** Optional parameters. */
export interface MetricConfigurationsListByMetricNamespaceOptionalParams extends OperationOptions {
  /** An OData filter for source metric resource IDs. */
  filter?: string;
}

/** Optional parameters. */
export interface MetricConfigurationsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MetricConfigurationsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MetricConfigurationsGetOptionalParams extends OperationOptions {}
