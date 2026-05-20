// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CollectionListMetricDefinitionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CollectionListUsagesOptionalParams extends OperationOptions {
  /** An OData filter expression that describes a subset of usages to return. The supported parameter is name.value (name of the metric, can have an or of multiple names). */
  filter?: string;
}

/** Optional parameters. */
export interface CollectionListMetricsOptionalParams extends OperationOptions {}
