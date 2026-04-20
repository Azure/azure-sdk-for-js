// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { LocalizableString } from "../common/models.js";
import {
  localizableStringDeserializer,
  localizableStringArrayDeserializer,
} from "../common/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Represents collection of metric definitions. */
export interface _SubscriptionScopeMetricDefinitionCollection {
  /** The values for the metric definitions. */
  value: SubscriptionScopeMetricDefinition[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _subscriptionScopeMetricDefinitionCollectionDeserializer(
  item: any,
): _SubscriptionScopeMetricDefinitionCollection {
  return {
    value: subscriptionScopeMetricDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function subscriptionScopeMetricDefinitionArrayDeserializer(
  result: Array<SubscriptionScopeMetricDefinition>,
): any[] {
  return result.map((item) => {
    return subscriptionScopeMetricDefinitionDeserializer(item);
  });
}

/** Metric definition class specifies the metadata for a metric. */
export interface SubscriptionScopeMetricDefinition {
  /** Flag to indicate whether the dimension is required. */
  isDimensionRequired?: boolean;
  /** The resource identifier of the resource that emitted the metric. */
  resourceId?: string;
  /** The namespace the metric belongs to. */
  namespace?: string;
  /** The name and the display name of the metric, i.e. it is a localizable string. */
  name?: LocalizableString;
  /** Detailed description of this metric. */
  displayDescription?: string;
  /** Custom category name for this metric. */
  category?: string;
  /** The class of the metric. */
  metricClass?: MetricClass;
  /** The unit of the metric. */
  unit?: MetricUnit;
  /** The primary aggregation type value defining how to use the values for display. */
  primaryAggregationType?: MetricAggregationType;
  /** The collection of what aggregation types are supported. */
  supportedAggregationTypes?: MetricAggregationType[];
  /** The collection of what aggregation intervals are available to be queried. */
  metricAvailabilities?: MetricAvailability[];
  /** The resource identifier of the metric definition. */
  id?: string;
  /** The name and the display name of the dimension, i.e. it is a localizable string. */
  dimensions?: LocalizableString[];
}

export function subscriptionScopeMetricDefinitionDeserializer(
  item: any,
): SubscriptionScopeMetricDefinition {
  return {
    isDimensionRequired: item["isDimensionRequired"],
    resourceId: item["resourceId"],
    namespace: item["namespace"],
    name: !item["name"] ? item["name"] : localizableStringDeserializer(item["name"]),
    displayDescription: item["displayDescription"],
    category: item["category"],
    metricClass: item["metricClass"],
    unit: item["unit"],
    primaryAggregationType: item["primaryAggregationType"],
    supportedAggregationTypes: !item["supportedAggregationTypes"]
      ? item["supportedAggregationTypes"]
      : item["supportedAggregationTypes"].map((p: any) => {
          return p;
        }),
    metricAvailabilities: !item["metricAvailabilities"]
      ? item["metricAvailabilities"]
      : metricAvailabilityArrayDeserializer(item["metricAvailabilities"]),
    id: item["id"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : localizableStringArrayDeserializer(item["dimensions"]),
  };
}

/** The class of the metric. */
export enum KnownMetricClass {
  /** Availability */
  Availability = "Availability",
  /** Transactions */
  Transactions = "Transactions",
  /** Errors */
  Errors = "Errors",
  /** Latency */
  Latency = "Latency",
  /** Saturation */
  Saturation = "Saturation",
}

/**
 * The class of the metric. \
 * {@link KnownMetricClass} can be used interchangeably with MetricClass,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Availability**: Availability \
 * **Transactions**: Transactions \
 * **Errors**: Errors \
 * **Latency**: Latency \
 * **Saturation**: Saturation
 */
export type MetricClass = string;

/** The unit of the metric. */
export enum KnownMetricUnit {
  /** Unit of raw quantity. */
  Count = "Count",
  /** Unit of memory in bytes. */
  Bytes = "Bytes",
  /** Unit of time in seconds. */
  Seconds = "Seconds",
  /** Rate unit of raw quantity per second. */
  CountPerSecond = "CountPerSecond",
  /** Rate unit of memory in bytes per second. */
  BytesPerSecond = "BytesPerSecond",
  /** Percentage unit. */
  Percent = "Percent",
  /** Unit of time in 1/1000th of a second. */
  MilliSeconds = "MilliSeconds",
  /** Unit of data transfer or storage. It is the size of the data in bytes multiplied by the time it takes to transfer or store the data in seconds. */
  ByteSeconds = "ByteSeconds",
  /** No specified unit. */
  Unspecified = "Unspecified",
  /** Unit of processing power. */
  Cores = "Cores",
  /** Unit of processing power in 1/1000th of a CPU core. */
  MilliCores = "MilliCores",
  /** Unit of processing power in one billionth of a CPU core. */
  NanoCores = "NanoCores",
  /** Rate unit of binary digits per second. */
  BitsPerSecond = "BitsPerSecond",
}

/**
 * The unit of the metric. \
 * {@link KnownMetricUnit} can be used interchangeably with MetricUnit,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Count**: Unit of raw quantity. \
 * **Bytes**: Unit of memory in bytes. \
 * **Seconds**: Unit of time in seconds. \
 * **CountPerSecond**: Rate unit of raw quantity per second. \
 * **BytesPerSecond**: Rate unit of memory in bytes per second. \
 * **Percent**: Percentage unit. \
 * **MilliSeconds**: Unit of time in 1\/1000th of a second. \
 * **ByteSeconds**: Unit of data transfer or storage. It is the size of the data in bytes multiplied by the time it takes to transfer or store the data in seconds. \
 * **Unspecified**: No specified unit. \
 * **Cores**: Unit of processing power. \
 * **MilliCores**: Unit of processing power in 1\/1000th of a CPU core. \
 * **NanoCores**: Unit of processing power in one billionth of a CPU core. \
 * **BitsPerSecond**: Rate unit of binary digits per second.
 */
export type MetricUnit = string;

/** The aggregation type of the metric. */
export enum KnownMetricAggregationType {
  /** None */
  None = "None",
  /** Average */
  Average = "Average",
  /** Count */
  Count = "Count",
  /** Minimum */
  Minimum = "Minimum",
  /** Maximum */
  Maximum = "Maximum",
  /** Total */
  Total = "Total",
}

/**
 * The aggregation type of the metric. \
 * {@link KnownMetricAggregationType} can be used interchangeably with MetricAggregationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **Average**: Average \
 * **Count**: Count \
 * **Minimum**: Minimum \
 * **Maximum**: Maximum \
 * **Total**: Total
 */
export type MetricAggregationType = string;

export function metricAvailabilityArrayDeserializer(result: Array<MetricAvailability>): any[] {
  return result.map((item) => {
    return metricAvailabilityDeserializer(item);
  });
}

/** Metric availability specifies the time grain (aggregation interval or frequency) and the retention period for that time grain. */
export interface MetricAvailability {
  /** The time grain specifies a supported aggregation interval for the metric. Expressed as a duration 'PT1M', 'P1D', etc. */
  timeGrain?: string;
  /** The retention period for the metric at the specified timegrain.  Expressed as a duration 'PT1M', 'P1D', etc. */
  retention?: string;
}

export function metricAvailabilityDeserializer(item: any): MetricAvailability {
  return {
    timeGrain: item["timeGrain"],
    retention: item["retention"],
  };
}

/** Represents collection of metric definitions. */
export interface _MetricDefinitionCollection {
  /** The values for the metric definitions. */
  value: MetricDefinition[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _metricDefinitionCollectionDeserializer(item: any): _MetricDefinitionCollection {
  return {
    value: metricDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function metricDefinitionArrayDeserializer(result: Array<MetricDefinition>): any[] {
  return result.map((item) => {
    return metricDefinitionDeserializer(item);
  });
}

/** Metric definition class specifies the metadata for a metric. */
export interface MetricDefinition {
  /** Flag to indicate whether the dimension is required. */
  isDimensionRequired?: boolean;
  /** The resource identifier of the resource that emitted the metric. */
  resourceId?: string;
  /** The namespace the metric belongs to. */
  namespace?: string;
  /** The name and the display name of the metric, i.e. it is a localizable string. */
  name?: LocalizableString;
  /** Detailed description of this metric. */
  displayDescription?: string;
  /** Custom category name for this metric. */
  category?: string;
  /** The class of the metric. */
  metricClass?: MetricClass;
  /** The unit of the metric. */
  unit?: MetricUnit;
  /** The primary aggregation type value defining how to use the values for display. */
  primaryAggregationType?: AggregationType;
  /** The collection of what aggregation types are supported. */
  supportedAggregationTypes?: AggregationType[];
  /** The collection of what aggregation intervals are available to be queried. */
  metricAvailabilities?: MetricAvailability[];
  /** The resource identifier of the metric definition. */
  id?: string;
  /** The name and the display name of the dimension, i.e. it is a localizable string. */
  dimensions?: LocalizableString[];
}

export function metricDefinitionDeserializer(item: any): MetricDefinition {
  return {
    isDimensionRequired: item["isDimensionRequired"],
    resourceId: item["resourceId"],
    namespace: item["namespace"],
    name: !item["name"] ? item["name"] : localizableStringDeserializer(item["name"]),
    displayDescription: item["displayDescription"],
    category: item["category"],
    metricClass: item["metricClass"],
    unit: item["unit"],
    primaryAggregationType: item["primaryAggregationType"],
    supportedAggregationTypes: !item["supportedAggregationTypes"]
      ? item["supportedAggregationTypes"]
      : item["supportedAggregationTypes"].map((p: any) => {
          return p;
        }),
    metricAvailabilities: !item["metricAvailabilities"]
      ? item["metricAvailabilities"]
      : metricAvailabilityArrayDeserializer(item["metricAvailabilities"]),
    id: item["id"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : localizableStringArrayDeserializer(item["dimensions"]),
  };
}

/** The aggregation type of the metric. */
export type AggregationType = "None" | "Average" | "Count" | "Minimum" | "Maximum" | "Total";

/** Represents collection of metric namespaces. */
export interface _MetricNamespaceCollection {
  /** The values for the metric namespaces. */
  value: MetricNamespace[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _metricNamespaceCollectionDeserializer(item: any): _MetricNamespaceCollection {
  return {
    value: metricNamespaceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function metricNamespaceArrayDeserializer(result: Array<MetricNamespace>): any[] {
  return result.map((item) => {
    return metricNamespaceDeserializer(item);
  });
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
  /** Properties which include the fully qualified namespace name. */
  properties?: MetricNamespaceName;
}

export function metricNamespaceDeserializer(item: any): MetricNamespace {
  return {
    id: item["id"],
    type: item["type"],
    name: item["name"],
    classification: item["classification"],
    properties: !item["properties"]
      ? item["properties"]
      : metricNamespaceNameDeserializer(item["properties"]),
  };
}

/** Kind of namespace */
export enum KnownNamespaceClassification {
  /** Platform */
  Platform = "Platform",
  /** Custom */
  Custom = "Custom",
  /** Qos */
  Qos = "Qos",
}

/**
 * Kind of namespace \
 * {@link KnownNamespaceClassification} can be used interchangeably with NamespaceClassification,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Platform**: Platform \
 * **Custom**: Custom \
 * **Qos**: Qos
 */
export type NamespaceClassification = string;

/** The fully qualified metric namespace name. */
export interface MetricNamespaceName {
  /** The metric namespace name. */
  metricNamespaceName?: string;
}

export function metricNamespaceNameDeserializer(item: any): MetricNamespaceName {
  return {
    metricNamespaceName: item["metricNamespaceName"],
  };
}

/** The response to a metrics query. */
export interface Response {
  /** The integer value representing the relative cost of the query. */
  cost?: number;
  /** The timespan for which the data was retrieved. Its value consists of two datetimes concatenated, separated by '/'.  This may be adjusted in the future and returned back from what was originally requested. */
  timespan: string;
  /**
   * The interval (window size) for which the metric data was returned in ISO 8601 duration format with a special case for 'FULL' value that returns single datapoint for entire time span requested (*Examples: PT15M, PT1H, P1D, FULL*).
   * This may be adjusted and different from what was originally requested if AutoAdjustTimegrain=true is specified. This is not present if a metadata request was made.
   */
  interval?: string;
  /** The namespace of the metrics being queried */
  namespace?: string;
  /** The region of the resource being queried for metrics. */
  resourceregion?: string;
  /** The value of the collection. */
  value: Metric[];
}

export function responseDeserializer(item: any): Response {
  return {
    cost: item["cost"],
    timespan: item["timespan"],
    interval: item["interval"],
    namespace: item["namespace"],
    resourceregion: item["resourceregion"],
    value: metricArrayDeserializer(item["value"]),
  };
}

export function metricArrayDeserializer(result: Array<Metric>): any[] {
  return result.map((item) => {
    return metricDeserializer(item);
  });
}

/** The result data of a query. */
export interface Metric {
  /** The metric Id. */
  id: string;
  /** The resource type of the metric resource. */
  type: string;
  /** The name and the display name of the metric, i.e. it is localizable string. */
  name: LocalizableString;
  /** Detailed description of this metric. */
  displayDescription?: string;
  /** 'Success' or the error details on query failures for this metric. */
  errorCode?: string;
  /** Error message encountered querying this specific metric. */
  errorMessage?: string;
  /** The unit of the metric. */
  unit: MetricUnit;
  /** The time series returned when a data query is performed. */
  timeseries: TimeSeriesElement[];
}

export function metricDeserializer(item: any): Metric {
  return {
    id: item["id"],
    type: item["type"],
    name: localizableStringDeserializer(item["name"]),
    displayDescription: item["displayDescription"],
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    unit: item["unit"],
    timeseries: timeSeriesElementArrayDeserializer(item["timeseries"]),
  };
}

export function timeSeriesElementArrayDeserializer(result: Array<TimeSeriesElement>): any[] {
  return result.map((item) => {
    return timeSeriesElementDeserializer(item);
  });
}

/** A time series result type. The discriminator value is always TimeSeries in this case. */
export interface TimeSeriesElement {
  /** The metadata values returned if $filter was specified in the call. */
  metadatavalues?: MetadataValue[];
  /** An array of data points representing the metric values.  This is only returned if a result type of data is specified. */
  data?: MetricValue[];
}

export function timeSeriesElementDeserializer(item: any): TimeSeriesElement {
  return {
    metadatavalues: !item["metadatavalues"]
      ? item["metadatavalues"]
      : metadataValueArrayDeserializer(item["metadatavalues"]),
    data: !item["data"] ? item["data"] : metricValueArrayDeserializer(item["data"]),
  };
}

export function metadataValueArrayDeserializer(result: Array<MetadataValue>): any[] {
  return result.map((item) => {
    return metadataValueDeserializer(item);
  });
}

/** Represents a metric metadata value. */
export interface MetadataValue {
  /** The name of the metadata. */
  name?: LocalizableString;
  /** The value of the metadata. */
  value?: string;
}

export function metadataValueDeserializer(item: any): MetadataValue {
  return {
    name: !item["name"] ? item["name"] : localizableStringDeserializer(item["name"]),
    value: item["value"],
  };
}

export function metricValueArrayDeserializer(result: Array<MetricValue>): any[] {
  return result.map((item) => {
    return metricValueDeserializer(item);
  });
}

/** Represents a metric value. */
export interface MetricValue {
  /** The timestamp for the metric value in ISO 8601 format. */
  timeStamp: Date;
  /** The average value in the time range. */
  average?: number;
  /** The least value in the time range. */
  minimum?: number;
  /** The greatest value in the time range. */
  maximum?: number;
  /** The sum of all of the values in the time range. */
  total?: number;
  /** The number of samples in the time range. Can be used to determine the number of values that contributed to the average value. */
  count?: number;
}

export function metricValueDeserializer(item: any): MetricValue {
  return {
    timeStamp: new Date(item["timeStamp"]),
    average: item["average"],
    minimum: item["minimum"],
    maximum: item["maximum"],
    total: item["total"],
    count: item["count"],
  };
}

/** Query parameters can also be specified in the body, specifying the same parameter in both the body and query parameters will result in an error. */
export interface SubscriptionScopeMetricsRequestBodyParameters {
  /** The timespan of the query. It is a string with the following format 'startDateTime_ISO/endDateTime_ISO'. */
  timespan?: string;
  /**
   * The interval (i.e. timegrain) of the query in ISO 8601 duration format. Defaults to PT1M. Special case for 'FULL' value that returns single datapoint for entire time span requested.
   * *Examples: PT15M, PT1H, P1D, FULL*
   */
  interval?: string;
  /** The names of the metrics (comma separated) to retrieve. */
  metricNames?: string;
  /** The list of aggregation types (comma separated) to retrieve. */
  aggregation?: string;
  /** The **$filter** is used to reduce the set of metric data returned.<br>Example:<br>Metric contains metadata A, B and C.<br>- Return all time series of C where A = a1 and B = b1 or b2<br>**$filter=A eq ‘a1’ and B eq ‘b1’ or B eq ‘b2’ and C eq ‘*’**<br>- Invalid variant:<br>**$filter=A eq ‘a1’ and B eq ‘b1’ and C eq ‘*’ or B = ‘b2’**<br>This is invalid because the logical or operator cannot separate two different metadata names.<br>- Return all time series where A = a1, B = b1 and C = c1:<br>**$filter=A eq ‘a1’ and B eq ‘b1’ and C eq ‘c1’**<br>- Return all time series where A = a1<br>**$filter=A eq ‘a1’ and B eq ‘*’ and C eq ‘*’**. */
  filter?: string;
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
  /** Dimension name(s) to rollup results by. For example if you only want to see metric values with a filter like 'City eq Seattle or City eq Tacoma' but don't want to see separate values for each city, you can specify 'RollUpBy=City' to see the results for Seattle and Tacoma rolled up into one timeseries. */
  rollUpBy?: string;
  /** Reduces the set of data collected. The syntax allowed depends on the operation. See the operation's description for details. */
  resultType?: MetricResultType;
  /** Metric namespace where the metrics you want reside. */
  metricNamespace?: string;
  /** When set to true, if the timespan passed in is not supported by this metric, the API will return the result using the closest supported timespan. When set to false, an error is returned for invalid timespan parameters. Defaults to false. */
  autoAdjustTimegrain?: boolean;
  /** When set to false, invalid filter parameter values will be ignored. When set to true, an error is returned for invalid filter parameters. Defaults to true. */
  validateDimensions?: boolean;
}

export function subscriptionScopeMetricsRequestBodyParametersSerializer(
  item: SubscriptionScopeMetricsRequestBodyParameters,
): any {
  return {
    timespan: item["timespan"],
    interval: item["interval"],
    metricNames: item["metricNames"],
    aggregation: item["aggregation"],
    filter: item["filter"],
    top: item["top"],
    orderBy: item["orderBy"],
    rollUpBy: item["rollUpBy"],
    resultType: item["resultType"],
    metricNamespace: item["metricNamespace"],
    autoAdjustTimegrain: item["autoAdjustTimegrain"],
    validateDimensions: item["validateDimensions"],
  };
}

/** Reduces the set of data collected. The syntax allowed depends on the operation. See the operation's description for details. */
export enum KnownMetricResultType {
  /** Data */
  Data = "Data",
  /** Metadata */
  Metadata = "Metadata",
}

/**
 * Reduces the set of data collected. The syntax allowed depends on the operation. See the operation's description for details. \
 * {@link KnownMetricResultType} can be used interchangeably with MetricResultType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Data**: Data \
 * **Metadata**: Metadata
 */
export type MetricResultType = string;
