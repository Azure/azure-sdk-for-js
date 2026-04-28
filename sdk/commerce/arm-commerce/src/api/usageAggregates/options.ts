// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AggregationGranularity } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface UsageAggregatesListOptionalParams extends OperationOptions {
  /** `True` returns usage data in instance-level detail, `false` causes server-side aggregation with fewer details. For example, if you have 3 website instances, by default you will get 3 line items for website consumption. If you specify showDetails = false, the data will be aggregated as a single line item for website consumption within the time period (for the given subscriptionId, meterId, usageStartTime and usageEndTime). */
  showDetails?: boolean;
  /** `Daily` (default) returns the data in daily granularity, `Hourly` returns the data in hourly granularity. */
  aggregationGranularity?: AggregationGranularity;
  /** Used when a continuation token string is provided in the response body of the previous call, enabling paging through a large result set. If not present, the data is retrieved from the beginning of the day/hour (based on the granularity) passed in. */
  continuationToken?: string;
}
