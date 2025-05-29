import type { OperationOptions } from "@azure/core-client";
import type { AggregationType, MetricClass, MetricUnit, MetricValue, NamespaceClassification, ResultType } from "../index.js";
import type { QueryTimeInterval } from "./timeInterval.js";
/**
 * Options used when querying metrics.
 */
export interface MetricsQueryOptions extends OperationOptions {
    /** The interval (i.e. timegrain) of the query. {@link Durations} helper contains aliases for some common ISO8601 durations.
     * This is an ISO8601 duration value in the format P[n]Y[n]M[n]DT[n]H[n]M[n]S
     *  where P is the duration designator (for period) placed at the start of the duration representation.
     *   Y is the year designator that follows the value for the number of years.
     *   M is the month designator that follows the value for the number of months.
     *   W is the week designator that follows the value for the number of weeks.
     *   D is the day designator that follows the value for the number of days.
     *   T is the time designator that precedes the time components of the representation.
     *   H is the hour designator that follows the value for the number of hours.
     *   M is the minute designator that follows the value for the number of minutes.
     *   S is the second designator that follows the value for the number of seconds.
     */
    granularity?: string;
    /** The enclosing timespan for metrics. */
    timespan?: QueryTimeInterval;
    /** The list of aggregation types (comma separated) to retrieve. */
    aggregations?: AggregationType[];
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
    /** When set to true, if the timespan passed in is not supported by this metric, the API will return the result using the closest supported timespan. When set to false, an error is returned for invalid timespan parameters. Defaults to false. */
    autoAdjustTimegrain?: boolean;
    /** When set to false, invalid filter parameter values will be ignored. When set to true, an error is returned for invalid filter parameters. Defaults to true. */
    validateDimensions?: boolean;
    /** Dimension name(s) to rollup results by. For example if you only want to see metric values with a filter like 'City eq Seattle or City eq Tacoma' but don't want to see separate values for each city, you can specify 'RollUpBy=City' to see the results for Seattle and Tacoma rolled up into one timeseries. */
    rollUpBy?: string;
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
    description?: string;
    /** 'Success' or the error details on query failures for this metric. */
    errorCode?: string;
    /** Error message encountered querying this specific metric. */
    errorMessage?: string;
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
    /** the metadata values returned if $filter was specified in the call. */
    metadataValues?: MetadataValue[];
    /** An array of data points representing the metric values.  This is only returned if a result type of data is specified. */
    data?: MetricValue[];
}
/**
 * Metrics, including additional information like cost, the resourceRegion, etc...
 */
export interface MetricsQueryResult {
    /** The integer value representing the cost of the query, for data case. */
    cost?: number;
    /** The timespan for which the data was retrieved. Its value consists of two datetimes concatenated, separated by '/'.  This may be adjusted in the future and returned back from what was originally requested. */
    timespan: QueryTimeInterval;
    /** The interval (window size) for which the metric data was returned in.  This may be adjusted in the future and returned back from what was originally requested.  This is not present if a metadata request was made. */
    granularity?: string;
    /** The namespace of the metrics been queried */
    namespace?: string;
    /** The resource that has been queried for metrics. */
    resourceId?: string;
    /** The region of the resource been queried for metrics. */
    resourceRegion?: string;
    /** the value of the collection. */
    metrics: Metric[];
    /** convenience method to get metric by metric name */
    getMetricByName(metricName: string): Metric | undefined;
}
export declare function getMetricByName(this: MetricsQueryResult, metricName: string): Metric | undefined;
export declare function createMetricsQueryResult(metricsQueryResultData: Omit<MetricsQueryResult, "getMetricByName">): MetricsQueryResult;
/**
 * Options used when getting metric definitions.
 */
export interface ListMetricDefinitionsOptions extends OperationOptions {
    /** Metric namespace to query metric definitions for. */
    metricNamespace?: string;
}
/**
 * Options used when getting metric namespaces.
 */
export interface ListMetricNamespacesOptions extends OperationOptions {
    /** The ISO 8601 conform Date start time from which to query for metric namespaces. */
    startTime?: string;
}
/** Metric namespace class specifies the metadata for a metric namespace. */
export interface MetricNamespace {
    /** The ID of the metric namespace. */
    id?: string;
    /** The type of the namespace. */
    type?: string;
    /** The escaped name of the namespace. */
    name?: string;
    /** Kind of namespace */
    classification?: NamespaceClassification;
    /** The metric namespace name. */
    metricNamespaceName?: string;
}
/** Metric definition class specifies the metadata for a metric. */
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
    description?: string;
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
/** Metric availability specifies the time grain (aggregation interval or frequency) and the retention period for that time grain. */
export interface MetricAvailability {
    /** the time grain specifies the aggregation interval for the metric. Expressed as a duration 'PT1M', 'P1D', etc. */
    granularity?: string;
    /** the retention period for the metric at the specified granularity.  Expressed as a duration 'PT1M', 'P1D', etc. */
    retention?: string;
}
//# sourceMappingURL=publicMetricsModels.d.ts.map