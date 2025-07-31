// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/** The comma separated list of resource IDs to query metrics for. */
export interface ResourceIdList {
  /** The list of resource IDs to query metrics for. */
  resourceids?: string[];
}

export function resourceIdListSerializer(item: ResourceIdList): any {
  return {
    resourceids: !item["resourceids"]
      ? item["resourceids"]
      : item["resourceids"].map((p: string) => {
          return p;
        }),
  };
}

/** The metrics result for a resource. */
export interface MetricResultsResponse {
  /** The collection of metric data responses per resource, per metric. */
  values?: MetricResultsResponseValuesItem[];
}

export function metricResultsResponseDeserializer(item: any): MetricResultsResponse {
  return {
    values: !item["values"]
      ? item["values"]
      : metricResultsResponseValuesItemArrayDeserializer(item["values"]),
  };
}

export function metricResultsResponseValuesItemArrayDeserializer(
  result: Array<MetricResultsResponseValuesItem>,
): any[] {
  return result.map((item: any) => {
    return metricResultsResponseValuesItemDeserializer(item);
  });
}

/** The metric data response for a resource. */
export interface MetricResultsResponseValuesItem {
  /** The start time, in datetime format, for which the data was retrieved. */
  startTime: string;
  /** The end time, in datetime format, for which the data was retrieved. */
  endTime: string;
  /**
   * The interval (window size) for which the metric data was returned in ISO 8601
   * duration format with a special case for 'FULL' value that returns single
   * datapoint for entire time span requested (*Examples: PT15M, PT1H, P1D, FULL*).
   * This may be adjusted and different from what was originally requested if
   * AutoAdjustTimegrain=true is specified.
   */
  interval?: string;
  /** The namespace of the metrics been queried */
  namespace?: string;
  /** The region of the resource been queried for metrics. */
  resourceRegion?: string;
  /** The resource that has been queried for metrics. */
  resourceId?: string;
  /** The value of the collection. */
  metrics: Metric[];
}

export function metricResultsResponseValuesItemDeserializer(
  item: any,
): MetricResultsResponseValuesItem {
  return {
    startTime: item["starttime"],
    endTime: item["endtime"],
    interval: item["interval"],
    namespace: item["namespace"],
    resourceRegion: item["resourceregion"],
    resourceId: item["resourceid"],
    metrics: metricArrayDeserializer(item["value"]),
  };
}

export function metricArrayDeserializer(result: Array<Metric>): any[] {
  return result.map((item: any) => {
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
  name: string;
  /** Detailed description of this metric. */
  description?: string;
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
    description: item["displayDescription"],
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    unit: item["unit"],
    timeseries: timeSeriesElementArrayDeserializer(item["timeseries"]),
  };
}

/** The localizable string class. */
interface LocalizableString {
  /** The invariant value. */
  value: string;
  /** The display name. */
  localizedValue?: string;
}

export function localizableStringDeserializer(item: any): string {
  const deserialized: LocalizableString = {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
  return deserialized.localizedValue || deserialized.value;
}

/** The unit of the metric. */
export type MetricUnit =
  | "Count"
  | "Bytes"
  | "Seconds"
  | "CountPerSecond"
  | "BytesPerSecond"
  | "Percent"
  | "MilliSeconds"
  | "ByteSeconds"
  | "Unspecified"
  | "Cores"
  | "MilliCores"
  | "NanoCores"
  | "BitsPerSecond";

export function timeSeriesElementArrayDeserializer(result: Array<TimeSeriesElement>): any[] {
  return result.map((item: any) => {
    return timeSeriesElementDeserializer(item);
  });
}

/**
 * A time series result type. The discriminator value is always TimeSeries in this
 * case.
 */
export interface TimeSeriesElement {
  /** The metadata values returned if $filter was specified in the call. */
  metadatavalues?: MetadataValue[];
  /**
   * An array of data points representing the metric values.  This is only returned
   * if a result type of data is specified.
   */
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
  return result.map((item: any) => {
    return metadataValueDeserializer(item);
  });
}

/** Represents a metric metadata value. */
export interface MetadataValue {
  /** The name of the metadata. */
  name?: string;
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
  return result.map((item: any) => {
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
  /**
   * The number of samples in the time range. Can be used to determine the number of
   * values that contributed to the average value.
   */
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

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. */
export interface ErrorResponse {
  /** The error object. */
  error?: ErrorDetail;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** The error detail. */
export interface ErrorDetail {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: ErrorDetail[];
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

export function errorDetailDeserializer(item: any): ErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : errorDetailArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function errorDetailArrayDeserializer(result: Array<ErrorDetail>): any[] {
  return result.map((item: any) => {
    return errorDetailDeserializer(item);
  });
}

export function errorAdditionalInfoArrayDeserializer(result: Array<ErrorAdditionalInfo>): any[] {
  return result.map((item: any) => {
    return errorAdditionalInfoDeserializer(item);
  });
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfo {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: any;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: item["info"],
  };
}

/** Service API versions */
export enum KnownVersions {
  /** The 2024-02-01 API version. */
  V20240201 = "2024-02-01",
}
