// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";
import {
  MetricNamespace,
  MetricValue,
  ResultType,
  MetricUnit,
  MetricClass,
  AggregationType,
  MetricAvailability
} from "..";

/**
 * Options used when querying metrics.
 */
export interface QueryMetricsOptions extends OperationOptions {
  /** The interval (i.e. timegrain) of the query. */
  interval?: string;
  /** The names of the metrics to retrieve **/
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

/** The result data of a query. */
export interface Metric {
  /** the metric Id. */
  id: string;
  /** the resource type of the metric resource. */
  type: string;
  /** the name of the metric */
  name: string;
  /** Detailed description of this metric. */
  displayDescription?: string;
  /** 'Success' or the error details on query failures for this metric. */
  errorCode?: string;
  /** the unit of the metric. */
  unit: MetricUnit;
  /** the time series returned when a data query is performed. */
  timeseries: TimeSeriesElement[];
}

/** Represents a metric metadata value. */
export interface MetadataValue {
  /** the name of the metadata. */
  name?: string;
  /** the value of the metadata. */
  value?: string;
}

/** A time series result type. The discriminator value is always TimeSeries in this case. */
export interface TimeSeriesElement {
  // track 2 version of `TimeSeriesElement` from the `metrics` generated client.
  // (only to fix the casing of `metadatavalues`)

  /** the metadata values returned if $filter was specified in the call. */
  metadataValues?: MetadataValue[];
  /** An array of data points representing the metric values.  This is only returned if a result type of data is specified. */
  data?: MetricValue[];
}

/**
 * Metrics, including additional information like cost, the resourceRegion, etc...
 */
export interface QueryMetricsResult {
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
 * Options used when getting metric definitions.
 */
export interface GetMetricDefinitionsOptions extends OperationOptions {
  // track 2 version of `MetricDefinitionsListOptionalParams`

  /** Metric namespace to query metric definitions for. */
  metricNamespace?: string;
}

/** Metric definition class specifies the metadata for a metric. */
export interface MetricDefinition {
  /** Flag to indicate whether the dimension is required. */
  isDimensionRequired?: boolean;
  /** the resource identifier of the resource that emitted the metric. */
  resourceId?: string;
  /** the name of the metric */
  name?: string;
  /** Detailed description of this metric. */
  displayDescription?: string;
  /** Custom category name for this metric. */
  category?: string;
  /** the unit of the metric. */
  unit?: MetricUnit;
  /** the primary aggregation type value defining how to use the values for display. */
  primaryAggregationType?: AggregationType;
  /** the collection of what aggregation intervals are available to be queried. */
  metricAvailabilities?: MetricAvailability[];
  /** the resource identifier of the metric definition. */
  id?: string;
  /** the name of the dimension */
  dimensions?: string[];
}

/**
 * Metric definitions.
 */
export interface GetMetricDefinitionsResult {
  /** the values for the metric definitions. */
  definitions: MetricDefinition[];
}

/**
 * Options used when getting metric namespaces.
 */
export interface GetMetricNamespacesOptions {
  // track 2 copy of `MetricNamespacesListOptionalParams`

  /** The ISO 8601 conform Date start time from which to query for metric namespaces. */
  startTime?: string;
}

/**
 * Metric namespaces.
 */
export interface GetMetricNamespacesResult {
  // track 2 version of MetricNamespacesListResponse

  /** The metric namespaces. */
  namespaces: MetricNamespace[];
}

/**
 * Metric definition.
 */
export interface MetricDefinition {
  /** Flag to indicate whether the dimension is required. */
  isDimensionRequired?: boolean;
  /** the resource identifier of the resource that emitted the metric. */
  resourceId?: string;
  /** the namespace the metric belongs to. */
  namespace?: string;
  /** the name and the display name of the metric, i.e. it is a localizable string. */
  name?: string;
  /** Detailed description of this metric. */
  displayDescription?: string;
  /** Custom category name for this metric. */
  category?: string;
  /** The class of the metric. */
  metricClass?: MetricClass;
  /** The unit of the metric. */
  unit?: MetricUnit;
  /** the primary aggregation type value defining how to use the values for display. */
  primaryAggregationType?: AggregationType;
  /** the collection of what aggregation types are supported. */
  supportedAggregationTypes?: AggregationType[];
  /** the collection of what aggregation intervals are available to be queried. */
  metricAvailabilities?: MetricAvailability[];
  /** the resource identifier of the metric definition. */
  id?: string;
  /** the name and the display name of the dimension, i.e. it is a localizable string. */
  dimensions?: string[];
}
