// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ResultType } from "../../models/microsoft/common/models.js";
import type {
  SubscriptionScopeMetricsRequestBodyParameters,
  MetricResultType,
} from "../../models/microsoft/metrics/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface MetricsListOptionalParams extends OperationOptions {
  /** The timespan of the query. It is a string with the following format 'startDateTime_ISO/endDateTime_ISO'. */
  timespan?: string;
  /**
   * The interval (i.e. timegrain) of the query in ISO 8601 duration format. Defaults to PT1M. Special case for 'FULL' value that returns single datapoint for entire time span requested.
   * *Examples: PT15M, PT1H, P1D, FULL*
   */
  interval?: string;
  /** The names of the metrics (comma separated) to retrieve. Limit 20 metrics. */
  metricnames?: string;
  /**
   * The list of aggregation types (comma separated) to retrieve.
   * *Examples: average, minimum, maximum*
   */
  aggregation?: string;
  /**
   * The maximum number of records to retrieve per resource ID in the request.
   * Valid only if filter is specified.
   * Defaults to 10.
   */
  top?: number;
  /**
   * The aggregation to use for sorting results and the direction of the sort.
   * Only one order can be specified.
   * *Examples: sum asc*
   */
  orderby?: string;
  /** The **$filter** is used to reduce the set of metric data returned.<br>Example:<br>Metric contains metadata A, B and C.<br>- Return all time series of C where A = a1 and B = b1 or b2<br>**$filter=A eq ‘a1’ and B eq ‘b1’ or B eq ‘b2’ and C eq ‘*’**<br>- Invalid variant:<br>**$filter=A eq ‘a1’ and B eq ‘b1’ and C eq ‘*’ or B = ‘b2’**<br>This is invalid because the logical or operator cannot separate two different metadata names.<br>- Return all time series where A = a1, B = b1 and C = c1:<br>**$filter=A eq ‘a1’ and B eq ‘b1’ and C eq ‘c1’**<br>- Return all time series where A = a1<br>**$filter=A eq ‘a1’ and B eq ‘*’ and C eq ‘*’**. */
  filter?: string;
  /** Reduces the set of data collected. The syntax allowed depends on the operation. See the operation's description for details. */
  resultType?: ResultType;
  /** Metric namespace where the metrics you want reside. */
  metricnamespace?: string;
  /** When set to true, if the timespan passed in is not supported by this metric, the API will return the result using the closest supported timespan. When set to false, an error is returned for invalid timespan parameters. Defaults to false. */
  autoAdjustTimegrain?: boolean;
  /** When set to false, invalid filter parameter values will be ignored. When set to true, an error is returned for invalid filter parameters. Defaults to true. */
  validateDimensions?: boolean;
  /** Dimension name(s) to rollup results by. For example if you only want to see metric values with a filter like 'City eq Seattle or City eq Tacoma' but don't want to see separate values for each city, you can specify 'RollUpBy=City' to see the results for Seattle and Tacoma rolled up into one timeseries. */
  rollupby?: string;
}

