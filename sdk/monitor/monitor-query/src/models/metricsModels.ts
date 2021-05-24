// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-http";
import { ResultType } from "../generated/metrics/src";
import { MetricNamespacesListOptionalParams } from "../generated/metricsnamespaces/src";

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

export interface GetMetricDefinitionsOptions extends OperationOptions {
  // track 2 version of `MetricDefinitionsListOptionalParams`

  /** Metric namespace to query metric definitions for. */
  metricNamespace?: string;
}

export type GetMetricNamespaces = MetricNamespacesListOptionalParams;
