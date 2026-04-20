// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ErrorAdditionalInfo } from "../../models.js";
import { errorAdditionalInfoArrayDeserializer } from "../../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Represents collection of metric definitions. */
export interface _MicrosoftMetricsSubscriptionScopeMetricDefinitionCollection {
  /** The values for the metric definitions. */
  value: MicrosoftMetricsSubscriptionScopeMetricDefinition[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _microsoftMetricsSubscriptionScopeMetricDefinitionCollectionDeserializer(
  item: any,
): _MicrosoftMetricsSubscriptionScopeMetricDefinitionCollection {
  return {
    value: microsoftMetricsSubscriptionScopeMetricDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function microsoftMetricsSubscriptionScopeMetricDefinitionArrayDeserializer(
  result: Array<MicrosoftMetricsSubscriptionScopeMetricDefinition>,
): any[] {
  return result.map((item) => {
    return microsoftMetricsSubscriptionScopeMetricDefinitionDeserializer(item);
  });
}

/** Metric definition class specifies the metadata for a metric. */
export interface MicrosoftMetricsSubscriptionScopeMetricDefinition {
  /** Flag to indicate whether the dimension is required. */
  isDimensionRequired?: boolean;
  /** The resource identifier of the resource that emitted the metric. */
  resourceId?: string;
  /** The namespace the metric belongs to. */
  namespace?: string;
  /** The name and the display name of the metric, i.e. it is a localizable string. */
  name?: MicrosoftMetricsLocalizableString;
  /** Detailed description of this metric. */
  displayDescription?: string;
  /** Custom category name for this metric. */
  category?: string;
  /** The class of the metric. */
  metricClass?: MicrosoftMetricsMetricClass;
  /** The unit of the metric. */
  unit?: MicrosoftMetricsMetricUnit;
  /** The primary aggregation type value defining how to use the values for display. */
  primaryAggregationType?: MicrosoftMetricsMetricAggregationType;
  /** The collection of what aggregation types are supported. */
  supportedAggregationTypes?: MicrosoftMetricsMetricAggregationType[];
  /** The collection of what aggregation intervals are available to be queried. */
  metricAvailabilities?: MicrosoftMetricsMetricAvailability[];
  /** The resource identifier of the metric definition. */
  id?: string;
  /** The name and the display name of the dimension, i.e. it is a localizable string. */
  dimensions?: MicrosoftMetricsLocalizableString[];
}

export function microsoftMetricsSubscriptionScopeMetricDefinitionDeserializer(
  item: any,
): MicrosoftMetricsSubscriptionScopeMetricDefinition {
  return {
    isDimensionRequired: item["isDimensionRequired"],
    resourceId: item["resourceId"],
    namespace: item["namespace"],
    name: !item["name"]
      ? item["name"]
      : microsoftMetricsLocalizableStringDeserializer(item["name"]),
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
      : microsoftMetricsMetricAvailabilityArrayDeserializer(item["metricAvailabilities"]),
    id: item["id"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : microsoftMetricsLocalizableStringArrayDeserializer(item["dimensions"]),
  };
}

/** The localizable string class. */
export interface MicrosoftMetricsLocalizableString {
  /** The invariant value. */
  value: string;
  /** The display name. */
  localizedValue?: string;
}

export function microsoftMetricsLocalizableStringDeserializer(
  item: any,
): MicrosoftMetricsLocalizableString {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
}

/** The class of the metric. */
export enum KnownMicrosoftMetricsMetricClass {
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
 * {@link KnownMicrosoftMetricsMetricClass} can be used interchangeably with MicrosoftMetricsMetricClass,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Availability**: Availability \
 * **Transactions**: Transactions \
 * **Errors**: Errors \
 * **Latency**: Latency \
 * **Saturation**: Saturation
 */
export type MicrosoftMetricsMetricClass = string;

/** The unit of the metric. */
export enum KnownMicrosoftMetricsMetricUnit {
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
 * {@link KnownMicrosoftMetricsMetricUnit} can be used interchangeably with MicrosoftMetricsMetricUnit,
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
export type MicrosoftMetricsMetricUnit = string;

/** The aggregation type of the metric. */
export enum KnownMicrosoftMetricsMetricAggregationType {
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
 * {@link KnownMicrosoftMetricsMetricAggregationType} can be used interchangeably with MicrosoftMetricsMetricAggregationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **Average**: Average \
 * **Count**: Count \
 * **Minimum**: Minimum \
 * **Maximum**: Maximum \
 * **Total**: Total
 */
export type MicrosoftMetricsMetricAggregationType = string;

export function microsoftMetricsMetricAvailabilityArrayDeserializer(
  result: Array<MicrosoftMetricsMetricAvailability>,
): any[] {
  return result.map((item) => {
    return microsoftMetricsMetricAvailabilityDeserializer(item);
  });
}

/** Metric availability specifies the time grain (aggregation interval or frequency) and the retention period for that time grain. */
export interface MicrosoftMetricsMetricAvailability {
  /** The time grain specifies a supported aggregation interval for the metric. Expressed as a duration 'PT1M', 'P1D', etc. */
  timeGrain?: string;
  /** The retention period for the metric at the specified timegrain.  Expressed as a duration 'PT1M', 'P1D', etc. */
  retention?: string;
}

export function microsoftMetricsMetricAvailabilityDeserializer(
  item: any,
): MicrosoftMetricsMetricAvailability {
  return {
    timeGrain: item["timeGrain"],
    retention: item["retention"],
  };
}

export function microsoftMetricsLocalizableStringArrayDeserializer(
  result: Array<MicrosoftMetricsLocalizableString>,
): any[] {
  return result.map((item) => {
    return microsoftMetricsLocalizableStringDeserializer(item);
  });
}

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. (This also follows the OData error response format.) */
export interface MicrosoftMetricsErrorContract {
  /** The error object. */
  error?: MicrosoftMetricsMetricsErrorResponse;
}

export function microsoftMetricsErrorContractDeserializer(
  item: any,
): MicrosoftMetricsErrorContract {
  return {
    error: !item["error"]
      ? item["error"]
      : microsoftMetricsMetricsErrorResponseDeserializer(item["error"]),
  };
}

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. (This also follows the OData error response format.) */
export interface MicrosoftMetricsMetricsErrorResponse {
  /** Error code */
  readonly code?: string;
  /** Error message indicating why the operation failed. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: MicrosoftMetricsMetricsErrorResponse[];
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

export function microsoftMetricsMetricsErrorResponseDeserializer(
  item: any,
): MicrosoftMetricsMetricsErrorResponse {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"]
      ? item["details"]
      : microsoftMetricsMetricsErrorResponseArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function microsoftMetricsMetricsErrorResponseArrayDeserializer(
  result: Array<MicrosoftMetricsMetricsErrorResponse>,
): any[] {
  return result.map((item) => {
    return microsoftMetricsMetricsErrorResponseDeserializer(item);
  });
}

/** Represents collection of metric definitions. */
export interface _MicrosoftMetricsMetricDefinitionCollection {
  /** The values for the metric definitions. */
  value: MicrosoftMetricsMetricDefinition[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _microsoftMetricsMetricDefinitionCollectionDeserializer(
  item: any,
): _MicrosoftMetricsMetricDefinitionCollection {
  return {
    value: microsoftMetricsMetricDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function microsoftMetricsMetricDefinitionArrayDeserializer(
  result: Array<MicrosoftMetricsMetricDefinition>,
): any[] {
  return result.map((item) => {
    return microsoftMetricsMetricDefinitionDeserializer(item);
  });
}

/** Metric definition class specifies the metadata for a metric. */
export interface MicrosoftMetricsMetricDefinition {
  /** Flag to indicate whether the dimension is required. */
  isDimensionRequired?: boolean;
  /** The resource identifier of the resource that emitted the metric. */
  resourceId?: string;
  /** The namespace the metric belongs to. */
  namespace?: string;
  /** The name and the display name of the metric, i.e. it is a localizable string. */
  name?: MicrosoftMetricsLocalizableString;
  /** Detailed description of this metric. */
  displayDescription?: string;
  /** Custom category name for this metric. */
  category?: string;
  /** The class of the metric. */
  metricClass?: MicrosoftMetricsMetricClass;
  /** The unit of the metric. */
  unit?: MicrosoftMetricsMetricUnit;
  /** The primary aggregation type value defining how to use the values for display. */
  primaryAggregationType?: MicrosoftMetricsAggregationType;
  /** The collection of what aggregation types are supported. */
  supportedAggregationTypes?: MicrosoftMetricsAggregationType[];
  /** The collection of what aggregation intervals are available to be queried. */
  metricAvailabilities?: MicrosoftMetricsMetricAvailability[];
  /** The resource identifier of the metric definition. */
  id?: string;
  /** The name and the display name of the dimension, i.e. it is a localizable string. */
  dimensions?: MicrosoftMetricsLocalizableString[];
}

export function microsoftMetricsMetricDefinitionDeserializer(
  item: any,
): MicrosoftMetricsMetricDefinition {
  return {
    isDimensionRequired: item["isDimensionRequired"],
    resourceId: item["resourceId"],
    namespace: item["namespace"],
    name: !item["name"]
      ? item["name"]
      : microsoftMetricsLocalizableStringDeserializer(item["name"]),
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
      : microsoftMetricsMetricAvailabilityArrayDeserializer(item["metricAvailabilities"]),
    id: item["id"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : microsoftMetricsLocalizableStringArrayDeserializer(item["dimensions"]),
  };
}

/** The aggregation type of the metric. */
export type MicrosoftMetricsAggregationType =
  | "None"
  | "Average"
  | "Count"
  | "Minimum"
  | "Maximum"
  | "Total";

/** Represents collection of metric namespaces. */
export interface _MicrosoftMetricsMetricNamespaceCollection {
  /** The values for the metric namespaces. */
  value: MicrosoftMetricsMetricNamespace[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _microsoftMetricsMetricNamespaceCollectionDeserializer(
  item: any,
): _MicrosoftMetricsMetricNamespaceCollection {
  return {
    value: microsoftMetricsMetricNamespaceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function microsoftMetricsMetricNamespaceArrayDeserializer(
  result: Array<MicrosoftMetricsMetricNamespace>,
): any[] {
  return result.map((item) => {
    return microsoftMetricsMetricNamespaceDeserializer(item);
  });
}

/** Metric namespace class specifies the metadata for a metric namespace. */
export interface MicrosoftMetricsMetricNamespace {
  /** The ID of the metric namespace. */
  id?: string;
  /** The type of the namespace. */
  type?: string;
  /** The escaped name of the namespace. */
  name?: string;
  /** Kind of namespace */
  classification?: MicrosoftMetricsNamespaceClassification;
  /** Properties which include the fully qualified namespace name. */
  properties?: MicrosoftMetricsMetricNamespaceName;
}

export function microsoftMetricsMetricNamespaceDeserializer(
  item: any,
): MicrosoftMetricsMetricNamespace {
  return {
    id: item["id"],
    type: item["type"],
    name: item["name"],
    classification: item["classification"],
    properties: !item["properties"]
      ? item["properties"]
      : microsoftMetricsMetricNamespaceNameDeserializer(item["properties"]),
  };
}

/** Kind of namespace */
export enum KnownMicrosoftMetricsNamespaceClassification {
  /** Platform */
  Platform = "Platform",
  /** Custom */
  Custom = "Custom",
  /** Qos */
  Qos = "Qos",
}

/**
 * Kind of namespace \
 * {@link KnownMicrosoftMetricsNamespaceClassification} can be used interchangeably with MicrosoftMetricsNamespaceClassification,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Platform**: Platform \
 * **Custom**: Custom \
 * **Qos**: Qos
 */
export type MicrosoftMetricsNamespaceClassification = string;

/** The fully qualified metric namespace name. */
export interface MicrosoftMetricsMetricNamespaceName {
  /** The metric namespace name. */
  metricNamespaceName?: string;
}

export function microsoftMetricsMetricNamespaceNameDeserializer(
  item: any,
): MicrosoftMetricsMetricNamespaceName {
  return {
    metricNamespaceName: item["metricNamespaceName"],
  };
}

/** Describes the format of Error response. */
export interface MicrosoftMetricsErrorResponse {
  /** Error code */
  code?: string;
  /** Error message indicating why the operation failed. */
  message?: string;
}

export function microsoftMetricsErrorResponseDeserializer(
  item: any,
): MicrosoftMetricsErrorResponse {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** The response to a metrics query. */
export interface MicrosoftMetricsResponse {
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
  value: MicrosoftMetricsMetric[];
}

export function microsoftMetricsResponseDeserializer(item: any): MicrosoftMetricsResponse {
  return {
    cost: item["cost"],
    timespan: item["timespan"],
    interval: item["interval"],
    namespace: item["namespace"],
    resourceregion: item["resourceregion"],
    value: microsoftMetricsMetricArrayDeserializer(item["value"]),
  };
}

export function microsoftMetricsMetricArrayDeserializer(
  result: Array<MicrosoftMetricsMetric>,
): any[] {
  return result.map((item) => {
    return microsoftMetricsMetricDeserializer(item);
  });
}

/** The result data of a query. */
export interface MicrosoftMetricsMetric {
  /** The metric Id. */
  id: string;
  /** The resource type of the metric resource. */
  type: string;
  /** The name and the display name of the metric, i.e. it is localizable string. */
  name: MicrosoftMetricsLocalizableString;
  /** Detailed description of this metric. */
  displayDescription?: string;
  /** 'Success' or the error details on query failures for this metric. */
  errorCode?: string;
  /** Error message encountered querying this specific metric. */
  errorMessage?: string;
  /** The unit of the metric. */
  unit: MicrosoftMetricsMetricUnit;
  /** The time series returned when a data query is performed. */
  timeseries: MicrosoftMetricsTimeSeriesElement[];
}

export function microsoftMetricsMetricDeserializer(item: any): MicrosoftMetricsMetric {
  return {
    id: item["id"],
    type: item["type"],
    name: microsoftMetricsLocalizableStringDeserializer(item["name"]),
    displayDescription: item["displayDescription"],
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    unit: item["unit"],
    timeseries: microsoftMetricsTimeSeriesElementArrayDeserializer(item["timeseries"]),
  };
}

export function microsoftMetricsTimeSeriesElementArrayDeserializer(
  result: Array<MicrosoftMetricsTimeSeriesElement>,
): any[] {
  return result.map((item) => {
    return microsoftMetricsTimeSeriesElementDeserializer(item);
  });
}

/** A time series result type. The discriminator value is always TimeSeries in this case. */
export interface MicrosoftMetricsTimeSeriesElement {
  /** The metadata values returned if $filter was specified in the call. */
  metadatavalues?: MicrosoftMetricsMetadataValue[];
  /** An array of data points representing the metric values.  This is only returned if a result type of data is specified. */
  data?: MicrosoftMetricsMetricValue[];
}

export function microsoftMetricsTimeSeriesElementDeserializer(
  item: any,
): MicrosoftMetricsTimeSeriesElement {
  return {
    metadatavalues: !item["metadatavalues"]
      ? item["metadatavalues"]
      : microsoftMetricsMetadataValueArrayDeserializer(item["metadatavalues"]),
    data: !item["data"] ? item["data"] : microsoftMetricsMetricValueArrayDeserializer(item["data"]),
  };
}

export function microsoftMetricsMetadataValueArrayDeserializer(
  result: Array<MicrosoftMetricsMetadataValue>,
): any[] {
  return result.map((item) => {
    return microsoftMetricsMetadataValueDeserializer(item);
  });
}

/** Represents a metric metadata value. */
export interface MicrosoftMetricsMetadataValue {
  /** The name of the metadata. */
  name?: MicrosoftMetricsLocalizableString;
  /** The value of the metadata. */
  value?: string;
}

export function microsoftMetricsMetadataValueDeserializer(
  item: any,
): MicrosoftMetricsMetadataValue {
  return {
    name: !item["name"]
      ? item["name"]
      : microsoftMetricsLocalizableStringDeserializer(item["name"]),
    value: item["value"],
  };
}

export function microsoftMetricsMetricValueArrayDeserializer(
  result: Array<MicrosoftMetricsMetricValue>,
): any[] {
  return result.map((item) => {
    return microsoftMetricsMetricValueDeserializer(item);
  });
}

/** Represents a metric value. */
export interface MicrosoftMetricsMetricValue {
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

export function microsoftMetricsMetricValueDeserializer(item: any): MicrosoftMetricsMetricValue {
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
export interface MicrosoftMetricsSubscriptionScopeMetricsRequestBodyParameters {
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
  resultType?: MicrosoftMetricsMetricResultType;
  /** Metric namespace where the metrics you want reside. */
  metricNamespace?: string;
  /** When set to true, if the timespan passed in is not supported by this metric, the API will return the result using the closest supported timespan. When set to false, an error is returned for invalid timespan parameters. Defaults to false. */
  autoAdjustTimegrain?: boolean;
  /** When set to false, invalid filter parameter values will be ignored. When set to true, an error is returned for invalid filter parameters. Defaults to true. */
  validateDimensions?: boolean;
}

export function microsoftMetricsSubscriptionScopeMetricsRequestBodyParametersSerializer(
  item: MicrosoftMetricsSubscriptionScopeMetricsRequestBodyParameters,
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
export enum KnownMicrosoftMetricsMetricResultType {
  /** Data */
  Data = "Data",
  /** Metadata */
  Metadata = "Metadata",
}

/**
 * Reduces the set of data collected. The syntax allowed depends on the operation. See the operation's description for details. \
 * {@link KnownMicrosoftMetricsMetricResultType} can be used interchangeably with MicrosoftMetricsMetricResultType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Data**: Data \
 * **Metadata**: Metadata
 */
export type MicrosoftMetricsMetricResultType = string;
/** Type of MicrosoftMetricsResultType */
export type MicrosoftMetricsResultType = "Data" | "Metadata";
