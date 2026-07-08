// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftCommonLocalizableString } from "../microsoft/common/models.js";
import {
  microsoftCommonLocalizableStringDeserializer,
  microsoftCommonLocalizableStringArrayDeserializer,
} from "../microsoft/common/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Represents collection of metric definitions. */
export interface _MetricsApiSubscriptionScopeMetricDefinitionCollection {
  /** The values for the metric definitions. */
  value: MetricsApiSubscriptionScopeMetricDefinition[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _metricsApiSubscriptionScopeMetricDefinitionCollectionDeserializer(
  item: any,
): _MetricsApiSubscriptionScopeMetricDefinitionCollection {
  return {
    value: metricsApiSubscriptionScopeMetricDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function metricsApiSubscriptionScopeMetricDefinitionArrayDeserializer(
  result: Array<MetricsApiSubscriptionScopeMetricDefinition>,
): any[] {
  return result.map((item) => {
    return metricsApiSubscriptionScopeMetricDefinitionDeserializer(item);
  });
}

/** Metric definition class specifies the metadata for a metric. */
export interface MetricsApiSubscriptionScopeMetricDefinition {
  /** Flag to indicate whether the dimension is required. */
  isDimensionRequired?: boolean;
  /** The resource identifier of the resource that emitted the metric. */
  resourceId?: string;
  /** The namespace the metric belongs to. */
  namespace?: string;
  /** The name and the display name of the metric, i.e. it is a localizable string. */
  name?: MicrosoftCommonLocalizableString;
  /** Detailed description of this metric. */
  displayDescription?: string;
  /** Custom category name for this metric. */
  category?: string;
  /** The class of the metric. */
  metricClass?: MetricsApiMetricClass;
  /** The unit of the metric. */
  unit?: MetricsApiMetricUnit;
  /** The primary aggregation type value defining how to use the values for display. */
  primaryAggregationType?: MetricsApiMetricAggregationType;
  /** The collection of what aggregation types are supported. */
  supportedAggregationTypes?: MetricsApiMetricAggregationType[];
  /** The collection of what aggregation intervals are available to be queried. */
  metricAvailabilities?: MetricsApiMetricAvailability[];
  /** The resource identifier of the metric definition. */
  id?: string;
  /** The name and the display name of the dimension, i.e. it is a localizable string. */
  dimensions?: MicrosoftCommonLocalizableString[];
}

export function metricsApiSubscriptionScopeMetricDefinitionDeserializer(
  item: any,
): MetricsApiSubscriptionScopeMetricDefinition {
  return {
    isDimensionRequired: item["isDimensionRequired"],
    resourceId: item["resourceId"],
    namespace: item["namespace"],
    name: !item["name"] ? item["name"] : microsoftCommonLocalizableStringDeserializer(item["name"]),
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
      : metricsApiMetricAvailabilityArrayDeserializer(item["metricAvailabilities"]),
    id: item["id"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : microsoftCommonLocalizableStringArrayDeserializer(item["dimensions"]),
  };
}

/** The class of the metric. */
export enum KnownMetricsApiMetricClass {
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
 * {@link KnownMetricsApiMetricClass} can be used interchangeably with MetricsApiMetricClass,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Availability**: Availability \
 * **Transactions**: Transactions \
 * **Errors**: Errors \
 * **Latency**: Latency \
 * **Saturation**: Saturation
 */
export type MetricsApiMetricClass = string;

/** The unit of the metric. */
export enum KnownMetricsApiMetricUnit {
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
 * {@link KnownMetricsApiMetricUnit} can be used interchangeably with MetricsApiMetricUnit,
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
export type MetricsApiMetricUnit = string;

/** The aggregation type of the metric. */
export enum KnownMetricsApiMetricAggregationType {
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
 * {@link KnownMetricsApiMetricAggregationType} can be used interchangeably with MetricsApiMetricAggregationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **Average**: Average \
 * **Count**: Count \
 * **Minimum**: Minimum \
 * **Maximum**: Maximum \
 * **Total**: Total
 */
export type MetricsApiMetricAggregationType = string;

export function metricsApiMetricAvailabilityArrayDeserializer(
  result: Array<MetricsApiMetricAvailability>,
): any[] {
  return result.map((item) => {
    return metricsApiMetricAvailabilityDeserializer(item);
  });
}

/** Metric availability specifies the time grain (aggregation interval or frequency) and the retention period for that time grain. */
export interface MetricsApiMetricAvailability {
  /** The time grain specifies a supported aggregation interval for the metric. Expressed as a duration 'PT1M', 'P1D', etc. */
  timeGrain?: string;
  /** The retention period for the metric at the specified timegrain.  Expressed as a duration 'PT1M', 'P1D', etc. */
  retention?: string;
}

export function metricsApiMetricAvailabilityDeserializer(item: any): MetricsApiMetricAvailability {
  return {
    timeGrain: item["timeGrain"],
    retention: item["retention"],
  };
}

/** Represents collection of metric definitions. */
export interface _MetricsApiMetricDefinitionCollection {
  /** The values for the metric definitions. */
  value: MetricsApiMetricDefinition[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _metricsApiMetricDefinitionCollectionDeserializer(
  item: any,
): _MetricsApiMetricDefinitionCollection {
  return {
    value: metricsApiMetricDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function metricsApiMetricDefinitionArrayDeserializer(
  result: Array<MetricsApiMetricDefinition>,
): any[] {
  return result.map((item) => {
    return metricsApiMetricDefinitionDeserializer(item);
  });
}

/** Metric definition class specifies the metadata for a metric. */
export interface MetricsApiMetricDefinition {
  /** Flag to indicate whether the dimension is required. */
  isDimensionRequired?: boolean;
  /** The resource identifier of the resource that emitted the metric. */
  resourceId?: string;
  /** The namespace the metric belongs to. */
  namespace?: string;
  /** The name and the display name of the metric, i.e. it is a localizable string. */
  name?: MicrosoftCommonLocalizableString;
  /** Detailed description of this metric. */
  displayDescription?: string;
  /** Custom category name for this metric. */
  category?: string;
  /** The class of the metric. */
  metricClass?: MetricsApiMetricClass;
  /** The unit of the metric. */
  unit?: MetricsApiMetricUnit;
  /** The primary aggregation type value defining how to use the values for display. */
  primaryAggregationType?: MetricsApiAggregationType;
  /** The collection of what aggregation types are supported. */
  supportedAggregationTypes?: MetricsApiAggregationType[];
  /** The collection of what aggregation intervals are available to be queried. */
  metricAvailabilities?: MetricsApiMetricAvailability[];
  /** The resource identifier of the metric definition. */
  id?: string;
  /** The name and the display name of the dimension, i.e. it is a localizable string. */
  dimensions?: MicrosoftCommonLocalizableString[];
}

export function metricsApiMetricDefinitionDeserializer(item: any): MetricsApiMetricDefinition {
  return {
    isDimensionRequired: item["isDimensionRequired"],
    resourceId: item["resourceId"],
    namespace: item["namespace"],
    name: !item["name"] ? item["name"] : microsoftCommonLocalizableStringDeserializer(item["name"]),
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
      : metricsApiMetricAvailabilityArrayDeserializer(item["metricAvailabilities"]),
    id: item["id"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : microsoftCommonLocalizableStringArrayDeserializer(item["dimensions"]),
  };
}

/** The aggregation type of the metric. */
export type MetricsApiAggregationType =
  "None" | "Average" | "Count" | "Minimum" | "Maximum" | "Total";

/** Represents collection of metric namespaces. */
export interface _MetricsApiMetricNamespaceCollection {
  /** The values for the metric namespaces. */
  value: MetricsApiMetricNamespace[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _metricsApiMetricNamespaceCollectionDeserializer(
  item: any,
): _MetricsApiMetricNamespaceCollection {
  return {
    value: metricsApiMetricNamespaceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function metricsApiMetricNamespaceArrayDeserializer(
  result: Array<MetricsApiMetricNamespace>,
): any[] {
  return result.map((item) => {
    return metricsApiMetricNamespaceDeserializer(item);
  });
}

/** Metric namespace class specifies the metadata for a metric namespace. */
export interface MetricsApiMetricNamespace {
  /** The ID of the metric namespace. */
  id?: string;
  /** The type of the namespace. */
  type?: string;
  /** The escaped name of the namespace. */
  name?: string;
  /** Kind of namespace */
  classification?: MetricsApiNamespaceClassification;
  /** Properties which include the fully qualified namespace name. */
  properties?: MetricsApiMetricNamespaceName;
}

export function metricsApiMetricNamespaceDeserializer(item: any): MetricsApiMetricNamespace {
  return {
    id: item["id"],
    type: item["type"],
    name: item["name"],
    classification: item["classification"],
    properties: !item["properties"]
      ? item["properties"]
      : metricsApiMetricNamespaceNameDeserializer(item["properties"]),
  };
}

/** Kind of namespace */
export enum KnownMetricsApiNamespaceClassification {
  /** Platform */
  Platform = "Platform",
  /** Custom */
  Custom = "Custom",
  /** Qos */
  Qos = "Qos",
}

/**
 * Kind of namespace \
 * {@link KnownMetricsApiNamespaceClassification} can be used interchangeably with MetricsApiNamespaceClassification,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Platform**: Platform \
 * **Custom**: Custom \
 * **Qos**: Qos
 */
export type MetricsApiNamespaceClassification = string;

/** The fully qualified metric namespace name. */
export interface MetricsApiMetricNamespaceName {
  /** The metric namespace name. */
  metricNamespaceName?: string;
}

export function metricsApiMetricNamespaceNameDeserializer(
  item: any,
): MetricsApiMetricNamespaceName {
  return {
    metricNamespaceName: item["metricNamespaceName"],
  };
}

/** The response to a metrics query. */
export interface MetricsApiResponse {
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
  value: MetricsApiMetric[];
}

export function metricsApiResponseDeserializer(item: any): MetricsApiResponse {
  return {
    cost: item["cost"],
    timespan: item["timespan"],
    interval: item["interval"],
    namespace: item["namespace"],
    resourceregion: item["resourceregion"],
    value: metricsApiMetricArrayDeserializer(item["value"]),
  };
}

export function metricsApiMetricArrayDeserializer(result: Array<MetricsApiMetric>): any[] {
  return result.map((item) => {
    return metricsApiMetricDeserializer(item);
  });
}

/** The result data of a query. */
export interface MetricsApiMetric {
  /** The metric Id. */
  id: string;
  /** The resource type of the metric resource. */
  type: string;
  /** The name and the display name of the metric, i.e. it is localizable string. */
  name: MicrosoftCommonLocalizableString;
  /** Detailed description of this metric. */
  displayDescription?: string;
  /** 'Success' or the error details on query failures for this metric. */
  errorCode?: string;
  /** Error message encountered querying this specific metric. */
  errorMessage?: string;
  /** The unit of the metric. */
  unit: MetricsApiMetricUnit;
  /** The time series returned when a data query is performed. */
  timeseries: MetricsApiTimeSeriesElement[];
}

export function metricsApiMetricDeserializer(item: any): MetricsApiMetric {
  return {
    id: item["id"],
    type: item["type"],
    name: microsoftCommonLocalizableStringDeserializer(item["name"]),
    displayDescription: item["displayDescription"],
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    unit: item["unit"],
    timeseries: metricsApiTimeSeriesElementArrayDeserializer(item["timeseries"]),
  };
}

export function metricsApiTimeSeriesElementArrayDeserializer(
  result: Array<MetricsApiTimeSeriesElement>,
): any[] {
  return result.map((item) => {
    return metricsApiTimeSeriesElementDeserializer(item);
  });
}

/** A time series result type. The discriminator value is always TimeSeries in this case. */
export interface MetricsApiTimeSeriesElement {
  /** The metadata values returned if $filter was specified in the call. */
  metadatavalues?: MetricsApiMetadataValue[];
  /** An array of data points representing the metric values.  This is only returned if a result type of data is specified. */
  data?: MetricsApiMetricValue[];
}

export function metricsApiTimeSeriesElementDeserializer(item: any): MetricsApiTimeSeriesElement {
  return {
    metadatavalues: !item["metadatavalues"]
      ? item["metadatavalues"]
      : metricsApiMetadataValueArrayDeserializer(item["metadatavalues"]),
    data: !item["data"] ? item["data"] : metricsApiMetricValueArrayDeserializer(item["data"]),
  };
}

export function metricsApiMetadataValueArrayDeserializer(
  result: Array<MetricsApiMetadataValue>,
): any[] {
  return result.map((item) => {
    return metricsApiMetadataValueDeserializer(item);
  });
}

/** Represents a metric metadata value. */
export interface MetricsApiMetadataValue {
  /** The name of the metadata. */
  name?: MicrosoftCommonLocalizableString;
  /** The value of the metadata. */
  value?: string;
}

export function metricsApiMetadataValueDeserializer(item: any): MetricsApiMetadataValue {
  return {
    name: !item["name"] ? item["name"] : microsoftCommonLocalizableStringDeserializer(item["name"]),
    value: item["value"],
  };
}

export function metricsApiMetricValueArrayDeserializer(
  result: Array<MetricsApiMetricValue>,
): any[] {
  return result.map((item) => {
    return metricsApiMetricValueDeserializer(item);
  });
}

/** Represents a metric value. */
export interface MetricsApiMetricValue {
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

export function metricsApiMetricValueDeserializer(item: any): MetricsApiMetricValue {
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
export interface MetricsApiSubscriptionScopeMetricsRequestBodyParameters {
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
  resultType?: MetricsApiMetricResultType;
  /** Metric namespace where the metrics you want reside. */
  metricNamespace?: string;
  /** When set to true, if the timespan passed in is not supported by this metric, the API will return the result using the closest supported timespan. When set to false, an error is returned for invalid timespan parameters. Defaults to false. */
  autoAdjustTimegrain?: boolean;
  /** When set to false, invalid filter parameter values will be ignored. When set to true, an error is returned for invalid filter parameters. Defaults to true. */
  validateDimensions?: boolean;
}

export function metricsApiSubscriptionScopeMetricsRequestBodyParametersSerializer(
  item: MetricsApiSubscriptionScopeMetricsRequestBodyParameters,
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
export enum KnownMetricsApiMetricResultType {
  /** Data */
  Data = "Data",
  /** Metadata */
  Metadata = "Metadata",
}

/**
 * Reduces the set of data collected. The syntax allowed depends on the operation. See the operation's description for details. \
 * {@link KnownMetricsApiMetricResultType} can be used interchangeably with MetricsApiMetricResultType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Data**: Data \
 * **Metadata**: Metadata
 */
export type MetricsApiMetricResultType = string;