/** Optional parameters. */
export interface MetricsListAtSubscriptionScopePostOptionalParams extends OperationOptions {
  /** The timespan of the query. It is a string with the following format 'startDateTime_ISO/endDateTime_ISO'. */
  timespan?: string;
  /**
   * The interval (i.e. timegrain) of the query in ISO 8601 duration format. Defaults to PT1M. Special case for 'FULL' value that returns single datapoint for entire time span requested.
   * *Examples: PT15M, PT1H, P1D, FULL*
   */
  interval?: string;
  /** The names of the metrics (comma separated) to retrieve. Limit 20 metrics. */
  metricnames?: string;
  /**
   * The list of aggregation types (comma separated) to retrieve.
   * *Examples: average, minimum, maximum*
   */
  aggregation?: string;
  /**
   * The maximum number of records to retrieve per resource ID in the request.
   * Valid only if filter is specified.
   * Defaults to 10.
   */
  top?: number;
  /**
   * The aggregation to use for sorting results and the direction of the sort.
   * Only one order can be specified.
   * *Examples: sum asc*
   */
  orderby?: string;
  /** The **$filter** is used to reduce the set of metric data returned.<br>Example:<br>Metric contains metadata A, B and C.<br>- Return all time series of C where A = a1 and B = b1 or b2<br>**$filter=A eq ‘a1’ and B eq ‘b1’ or B eq ‘b2’ and C eq ‘*’**<br>- Invalid variant:<br>**$filter=A eq ‘a1’ and B eq ‘b1’ and C eq ‘*’ or B = ‘b2’**<br>This is invalid because the logical or operator cannot separate two different metadata names.<br>- Return all time series where A = a1, B = b1 and C = c1:<br>**$filter=A eq ‘a1’ and B eq ‘b1’ and C eq ‘c1’**<br>- Return all time series where A = a1<br>**$filter=A eq ‘a1’ and B eq ‘*’ and C eq ‘*’**. */
  filter?: string;
  /** Reduces the set of data collected. The syntax allowed depends on the operation. See the operation's description for details. */
  resultType?: MetricResultType;
  /** Metric namespace where the metrics you want reside. */
  metricnamespace?: string;
  /** When set to true, if the timespan passed in is not supported by this metric, the API will return the result using the closest supported timespan. When set to false, an error is returned for invalid timespan parameters. Defaults to false. */
  autoAdjustTimegrain?: boolean;
  /** When set to false, invalid filter parameter values will be ignored. When set to true, an error is returned for invalid filter parameters. Defaults to true. */
  validateDimensions?: boolean;
  /** Dimension name(s) to rollup results by. For example if you only want to see metric values with a filter like 'City eq Seattle or City eq Tacoma' but don't want to see separate values for each city, you can specify 'RollUpBy=City' to see the results for Seattle and Tacoma rolled up into one timeseries. */
  rollupby?: string;
  /** The request body */
  body?: SubscriptionScopeMetricsRequestBodyParameters;
}

/** Optional parameters. */
export interface MetricsListAtSubscriptionScopeOptionalParams extends OperationOptions {
  /** The timespan of the query. It is a string with the following format 'startDateTime_ISO/endDateTime_ISO'. */
  timespan?: string;
  /**
   * The interval (i.e. timegrain) of the query in ISO 8601 duration format. Defaults to PT1M. Special case for 'FULL' value that returns single datapoint for entire time span requested.
   * *Examples: PT15M, PT1H, P1D, FULL*
   */
  interval?: string;
  /** The names of the metrics (comma separated) to retrieve. Limit 20 metrics. */
  metricnames?: string;
  /**
   * The list of aggregation types (comma separated) to retrieve.
   * *Examples: average, minimum, maximum*
   */
  aggregation?: string;
  /**
   * The maximum number of records to retrieve per resource ID in the request.
   * Valid only if filter is specified.
   * Defaults to 10.
   */
  top?: number;
  /**
   * The aggregation to use for sorting results and the direction of the sort.
   * Only one order can be specified.
   * *Examples: sum asc*
   */
  orderby?: string;
  /** The **$filter** is used to reduce the set of metric data returned.<br>Example:<br>Metric contains metadata A, B and C.<br>- Return all time series of C where A = a1 and B = b1 or b2<br>**$filter=A eq ‘a1’ and B eq ‘b1’ or B eq ‘b2’ and C eq ‘*’**<br>- Invalid variant:<br>**$filter=A eq ‘a1’ and B eq ‘b1’ and C eq ‘*’ or B = ‘b2’**<br>This is invalid because the logical or operator cannot separate two different metadata names.<br>- Return all time series where A = a1, B = b1 and C = c1:<br>**$filter=A eq ‘a1’ and B eq ‘b1’ and C eq ‘c1’**<br>- Return all time series where A = a1<br>**$filter=A eq ‘a1’ and B eq ‘*’ and C eq ‘*’**. */
  filter?: string;
  /** Reduces the set of data collected. The syntax allowed depends on the operation. See the operation's description for details. */
  resultType?: MetricResultType;
  /** Metric namespace where the metrics you want reside. */
  metricnamespace?: string;
  /** When set to true, if the timespan passed in is not supported by this metric, the API will return the result using the closest supported timespan. When set to false, an error is returned for invalid timespan parameters. Defaults to false. */
  autoAdjustTimegrain?: boolean;
  /** When set to false, invalid filter parameter values will be ignored. When set to true, an error is returned for invalid filter parameters. Defaults to true. */
  validateDimensions?: boolean;
  /** Dimension name(s) to rollup results by. For example if you only want to see metric values with a filter like 'City eq Seattle or City eq Tacoma' but don't want to see separate values for each city, you can specify 'RollUpBy=City' to see the results for Seattle and Tacoma rolled up into one timeseries. */
  rollupby?: string;
}
