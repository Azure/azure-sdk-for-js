// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ErrorResponseError } from "../common/models.js";
import { errorResponseErrorDeserializer } from "../common/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** A list of metric baselines. */
export interface _MetricBaselinesResponse {
  /** The list of metric baselines. */
  value?: SingleMetricBaseline[];
  /** The URL to get the next set of results. */
  nextLink?: string;
}

export function _metricBaselinesResponseDeserializer(item: any): _MetricBaselinesResponse {
  return {
    value: !item["value"] ? item["value"] : singleMetricBaselineArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function singleMetricBaselineArrayDeserializer(result: Array<SingleMetricBaseline>): any[] {
  return result.map((item) => {
    return singleMetricBaselineDeserializer(item);
  });
}

/** The baseline results of a single metric. */
export interface SingleMetricBaseline {
  /** The metric baseline Id. */
  id: string;
  /** The resource type of the metric baseline resource. */
  type: string;
  /** The name of the metric for which the baselines were retrieved. */
  name: string;
  /** The timespan for which the data was retrieved. Its value consists of two datetimes concatenated, separated by '/'.  This may be adjusted in the future and returned back from what was originally requested. */
  timespan: string;
  /** The interval (window size) for which the metric data was returned in.  This may be adjusted in the future and returned back from what was originally requested.  This is not present if a metadata request was made. */
  interval: string;
  /** The namespace of the metrics been queried. */
  namespace?: string;
  /** The baseline for each time series that was queried. */
  baselines: TimeSeriesBaseline[];
}

export function singleMetricBaselineDeserializer(item: any): SingleMetricBaseline {
  return {
    id: item["id"],
    type: item["type"],
    name: item["name"],
    ..._singleMetricBaselinePropertiesDeserializer(item["properties"]),
  };
}

/** The response to a metric baselines query. */
export interface MetricBaselinesProperties {
  /** The timespan for which the data was retrieved. Its value consists of two datetimes concatenated, separated by '/'.  This may be adjusted in the future and returned back from what was originally requested. */
  timespan: string;
  /** The interval (window size) for which the metric data was returned in.  This may be adjusted in the future and returned back from what was originally requested.  This is not present if a metadata request was made. */
  interval: string;
  /** The namespace of the metrics been queried. */
  namespace?: string;
  /** The baseline for each time series that was queried. */
  baselines: TimeSeriesBaseline[];
}

export function metricBaselinesPropertiesDeserializer(item: any): MetricBaselinesProperties {
  return {
    timespan: item["timespan"],
    interval: item["interval"],
    namespace: item["namespace"],
    baselines: timeSeriesBaselineArrayDeserializer(item["baselines"]),
  };
}

export function timeSeriesBaselineArrayDeserializer(result: Array<TimeSeriesBaseline>): any[] {
  return result.map((item) => {
    return timeSeriesBaselineDeserializer(item);
  });
}

/** The baseline values for a single time series. */
export interface TimeSeriesBaseline {
  /** The aggregation type of the metric. */
  aggregation: string;
  /** The dimensions of this time series. */
  dimensions?: MetricSingleDimension[];
  /** The list of timestamps of the baselines. */
  timestamps: Date[];
  /** The baseline values for each sensitivity. */
  data: SingleBaseline[];
  /** The baseline metadata values. */
  metadataValues?: BaselineMetadata[];
}

export function timeSeriesBaselineDeserializer(item: any): TimeSeriesBaseline {
  return {
    aggregation: item["aggregation"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : metricSingleDimensionArrayDeserializer(item["dimensions"]),
    timestamps: item["timestamps"].map((p: any) => {
      return new Date(p);
    }),
    data: singleBaselineArrayDeserializer(item["data"]),
    metadataValues: !item["metadataValues"]
      ? item["metadataValues"]
      : baselineMetadataArrayDeserializer(item["metadataValues"]),
  };
}

export function metricSingleDimensionArrayDeserializer(
  result: Array<MetricSingleDimension>,
): any[] {
  return result.map((item) => {
    return metricSingleDimensionDeserializer(item);
  });
}

/** The metric dimension name and value. */
export interface MetricSingleDimension {
  /** Name of the dimension. */
  name: string;
  /** Value of the dimension. */
  value: string;
}

export function metricSingleDimensionDeserializer(item: any): MetricSingleDimension {
  return {
    name: item["name"],
    value: item["value"],
  };
}

export function singleBaselineArrayDeserializer(result: Array<SingleBaseline>): any[] {
  return result.map((item) => {
    return singleBaselineDeserializer(item);
  });
}

/** The baseline values for a single sensitivity value. */
export interface SingleBaseline {
  /** the sensitivity of the baseline. */
  sensitivity: BaselineSensitivity;
  /** The low thresholds of the baseline. */
  lowThresholds: number[];
  /** The high thresholds of the baseline. */
  highThresholds: number[];
}

export function singleBaselineDeserializer(item: any): SingleBaseline {
  return {
    sensitivity: item["sensitivity"],
    lowThresholds: item["lowThresholds"].map((p: any) => {
      return p;
    }),
    highThresholds: item["highThresholds"].map((p: any) => {
      return p;
    }),
  };
}

/** the sensitivity of the baseline. */
export enum KnownBaselineSensitivity {
  /** Low */
  Low = "Low",
  /** Medium */
  Medium = "Medium",
  /** High */
  High = "High",
}

/**
 * the sensitivity of the baseline. \
 * {@link KnownBaselineSensitivity} can be used interchangeably with BaselineSensitivity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Low**: Low \
 * **Medium**: Medium \
 * **High**: High
 */
export type BaselineSensitivity = string;

export function baselineMetadataArrayDeserializer(result: Array<BaselineMetadata>): any[] {
  return result.map((item) => {
    return baselineMetadataDeserializer(item);
  });
}

/** Represents a baseline metadata value. */
export interface BaselineMetadata {
  /** Name of the baseline metadata. */
  name: string;
  /** Value of the baseline metadata. */
  value: string;
}

export function baselineMetadataDeserializer(item: any): BaselineMetadata {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Describes the format of Error response. */
export interface MetricBaselinesErrorResponse {
  error?: ErrorResponseError;
}

export function metricBaselinesErrorResponseDeserializer(item: any): MetricBaselinesErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorResponseErrorDeserializer(item["error"]),
  };
}

export function _singleMetricBaselinePropertiesDeserializer(item: any) {
  return {
    timespan: item["timespan"],
    interval: item["interval"],
    namespace: item["namespace"],
    baselines: timeSeriesBaselineArrayDeserializer(item["baselines"]),
  };
}
