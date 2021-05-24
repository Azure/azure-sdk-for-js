// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-http";
import { MetricDefinition } from "..";
import { Metric, ResultType } from "../generated/metrics/src";
import { MetricNamespace } from "../generated/metricsnamespaces/src";

/**
 * Options for querying metrics.
 */
export interface QueryMetricsOptions extends OperationOptions {
  /** The timespan of the query. It is a string with the following format 'startDateTime_ISO/endDateTime_ISO'. */
  timespan?: string;
  /** The interval (i.e. timegrain) of the query. */
  interval?: string;
  /** The names of the metrics (comma separated) to retrieve. */
  metricNames?: string[];
  /** The list of aggregation types (comma separated) to retrieve. */
  aggregations?: string[];
  /**
   * The maximum number of records to retrieve.
   * Valid only if $filter is specified.
   * Defaults to 10.
   */
  top?: number;
  /**
   * The aggregation to use for sorting results and the direction of the sort.
   * Only one order can be specified.
   * Examples: sum asc.
   */
  orderBy?: string;
  /** The **$filter** is used to reduce the set of metric data returned.<br>Example:<br>Metric contains metadata A, B and C.<br>- Return all time series of C where A = a1 and B = b1 or b2<br>**$filter=A eq ‘a1’ and B eq ‘b1’ or B eq ‘b2’ and C eq ‘*’**<br>- Invalid variant:<br>**$filter=A eq ‘a1’ and B eq ‘b1’ and C eq ‘*’ or B = ‘b2’**<br>This is invalid because the logical or operator cannot separate two different metadata names.<br>- Return all time series where A = a1, B = b1 and C = c1:<br>**$filter=A eq ‘a1’ and B eq ‘b1’ and C eq ‘c1’**<br>- Return all time series where A = a1<br>**$filter=A eq ‘a1’ and B eq ‘*’ and C eq ‘*’**. */
  filter?: string;
  /** Reduces the set of data collected. The syntax allowed depends on the operation. See the operation's description for details. */
  resultType?: ResultType;
  /** Metric namespace to query metric definitions for. */
  metricNamespace?: string;
}

/**
 * Metrics and associated data, like interval, timespan and cost.
 */
export interface QueryMetricsResponse {
  // track 2 version of `MetricsListResponse`

  /** The integer value representing the cost of the query, for data case. */
  cost?: number;
  /** The timespan for which the data was retrieved. Its value consists of two datetimes concatenated, separated by '/'.  This may be adjusted in the future and returned back from what was originally requested. */
  timespan: string;
  /** The interval (window size) for which the metric data was returned in.  This may be adjusted in the future and returned back from what was originally requested.  This is not present if a metadata request was made. */
  interval?: string;
  /** The namespace of the metrics been queried */
  namespace?: string;
  /** The region of the resource been queried for metrics. */
  resourceRegion?: string;
  /** the value of the collection. */
  metrics: Metric[];
}

/**
 * Options for getting metric definitions.
 */
export interface GetMetricDefinitionsOptions extends OperationOptions {
  // track 2 version of `MetricDefinitionsListOptionalParams`

  /** Metric namespace to query metric definitions for. */
  metricNamespace?: string;
}

/**
 * Metric definitions.
 */
export interface GetMetricDefinitionsResponse {
  /** the values for the metric definitions. */
  definitions: MetricDefinition[];
}

/**
 * Options for getting metric namespaces.
 */
export interface GetMetricNamespacesOptions extends OperationOptions {
  /** The ISO 8601 conform Date start time from which to query for metric namespaces. */
  startTime?: string;
}

/**
 * Metric namespaces.
 */
export interface GetMetricNamespacesResponse {
  // track 2 version of `MetricNamespacesListResponse`

  /** The metric namespaces. */
  namespaces: MetricNamespace[] | undefined;
}
